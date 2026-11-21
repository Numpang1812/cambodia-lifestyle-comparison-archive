"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import collection from "../../collection.config";
import Architecture from "../components/Architecture";
import TimeWarp from "../components/TimeWarp";
import { createClient } from "../lib/supabase/client";
import { translations } from "../lib/translations";

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "clamp(24px, 6vw, 48px) clamp(12px, 4vw, 24px)",
    background: "var(--bg)",
    color: "var(--text)",
  },
  card: {
    width: "100%",
    minWidth: 0,
    overflow: "clip",
    overflowWrap: "anywhere",
    background: "var(--bg-card)",
    border: "1px solid var(--border-strong)",
    borderRadius: "var(--card-radius)",
    boxShadow: "var(--card-shadow)",
  },
  langRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "12px",
    marginBottom: "24px",
  },
  archiveName: {
    margin: "8px 0 0",
    fontSize: "18px",
    fontWeight: 500,
    lineHeight: 1.6,
  },
  kicker: {
    display: "flex",
    alignItems: "center",
    gap: "9px",
    margin: 0,
    font: "12px/1.8 var(--font-mono)",
    color: "var(--accent)",
  },
  dot: {
    display: "inline-block",
    width: "5px",
    height: "5px",
    borderRadius: "50%",
    background: "var(--accent)",
    flexShrink: 0,
  },
  title: {
    margin: "24px 0 8px",
    font: "500 clamp(26px, 6vw, 32px)/1.5 var(--font-display)",
  },
  sub: {
    margin: 0,
    fontSize: "15px",
    lineHeight: 1.8,
    color: "var(--text-muted)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    marginTop: "28px",
  },
  field: { display: "flex", flexDirection: "column", gap: "8px" },
  label: {
    font: "500 14px/1.8 var(--font-body)",
    color: "var(--text)",
  },
  passwordToggle: {
    position: "absolute",
    right: "2px",
    top: "50%",
    transform: "translateY(-50%)",
    width: "44px",
    height: "44px",
    display: "grid",
    placeItems: "center",
    background: "transparent",
    border: 0,
    borderRadius: "4px",
    color: "var(--accent)",
    fontSize: "14px",
    lineHeight: 1.6,
  },
  input: {
    width: "100%",
    minWidth: 0,
    minHeight: "48px",
    padding: "12px 13px",
    background: "var(--bg-inset)",
    border: "1px solid var(--border-strong)",
    borderRadius: "4px",
    color: "var(--text)",
    fontSize: "16px",
    lineHeight: 1.6,
  },
  error: {
    margin: 0,
    fontSize: "14px",
    lineHeight: 1.6,
    color: "#ff9b9b",
  },
  message: {
    margin: 0,
    fontSize: "14px",
    lineHeight: 1.6,
    color: "var(--accent)",
  },
  button: {
    marginTop: "8px",
    minHeight: "48px",
    padding: "12px 16px",
    background: "var(--accent)",
    border: "1px solid var(--accent)",
    borderRadius: "4px",
    color: "var(--bg)",
    fontSize: "16px",
    fontWeight: 700,
    lineHeight: 1.6,
  },
  footer: {
    marginTop: "24px",
    marginBottom: 0,
    paddingTop: "16px",
    borderTop: "1px solid var(--border)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "4px 12px",
    fontSize: "14px",
    lineHeight: 1.8,
    color: "var(--text-muted)",
  },
  link: {
    display: "inline-flex",
    alignItems: "center",
    minHeight: "44px",
    color: "var(--accent)",
    fontSize: "14px",
    lineHeight: 1.8,
    textDecoration: "underline",
    textUnderlineOffset: "4px",
  },
};

