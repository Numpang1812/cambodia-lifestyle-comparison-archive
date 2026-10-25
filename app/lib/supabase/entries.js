// Adapter and query helper for Supabase entries table
// Selects all entries, newest first (order by created_at desc)

const kmDigits = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];

export function toKmNum(num) {
  return String(num).replace(/\d/g, (d) => kmDigits[d] || d);
}

function normalizePriceIndex(raw) {
  if (!raw) return null;
  if (Array.isArray(raw)) return raw;
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    } catch (_) {}
    if (raw.trim()) {
      return [
        {
          item: { en: "Price Index", km: "សន្ទស្សន៍តម្លៃ" },
          past: { en: `${raw} KHR`, km: `${toKmNum(raw)} រៀល` },
          present: { en: "—", km: "—" },
        },
      ];
    }
  }
  if (typeof raw === "number") {
    return [
      {
        item: { en: "Price Index", km: "សន្ទស្សន៍តម្លៃ" },
        past: { en: `${raw} KHR`, km: `${toKmNum(raw)} រៀល` },
        present: { en: "—", km: "—" },
      },
    ];
  }
  return null;
}

const TOPIC_KM_MAP = {
  "Commute & Mobility": "ការធ្វើដំណើរ និងមធ្យោបាយធ្វើដំណើរ",
  "Morning Routine & School Prep": "ទម្លាប់ពេលព្រឹក និងការរៀបចំទៅរៀន",
  "Free Time, Entertainment & Side Hustles": "ពេលទំនេរ ការកម្សាន្ត និងការងារក្រៅម៉ោង",
  "Street Food & Cost of Living": "ម្ហូបតាមផ្លូវ និងកម្រិតជីវភាពរស់នៅ",
  "Romance & Dating Culture": "ស្នេហា និងវប្បធម៌នៃការណាត់ជួប",
};

const TOPIC_FOLDER_MAP = {
  "Commute & Mobility": "commute-and-mobility",
  "Morning Routine & School Prep": "morning-routine",
  "Free Time, Entertainment & Side Hustles": "free-time-and-entertainment",
  "Street Food & Cost of Living": "street-food-and-cost",
  "Romance & Dating Culture": "romance-and-date-culture",
};

