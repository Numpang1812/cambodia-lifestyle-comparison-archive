// Keep Khmer letters and combining marks together. Ignore invisible word breaks
// so a word pasted from an entry also matches when typed without them.
function normalize(text) {
  return String(text ?? "")
    .normalize("NFC")
    .toLowerCase()
    .replace(/\u200b/g, "")
    .replace(/[០-៩]/g, (digit) => String(digit.charCodeAt(0) - 0x17e0))
    .replace(/[^\p{L}\p{M}\p{N}]+/gu, " ")
    .trim();
}

export function searchTerms(query) {
  const text = normalize(query);
  return text ? [...new Set(text.split(" "))] : [];
}

function textOf(value) {
  if (Array.isArray(value)) return value.map(textOf).join(" ");
  if (value && typeof value === "object") return [textOf(value.en), textOf(value.km)].join(" ");
  return value ?? "";
}

const eras = ["heritage", "modern"];

// Body first: a sentence usually explains a match better than a keyword alone.
function searchableFields(card, era) {
  const entry = card[era];
  return [
    entry.details,
    entry.headline,
    entry.topic ?? card.topic,
    entry.role,
    entry.chips,
    entry.source,
    card.caption?.[era],
    getActiveKeywords(card, era),
    entry.timeline,
    entry.label,
    { en: card.num, km: card.numKm },
  ];
}

export function getActiveKeywords(card, era = null) {
  const active = era ? [era] : eras;
  return [
    ...(card.commonKeywords || []),
    ...active.flatMap((key) => card[`${key}Keywords`] || card[key]?.keywords || []),
  ];
}

export function getCardHaystack(card, era = null) {
  if (!era)
    return eras
      .map((key) => getCardHaystack(card, key))
      .join(" ")
      .trim();
  const entry = card[era];
  if (!entry) return "";
  // The pairing slug can be derived from the *other* entry's title.
  // Use only reader-facing identifiers and text from the requested era.
  return normalize(searchableFields(card, era).map(textOf).join(" "));
}

function termIndex(text, term) {
  // Khmer words need not have spaces between them. English supports typing
  // the start of a word, without matching e.g. "cart" inside "postcard".
  if (/\p{Script=Khmer}/u.test(term) || text.startsWith(term)) return text.indexOf(term);
  const index = text.indexOf(` ${term}`);
  return index < 0 ? -1 : index + 1;
}

function containsTerm(text, term) {
  return termIndex(text, term) >= 0;
}

const graphemes = new Intl.Segmenter("km", { granularity: "grapheme" });

export function getMatchExcerpt(card, era, terms, lang) {
  if (!card[era] || !terms.length) return null;
  const fields = searchableFields(card, era);
  let best;
  for (const language of [lang, lang === "km" ? "en" : "km"]) {
    for (const field of fields) {
      const value =
        field && typeof field === "object" && !Array.isArray(field) ? field[language] : field;
      for (const item of Array.isArray(value) ? value : [value]) {
        if (item == null) continue;
        const original = String(item);
        const text = normalize(original);
        const hits = terms.filter((term) => containsTerm(text, term));
        if (hits.length && (!best || hits.length > best.hits.length)) {
          best = { original, hits, language: /\p{Script=Khmer}/u.test(original) ? "km" : language };
        }
      }
    }
  }
  if (!best) return null;

  // Map normalized matches back to original graphemes (including Khmer marks,
  // invisible breaks and localized digits). Never render normalized text as the quote.
  const chars = Array.from(graphemes.segment(best.original), (g) => g.segment);
  const positions = [];
  let normalized = "";
  chars.forEach((char, index) => {
    const part = normalize(char);
    if (part) {
      normalized += part;
      for (let i = 0; i < part.length; i++) positions.push(index);
    } else if (char !== "\u200b" && normalized && !normalized.endsWith(" ")) {
      normalized += " ";
      positions.push(index);
    }
  });
  const marked = new Set();
  for (const term of best.hits) {
    const start = termIndex(normalized, term);
    if (start < 0) continue;
    for (let i = positions[start]; i <= positions[start + term.length - 1]; i++) marked.add(i);
  }
  if (!marked.size) return null;
  const first = Math.min(...marked);
  const start = Math.max(0, first - 18);
  const end = Math.min(chars.length, Math.max(first + 52, first + best.hits[0].length));
  const parts = [];
  for (let i = start; i < end; i++) {
    const match = marked.has(i);
    if (parts.length && parts.at(-1).match === match) parts.at(-1).text += chars[i];
    else parts.push({ text: chars[i], match });
  }
  if (start) parts.unshift({ text: "…", match: false });
  if (end < chars.length) parts.push({ text: "…", match: false });
  return { parts, language: best.language };
}

export function scoreCard(card, terms, rawQuery = "", era = null) {
  if (!era) return Math.max(...eras.map((key) => scoreCard(card, terms, rawQuery, key)));
  const entry = card[era];
  if (!entry) return 0;
  const words = terms ?? searchTerms(rawQuery);
  if (!words.length) return 1;
  const text = getCardHaystack(card, era);
  if (!words.every((word) => containsTerm(text, word))) return 0;
  const headings = normalize(textOf([entry.headline, entry.topic ?? card.topic]));
  return (
    1 +
    words.filter((word) => containsTerm(headings, word)).length * 2 +
    Number(text.includes(words.join(" ")))
  );
}

export function filterCardsByTerms(cards, terms, rawQuery = "", era = null) {
  return cards
    .map((card) => ({ card, score: scoreCard(card, terms, rawQuery, era) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ card }) => card);
}
