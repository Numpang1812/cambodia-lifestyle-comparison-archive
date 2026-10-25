"use client";

import { useEffect, useState } from "react";
import { createClient } from "../lib/supabase/client";
import { translations } from "../lib/translations";

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px 22px",
    background: "var(--bg)",
    color: "var(--text)",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    padding: "40px 36px",
    background: "var(--bg-card)",
    border: "1px solid var(--border-strong)",
    borderRadius: "var(--card-radius)",
    boxShadow: "var(--card-shadow)",
  },
  langRow: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "16px",
  },
  kicker: {
    display: "flex",
    alignItems: "center",
    gap: "9px",
    margin: 0,
    font: "10px var(--font-mono)",
    letterSpacing: "1.8px",
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
    margin: "20px 0 8px",
    font: "500 30px/1.2 var(--font-display)",
    letterSpacing: "-0.8px",
  },
  sub: {
    margin: 0,
    fontSize: "13px",
    lineHeight: 1.8,
    color: "var(--text-muted)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    marginTop: "28px",
  },
  field: { display: "flex", flexDirection: "column", gap: "7px" },
  label: {
    font: "10px var(--font-mono)",
    letterSpacing: "1.4px",
    color: "var(--text-muted)",
  },
  input: {
    width: "100%",
    padding: "12px 13px",
    background: "var(--bg-inset)",
    border: "1px solid var(--border)",
    borderRadius: "4px",
    color: "var(--text)",
    fontSize: "13px",
  },
  error: {
    margin: 0,
    fontSize: "12px",
    lineHeight: 1.6,
    color: "#ff9b9b",
  },
  message: {
    margin: 0,
    fontSize: "12px",
    lineHeight: 1.6,
    color: "var(--accent)",
  },
  button: {
    marginTop: "8px",
    minHeight: "46px",
    padding: "12px 16px",
    background: "var(--accent)",
    border: "1px solid var(--accent)",
    borderRadius: "4px",
    color: "var(--bg)",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "1px",
    cursor: "pointer",
  },
  footer: {
    marginTop: "24px",
    fontSize: "12px",
    color: "var(--text-muted)",
  },
  link: { color: "var(--accent)" },
};

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState("en");
  const t = translations[lang] || translations.en;

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

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    const supabase = createClient();
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(t.authSignupError);
      setLoading(false);
      return;
    }

    if (data.session) {
      window.location.assign("/");
      return;
    }

    setMessage(t.authConfirmEmail);
    setLoading(false);
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <div style={styles.langRow}>
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
        </div>
        <p style={styles.kicker}>
          <span style={styles.dot} /> {t.authKicker}
        </p>
        <h1 style={styles.title}>{t.authSignupTitle}</h1>
        <p style={styles.sub}>{t.authSignupSub}</p>

        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label style={styles.label} htmlFor="signup-email">
              {t.authEmail}
            </label>
            <input
              id="signup-email"
              style={styles.input}
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label} htmlFor="signup-password">
              {t.authPassword}
            </label>
            <input
              id="signup-password"
              style={styles.input}
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          {error ? (
            <p style={styles.error} role="alert">
              {error}
            </p>
          ) : null}

          {message ? (
            <p style={styles.message} role="status">
              {message}
            </p>
          ) : null}

          <button style={styles.button} type="submit" disabled={loading}>
            {loading ? t.authSignupBusy : t.authSignupBtn}
          </button>
        </form>

        <p style={styles.footer}>
          {t.authHaveAccount}{" "}
          <a style={styles.link} href="/login">
            {t.authLoginLink}
          </a>
        </p>
      </div>
    </main>
  );
}
