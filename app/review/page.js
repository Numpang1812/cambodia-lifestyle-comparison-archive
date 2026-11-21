"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "../lib/supabase/client";
import { translations } from "../lib/translations";
import ReviewCard from "../../components/ReviewCard";
import styles from "../contribute/contribute.module.css";

export default function ReviewPage() {
  const [lang, setLang] = useState("en");
  const t = translations[lang] || translations.en;
  const statusText =
    lang === "km"
      ? { approved: "បានអនុម័ត", returned: "បានប្រគល់ត្រឡប់", retry: "ព្យាយាមម្ដងទៀត" }
      : { approved: "Approved", returned: "Returned", retry: "Retry" };
  const [status, setStatus] = useState("loading");
  const [entries, setEntries] = useState([]);
  const [userId, setUserId] = useState(null);
  const [busyId, setBusyId] = useState(null);
  const [notice, setNotice] = useState(null);
  const lockRef = useRef(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cambodia_lifestyle_lang");
      if (saved === "km" || saved === "en") setLang(saved);
    } catch (_) {}
  }, []);

  useEffect(() => {
    async function init() {
      let supabase = null;
      let user = null;
      try {
        supabase = createClient();
        const { data, error } = await supabase.auth.getUser();
        user = data?.user || null;
        if (error || !user) {
          setStatus("noaccess");
          return;
        }
        const { data: flag, error: flagError } = await supabase.rpc("is_reviewer");
        if (flagError || flag !== true) {
          setStatus("noaccess");
          return;
        }
      } catch (err) {
        console.error("Review access check failed:", err);
        setStatus("noaccess");
        return;
      }
      setUserId(user.id);
      try {
        const { data, error } = await supabase
          .from("entries")
          .select("*")
          .eq("status", "pending")
          .order("created_at", { ascending: false });
        if (error) {
          console.error("Review queue load failed:", error);
          setEntries([]);
          setStatus("error");
          return;
        }
        setEntries(data || []);
        setStatus("ready");
      } catch (err) {
        console.error("Review queue load failed:", err);
        setEntries([]);
        setStatus("error");
      }
    }
    init();
  }, []);

  async function handleDecide(entry, decision) {
    if (lockRef.current) return;
    lockRef.current = true;
    setBusyId(entry.id);
    setNotice(null);
    try {
      const supabase = createClient();
      const { data, error } = await supabase.rpc("review_entry", {
        entry_id: entry.id,
        decision,
      });
      if (error) throw error;
      if (data === true) {
        setEntries((prev) => prev.filter((e) => e.id !== entry.id));
        setNotice({
          kind: "success",
          text: `✓ ${decision === "published" ? statusText.approved : statusText.returned}`,
        });
        return;
      }
      if (data === false) {
        const { data: row, error: statusError } = await supabase
          .from("entries")
          .select("status")
          .eq("id", entry.id)
          .maybeSingle();
        const settled = row?.status;
        if (!statusError && (settled === "published" || settled === "returned")) {
          setEntries((prev) => prev.filter((e) => e.id !== entry.id));
          setNotice({
            kind: "conflict",
            text: settled === "published" ? t.reviewAlreadyApproved : t.reviewAlreadyRejected,
          });
        } else {
          setNotice({ kind: "error", text: t.reviewError });
        }
        return;
      }
      setNotice({ kind: "error", text: t.reviewError });
    } catch (err) {
      console.error("review_entry failed:", err);
      setNotice({ kind: "error", text: t.reviewError });
    } finally {
      setBusyId(null);
      lockRef.current = false;
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
            <p className={styles.sub} style={{ margin: 0 }}>
              {t.reviewEmpty}
            </p>
          </div>
        ) : (
          list.map((entry) => (
            <ReviewCard
              key={entry.id}
              entry={entry}
              t={t}
              lang={lang}
              busy={busyId === entry.id}
              locked={busyId !== null}
              onDecide={handleDecide}
            />
          ))
        )}
      </section>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <a href="/" className={styles.backLink}>
          ← BACK TO ARCHIVE
        </a>
        <div className={styles.header}>
          <p className={styles.kicker}>
            <span className={styles.dot} /> {translations.en.brand}
          </p>
          <h1 className={styles.title}>{t.reviewTitle}</h1>
          <p className={styles.sub}>{t.reviewSub}</p>
        </div>

        {notice ? (
          <div
            className={styles.card}
            role={notice.kind === "error" ? "alert" : "status"}
            style={{ marginBottom: "16px" }}
          >
            <p
              style={{
                margin: 0,
                color:
                  notice.kind === "error"
                    ? "var(--accent)"
                    : notice.kind === "success"
                      ? "#22c55e"
                      : "#eab308",
              }}
            >
              {notice.text}
            </p>
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
        ) : status === "error" ? (
          <div className={styles.card} role="alert">
            <p style={{ margin: "0 0 12px 0", color: "var(--accent)" }}>{t.reviewError}</p>
            <button
              type="button"
              className={styles.submitBtn}
              onClick={() => window.location.reload()}
            >
              {statusText.retry}
            </button>
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
