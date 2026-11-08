"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "../lib/supabase/client";
import { fetchEntryById, fetchEntries } from "../lib/supabase/entries";
import { translations } from "../lib/translations";
import ContributeForm from "../../components/ContributeForm";
import ContributeLoginPrompt from "../../components/ContributeLoginPrompt";
import styles from "./contribute.module.css";

function ContributeContent() {
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const addEra = searchParams.get("addEra"); // "pick" | <slug>
  const eraParam = searchParams.get("era"); // "heritage" | "modern"

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
        } else if (addEra) {
          const cards = await fetchEntries(supabase);
          const card = cards.find((c) => c.slug === addEra);
          if (card) {
            setPair({
              slug: card.slug,
              era: eraParam === "heritage" ? "heritage" : "modern",
              topic: card.topic,
            });
            setEntryData({ topic: [card.topic.en, card.topic.km] });
          } else {
            setEditError("Story not found.");
          }
          setLoadingEntry(false);
        }
      } catch (err) {
        console.error("Auth / entry fetch check failed:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    init();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => authListener.subscription.unsubscribe();
  }, [editId, addEra, eraParam]);

  const isEdit = Boolean(editId);
  const isPick = addEra === "pick";
  const isAddEra = Boolean(addEra) && !isPick;
  const eraLabel = pair?.era === "heritage" ? t.eraPastDecade : t.eraPresentDecade;

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <a href={isPick || isAddEra ? "/contribute?addEra=pick" : "/"} className={styles.backLink}>
          ← {isPick || isAddEra ? "BACK TO OPTIONS" : "BACK TO ARCHIVE"}
        </a>

        <div className={styles.header}>
          <p className={styles.kicker}>
            <span className={styles.dot} /> KHMER LIVING ARCHIVE
          </p>
          <h1 className={styles.title}>
            {isPick ? t.addEraTitle : isEdit ? "Edit Archive Entry" : "Contribute an Entry"}
          </h1>
          <p className={styles.sub}>
            {isPick
              ? t.addEraSub
              : isEdit
                ? "Update cultural observation, timeline, or photo. Published edits return to review."
                : "Add a real cultural observation, living memory, or lifestyle artifact to the archive. All fields are reviewed and preserved."}
          </p>
        </div>

        {loading || loadingEntry ? (
          <div className={styles.card}>
            <p className={styles.sub}>
              {loadingEntry ? "Loading entry details..." : "Verifying contributor credentials..."}
            </p>
          </div>
        ) : editError ? (
          <div className={styles.card}>
            <p className={styles.fieldError} style={{ margin: "0 0 16px 0", fontSize: "14px" }}>
              {editError}
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
                {singleEraCards.map((c) => {
                  const missing = c.heritage ? "modern" : "heritage";
                  return (
                    <a
                      key={c.slug}
                      href={`/contribute?addEra=${encodeURIComponent(c.slug)}&era=${missing}`}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "12px",
                        padding: "12px 16px",
                        border: "1px solid var(--border)",
                        borderRadius: "4px",
                        textDecoration: "none",
                        color: "var(--text)",
                      }}
                    >
                      <span>{c.topic.en}</span>
                      <span
                        style={{
                          font: "11px var(--font-mono)",
                          color: missing === "heritage" ? "#e07b39" : "#4ea87a",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {missing === "heritage" ? t.addEraMissingPast : t.addEraMissingModern}
                      </span>
                    </a>
                  );
                })}
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
                {t.addEraBanner(eraLabel, pair.topic.en)}
              </p>
            </div>
            <div className={styles.card}>
              {user ? (
                <ContributeForm
                  user={user}
                  initialData={entryData}
                  pairSlug={pair.slug}
                  key={`pair-${pair.slug}-${pair.era}`}
                />
              ) : (
                <ContributeLoginPrompt />
              )}
            </div>
          </>
        ) : user ? (
          <div className={styles.card}>
            <ContributeForm user={user} initialData={entryData} key={entryData?.id || "new"} />
            <a
              href="/contribute?addEra=pick"
              className={styles.submitBtn}
              style={{
                display: "inline-block",
                textAlign: "center",
                textDecoration: "none",
                marginTop: "12px",
              }}
            >
              {t.addEraCta}
            </a>
          </div>
        ) : (
          <ContributeLoginPrompt />
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
