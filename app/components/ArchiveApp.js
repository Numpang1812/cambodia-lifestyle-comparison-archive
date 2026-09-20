"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../lib/supabase/client";
import EntryCards, { cards, matches, searchTerms } from "./EntryCards";
import TimeWarp from "./TimeWarp";
import Architecture from "./Architecture";
import Atmosphere from "./Atmosphere";
import {
  translations,
  getTranslatedCard,
} from "../lib/translations";
import { filterCardsByTerms } from "../lib/search";

const authGroup = { display: "inline-flex", alignItems: "center", gap: "12px" };
const authEmail = {
  maxWidth: "180px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  color: "var(--text-faint)",
};
const authButton = {
  padding: 0,
  border: 0,
  background: "transparent",
  color: "var(--text-muted)",
  fontSize: "12px",
  cursor: "pointer",
};

export default function ArchiveApp() {
  const [lang, setLang] = useState("en");
  const [era, setEra] = useState("modern");
  const [warping, setWarping] = useState(false);
  const [motionPaused, setMotionPaused] = useState(false);
  const [pagePhase, setPagePhase] = useState("idle");
  const [suggestIndex, setSuggestIndex] = useState(-1);
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");
  const [showSuggest, setShowSuggest] = useState(false);
  const [selected, setSelected] = useState(null);
  const [modalEra, setModalEra] = useState("modern");
  const [warpPhase, setWarpPhase] = useState("idle");
  const [warpDir, setWarpDir] = useState("fwd");
  const targetRef = useRef("modern");
  const [warpKind, setWarpKind] = useState("page");
  const warpKindRef = useRef("page");

  const t = translations[lang] || translations.en;

  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUserEmail(data.session?.user?.email ?? null);
    });
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUserEmail(session?.user?.email ?? null);
      }
    );
    return () => authListener.subscription.unsubscribe();
  }, [supabase]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  const ERAS = useMemo(
    () => [
      { id: "heritage", label: t.eraPast, decade: t.eraPastDecade },
      { id: "modern", label: t.eraPresent, decade: t.eraPresentDecade },
    ],
    [t]
  );

  // Restore language preference
  useEffect(() => {
    try {
      const saved = localStorage.getItem("cambodia_lifestyle_lang");
      if (saved === "km" || saved === "en") setLang(saved);
    } catch (_) {}
  }, []);

  // Update HTML lang and dataset
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;
    try {
      localStorage.setItem("cambodia_lifestyle_lang", lang);
    } catch (_) {}
  }, [lang]);

  // Drive the whole token layer from one attribute
  useEffect(() => {
    document.documentElement.dataset.era = era;
  }, [era]);

  function toggle(next) {
    if (warping || next === era) return;

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
      draft.trim().length
        ? filterCardsByTerms(cards, suggestTerms, draft, era).slice(0, 6)
        : [],
    [suggestTerms, draft, era]
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

      <a className="skip-link" href="#archive">
        {t.skipLink}
      </a>
      <div
        className="wrap"
        data-phase={pagePhase}
        data-direction={targetRef.current === "heritage" ? "back" : "fwd"}
      >
        <nav className="topbar" aria-label="Main navigation">
          <a className="brand" href="#">
            <svg
              width="30"
              height="32"
              viewBox="0 0 30 32"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 13L15 3L27 13M7 12V25H23V12M3 29H27M12 25V16H18V25M15 3V0"
                stroke="currentColor"
                strokeWidth="1.6"
              />
            </svg>
            <span>
              {t.brand}
              <span className="brand-sub">{t.brandSub}</span>
            </span>
          </a>

          <div className="nav-links">
            <a href="#archive">
              {t.navExplore} <span aria-hidden="true">↗</span>
            </a>
            <a href="#about">{t.navAbout}</a>
            {userEmail ? (
              <span style={authGroup}>
                <span style={authEmail} title={userEmail}>
                  {userEmail}
                </span>
                <button type="button" style={authButton} onClick={handleLogout}>
                  Log out
                </button>
              </span>
            ) : (
              <>
                <a href="/login">Log in</a>
                <a href="/signup">Sign up</a>
              </>
            )}
          </div>

          {/* Language Switcher (EN / ខ្មែរ) */}
          <div className="lang-toggle" role="group" aria-label="Language selection">
            <button
              type="button"
              className={`lang-btn ${lang === "en" ? "active" : ""}`}
              onClick={() => setLang("en")}
              aria-pressed={lang === "en"}
            >
              EN
            </button>
            <button
              type="button"
              className={`lang-btn ${lang === "km" ? "active" : ""}`}
              onClick={() => setLang("km")}
              aria-pressed={lang === "km"}
            >
              ខ្មែរ
            </button>
          </div>

          <button
            className="motion-toggle"
            type="button"
            aria-pressed={motionPaused}
            onClick={() => setMotionPaused((value) => !value)}
            aria-label={motionPaused ? "Enable animations" : "Pause animations"}
          >
            <span aria-hidden="true">{motionPaused ? "▷" : "Ⅱ"}</span>
            <span>{motionPaused ? t.motionOff : t.motionOn}</span>
          </button>
        </nav>

        <header className="siteHeader">
          <div className="hero-copy" key={`copy-${era}-${lang}`}>
            <p className="kicker">
              <span className="status-dot" /> {t.heroKicker}
            </p>
            <h1 className="title">
              {past ? t.heroTitlePast : t.heroTitlePresent}
              <br />
              <span>{past ? t.heroTitlePastSub : t.heroTitlePresentSub}</span>
            </h1>
            <p className="description">
              {past ? t.heroDescPast : t.heroDescPresent}
            </p>
            <a className="explore-link" href="#archive">
              {t.heroExplore} <span aria-hidden="true">↓</span>
            </a>
            <div className="hero-caption">
              <span>{t.heroStatStories}</span>
              <span>{t.heroStatEras}</span>
              <span>{t.heroStatHeritage}</span>
            </div>
          </div>
          <div className="hero-scene" key={`scene-${era}-${lang}`}>
            <div className="scene-orbit" />
            <span className="scene-coordinate">11.5564° N / 104.9282° E</span>
            <span className="scene-year">
              {past ? (lang === "km" ? "១៩៨០" : "1980") : (lang === "km" ? "២០២០" : "2020")}
              <span>{lang === "km" ? "" : "s"}</span>
            </span>
            <Architecture era={era} hero />
            <div className="scene-caption">
              <span className="status-dot" />
              <span>{past ? t.heroScenePast : t.heroScenePresent}</span>
              <span aria-hidden="true">↗</span>
            </div>
          </div>
        </header>

        <main id="archive">
          <div className="timeline-console">
            <div className="timeline-intro">
              <p className="kicker">{t.timelineKicker}</p>
              <p>
                {t.timelineTitle} <span>{t.timelineTitleSub}</span>
              </p>
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
                  <span className="era-node" />
                  <span>
                    {e.label}
                    <small>{e.decade}</small>
                  </span>
                </button>
              ))}
              <span className="timeline-arrow" aria-hidden="true">
                ⇄
              </span>
            </div>
            <p className="timeline-status" role="status">
              <span className="status-dot" />
              {isPageWarping
                ? pagePhase === "dis"
                  ? t.statusLeaving
                  : t.statusDrawing
                : past
                ? t.statusPast
                : t.statusPresent}
            </p>
          </div>

          <div className="archive-toolbar">
            <div>
              <p className="kicker">{t.toolbarKicker}</p>
              <h2>
                {t.toolbarTitle} <span>{t.toolbarTitleSub}</span>
              </h2>
            </div>
            <div className="searchBar" role="search">
              <button
                type="button"
                className="searchSubmit"
                onClick={commitSearch}
                aria-label={t.searchPlaceholder}
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
                placeholder={t.searchPlaceholder}
                value={draft}
                onChange={(e) => {
                  const val = e.target.value;
                  setDraft(val);
                  if (!val.trim()) {
                    setQuery("");
                  }
                  setShowSuggest(true);
                  setSuggestIndex(-1);
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                    e.preventDefault();
                    setShowSuggest(true);
                    setSuggestIndex((index) =>
                      suggestions.length
                        ? (index +
                            (e.key === "ArrowDown" ? 1 : -1) +
                            suggestions.length) %
                          suggestions.length
                        : -1
                    );
                  }
                  if (e.key === "Escape") setShowSuggest(false);
                  if (e.key === "Enter") {
                    if (showDropdown && suggestIndex >= 0 && suggestions[suggestIndex]) {
                      pickSuggestion(suggestions[suggestIndex]);
                    } else {
                      commitSearch();
                    }
                  }
                }}
                onBlur={() => setShowSuggest(false)}
                onFocus={() => {
                  if (draft.trim()) setShowSuggest(true);
                }}
                aria-label={t.searchPlaceholder}
                role="combobox"
                aria-autocomplete="list"
                aria-activedescendant={
                  showDropdown && suggestIndex >= 0
                    ? `suggestion-${suggestIndex}`
                    : undefined
                }
                aria-expanded={showDropdown}
                aria-controls="search-suggestions"
                autoComplete="off"
              />
              {draft ? (
                <button
                  type="button"
                  className="searchClear"
                  onClick={clearSearch}
                  aria-label={t.searchClear}
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
                    suggestions.map((c, index) => {
                      const translated = getTranslatedCard(c, lang);
                      return (
                        <li
                          key={c.num}
                          id={`suggestion-${index}`}
                          role="option"
                          aria-selected={suggestIndex === index}
                        >
                          <button
                            type="button"
                            className="searchSuggestItem"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => pickSuggestion(c)}
                          >
                            {translated.num} · {translated.topic}
                          </button>
                        </li>
                      );
                    })
                  ) : (
                    <li className="searchSuggestEmpty" role="option" aria-selected="false">
                      {t.searchNoMatch}
                    </li>
                  )}
                </ul>
              ) : null}
            </div>
          </div>

          <EntryCards
            era={era}
            lang={lang}
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
          <div>
            <p className="kicker">{t.aboutKicker}</p>
            <h2>
              {t.aboutTitle}
              <br />
              <span>{t.aboutTitleSub}</span>
            </h2>
          </div>
          <div>
            <p>{t.aboutDesc}</p>
            <p className="about-note">{t.aboutNote}</p>
          </div>
          <div className="project-credit">
            <p className="kicker">{t.curatedBy}</p>
            <p>{t.curatorName}</p>
            <p className="kicker">{t.source}</p>
            <p>{t.sourceDesc}</p>
          </div>
        </section>

        <footer className="footer">
          <span>{t.footerBrand}</span>
          <span>{t.footerCourse}</span>
        </footer>
      </div>
    </>
  );
}
