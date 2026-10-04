// Contributor submission service adhering to Tuesday rules:
// 1. Owner from session (never from form)
// 2. Insert explicitly names columns (never spreads ...data)
// 3. Storage path is user.id + random UUID (never original filename)
// 4. Catches errors, logs console.error, never exposes error.message to user

export async function uploadAndCreateEntry({ supabase, user, trimmed, photoFile }) {
  // Tuesday check 1: Owner strictly from authenticated session
  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();

  if (!currentUser || currentUser.id !== user?.id) {
    throw new Error("UNAUTHORIZED");
  }

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

  const { data: urlData } = supabase.storage
    .from("photos")
    .getPublicUrl(randomPath);

  const parsedKeywords = trimmed.keywords ? JSON.parse(trimmed.keywords) : null;
  const baseSlug = (trimmed.title || trimmed.topic)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const slug = `${baseSlug}-${crypto.randomUUID().slice(0, 6)}`;

  const imageConfig = {
    bucket: "photos",
    path: randomPath,
    url: urlData.publicUrl,
    ext: ext,
  };

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
      price_index: trimmed.priceIndex || null,
      keywords: parsedKeywords,
      image_config: imageConfig,
      slug: slug,
    })
    .select();

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

    const { data: urlData } = supabase.storage
      .from("photos")
      .getPublicUrl(randomPath);

    finalImageConfig = {
      bucket: "photos",
      path: randomPath,
      url: urlData.publicUrl,
      ext: ext,
    };
  }

  const parsedKeywords = trimmed.keywords ? JSON.parse(trimmed.keywords) : null;

  // Explicit column names; .select() checks row actually updated
  const { data: updatedRows, error: updateError } = await supabase
    .from("entries")
    .update({
      title: [trimmed.title, trimmed.titleKm],
      content: [trimmed.content],
      timeline: trimmed.timeline,
      topic: [trimmed.topic],
      source: [trimmed.source],
      price_index: trimmed.priceIndex || null,
      keywords: parsedKeywords,
      ...(finalImageConfig ? { image_config: finalImageConfig } : {}),
      updated_at: new Date().toISOString(),
    })
    .eq("id", entryId)
    .eq("owner", currentUser.id)
    .select();

  if (updateError || !updatedRows || updatedRows.length === 0) {
    console.error("Update failed or no row returned:", updateError || "Zero rows returned from update");
    throw new Error("NOT_SAVED");
  }

  return updatedRows[0];
}

