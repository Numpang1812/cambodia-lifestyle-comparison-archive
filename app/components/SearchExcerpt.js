import { getMatchExcerpt } from "../lib/search";

export default function SearchExcerpt({ card, era, terms, lang }) {
  const excerpt = getMatchExcerpt(card, era, terms, lang);
  if (!excerpt) return null;
  return (
    <span className="searchExcerpt" lang={excerpt.language}>
      {excerpt.parts.map((part, index) =>
        part.match ? <mark key={index}>{part.text}</mark> : part.text
      )}
    </span>
  );
}
