// Contributor submission service adhering to Tuesday rules:
// 1. Owner from session (never from form)
// 2. Insert explicitly names columns (never spreads ...data)
// 3. Storage path is user.id + random UUID (never original filename)
// 4. Catches errors, logs console.error, never exposes error.message to user

import { validateTimeline } from "./contribute-validation";
import { normalizeEntries } from "./supabase/entries";

export async function uploadAndCreateEntry({
  supabase,
  user,
  trimmed,
  photoFile,
  pairSlug = null,
}) {
  // Tuesday check 1: Owner strictly from authenticated session
  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();

  if (!currentUser || currentUser.id !== user?.id) {
    throw new Error("UNAUTHORIZED");
  }

  if (pairSlug !== null) {
    if (!pairSlug || typeof trimmed.timeline !== "string" || validateTimeline(trimmed.timeline)) {
      throw new Error("NOT_SAVED");
    }
    const { data, error } = await supabase
      .from("entries")
      .select("id,slug,timeline,status")
      .eq("slug", pairSlug)
      .in("status", ["published", "pending"])
      .limit(2);
    if (error || data?.length !== 1 || data[0].status !== "published") {
      throw new Error("NOT_SAVED");
    }
    const [card] = normalizeEntries(data);
    const era = Number(trimmed.timeline) < 2000 ? "heritage" : "modern";
    if (card[era]) throw new Error("NOT_SAVED");
  }

  let imageConfig = trimmed.artwork
    ? { artwork: trimmed.artwork, design: [2, 3].includes(trimmed.design) ? trimmed.design : 1 }
    : {};
  if (photoFile) {
    // Tuesday check 4: Path is <user_id>/<random_uuid>.<clean_extension>
    const rawExt = (photoFile.name.split(".").pop() || "jpg").toLowerCase();
    const ext = rawExt === "web" ? "webp" : rawExt;
    const randomPath = `${currentUser.id}/${crypto.randomUUID()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("photos")
      .upload(randomPath, photoFile, {
        contentType: photoFile.type || "image/jpeg",
        upsert: false,
      });

    if (uploadError) throw uploadError;

    const { data: urlData } = supabase.storage.from("photos").getPublicUrl(randomPath);
    imageConfig = {
      ...imageConfig,
      bucket: "photos",
      path: randomPath,
      url: urlData.publicUrl,
      ext,
    };
  }

  const parsedKeywords = trimmed.keywords ? JSON.parse(trimmed.keywords) : null;
  const baseSlug = (trimmed.title || trimmed.topic)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  // Reuse an existing story's slug when contributing the missing era so the two
  // rows pair up for the time warp; otherwise mint a fresh slug.
  const slug = pairSlug || `${baseSlug}-${crypto.randomUUID().slice(0, 6)}`;

  // Calculate next sequential card number (e.g. "06", "07") to satisfy NOT NULL constraint
  const { data: existingRows } = await supabase
    .from("entries")
    .select("num")
    .order("num", { ascending: false })
    .limit(1);

  const highestNum = existingRows?.[0]?.num ? parseInt(existingRows[0].num, 10) : 0;
  const nextNum = String(Math.max(highestNum + 1, 6)).padStart(2, "0");

  // Tuesday check 2: Insert explicitly names columns; no spreading ...data
  const { data: inserted, error: insertError } = await supabase
    .from("entries")
    .insert({
      owner: currentUser.id,
      num: nextNum,
      title: [trimmed.title, trimmed.titleKm],
      content: [trimmed.content],
      timeline: trimmed.timeline,
      topic: [trimmed.topic],
      source: [trimmed.source],
      keywords: parsedKeywords,
      image_config: imageConfig,
      slug: slug,
    })
    .select("id");

  if (insertError) throw insertError;

  return inserted?.[0] || null;
}

export async function updateExistingEntry({
  supabase,
  user,
  entryId,
  trimmed,
  photoFile,
  existingImageConfig,
}) {
  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();

  if (!currentUser || currentUser.id !== user?.id) {
    throw new Error("UNAUTHORIZED");
  }

  const { data: original, error: readError } = await supabase
    .from("entries")
    .select("content,topic,source")
    .eq("id", entryId)
    .eq("owner", currentUser.id)
    .maybeSingle();
  if (readError || !original) throw new Error("NOT_SAVED");

  let finalImageConfig = existingImageConfig || null;

  // If user selected a new photo, upload with random uuid path
  if (photoFile) {
    const rawExt = (photoFile.name.split(".").pop() || "jpg").toLowerCase();
    const ext = rawExt === "web" ? "webp" : rawExt;
    const randomPath = `${currentUser.id}/${crypto.randomUUID()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("photos")
      .upload(randomPath, photoFile, {
        contentType: photoFile.type || "image/jpeg",
        upsert: false,
      });

    if (uploadError) throw uploadError;

    const { data: urlData } = supabase.storage.from("photos").getPublicUrl(randomPath);

    finalImageConfig = {
      bucket: "photos",
      path: randomPath,
      url: urlData.publicUrl,
      ext: ext,
    };
  }

  const artwork = trimmed.artwork ?? existingImageConfig?.artwork;
  if (artwork || existingImageConfig?.artwork) {
    const design = trimmed.design ?? existingImageConfig?.design;
    finalImageConfig = {
      ...finalImageConfig,
      artwork: artwork || null,
      design: artwork && [2, 3].includes(design) ? design : 1,
    };
  }

  const parsedKeywords = trimmed.keywords ? JSON.parse(trimmed.keywords) : null;

  // Reviewer check: reviewers keep their edits published, non-reviewers return to pending
  let isReviewer = false;
  try {
    const { data: reviewerFlag } = await supabase.rpc("is_reviewer");
    isReviewer = reviewerFlag === true;
  } catch (err) {
    console.error("is_reviewer RPC check error:", err);
  }

  const updatePayload = {
    title: [trimmed.title, trimmed.titleKm],
    timeline: trimmed.timeline,
    keywords: parsedKeywords,
    ...(finalImageConfig ? { image_config: finalImageConfig } : {}),
    updated_at: new Date().toISOString(),
  };

  for (const field of ["content", "topic", "source"]) {
    const stored = original[field];
    const values = Array.isArray(stored) ? stored : [stored];
    if (trimmed[field] !== values[0]) {
      updatePayload[field] = [trimmed[field], ...values.slice(1)];
    }
  }

  if (!isReviewer) {
    updatePayload.status = "pending";
  }

  // Explicit column names; .select() checks row actually updated
  const { data: updatedRows, error: updateError } = await supabase
    .from("entries")
    .update(updatePayload)
    .eq("id", entryId)
    .eq("owner", currentUser.id)
    .select("id");

  if (updateError || !updatedRows || updatedRows.length === 0) {
    console.error(
      "Update failed or no row returned:",
      updateError || "Zero rows returned from update"
    );
    throw new Error("NOT_SAVED");
  }

  return updatedRows[0];
}
