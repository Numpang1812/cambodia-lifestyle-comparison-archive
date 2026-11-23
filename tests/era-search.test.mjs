import assert from "node:assert/strict";
import test from "node:test";
import { normalizeEntries } from "../app/lib/supabase/entries.js";
import { filterCardsByTerms, getMatchExcerpt, searchTerms } from "../app/lib/search.js";

const past = {
  id: "past",
  slug: "cyclo-rides",
  timeline: "1985",
  topic: ["Commute & Mobility"],
  title: ["Cyclo rides"],
  content: ["In the morning", "ជិះស៊ីក្លូពេលព្រឹក"],
  source: ["Oral history"],
  keywords: ["pedals"],
};
const present = {
  id: "present",
  slug: "cyclo-rides",
  timeline: "2024",
  topic: ["Homes & Neighborhoods"],
  title: ["Balcony garden"],
  content: ["We grow herbs", "ដាំបន្លែ"],
  keywords: ["balcony"],
};

test("cross-language excerpts quote the active era and preserve original writing", () => {
  const [card] = normalizeEntries([past, present]);
  const excerpt = (era, query, lang) => getMatchExcerpt(card, era, searchTerms(query), lang);
  const highlighted = (result) =>
    result.parts
      .filter((p) => p.match)
      .map((p) => p.text)
      .join("");
  assert.equal(highlighted(excerpt("modern", "បន្លែ", "en")), "បន្លែ");
  assert.equal(highlighted(excerpt("modern", "grow", "km")), "grow");
  assert.equal(excerpt("heritage", "បន្លែ", "en"), null);
  card.modern.details.km = "ក្រមា\u200bខ្មែរ ឆ្នាំ ២០២៤";
  assert.equal(highlighted(excerpt("modern", "ក្រមាខ្មែរ", "en")), "ក្រមា\u200bខ្មែរ");
  assert.equal(highlighted(excerpt("modern", "2024", "km")), "២០២៤");
  assert.equal(highlighted(excerpt("heritage", "pedals", "en")), "pedals");
  assert.equal(excerpt("modern", "", "en"), null);
});

test("paired rows never lend topics, slugs, keywords, or content to the other era", () => {
  for (const rows of [
    [past, present],
    [present, past],
  ]) {
    const cards = normalizeEntries(rows);
    for (const [era, other, queries] of [
      [
        "heritage",
        "modern",
        ["cyclo", "mobility", "pedals", "oral history", "ស៊ីក្លូ", "the", "1985"],
      ],
      ["modern", "heritage", ["garden", "homes", "balcony", "HERBS!", "បន្លែ", "២០២៤"]],
    ]) {
      for (const q of queries) {
        assert.equal(filterCardsByTerms(cards, searchTerms(q), q, era).length, 1, q);
        assert.equal(filterCardsByTerms(cards, searchTerms(q), q, other).length, 0, q);
      }
    }
  }
});

test("a single-era story cannot appear in the opposite era, even with an empty query", () => {
  for (const [row, missingEra] of [
    [past, "modern"],
    [present, "heritage"],
  ]) {
    const cards = normalizeEntries([row]);
    for (const q of ["", row.topic[0], row.keywords[0], "01"]) {
      assert.deepEqual(filterCardsByTerms(cards, searchTerms(q), q, missingEra), []);
    }
  }
});

test("common words count in multiword queries; a partial keyword cannot match backwards", () => {
  const cards = normalizeEntries([past, present]);
  for (const q of ["garden the", "balconymissing"]) {
    assert.equal(filterCardsByTerms(cards, searchTerms(q), q, "modern").length, 0);
  }
});
