"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import collection from "../../collection.config.js";
import EntryCards, { cards, matches, searchTerms } from "./EntryCards";
import TimeWarp from "./TimeWarp";

const ERAS = [
  { id: "heritage", label: "1980s · HERITAGE" },
  { id: "modern", label: "2020s · MODERN" },
];

// TimeWarp fires onSwap mid-timeline — full: 1.2s page switch (34%),
// quick: 0.6s in-popup compare (46%) then the popup rebuilds on top of
// the decelerating streaks
export default function ArchiveApp() {
  const [era, setEra] = useState("modern");
  const [warping, setWarping] = useState(false);
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");
  const [showSuggest, setShowSuggest] = useState(false);
  const [selected, setSelected] = useState(null);
  // Era shown inside the entry popup. Time Warp inside the popup flips
  // this only — the page era stays put, so closing the popup (even while
  // previewing the other era) returns the user to the page they started on.
  const [modalEra, setModalEra] = useState("modern");
  // Popup rebuild choreography: idle → dis (deconstruct) → reb (rebuild)
  const [warpPhase, setWarpPhase] = useState("idle");
  // Direction of the popup warp: fwd = past→future, back = future→past
  const [warpDir, setWarpDir] = useState("fwd");
  const targetRef = useRef("modern");
  // Is the running warp swapping the page era, or just the popup view?
  const warpKindRef = useRef("page");

  // Drive the whole token layer from one attribute
  useEffect(() => {
    document.documentElement.dataset.era = era;
  }, [era]);

  function setEraTheme(next) {
    document.documentElement.dataset.era = next;
  }

  function toggle(next) {
    if (warping || next === era) return;

    // Reduced motion: instant swap, no canvas
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setEra(next);
      return;
    }

    warpKindRef.current = "page";
    targetRef.current = next;
    setWarping(true);
  }

  // In-popup compare: deconstruct the card, play the TimeWarp streaks,
  // then rebuild it in the other era on top of the decelerating stars.
  // The page era underneath is untouched.
  function warpModal() {
    if (warping || !selected) return;
    const next = modalEra === "heritage" ? "modern" : "heritage";

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setModalEra(next);
      setEraTheme(next);
      return;
    }

    warpKindRef.current = "modal";
    targetRef.current = next;
    setWarpDir(next === "modern" ? "fwd" : "back");
    setWarpPhase("dis");
    setWarping(true);
  }

  function handleSwap() {
    if (warpKindRef.current === "modal") {
      if (!selected) {
        // Popup was closed mid-warp — land back on the page era.
        setEraTheme(era);
        setWarpPhase("idle");
        return;
      }
      // Popup compare: re-theme + swap the popup, keep page era.
      setModalEra(targetRef.current);
      setEraTheme(targetRef.current);
      setWarpPhase("reb");
    } else {
      setEra(targetRef.current);
    }
  }

  function handleDone() {
    setWarping(false);
    setWarpPhase("idle");
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
    setModalEra(era);
    setShowSuggest(false);
  }

  function closeEntry() {
    setSelected(null);
    // Re-anchor the popup to the page era for the next open, and restore
    // the page theme even if the user warped the popup to the other era.
    setModalEra(era);
    setEraTheme(era);
    setWarpPhase("idle");
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
        mode={warpKindRef.current === "modal" ? "quick" : "full"}
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
          modalEra={modalEra}
          warping={warping}
          warpPhase={warpPhase}
          warpDir={warpDir}
          onSelect={(c) => {
            setSelected(c);
            setModalEra(era);
          }}
          onTimeWarp={warpModal}
          onClose={closeEntry}
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
