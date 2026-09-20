"use client";

import { useState } from "react";
import { createClient } from "../lib/supabase/client";

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
    outline: "none",
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

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }

    window.location.assign("/");
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <p style={styles.kicker}>
          <span style={styles.dot} /> KHMER LIVING ARCHIVE
        </p>
        <h1 style={styles.title}>Log in</h1>
        <p style={styles.sub}>Return to the archive with your email and password.</p>

        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label style={styles.label} htmlFor="login-email">
              EMAIL
            </label>
            <input
              id="login-email"
              style={styles.input}
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label} htmlFor="login-password">
              PASSWORD
            </label>
            <input
              id="login-password"
              style={styles.input}
              type="password"
              autoComplete="current-password"
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

          <button style={styles.button} type="submit" disabled={loading}>
            {loading ? "LOGGING IN..." : "LOG IN"}
          </button>
        </form>

        <p style={styles.footer}>
          No account?{" "}
          <a style={styles.link} href="/signup">
            Sign up
          </a>
        </p>
      </div>
    </main>
  );
}
