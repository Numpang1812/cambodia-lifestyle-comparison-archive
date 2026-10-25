"use client";

import { useEffect, useState } from "react";
import { createClient } from "../lib/supabase/client";
import MyEntriesCard from "../../components/MyEntriesCard";
import ContributeLoginPrompt from "../../components/ContributeLoginPrompt";
import styles from "../contribute/contribute.module.css";

export default function MyEntriesPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const supabase = createClient();
    async function init() {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      setUser(authUser ?? null);

      if (authUser) {
        const { data, error } = await supabase
          .from("entries")
          .select("*")
          .eq("owner", authUser.id)
          .order("created_at", { ascending: false });

        if (!error && data) {
          setEntries(data);
        }
      }
      setLoading(false);
    }
    init();
  }, []);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <a href="/" className={styles.backLink}>← BACK TO ARCHIVE</a>
        <div className={styles.header}>
          <p className={styles.kicker}>
            <span className={styles.dot} /> KHMER LIVING ARCHIVE
          </p>
          <h1 className={styles.title}>My Entries (ការចូលរួមរបស់ខ្ញុំ)</h1>
          <p className={styles.sub}>
            Track your contributed stories, cultural observations, and review statuses.
          </p>
        </div>

        {loading ? (
          <div className={styles.card}>
            <p className={styles.sub}>Loading entries...</p>
          </div>
        ) : !user ? (
          <ContributeLoginPrompt />
        ) : entries.length === 0 ? (
          <div className={styles.card} style={{ textAlign: "center", padding: "40px 20px" }}>
            <p style={{ margin: "0 0 16px 0", color: "var(--text-muted)" }}>
              No contributions yet. Add your first cultural observation to the archive!
            </p>
            <a href="/contribute" className={styles.submitBtn} style={{ textDecoration: "none", display: "inline-block" }}>
              + CONTRIBUTE AN ENTRY
            </a>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {entries.map((entry) => (
              <MyEntriesCard key={entry.id} entry={entry} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
