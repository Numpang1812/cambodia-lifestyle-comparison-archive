"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "../lib/supabase/client";
import { fetchEntryById } from "../lib/supabase/entries";
import ContributeForm from "../../components/ContributeForm";
import ContributeLoginPrompt from "../../components/ContributeLoginPrompt";
import styles from "./contribute.module.css";

function ContributeContent() {
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [entryData, setEntryData] = useState(null);
  const [editError, setEditError] = useState("");
  const [loadingEntry, setLoadingEntry] = useState(Boolean(editId));

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
        }
      } catch (err) {
        console.error("Auth / entry fetch check failed:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    init();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => authListener.subscription.unsubscribe();
  }, [editId]);

  const isEdit = Boolean(editId);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <a href={editId ? `/?entry=${editId}` : "/"} className={styles.backLink}>
          ← BACK TO ARCHIVE
        </a>

        <div className={styles.header}>
          <p className={styles.kicker}>
            <span className={styles.dot} /> KHMER LIVING ARCHIVE
          </p>
          <h1 className={styles.title}>
            {isEdit ? "Edit Archive Entry" : "Contribute an Entry"}
          </h1>
          <p className={styles.sub}>
            {isEdit
              ? "Update cultural observation, timeline, or photo. Changes are preserved directly in the archive."
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
            <a href="/" className={styles.submitBtn} style={{ display: "inline-block", textAlign: "center", textDecoration: "none" }}>
              Return to Archive
            </a>
          </div>
        ) : user ? (
          <div className={styles.card}>
            <ContributeForm
              user={user}
              initialData={entryData}
              key={entryData?.id || "new"}
            />
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
    <Suspense fallback={<div style={{ padding: "40px", color: "var(--text-muted)" }}>Loading...</div>}>
      <ContributeContent />
    </Suspense>
  );
}

