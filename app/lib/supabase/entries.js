// Adapter and query helper for Supabase entries table
// Selects all entries, newest first (order by created_at desc)

const kmDigits = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];

export function toKmNum(num) {
  return String(num).replace(/\d/g, (d) => kmDigits[d] || d);
}

// Transform raw Supabase rows into comparison card format expected by archive UI
export function normalizeEntries(rows) {
  if (!rows || !rows.length) return [];

  const cardMap = new Map();

  for (const row of rows) {
    const key =
      row.slug ||
      (Array.isArray(row.topic) ? row.topic[0] : row.topic) ||
      row.num ||
      row.id;

    if (!cardMap.has(key)) {
      cardMap.set(key, {
        id: row.id,
        num: row.num || "01",
        numKm: toKmNum(row.num || "01"),
        rawNum: row.num || "01",
        slug: row.slug || "entry",
        topic: Array.isArray(row.topic)
          ? { en: row.topic[0] || "", km: row.topic[1] || row.topic[0] || "" }
          : {
              en: row.topic || "Archive Entry",
              km: row.topic || "ព័ត៌មានបណ្ណសារ",
            },
        imageConfig: row.image_config || {
          folder: row.slug || "commute-and-mobility",
          pastPrefix: "past",
          presentPrefix: "present",
          pastCount: 2,
          presentCount: 2,
          ext: "png",
        },
        priceIndex: row.price_index || null,
        commonKeywords: Array.isArray(row.keywords) ? row.keywords : [],
        heritageKeywords: [],
        modernKeywords: [],
        heritage: null,
        modern: null,
      });
    }

    const card = cardMap.get(key);
    const isHeritage =
      row.timeline &&
      (row.timeline.toLowerCase().includes("1980") ||
        row.timeline.toLowerCase().includes("heritage") ||
        row.timeline.toLowerCase().includes("past"));

    const eraKey = isHeritage ? "heritage" : "modern";
    const defaultLabel = isHeritage
      ? { en: "HERITAGE · 1980s–90s", km: "សម័យដើម · ទសវត្សរ៍ ៨០–៩០" }
      : { en: "MODERN · 2020s", km: "សម័យថ្មី · ទសវត្សរ៍ ២០២០" };

    const headline = Array.isArray(row.title)
      ? { en: row.title[0] || "", km: row.title[1] || row.title[0] || "" }
      : { en: row.title || "", km: row.title || "" };

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

  // Ensure both eras exist on each card so UI comparisons & modal warp work
  return Array.from(cardMap.values()).map((card) => {
    if (!card.heritage && card.modern) {
      card.heritage = {
        ...card.modern,
        label: { en: "HERITAGE · 1980s–90s", km: "សម័យដើម · ទសវត្សរ៍ ៨០–៩០" },
      };
    }
    if (!card.modern && card.heritage) {
      card.modern = {
        ...card.heritage,
        label: { en: "MODERN · 2020s", km: "សម័យថ្មី · ទសវត្សរ៍ ២០២០" },
      };
    }
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