export default function LoginPage() {
  const pathname = usePathname();
  const signup = pathname === "/signup";
  const era = signup ? "modern" : "heritage";
  const [warpTarget, setWarpTarget] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const submitting = useRef(null);
  const heading = useRef(null);
  const focusOnSwitch = useRef(false);
  const [lang, setLang] = useState("en");
  const [langOpen, setLangOpen] = useState(false);
  const langPicker = useRef(null);
  const langTrigger = useRef(null);
  const langNames = { en: "English", km: "Khmer · ខ្មែរ" };
  const t = translations[lang] || translations.en;

  useEffect(() => {
    const cancelWarp = () => setWarpTarget(null);
    window.addEventListener("popstate", cancelWarp);
    return () => window.removeEventListener("popstate", cancelWarp);
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cambodia_lifestyle_lang");
      if (saved === "km" || saved === "en") setLang(saved);
    } catch (_) {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem("cambodia_lifestyle_lang", lang);
    } catch (_) {}
  }, [lang]);

  useEffect(() => {
    if (!langOpen) return;
    const closeOutside = (event) => {
      if (!langPicker.current?.contains(event.target)) setLangOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside, true);
    document.addEventListener("focusin", closeOutside);
    return () => {
      document.removeEventListener("pointerdown", closeOutside, true);
      document.removeEventListener("focusin", closeOutside);
    };
  }, [langOpen]);

  useLayoutEffect(() => {
    setLangOpen(false);
    setPassword("");
    setShowPassword(false);
    setError("");
    setConfirmed(false);
    setLoading(false);
    if (focusOnSwitch.current) {
      heading.current?.focus({ preventScroll: true });
      focusOnSwitch.current = false;
    }
    return () => {
      submitting.current = null;
    };
  }, [pathname]);

  function switchMode(event) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    event.preventDefault();
    if (submitting.current || event.currentTarget.pathname === window.location.pathname) return;
    focusOnSwitch.current = true;
    const target = event.currentTarget.pathname === "/signup" ? "modern" : "heritage";
    setWarpTarget(window.matchMedia("(prefers-reduced-motion: reduce)").matches ? null : target);
    window.history.pushState(null, "", event.currentTarget.href);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (submitting.current || window.location.pathname !== pathname) return;
    const request = Symbol();
    submitting.current = request;
    const isCurrent = () => submitting.current === request && window.location.pathname === pathname;
    setError("");
    setConfirmed(false);
    setLoading(true);

    try {
      const supabase = createClient();
      const { data, error: authError } = signup
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password });
      if (!isCurrent()) return;

      if (authError) {
        setError(signup ? "authSignupError" : "authInvalid");
      } else if (signup && !data.session) {
        setConfirmed(true);
      } else {
        window.location.assign("/");
      }
    } catch (_) {
      if (isCurrent()) setError(signup ? "authSignupError" : "loginFailed");
    } finally {
      if (isCurrent()) {
        submitting.current = null;
        setLoading(false);
      }
    }
  }

  return (
    <main data-era={era} style={styles.page}>
      {warpTarget === era && (
        <TimeWarp
          key={era}
          active
          target={warpTarget}
          mode="quick"
          onDone={() => setWarpTarget(null)}
        />
      )}
      <div className="auth-card" data-signup={signup} style={styles.card}>
        <aside className="auth-archive">
          <div>
            <p style={styles.kicker}>
              <span style={styles.dot} aria-hidden="true" /> {t.authKicker}
            </p>
            <p style={styles.archiveName}>{collection.name}</p>
          </div>
          <figure className="auth-scene" data-rebuilding={warpTarget === era}>
            <Architecture key={era} era={era} />
            <figcaption style={styles.kicker}>
              {signup ? t.eraPresent : t.eraPast} · {signup ? t.eraPresentDecade : t.eraPastDecade}
            </figcaption>
          </figure>
        </aside>
        <section className="auth-controls">
          <div style={styles.langRow}>
            <a style={styles.link} href="/">
              {lang === "km" ? "ត្រឡប់ទៅបណ្ណសារ" : "Back to archive"}
            </a>
            <div
              className="auth-lang"
              ref={langPicker}
              onKeyDown={(event) => {
                if (event.key !== "Escape" || !langOpen) return;
                event.preventDefault();
                setLangOpen(false);
                langTrigger.current?.focus();
              }}
            >
              <svg
                width="0"
                height="0"
                style={{ position: "absolute" }}
                aria-hidden="true"
                focusable="false"
              >
                <symbol id="auth-flag-en" viewBox="0 0 60 36">
                  <path fill="#012169" d="M0 0h60v36H0z" />
                  <path stroke="#fff" strokeWidth="7" d="m0 0 60 36M60 0 0 36" />
                  <path
                    fill="#c8102e"
                    d="M0 0l25 15h-5L0 3zM60 0 35 15h-5L55 0zM0 36l25-15h5L5 36zM60 36 35 21h5l20 12z"
                  />
                  <path stroke="#fff" strokeWidth="12" d="M30 0v36M0 18h60" />
                  <path stroke="#c8102e" strokeWidth="7" d="M30 0v36M0 18h60" />
                </symbol>
                <symbol id="auth-flag-km" viewBox="0 0 60 36">
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
                className="auth-lang-trigger"
                ref={langTrigger}
                aria-label={`${lang === "km" ? "ជ្រើសរើសភាសា" : "Select language"}: ${langNames[lang]}`}
                aria-expanded={langOpen}
                aria-controls="auth-lang-options"
                disabled={loading}
                onClick={() => setLangOpen(!langOpen)}
              >
                <svg width="25" height="15" aria-hidden="true">
                  <use href={`#auth-flag-${lang}`} />
                </svg>
                {langNames[lang]}
                <svg
                  className="auth-lang-chevron"
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  aria-hidden="true"
                >
                  <path d="m1 1 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
              <div className="auth-lang-options" id="auth-lang-options" hidden={!langOpen}>
                {Object.entries(langNames).map(([code, name]) => (
                  <button
                    key={code}
                    type="button"
                    lang={code}
                    aria-pressed={code === lang}
                    disabled={loading}
                    onClick={() => {
                      setLang(code);
                      setLangOpen(false);
                      langTrigger.current?.focus();
                    }}
                  >
                    <svg width="25" height="15" aria-hidden="true">
                      <use href={`#auth-flag-${code}`} />
                    </svg>
                    {name}
                    {code === lang && <span aria-hidden="true">✓</span>}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <h1 ref={heading} tabIndex={-1} style={styles.title}>
            {signup
              ? lang === "km"
                ? "ចែករំលែករឿងដំបូងរបស់អ្នក"
                : "Share your first story"
              : lang === "km"
                ? "សូមស្វាគមន៍មកវិញ"
                : "Welcome back"}
          </h1>
          <p style={styles.sub}>{signup ? t.authSignupSub : t.authLoginSub}</p>

          <form style={styles.form} onSubmit={handleSubmit} aria-busy={loading}>
            <div style={styles.field}>
              <label style={styles.label} htmlFor="login-email">
                {t.authEmail}
              </label>
              <input
                id="login-email"
                style={styles.input}
                type="email"
                autoComplete="email"
                disabled={loading}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label} htmlFor="login-password">
                {t.authPassword}
              </label>
              <div style={{ position: "relative" }}>
                <input
                  id="login-password"
                  style={{ ...styles.input, paddingRight: "50px" }}
                  type={showPassword ? "text" : "password"}
                  autoComplete={signup ? "new-password" : "current-password"}
                  disabled={loading}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
                <button
                  style={styles.passwordToggle}
                  type="button"
                  disabled={loading}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-pressed={showPassword}
                  aria-controls="login-password"
                  aria-label={
                    showPassword
                      ? lang === "km"
                        ? "លាក់លេខសម្ងាត់"
                        : "Hide password"
                      : lang === "km"
                        ? "បង្ហាញលេខសម្ងាត់"
                        : "Show password"
                  }
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M2 12Q12 25 22 12" stroke="currentColor" strokeWidth="1.75" />
                    <path
                      className="auth-lid"
                      d="M2 12Q12 -1 22 12"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      vectorEffect="non-scaling-stroke"
                    />
                    <circle className="auth-pupil" cx="12" cy="12" r="3" fill="currentColor" />
                  </svg>
                </button>
              </div>
            </div>

            {error ? (
              <p style={styles.error} role="alert">
                {error === "loginFailed"
                  ? lang === "km"
                    ? "មិនអាចចូលប្រើបានទេ។ សូមព្យាយាមម្តងទៀត។"
                    : "Could not log in. Please try again."
                  : t[error]}
              </p>
            ) : null}

            {confirmed && (
              <p style={styles.message} role="status">
                {t.authConfirmEmail}
              </p>
            )}
            <button style={styles.button} type="submit" disabled={loading}>
              {signup
                ? loading
                  ? t.authSignupBusy
                  : t.authSignupBtn
                : loading
                  ? t.authLoginBusy
                  : t.authLoginBtn}
            </button>
          </form>

          <p style={styles.footer}>
            <span>{signup ? t.authHaveAccount : t.authNoAccount}</span>
            <a
              style={styles.link}
              href={signup ? "/login" : "/signup"}
              aria-disabled={loading || undefined}
              onClick={switchMode}
            >
              {signup ? t.authLoginLink : t.authSignupLink}
            </a>
          </p>
        </section>
      </div>
      <style>{`
        .auth-card { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); max-width: 944px; }
        .auth-card > * {
          min-width: 0; padding: clamp(20px, 4vw, 36px);
          transition: transform 350ms ease-in-out;
        }
        .auth-archive {
          display: flex; flex-direction: column; justify-content: center; gap: 24px;
          position: relative; z-index: 1; background: var(--bg-inset);
        }
        .auth-scene { margin: 0; }
        .auth-controls {
          --font-body: var(--font-kantumruy), "Kantumruy Pro", sans-serif;
          font-family: var(--font-body); background: var(--bg-card);
        }
        @media (width > 700px) {
          .auth-card[data-signup="true"] .auth-archive { transform: translateX(100%); }
          .auth-card[data-signup="true"] .auth-controls { transform: translateX(-100%); }
        }
        .auth-lid, .auth-pupil { transform-origin: 12px 12px; transition: transform 180ms ease; }
        .auth-lang { position: relative; width: 10rem; max-width: 100%; margin-inline-start: auto; }
        .auth-lang button {
          display: flex; align-items: center; gap: 8px; width: 100%; min-height: 44px;
          padding: 6px 10px; border: 0; border-radius: 4px; background: transparent;
          color: var(--text); font: 14px/1.6 var(--font-body); text-align: start; cursor: pointer;
        }
        .auth-lang .auth-lang-trigger, .auth-lang-options {
          border: 1px solid var(--border-strong); border-radius: 4px; background: var(--bg-inset);
        }
        .auth-lang-options {
          position: absolute; z-index: 2; top: calc(100% + 4px); inset-inline: 0;
          padding: 2px; background: var(--bg); box-shadow: var(--card-shadow);
        }
        .auth-lang svg { flex-shrink: 0; }
        .auth-lang-chevron, .auth-lang-options span { margin-inline-start: auto; color: var(--accent); }
        .auth-lang-trigger[aria-expanded="true"] .auth-lang-chevron { transform: rotate(180deg); }
        .auth-lang button[aria-pressed="true"], .auth-lang button:hover:enabled {
          background: var(--bg-card); color: var(--accent);
        }
        .auth-lang button:focus-visible { outline: 2px solid var(--accent); outline-offset: -2px; }
        .auth-lang button:disabled { opacity: 0.55; cursor: default; }
        .auth-card [aria-pressed="false"] .auth-lid { transform: scaleY(-1); }
        .auth-card [aria-pressed="false"] .auth-pupil { transform: scale(0); }
        @media (max-width: 700px) {
          .auth-card { grid-template-columns: minmax(0, 1fr); max-width: 472px; }
          .auth-archive { gap: 8px; }
          .auth-scene { width: 100%; max-width: 340px; align-self: center; transition: transform 350ms ease; }
          .auth-card[data-signup="true"] .auth-scene { transform: translateX(8px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .auth-card, .auth-card * { transition: none !important; animation: none !important; }
        }
      `}</style>
    </main>
  );
}
