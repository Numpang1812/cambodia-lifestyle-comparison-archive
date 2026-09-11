"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import collection from "../../collection.config.js";
import EntryCards, { cards, matches, searchTerms } from "./EntryCards";
import TimeWarp from "./TimeWarp";
import Architecture from "./Architecture";
import Atmosphere from "./Atmosphere";

const ERAS = [
  { id: "heritage", label: "The past", decade: "1980s–90s" },
  { id: "modern", label: "The present", decade: "2020s" },
];

// TimeWarp fires onSwap mid-timeline — full: 1.2s page switch (34%),
// quick: 0.6s in-popup compare (46%) then the popup rebuilds on top of
// the decelerating streaks
export default function ArchiveApp() {
  const [era, setEra] = useState("modern");
  const [warping, setWarping] = useState(false);
  const [motionPaused, setMotionPaused] = useState(false);
  const [pagePhase, setPagePhase] = useState("idle");
  const [suggestIndex, setSuggestIndex] = useState(-1);
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
  const [warpKind, setWarpKind] = useState("page");
  const warpKindRef = useRef("page");

  // Drive the whole token layer from one attribute
  useEffect(() => {
    document.documentElement.dataset.era = era;
  }, [era]);

  function toggle(next) {
    if (warping || next === era) return;

    // Reduced motion: instant swap, no canvas
    if (motionPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setEra(next);
      return;
    }

    setWarpKind("page");
    warpKindRef.current = "page";
    targetRef.current = next;
    setPagePhase("dis");
    setWarping(true);
  }

  // In-popup compare: deconstruct the card, play the TimeWarp streaks,
  // then rebuild it in the other era on top of the decelerating stars.
  // The page era underneath is untouched.
  function warpModal() {
    if (warping || !selected) return;
    const next = modalEra === "heritage" ? "modern" : "heritage";

    if (motionPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setModalEra(next);
      return;
    }

    setWarpKind("modal");
    warpKindRef.current = "modal";
    targetRef.current = next;
    setWarpDir(next === "modern" ? "fwd" : "back");
    setWarpPhase("dis");
    setWarping(true);
  }

  function handleSwap() {
    if (warpKindRef.current === "modal") {
      if (!selected) {
        setWarpPhase("idle");
        return;
      }
      // Popup compare: swap modal era only, keep page era background stable
      setModalEra(targetRef.current);
      setWarpPhase("reb");
    } else {
      setEra(targetRef.current);
      setPagePhase("reb");
    }
  }

  function handleDone() {
    setWarping(false);
    setWarpPhase("idle");
    setPagePhase("idle");
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
    setModalEra(era);
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
  const isPageWarping = warping && warpKind === "page";
  const past = era === "heritage";

  return (
    <>
      <Atmosphere era={era} paused={motionPaused} />
      <TimeWarp
        active={warping}
        target={targetRef.current}
        mode={warpKind === "modal" ? "quick" : "full"}
        onSwap={handleSwap}
        onDone={handleDone}
      />

      <a className="skip-link" href="#archive">Skip to the archive</a>
      <div className="wrap" data-phase={pagePhase} data-direction={targetRef.current === "heritage" ? "back" : "fwd"}>
        <nav className="topbar" aria-label="Main navigation">
          <a className="brand" href="#"><svg width="30" height="32" viewBox="0 0 30 32" fill="none" aria-hidden="true"><path d="M3 13L15 3L27 13M7 12V25H23V12M3 29H27M12 25V16H18V25M15 3V0" stroke="currentColor" strokeWidth="1.6" /></svg><span>KHMER LIVING<span className="brand-sub">THE LIFESTYLE ARCHIVE</span></span></a>
          <div className="nav-links"><a href="#archive">Explore the archive <span aria-hidden="true">↗</span></a><a href="#about">About the project</a></div>
          <button className="motion-toggle" type="button" aria-pressed={motionPaused} onClick={() => setMotionPaused((value) => !value)} aria-label={motionPaused ? "Enable animations" : "Pause animations"}><span aria-hidden="true">{motionPaused ? "▷" : "Ⅱ"}</span><span>{motionPaused ? "Motion off" : "Motion on"}</span></button>
        </nav>
        <header className="siteHeader">
          <div className="hero-copy" key={`copy-${era}`}>
            <p className="kicker"><span className="status-dot" /> ONE COUNTRY. GENERATIONS OF STORIES.</p>
            <h1 className="title">Cambodia,<br /><span>{past ? "the way we lived." : "a world of change."}</span></h1>
            <p className="description">{past ? "Before the city lights, life followed a different rhythm. Step into the wooden homes, dusty roads and everyday stories of a generation." : "From wooden homes to changing skylines. Travel between generations and discover how everyday Cambodian life has transformed."}</p>
            <a className="explore-link" href="#archive">Explore everyday life <span aria-hidden="true">↓</span></a>
            <div className="hero-caption"><span>05 stories</span><span>02 eras</span><span>One shared heritage</span></div>
          </div>
          <div className="hero-scene" key={`scene-${era}`}>
            <div className="scene-orbit" /><span className="scene-coordinate">11.5564° N / 104.9282° E</span>
            <span className="scene-year">{past ? "1980" : "2020"}<span>s</span></span>
            <Architecture era={era} hero />
            <div className="scene-caption"><span className="status-dot" /><span>{past ? "THE ROOTS OF EVERYDAY LIFE" : "A NEW CHAPTER, STILL CAMBODIA"}</span><span aria-hidden="true">↗</span></div>
          </div>
        </header>

        <main id="archive">
          <div className="timeline-console">
            <div className="timeline-intro"><p className="kicker">THE TIME MACHINE</p><p>Same place. <span>A different time.</span></p></div>
            <div className="eraToggle" role="group" aria-label="Switch era">
              {ERAS.map((e) => (
                <button key={e.id} type="button" className={era === e.id ? "eraBtn active" : "eraBtn"} onClick={() => toggle(e.id)} disabled={warping} aria-pressed={era === e.id}>
                  <span className="era-node" /><span>{e.label}<small>{e.decade}</small></span>
                </button>
              ))}
              <span className="timeline-arrow" aria-hidden="true">⇄</span>
            </div>
            <p className="timeline-status" role="status"><span className="status-dot" />{isPageWarping ? pagePhase === "dis" ? "Leaving this era…" : "Drawing a new world…" : `${past ? "Heritage" : "Present"} era · You are here`}</p>
          </div>
          <div className="archive-toolbar">
            <div><p className="kicker">THE EVERYDAY COLLECTION</p><h2>Little moments. <span>Big changes.</span></h2></div>
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
              placeholder="Find a story…"
              value={draft}
              onChange={(e) => {
                setDraft(e.target.value);
                setShowSuggest(true);
                setSuggestIndex(-1);
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                  e.preventDefault();
                  setShowSuggest(true);
                  setSuggestIndex((index) => suggestions.length ? (index + (e.key === "ArrowDown" ? 1 : -1) + suggestions.length) % suggestions.length : -1);
                }
                if (e.key === "Escape") setShowSuggest(false);
                if (e.key === "Enter") {
                  if (showDropdown && suggestIndex >= 0 && suggestions[suggestIndex]) pickSuggestion(suggestions[suggestIndex]);
                  else commitSearch();
                }
              }}
              onBlur={() => setShowSuggest(false)}
              onFocus={() => {
                if (draft.trim()) setShowSuggest(true);
              }}
              aria-label="Search archive entries"
              role="combobox"
              aria-autocomplete="list"
              aria-activedescendant={showDropdown && suggestIndex >= 0 ? `suggestion-${suggestIndex}` : undefined}
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
                  suggestions.map((c, index) => (
                    <li key={c.num} id={`suggestion-${index}`} role="option" aria-selected={suggestIndex === index}>
                      <button
                        type="button"
                        className="searchSuggestItem"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => pickSuggestion(c)}
                      >
                        {c.num} · {c.topic}
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
          </div>

        <EntryCards
          era={era}
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
          onClearSearch={clearSearch}
        />
        </main>
        <section className="about-project" id="about">
          <div><p className="kicker">KEEPING OUR STORIES ALIVE</p><h2>A changing country.<br /><span>A connection that stays.</span></h2></div>
          <div><p>{collection.description}</p><p className="about-note">An evolving student archive, with family stories and source material still being gathered.</p></div>
          <div className="project-credit"><p className="kicker">CURATED BY</p><p>{collection.curator}</p><p className="kicker">SOURCE</p><p>{collection.source}</p></div>
        </section>
        <footer className="footer">
          <span>Khmer Living Archive <span aria-hidden="true">/</span> Cambodia Lifestyle</span><span>ICT 340 · AUPP · Fall 2026</span>
        </footer>
      </div>
    </>
  );
}
