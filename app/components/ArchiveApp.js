"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import collection from "../../collection.config.js";
import EntryCards, { cards, matches, searchTerms } from "./EntryCards";
import TimeWarp from "./TimeWarp";

const ERAS = [
  { id: "heritage", label: "1980s · HERITAGE" },
  { id: "modern", label: "2020s · MODERN" },
];

// TimeWarp fires onSwap at peak flux (~0.42 of 1.2s)
export default function ArchiveApp() {
  const [era, setEra] = useState("modern");
  const [warping, setWarping] = useState(false);
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");
  const [showSuggest, setShowSuggest] = useState(false);
  const [selected, setSelected] = useState(null);
  const targetRef = useRef("modern");

  // Drive the whole token layer from one attribute
  useEffect(() => {
    document.documentElement.dataset.era = era;
  }, [era]);

  function toggle(next) {
    if (warping || next === era) return;

    // Reduced motion: instant swap, no canvas
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setEra(next);
      return;
    }

    targetRef.current = next;
    setWarping(true);
  }

  function handleSwap() {
    setEra(targetRef.current);
  }

  function handleDone() {
    setWarping(false);
  }

  function commitSearch() {
    setQuery(draft.trim());
    setShowSuggest(false);
  }

  function clearSearch() {
    setDraft("");
    setQuery("");
    setShowSuggest(false);
  }

  function pickSuggestion(card) {
    setSelected(card);
    setShowSuggest(false);
  }

  const suggestTerms = useMemo(() => searchTerms(draft), [draft]);
  const suggestions = useMemo(
    () =>
      suggestTerms.length
        ? cards.filter((c) => matches(c, suggestTerms)).slice(0, 6)
        : [],
    [suggestTerms],
  );
  const showDropdown = showSuggest && draft.trim().length > 0;

  return (
    <>
      <TimeWarp
        active={warping}
        target={targetRef.current}
        onSwap={handleSwap}
        onDone={handleDone}
      />

      <div className={warping ? "wrap content-warp" : "wrap"}>
        <header className="siteHeader">
          <p className="kicker">Khmer Living Archive</p>
          <h1 className="title">{collection.name}</h1>
          <p className="description">{collection.description}</p>

          <div className="searchBar" role="search">
            <button
              type="button"
              className="searchSubmit"
              onClick={commitSearch}
              aria-label="Search"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <circle
                  cx="7"
                  cy="7"
                  r="5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M11 11l4 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <input
              type="search"
              className="searchInput"
              placeholder="Search the archive — topic, era, chip, price…"
              value={draft}
              onChange={(e) => {
                setDraft(e.target.value);
                setShowSuggest(true);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") commitSearch();
              }}
              onBlur={() => setShowSuggest(false)}
              onFocus={() => {
                if (draft.trim()) setShowSuggest(true);
              }}
              aria-label="Search archive entries"
              aria-expanded={showDropdown}
              aria-controls="search-suggestions"
              autoComplete="off"
            />
            {draft ? (
              <button
                type="button"
                className="searchClear"
                onClick={clearSearch}
                aria-label="Clear search"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                  <path
                    d="M1 1l10 10M11 1L1 11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            ) : null}

            {showDropdown ? (
              <ul
                id="search-suggestions"
                className="searchSuggestList"
                role="listbox"
                aria-label="Search suggestions"
              >
                {suggestions.length ? (
                  suggestions.map((c) => (
                    <li key={c.num} role="option" aria-selected="false">
                      <button
                        type="button"
                        className="searchSuggestItem"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => pickSuggestion(c)}
                      >
                        CARD {c.num} · {c.topic.toUpperCase()}
                      </button>
                    </li>
                  ))
                ) : (
                  <li className="searchSuggestEmpty" role="option" aria-selected="false">
                    no direct match — press Enter to search anyway
                  </li>
                )}
              </ul>
            ) : null}
          </div>

          <div className="eraToggle" role="group" aria-label="Switch era">
            {ERAS.map((e) => (
              <button
                key={e.id}
                type="button"
                className={era === e.id ? "eraBtn active" : "eraBtn"}
                onClick={() => toggle(e.id)}
                disabled={warping}
                aria-pressed={era === e.id}
              >
                {e.label}
              </button>
            ))}
          </div>

          <div className="infoGrid">
            <div className="infoCard">
              <p className="cardLabel">CURATED BY</p>
              <p className="cardValue">{collection.curator}</p>
            </div>
            <div className="infoCard">
              <p className="cardLabel">SOURCE</p>
              <p className="cardValue">{collection.source}</p>
            </div>
          </div>
        </header>

        <EntryCards
          era={era}
          count={collection.entries?.length ?? 5}
          query={query}
          selected={selected}
          onSelect={setSelected}
          onClose={() => setSelected(null)}
        />

        <footer className="footer">
          Built in ICT 340 — Vibe Coding, American University of Phnom Penh,
          Fall 2026. This archive is under construction all semester. Come back
          in December.
        </footer>
      </div>
    </>
  );
}
