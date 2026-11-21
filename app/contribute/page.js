"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "../lib/supabase/client";
import { fetchEntryById, fetchEntries, normalizeEntries } from "../lib/supabase/entries";
import { translations } from "../lib/translations";
import ContributeForm from "../../components/ContributeForm";
import ContributeLoginPrompt from "../../components/ContributeLoginPrompt";
import AddEraCard from "../../components/AddEraCard";
import styles from "./contribute.module.css";

function choiceStyle(active) {
  return {
    flex: "1 1 200px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    padding: "16px 18px",
    border: `1px solid ${active ? "var(--accent)" : "var(--border)"}`,
    background: active ? "var(--accent-soft)" : "transparent",
    borderRadius: "6px",
    textDecoration: "none",
    color: "var(--text)",
    transition: "border-color 0.2s ease, background 0.2s ease",
  };
}

function ContributeContent() {
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const addEra = searchParams.get("addEra"); // "pick" | <slug>

  const [lang, setLang] = useState("en");
  const t = translations[lang] || translations.en;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [entryData, setEntryData] = useState(null);
  const [editError, setEditError] = useState("");
  const [loadingEntry, setLoadingEntry] = useState(Boolean(editId || addEra));
  const [singleEraCards, setSingleEraCards] = useState([]);
  const [pair, setPair] = useState(null); // { slug, era, topic }

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cambodia_lifestyle_lang");
      if (saved === "km" || saved === "en") setLang(saved);
    } catch (_) {}
  }, []);

  useEffect(() => {
    const supabase = createClient();
    async function init() {
      try {
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser();
        setUser(authUser ?? null);

        if (editId) {
          if (!authUser) {
            setEditError("Please log in to edit your entry.");
            setLoadingEntry(false);
            return;
          }

          const row = await fetchEntryById(supabase, editId);
          if (!row) {
            setEditError("Archive entry not found.");
          } else if (row.owner !== authUser.id) {
            setEditError("You can only edit entries that you created.");
          } else {
            setEntryData(row);
          }
          setLoadingEntry(false);
        } else if (addEra === "pick") {
          const cards = await fetchEntries(supabase);
          setSingleEraCards(cards.filter((c) => Boolean(c.heritage) !== Boolean(c.modern)));
          setLoadingEntry(false);
        } else if (addEra !== null) {
          const { data, error } = await supabase
            .from("entries")
            .select("id,slug,timeline,topic")
            .eq("slug", addEra)
            .eq("status", "published")
            .limit(2);
          if (addEra && !error && data?.length === 1) {
            const [card] = normalizeEntries(data);
            setPair({
              slug: card.slug,
              era: card.heritage ? "modern" : "heritage",
              topic: card.topic,
            });
          } else {
            setPair(null);
          }
          setLoadingEntry(false);
        }
      } catch (err) {
        console.error("Auth / entry fetch check failed:", err);
        setUser(null);
        setPair(null);
        setLoadingEntry(false);
      } finally {
        setLoading(false);
      }
    }

    init();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => authListener.subscription.unsubscribe();
  }, [editId, addEra]);

  const isEdit = Boolean(editId);
  const isPick = addEra === "pick";
  const isAddEra = addEra !== null;
  const eraLabel = pair?.era === "heritage" ? t.eraPastDecade : t.eraPresentDecade;

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <a href={isPick || (isAddEra && !editId) ? "/contribute" : "/"} className={styles.backLink}>
          ← {isAddEra && !editId ? "BACK" : "BACK TO ARCHIVE"}
        </a>

        <div className={styles.header}>
          <p className={styles.kicker}>
            <span className={styles.dot} /> KHMER LIVING ARCHIVE
          </p>
          <h1 className={styles.title}>
            {isEdit ? "Edit Archive Entry" : isAddEra ? t.addEraTitle : "Contribute an Entry"}
          </h1>
          <p className={styles.sub}>
            {isEdit
              ? "Update cultural observation, timeline, or photo. Published edits return to review."
              : isAddEra
                ? t.addEraSub
                : "Add a real cultural observation, living memory, or lifestyle artifact to the archive. All fields are reviewed and preserved."}
          </p>
        </div>

        {!isEdit ? (
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "20px" }}>
            <a href="/contribute" style={choiceStyle(!isAddEra)} aria-current={!isAddEra}>
              <span aria-hidden="true" style={{ fontSize: "18px" }}>
                ✎
              </span>
              <span style={{ fontWeight: 600 }}>{t.newStoryTab}</span>
              <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{t.newStoryDesc}</span>
            </a>
            <a href="/contribute?addEra=pick" style={choiceStyle(isAddEra)} aria-current={isAddEra}>
              <span aria-hidden="true" style={{ fontSize: "18px" }}>
                ⇄
              </span>
              <span style={{ fontWeight: 600 }}>{t.addEraTab}</span>
              <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                {t.addEraTabDesc}
              </span>
            </a>
          </div>
        ) : null}

        {loading || loadingEntry ? (
          <div className={styles.card}>
            <p className={styles.sub}>
              {loadingEntry ? "Loading entry details..." : "Verifying contributor credentials..."}
            </p>
          </div>
        ) : editError || (isEdit && isAddEra) || (isAddEra && !isPick && pair?.slug !== addEra) ? (
          <div className={styles.card}>
            <p className={styles.fieldError} style={{ margin: "0 0 16px 0", fontSize: "14px" }}>
              {editError || "Choose a published story with exactly one era."}
            </p>
            <a
              href="/"
              className={styles.submitBtn}
              style={{ display: "inline-block", textAlign: "center", textDecoration: "none" }}
            >
              Return to Archive
            </a>
          </div>
        ) : isPick ? (
          <div className={styles.card}>
            {singleEraCards.length === 0 ? (
              <p className={styles.sub} style={{ margin: 0 }}>
                {t.addEraNone}
              </p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {singleEraCards.map((c) => (
                  <AddEraCard key={c.slug} card={c} t={t} />
                ))}
              </div>
            )}
          </div>
        ) : isAddEra && pair ? (
          <>
            <div
              className={styles.card}
              style={{
                marginBottom: "16px",
                borderLeft: `3px solid ${pair.era === "heritage" ? "#e07b39" : "#4ea87a"}`,
              }}
            >
              <p className={styles.sub} style={{ margin: 0 }}>
                {t.addEraBanner(eraLabel, pair.topic[lang])} (
                {pair.era === "heritage" ? "1800–1999" : "2000–2099"})
              </p>
            </div>
            <div className={styles.card}>
              {user ? (
                <ContributeForm
                  user={user}
                  initialData={{ topic: [pair.topic.en, pair.topic.km] }}
                  pairSlug={pair.slug}
                  key={`pair-${pair.slug}-${pair.era}`}
                />
              ) : (
                <ContributeLoginPrompt />
              )}
            </div>
          </>
        ) : (
          <div className={styles.card}>
            {user ? (
              <ContributeForm user={user} initialData={entryData} key={entryData?.id || "new"} />
            ) : (
              <ContributeLoginPrompt />
            )}
          </div>
        )}
      </div>
    </main>
  );
}

export default function ContributePage() {
  return (
    <Suspense
      fallback={<div style={{ padding: "40px", color: "var(--text-muted)" }}>Loading...</div>}
    >
      <ContributeContent />
    </Suspense>
  );
}