// Transform raw Supabase rows into comparison card format expected by archive UI
export function normalizeEntries(rows) {
  if (!rows || !rows.length) return [];

  const cardMap = new Map();

  for (const row of rows) {
    const isHeritage =
      row.timeline &&
      (row.timeline.toLowerCase().includes("1980") ||
        row.timeline.toLowerCase().includes("1985") ||
        row.timeline.toLowerCase().includes("heritage") ||
        row.timeline.toLowerCase().includes("past") ||
        (parseInt(row.timeline, 10) >= 1800 && parseInt(row.timeline, 10) <= 1999));

    const eraKey = isHeritage ? "heritage" : "modern";

    // Group only if era slot is not yet taken; otherwise treat as separate entry card
    let key = row.slug || row.id;
    if (cardMap.has(key)) {
      const existing = cardMap.get(key);
      if (existing[eraKey]) {
        key = row.id;
      }
    }

    if (!cardMap.has(key)) {
      const primaryTopic = Array.isArray(row.topic) ? row.topic[0] : row.topic;
      const topicKm = Array.isArray(row.topic)
        ? row.topic[1] || TOPIC_KM_MAP[primaryTopic] || row.topic[0] || ""
        : TOPIC_KM_MAP[row.topic] || row.topic || "ព័ត៌មានបណ្ណសារ";

      cardMap.set(key, {
        id: row.id,
        owner: row.owner || null,
        num: row.num || null,
        numKm: toKmNum(row.num || "01"),
        rawNum: row.num || null,
        slug: row.slug || "entry",
        topic: {
          en: primaryTopic || "Archive Entry",
          km: topicKm,
        },
        imageConfig: row.image_config || {
          folder: TOPIC_FOLDER_MAP[primaryTopic] || row.slug || "commute-and-mobility",
          pastPrefix: "past",
          presentPrefix: "present",
          pastCount: 2,
          presentCount: 2,
          ext: "png",
        },
        image: row.image || null,
        priceIndex: normalizePriceIndex(row.price_index),
        commonKeywords: Array.isArray(row.keywords) ? row.keywords : [],
        heritageKeywords: [],
        modernKeywords: [],
        heritage: null,
        modern: null,
      });
    }

    const card = cardMap.get(key);
    if (row.owner && !card.owner) {
      card.owner = row.owner;
    }
    if (row.image && !card.image) {
      card.image = row.image;
    }
    if (row.image_config && !card.imageConfig?.url && !card.imageConfig?.path) {
      card.imageConfig = row.image_config;
    }

    const defaultLabel = isHeritage
      ? { en: "HERITAGE · 1980s–90s", km: "សម័យដើម · ទសវត្សរ៍ ៨០–៩០" }
      : { en: "MODERN · 2020s", km: "សម័យថ្មី · ទសវត្សរ៍ ២០២០" };

    const headline = Array.isArray(row.title)
      ? { en: row.title[0] || "", km: row.title[1] || row.title[0] || "" }
      : { en: row.title || "", km: row.title_km || row.title || "" };

    const details = Array.isArray(row.content)
      ? { en: row.content[0] || "", km: row.content[1] || row.content[0] || "" }
      : { en: row.content || "", km: row.content || "" };

    const role = Array.isArray(row.role)
      ? { en: row.role[0] || "", km: row.role[1] || "" }
      : row.role
      ? { en: row.role, km: row.role }
      : null;

    const source = Array.isArray(row.source)
      ? { en: row.source[0] || "", km: row.source[1] || "" }
      : row.source
      ? { en: row.source, km: row.source }
      : null;

    const chips =
      row.chips && typeof row.chips === "object"
        ? row.chips.en
          ? row.chips
          : { en: row.chips, km: row.chips }
        : { en: [], km: [] };

    card[eraKey] = {
      label: defaultLabel,
      headline,
      details,
      role,
      source,
      chips,
    };

    if (isHeritage) {
      card.heritageKeywords = Array.isArray(row.keywords) ? row.keywords : [];
    } else {
      card.modernKeywords = Array.isArray(row.keywords) ? row.keywords : [];
    }
  }

  // Assign sequential unique card numbers (no era mirroring: a card shows
  // only in the era(s) it actually has content for)
  const seenNums = new Set();
  let nextNum = 1;

  return Array.from(cardMap.values()).map((card) => {
    let n = card.rawNum;
    while (!n || seenNums.has(n)) {
      n = String(nextNum++).padStart(2, "0");
    }
    seenNums.add(n);
    card.num = n;
    card.rawNum = n;
    card.numKm = toKmNum(n);

    return card;
  });
}

// Fetch all entries from Supabase, ordered by entry number
export async function fetchEntries(supabase) {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from("entries")
      .select("*")
      .eq("status", "published")
      .order("num", { ascending: true });

    if (error) {
      console.error("Supabase entries fetch error:", error.message);
      return [];
    }
    return normalizeEntries(data || []).sort((a, b) =>
      (a.rawNum || a.num || "").localeCompare(b.rawNum || b.num || "")
    );
  } catch (err) {
    console.error("Supabase unexpected error:", err);
    return [];
  }
}

// Fetch single entry by ID
export async function fetchEntryById(supabase, entryId) {
  if (!supabase || !entryId) return null;
  try {
    const { data, error } = await supabase
      .from("entries")
      .select("*")
      .eq("id", entryId)
      .maybeSingle();

    if (error) {
      console.error("Fetch entry by ID error:", error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.error("Fetch entry unexpected error:", err);
    return null;
  }
}

// Delete entry by ID, checking that user is owner and validating returned row from .select()
export async function deleteEntry(supabase, entryId, ownerId) {
  if (!supabase || !entryId) throw new Error("Missing entry ID");
  const query = supabase.from("entries").delete().eq("id", entryId);
  if (ownerId) query.eq("owner", ownerId);
  const { data, error } = await query.select();

  if (error || !data || data.length === 0) {
    console.error("Delete failed or no row returned:", error || "Zero rows returned from delete");
    throw new Error("NOT_SAVED");
  }
  return data[0];
}
