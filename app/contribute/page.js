"use client";

import { useEffect, useState } from "react";
import { createClient } from "../lib/supabase/client";
import ContributeForm from "../../components/ContributeForm";
import ContributeLoginPrompt from "../../components/ContributeLoginPrompt";
import styles from "./contribute.module.css";

export default function ContributePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    async function checkAuth() {
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        setUser(authUser ?? null);
      } catch (err) {
        console.error("Auth check failed:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => authListener.subscription.unsubscribe();
  }, []);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <a href="/" className={styles.backLink}>
          ← BACK TO ARCHIVE
        </a>

        <div className={styles.header}>
          <p className={styles.kicker}>
            <span className={styles.dot} /> KHMER LIVING ARCHIVE
          </p>
          <h1 className={styles.title}>Contribute an Entry</h1>
          <p className={styles.sub}>
            Add a real cultural observation, living memory, or lifestyle artifact to
            the archive. All fields are reviewed and preserved.
          </p>
        </div>

        {loading ? (
          <div className={styles.card}>
            <p className={styles.sub}>Verifying contributor credentials...</p>
          </div>
        ) : user ? (
          <div className={styles.card}>
            <ContributeForm user={user} />
          </div>
        ) : (
          <ContributeLoginPrompt />
        )}
      </div>
    </main>
  );
}
