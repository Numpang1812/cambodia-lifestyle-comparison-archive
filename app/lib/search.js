// Dedicated Search Engine for Khmer Living Archive
// Features:
// 1. Dual-era scope awareness (separates 1980s heritage from 2020s modern queries)
// 2. Bilingual search (English space-delimited + Khmer non-spaced abugida)
// 3. Multi-term relevance scoring + stop-word filtering
// 4. Topic, keyword, and substring matching

// Parse search input into clean keywords
export function searchTerms(query) {
  if (!query) return [];
  const stopWords = new Set([
    "and", "or", "the", "in", "of", "to", "for", "with", "a", "an",
    "&", "+", "vs", "versus",
    "និង", "ឬ", "នៃ", "របស់", "ការ", "ដើម្បី", "ជាមួយ", "ឯ", "ក្នុង"
  ]);

  const rawTokens = query
    .trim()
    .toLowerCase()
    .split(/[\s,+/|&]+/)
    .map((t) => t.trim())
    .filter(Boolean);

  const filtered = rawTokens.filter((t) => !stopWords.has(t));
  return filtered.length > 0 ? filtered : rawTokens;
}

// Get active keywords depending on the requested era
export function getActiveKeywords(rawCard, era = null) {
  const common = rawCard.commonKeywords || [];
  if (era === "heritage") {
    return [...common, ...(rawCard.heritageKeywords || [])];
  }
  if (era === "modern") {
    return [...common, ...(rawCard.modernKeywords || [])];
  }
  return [
    ...common,
    ...(rawCard.heritageKeywords || []),
    ...(rawCard.modernKeywords || []),
  ];
}

// Build comprehensive searchable haystack for a card scoped by era
export function getCardHaystack(rawCard, era = null) {
  // Shared / common across both eras (card numbers, topic titles, common keywords)
  const commonItems = [
    rawCard.num,
    rawCard.numKm,
    rawCard.slug,
    rawCard.topic?.en,
    rawCard.topic?.km,
    ...(rawCard.commonKeywords || []),
  ];

  // 1980s Heritage items
  const heritageItems = [
    rawCard.heritage?.label?.en,
    rawCard.heritage?.label?.km,
    rawCard.heritage?.headline?.en,
    rawCard.heritage?.headline?.km,
    rawCard.heritage?.details?.en,
    rawCard.heritage?.details?.km,
    rawCard.heritage?.role?.en,
    rawCard.heritage?.role?.km,
    ...(rawCard.heritage?.chips?.en || []),
    ...(rawCard.heritage?.chips?.km || []),
    rawCard.heritage?.source?.en,
    rawCard.heritage?.source?.km,
    rawCard.caption?.heritage?.en,
    rawCard.caption?.heritage?.km,
    ...(rawCard.heritageKeywords || rawCard.heritage?.keywords || []),
    ...(rawCard.priceIndex || []).flatMap((r) => [
      r.item?.en, r.item?.km,
      r.past?.en, r.past?.km,
    ]),
  ];

  // 2020s Modern items
  const modernItems = [
    rawCard.modern?.label?.en,
    rawCard.modern?.label?.km,
    rawCard.modern?.headline?.en,
    rawCard.modern?.headline?.km,
    rawCard.modern?.details?.en,
    rawCard.modern?.details?.km,
    rawCard.modern?.role?.en,
    rawCard.modern?.role?.km,
    ...(rawCard.modern?.chips?.en || []),
    ...(rawCard.modern?.chips?.km || []),
    rawCard.modern?.source?.en,
    rawCard.modern?.source?.km,
    rawCard.caption?.modern?.en,
    rawCard.caption?.modern?.km,
    ...(rawCard.modernKeywords || rawCard.modern?.keywords || []),
    ...(rawCard.priceIndex || []).flatMap((r) => [
      r.item?.en, r.item?.km,
      r.present?.en, r.present?.km,
    ]),
  ];

  let items = [];
  if (era === "heritage") {
    items = [...commonItems, ...heritageItems];
  } else if (era === "modern") {
    items = [...commonItems, ...modernItems];
  } else {
    // If era is not specified, include both eras
    items = [
      ...commonItems,
      ...heritageItems,
      ...modernItems,
    ];
  }

  return items.filter(Boolean).join(" ").toLowerCase();
}

// Keyword-based score matching scoped to the active era:
// - Matches if ANY active keyword hits the card's era-filtered haystack
// - Higher score when multiple keywords hit the same card
// - "romance food" matches both without missing either
// - Supports compound / unspaced Khmer phrases (e.g. "ស្នេហាម្ហូប")
export function scoreCard(rawCard, terms, rawQuery = "", era = null) {
  if ((!terms || terms.length === 0) && !rawQuery) return 1;
  const hay = getCardHaystack(rawCard, era);
  const q = (rawQuery || "").trim().toLowerCase();
  const activeKeywords = getActiveKeywords(rawCard, era);
  let score = 0;

  // 1. Direct term hits in the era-filtered haystack
  for (const term of terms || []) {
    if (!term) continue;
    if (hay.includes(term)) {
      score += 4;
      // Topic match gets a large boost
      if (
        rawCard.topic?.en?.toLowerCase().includes(term) ||
        rawCard.topic?.km?.includes(term)
      ) {
        score += 8;
      }
      // Exact active keyword match gets a boost
      if (activeKeywords.some((k) => k.toLowerCase() === term)) {
        score += 6;
      }
    } else {
      // Substring check: if an active keyword for this era is contained within the search term
      // (e.g. user typed Khmer phrase "រឿងស្នេហា" or "ម្ហូបឆ្ងាញ់")
      const matchedKw = activeKeywords.find(
        (kw) => kw.length >= 2 && term.includes(kw.toLowerCase())
      );
      if (matchedKw) {
        score += 4;
      }
    }
  }

  // 2. Query-level matching for non-spaced scripts (Khmer) or full phrase match
  if (q.length >= 2) {
    if (
      rawCard.topic?.en?.toLowerCase().includes(q) ||
      rawCard.topic?.km?.includes(q)
    ) {
      score += 10;
    }

    for (const kw of activeKeywords) {
      if (kw.length >= 2 && q.includes(kw.toLowerCase())) {
        score += 4;
        break;
      }
    }
  }

  return score;
}

// Filter and rank cards by relevance for the active era
export function filterCardsByTerms(rawCards, terms, rawQuery = "", era = null) {
  if ((!terms || terms.length === 0) && !rawQuery) return rawCards;
  return rawCards
    .map((c) => ({ card: c, score: scoreCard(c, terms, rawQuery, era) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.card);
}
