"use client";

import { useEffect, useState } from "react";
import { createClient } from "../lib/supabase/client";
import { translations } from "../lib/translations";
import ReviewCard from "../../components/ReviewCard";
import styles from "../contribute/contribute.module.css";

export default function ReviewPage() {
  const [lang, setLang] = useState("en");
  const t = translations[lang] || translations.en;
  const [status, setStatus] = useState("loading");
  const [entries, setEntries] = useState([]);
  const [userId, setUserId] = useState(null);
  const [busyId, setBusyId] = useState(null);
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cambodia_lifestyle_lang");
      if (saved === "km" || saved === "en") setLang(saved);
    } catch (_) {}
  }, []);

  useEffect(() => {
    const supabase = createClient();
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setStatus("noaccess");
        return;
      }
      const { data: flag } = await supabase.rpc("is_reviewer");
      if (flag !== true) {
        setStatus("noaccess");
        return;
      }
      setUserId(user.id);
      const { data, error } = await supabase
        .from("entries")
        .select("*")
        .neq("status", "published")
        .order("created_at", { ascending: false });
      if (error) {
        console.error("Review queue load failed:", error);
        setEntries([]);
      } else {
        setEntries(data || []);
      }
      setStatus("ready");
    }
    init();
  }, []);

  async function handleDecide(entry, decision) {
    const supabase = createClient();
    setBusyId(entry.id);
    setNotice(null);
    try {
      const { data, error } = await supabase.rpc("review_entry", {
        entry_id: entry.id,
        decision,
      });
      if (error || data === false) throw error || new Error("not saved");
      setEntries((prev) => prev.filter((e) => e.id !== entry.id));
    } catch (err) {
      console.error("review_entry failed:", err);
      setNotice(t.reviewError);
    } finally {
      setBusyId(null);
    }
  }

  const mine = entries.filter((e) => e.owner === userId);
  const others = entries.filter((e) => e.owner !== userId);

  function renderSection(label, list) {
    return (
      <section style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <h2 className={styles.sub} style={{ margin: 0, fontWeight: 600, color: "var(--text)" }}>
          {label} ({list.length})
        </h2>
        {list.length === 0 ? (
          <div className={styles.card}>
            <p className={styles.sub} style={{ margin: 0 }}>{t.reviewEmpty}</p>
          </div>
        ) : (
          list.map((entry) => (
            <ReviewCard key={entry.id} entry={entry} t={t} busy={busyId === entry.id} onDecide={handleDecide} />
          ))
        )}
      </section>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <a href="/" className={styles.backLink}>← BACK TO ARCHIVE</a>
        <div className={styles.header}>
          <p className={styles.kicker}>
            <span className={styles.dot} /> {translations.en.brand}
          </p>
          <h1 className={styles.title}>{t.reviewTitle}</h1>
          <p className={styles.sub}>{t.reviewSub}</p>
        </div>

        {notice ? (
          <div className={styles.card} role="alert" style={{ marginBottom: "16px" }}>
            <p style={{ margin: 0, color: "var(--accent)" }}>{notice}</p>
          </div>
        ) : null}

        {status === "loading" ? (
          <div className={styles.card}>
            <p className={styles.sub}>{t.reviewBusy}</p>
          </div>
        ) : status === "noaccess" ? (
          <div className={styles.card} role="alert">
            <p style={{ margin: 0, color: "var(--accent)" }}>{t.reviewNoAccess}</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {renderSection(t.reviewMine, mine)}
            {renderSection(t.reviewOthers, others)}
          </div>
        )}
      </div>
    </main>
  );
}
