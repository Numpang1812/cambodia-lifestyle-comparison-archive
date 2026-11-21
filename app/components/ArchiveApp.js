"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../lib/supabase/client";
import { fetchEntries, deleteEntry } from "../lib/supabase/entries";
import EntryCards, { searchTerms } from "./EntryCards";
import TimeWarp from "./TimeWarp";
import Architecture from "./Architecture";
import Atmosphere from "./Atmosphere";
import { translations, getTranslatedCard } from "../lib/translations";
import { filterCardsByTerms } from "../lib/search";
import MenuIcon from "./MenuIcon";

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

  const t = translations[lang] || translations.en;

  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [currentUser, setCurrentUser] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [isReviewer, setIsReviewer] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [langOpen, setLangOpen] = useState(false);
  const langPicker = useRef(null);
  const langTrigger = useRef(null);
  const langNames = { en: "English", km: "Khmer · ខ្មែរ" };
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function loadEntries() {
      setLoading(true);
      const data = await fetchEntries(supabase);
      if (active) {
        setCards(data);
        setLoading(false);
      }
    }
    loadEntries();
    return () => {
      active = false;
    };
  }, [supabase]);

  useEffect(() => {
    if (!cards || !cards.length) return;
    try {
      const params = new URLSearchParams(window.location.search);
      const entryId = params.get("entry");
      if (entryId) {
        const found = cards.find((c) => String(c.id) === entryId || c.slug === entryId);
        if (found) {
          setSelected(found);
        }
      }
    } catch (_) {}
  }, [cards]);

  useEffect(() => {
    async function syncUser(session) {
      const user = session?.user ?? null;
      setUserEmail(user?.email ?? null);
      setCurrentUser(user);
      if (!user) {
        setIsReviewer(false);
        return;
      }
      try {
        const { data } = await supabase.rpc("is_reviewer");
        setIsReviewer(data === true);
      } catch (err) {
        console.error("is_reviewer check error:", err);
        setIsReviewer(false);
      }
    }
    supabase.auth.getSession().then(({ data }) => syncUser(data.session));
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      syncUser(session);
    });
    return () => authListener.subscription.unsubscribe();
  }, [supabase]);

  async function handleDeleteCard(card) {
    if (!card || !currentUser) return;
    const topicTitle = typeof card.topic === "object" ? card.topic.en : card.topic;
    const confirmed = window.confirm(
      `Are you sure you want to delete "${topicTitle}"? This action cannot be undone.`
    );
    if (!confirmed) return;

    try {
      await deleteEntry(supabase, card.id, currentUser.id);
      setCards((prev) => prev.filter((c) => c.id !== card.id));
      setSelected(null);
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        if (url.searchParams.has("entry")) {
          url.searchParams.delete("entry");
          window.history.replaceState({}, "", url.pathname + (url.search ? url.search : ""));
        }
      }
    } catch (err) {
      console.error("Delete operation failed:", err);
      alert("That change wasn't saved");
    }
  }

  useEffect(() => {
    if (!menuOpen) {
      setLangOpen(false);
      return;
    }
    function onOutside(event) {
      if (!langPicker.current?.contains(event.target)) setLangOpen(false);
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    function onKey(event) {
      if (event.key === "Escape" && langOpen) {
        event.preventDefault();
        setLangOpen(false);
        langTrigger.current?.focus();
        return;
      }
      if (event.key === "Escape" && menuRef.current?.contains(document.activeElement)) {
        setMenuOpen(false);
        menuRef.current.querySelector(".profile-btn")?.focus();
      }
    }
    document.addEventListener("pointerdown", onOutside, true);
    document.addEventListener("focusin", onOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onOutside, true);
      document.removeEventListener("focusin", onOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen, langOpen]);

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
    targetRef.current = next;
    setWarpDir(next === "modern" ? "fwd" : "back");
    setWarpPhase("dis");
    setWarping(true);
  }

  useEffect(() => {
    if (!warping || warpKind !== "modal") return;
    const swap = window.setTimeout(() => {
      setModalEra(targetRef.current);
      setWarpPhase("reb");
    }, 320);
    const done = window.setTimeout(() => {
      setWarpPhase("idle");
      setWarping(false);
    }, 640);
    return () => {
      window.clearTimeout(swap);
      window.clearTimeout(done);
    };
  }, [warpKind, warping]);

  function handleSwap() {
    setEra(targetRef.current);
    setPagePhase("reb");
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
    if (warpKind === "modal") setWarping(false);
    setSelected(null);
    setModalEra(era);
    setWarpPhase("idle");
  }

  const suggestTerms = useMemo(() => searchTerms(draft), [draft]);
  const suggestions = useMemo(
    () =>
      draft.trim().length ? filterCardsByTerms(cards, suggestTerms, draft, era).slice(0, 6) : [],
    [cards, suggestTerms, draft, era]
  );

  const showDropdown = showSuggest && draft.trim().length > 0;
  const isPageWarping = warping && warpKind === "page";
  const past = era === "heritage";

  return (
    <>
      <Atmosphere era={era} paused={motionPaused} />
      <TimeWarp
        active={isPageWarping}
        target={targetRef.current}
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
            <svg width="30" height="32" viewBox="0 0 30 32" fill="none" aria-hidden="true">
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

          <div className="topbar-actions">
            <div className="nav-links">
              <a href="#archive">
                {t.navExplore} <span aria-hidden="true">↗</span>
              </a>
              <a href="#about">{t.navAbout}</a>
              <a href="/contribute">{lang === "km" ? "ចូលរួមចំណែក" : "Contribute"}</a>
            </div>

            <div
              className="profile"
              ref={menuRef}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setMenuOpen(false);
              }}
            >
              <button
                type="button"
                className="profile-btn"
                onClick={() => setMenuOpen((value) => !value)}
                aria-controls="profile-disclosure"
                aria-expanded={menuOpen}
                aria-label={lang === "km" ? "ម៉ឺនុយរុករក និងគណនី" : "Navigation and account"}
              >
                {userEmail ? (
                  userEmail.charAt(0).toUpperCase()
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.6" />
                    <path
                      d="M5 20c0-3.4 3.1-5.6 7-5.6s7 2.2 7 5.6"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </button>
              <div className="profile-menu" id="profile-disclosure" hidden={!menuOpen}>
                <div className="profile-menu-group profile-menu-nav">
                  <h2 className="profile-menu-heading">{lang === "km" ? "រុករក" : "Navigation"}</h2>
                  <a
                    href="#archive"
                    className="profile-menu-item"
                    onClick={(event) => {
                      if (
                        event.defaultPrevented ||
                        event.button !== 0 ||
                        event.metaKey ||
                        event.ctrlKey ||
                        event.shiftKey ||
                        event.altKey
                      ) {
                        return;
                      }
                      document.getElementById("archive")?.focus({ preventScroll: true });
                      setMenuOpen(false);
                    }}
                  >
                    {t.navExplore}
                  </a>
                  <a
                    href="#about"
                    className="profile-menu-item"
                    onClick={(event) => {
                      if (
                        event.defaultPrevented ||
                        event.button !== 0 ||
                        event.metaKey ||
                        event.ctrlKey ||
                        event.shiftKey ||
                        event.altKey
                      ) {
                        return;
                      }
                      document.getElementById("about")?.focus({ preventScroll: true });
                      setMenuOpen(false);
                    }}
                  >
                    {t.navAbout}
                  </a>
                  <a href="/contribute" className="profile-menu-item">
                    {lang === "km" ? "ចូលរួមចំណែក" : "Contribute"}
                  </a>
                </div>
                <div className="profile-menu-group">
                  <h2 className="profile-menu-heading">
                    {lang === "km" ? "ចំណូលចិត្ត" : "Preferences"}
                  </h2>
                  <div className="archive-lang" ref={langPicker}>
                    <svg
                      width="0"
                      height="0"
                      style={{ position: "absolute" }}
                      aria-hidden="true"
                      focusable="false"
                    >
                      <symbol id="archive-flag-en" viewBox="0 0 60 36">
                        <path fill="#012169" d="M0 0h60v36H0z" />
                        <path stroke="#fff" strokeWidth="7" d="m0 0 60 36M60 0 0 36" />
                        <path
                          fill="#c8102e"
                          d="M0 0l25 15h-5L0 3zM60 0 35 15h-5L55 0zM0 36l25-15h5L5 36zM60 36 35 21h5l20 12z"
                        />
                        <path stroke="#fff" strokeWidth="12" d="M30 0v36M0 18h60" />
                        <path stroke="#c8102e" strokeWidth="7" d="M30 0v36M0 18h60" />
                      </symbol>
                      <symbol id="archive-flag-km" viewBox="0 0 60 36">
                        <path fill="#032ea1" d="M0 0h60v36H0z" />
                        <path fill="#e00025" d="M0 9h60v18H0z" />
                        <path
                          fill="#fff"
                          d="M12 25v-2h3v-2h3v-4h1v-2h1l1-4 1 4h1v2h1v3l3-2v-3h1v-2h1l1-5 1 5h1v2h1v3l3 2v-3h1v-2h1l1-4 1 4h1v2h1v4h3v2h3v2z"
                        />
                        <path stroke="#e00025" d="M15 23h30m-25-2v-2m10 2v-3m10 3v-2" />
                      </symbol>
                    </svg>
                    <button
                      type="button"
                      className="archive-lang-trigger"
                      ref={langTrigger}
                      aria-expanded={langOpen}
                      aria-controls="archive-lang-options"
                      onClick={() => setLangOpen((open) => !open)}
                    >
                      <span className="archive-lang-action">
                        {lang === "km" ? "ប្ដូរភាសា" : "Change language"}
                      </span>
                      <svg width="25" height="15" aria-hidden="true">
                        <use href={`#archive-flag-${lang}`} />
                      </svg>
                      {langNames[lang]}
                      <svg
                        className="archive-lang-chevron"
                        width="12"
                        height="8"
                        viewBox="0 0 12 8"
                        aria-hidden="true"
                      >
                        <path
                          d="m1 1 5 5 5-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </button>
                    <div
                      className="archive-lang-options"
                      id="archive-lang-options"
                      hidden={!langOpen}
                    >
                      {Object.entries(langNames).map(([code, name]) => (
                        <button
                          key={code}
                          type="button"
                          lang={code}
                          aria-pressed={code === lang}
                          onClick={() => {
                            setLang(code);
                            setLangOpen(false);
                            langTrigger.current?.focus();
                          }}
                        >
                          <svg width="25" height="15" aria-hidden="true">
                            <use href={`#archive-flag-${code}`} />
                          </svg>
                          {name}
                          {code === lang && <span aria-hidden="true">✓</span>}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="profile-menu-item"
                    onClick={() => setMotionPaused((value) => !value)}
                    role="switch"
                    aria-checked={!motionPaused}
                  >
                    <span className="profile-menu-icon" aria-hidden="true">
                      <MenuIcon name={motionPaused ? "play" : "pause"} />
                    </span>
                    {lang === "km" ? "ចលនា" : "Animations"}
                  </button>
                </div>
                <div className="profile-menu-group profile-menu-account">
                  <h2 className="profile-menu-heading">{lang === "km" ? "គណនី" : "Account"}</h2>
                  {userEmail ? (
                    <p className="profile-menu-email" title={userEmail}>
                      {userEmail}
                    </p>
                  ) : null}
                  {userEmail ? (
                    <>
                      <a
                        href="/my-entries"
                        className="profile-menu-item"
                        style={{ textDecoration: "none" }}
                      >
                        <span className="profile-menu-icon" aria-hidden="true">
                          <MenuIcon name="entries" />
                        </span>
                        {t.navMyEntries}
                      </a>
                      {isReviewer ? (
                        <a
                          href="/review"
                          className="profile-menu-item"
                          style={{ textDecoration: "none" }}
                        >
                          <span className="profile-menu-icon" aria-hidden="true">
                            <MenuIcon name="review" />
                          </span>
                          {t.navReviewPanel}
                        </a>
                      ) : null}
                      <button type="button" className="profile-menu-item" onClick={handleLogout}>
                        <span className="profile-menu-icon" aria-hidden="true">
                          <MenuIcon name="logout" />
                        </span>
                        {t.authLogout}
                      </button>
                    </>
                  ) : (
                    <>
                      <a
                        href="/login"
                        className="profile-menu-item profile-login"
                        style={{ textDecoration: "none" }}
                      >
                        <span className="profile-menu-icon" aria-hidden="true">
                          <MenuIcon name="login" />
                        </span>
                        {t.authLoginLink}
                      </a>
                      <a
                        href="/signup"
                        className="profile-menu-item profile-signup"
                        style={{ textDecoration: "none" }}
                      >
                        <span className="profile-menu-icon" aria-hidden="true">
                          <MenuIcon name="signup" />
                        </span>
                        {t.authSignupLink}
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
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
            <p className="description">{past ? t.heroDescPast : t.heroDescPresent}</p>
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
              {past ? (lang === "km" ? "១៩៨០" : "1980") : lang === "km" ? "២០២០" : "2020"}
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

        <main id="archive" tabIndex={-1}>
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
                  <circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
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
                        ? (index + (e.key === "ArrowDown" ? 1 : -1) + suggestions.length) %
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
                  showDropdown && suggestIndex >= 0 ? `suggestion-${suggestIndex}` : undefined
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
            cards={cards}
            loading={loading}
            era={era}
            lang={lang}
            query={query}
            selected={selected}
            modalEra={modalEra}
            warping={warping}
            warpPhase={warpPhase}
            warpDir={warpDir}
            currentUser={currentUser}
            onSelect={(c) => {
              setSelected(c);
              setModalEra(era);
            }}
            onTimeWarp={warpModal}
            onClose={closeEntry}
            onClearSearch={clearSearch}
            onDelete={handleDeleteCard}
          />
        </main>

        <section className="about-project" id="about" tabIndex={-1}>
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
