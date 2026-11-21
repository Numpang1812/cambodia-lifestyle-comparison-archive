"use client";

import { useEffect, useState } from "react";
import { createClient } from "../lib/supabase/client";
import MyEntriesCard from "../../components/MyEntriesCard";
import ContributeLoginPrompt from "../../components/ContributeLoginPrompt";
import styles from "../contribute/contribute.module.css";
import collection from "../../collection.config.js";

export default function MyEntriesPage() {
  const [user, setUser] = useState(null);
  const [lang, setLang] = useState("en");
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);
  const [entries, setEntries] = useState([]);
  const [loadError, setLoadError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cambodia_lifestyle_lang");
      if (saved === "km" || saved === "en") setLang(saved);
    } catch (_) {}
  }, []);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setAuthError(false);
    setLoadError(false);
    setEntries([]);

    async function init() {
      let supabase;
      try {
        supabase = createClient();
      } catch (err) {
        console.error("My entries client setup failed:", err);
        if (active) {
          setAuthError(true);
          setLoading(false);
        }
        return;
      }

      let authUser = null;
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error && error.name !== "AuthSessionMissingError") throw error;
        authUser = error ? null : (data?.user ?? null);
      } catch (err) {
        if (err?.name !== "AuthSessionMissingError") {
          console.error("My entries sign-in check failed:", err);
          if (active) {
            setAuthError(true);
            setLoading(false);
          }
          return;
        }
        authUser = null;
      }

      if (!active) return;
      setUser(authUser);
      if (!authUser) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("entries")
          .select("*")
          .eq("owner", authUser.id)
          .order("created_at", { ascending: false });
        if (error) throw error;
        if (active) setEntries(data || []);
      } catch (err) {
        console.error("Reading My entries failed:", err);
        if (active) setLoadError(true);
      } finally {
        if (active) setLoading(false);
      }
    }

    init();
    return () => {
      active = false;
    };
  }, [attempt]);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <a href="/" className={styles.backLink}>
          ← BACK TO ARCHIVE
        </a>
        <div className={styles.header}>
          <p className={styles.kicker}>
            <span className={styles.dot} /> {collection.name.toUpperCase()} ARCHIVE
          </p>
          <h1 className={styles.title}>My Entries (ការចូលរួមរបស់ខ្ញុំ)</h1>
          <p className={styles.sub}>
            តាមដានរឿងរ៉ាវ ការសង្កេតវប្បធម៌ និងស្ថានភាពនៃការពិនិត្យការចូលរួមរបស់អ្នក។
            <br />
            <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
              Track your contributed stories, cultural observations, and review statuses.
            </span>
          </p>
        </div>

        {loading ? (
          <div className={styles.card}>
            <p className={styles.sub}>កំពុងផ្ទុកការចូលរួម... / Loading entries...</p>
          </div>
        ) : authError ? (
          <div
            className={styles.card}
            role="alert"
            style={{ textAlign: "center", padding: "40px 20px" }}
          >
            <p style={{ margin: "0 0 8px 0", fontWeight: 600, color: "var(--accent)" }}>
              Could not check your sign-in
            </p>
            <p style={{ margin: "0 0 16px 0", color: "var(--text-muted)", fontSize: "13px" }}>
              Your session may have expired. Retry, or log in again.
            </p>
            <button
              type="button"
              className={styles.submitBtn}
              onClick={() => setAttempt((count) => count + 1)}
            >
              RETRY (ព្យាយាមម្តងទៀត)
            </button>
          </div>
        ) : !user ? (
          <ContributeLoginPrompt />
        ) : loadError ? (
          <div
            className={styles.card}
            role="alert"
            style={{ textAlign: "center", padding: "40px 20px" }}
          >
            <p style={{ margin: "0 0 8px 0", fontWeight: 600, color: "var(--accent)" }}>
              Could not load your entries
            </p>
            <p style={{ margin: "0 0 16px 0", color: "var(--text-muted)", fontSize: "13px" }}>
              Check your connection, then retry.
            </p>
            <button
              type="button"
              className={styles.submitBtn}
              onClick={() => setAttempt((count) => count + 1)}
            >
              RETRY (ព្យាយាមម្តងទៀត)
            </button>
          </div>
        ) : entries.length === 0 ? (
          <div className={styles.card} style={{ textAlign: "center", padding: "40px 20px" }}>
            <p style={{ margin: "0 0 6px 0", color: "var(--text)" }}>
              មិនទាន់មានការចូលរួមនៅឡើយទេ។ ចែករំលែកការសង្កេតវប្បធម៌ដំបូងរបស់អ្នកទៅកាន់បណ្ណសារ!
            </p>
            <p style={{ margin: "0 0 16px 0", color: "var(--text-muted)", fontSize: "13px" }}>
              No contributions yet. Add your first cultural observation to the archive!
            </p>
            <a
              href="/contribute"
              className={styles.submitBtn}
              style={{ textDecoration: "none", display: "inline-block" }}
            >
              + CONTRIBUTE AN ENTRY (ចូលរួមចំណែក)
            </a>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {entries.map((entry) => (
                <MyEntriesCard key={entry.id} entry={entry} lang={lang} />
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
              <a
                href="/contribute"
                className={styles.submitBtn}
                style={{ textDecoration: "none", display: "inline-block" }}
              >
                + CONTRIBUTE AN ENTRY (ចូលរួមចំណែក)
              </a>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
