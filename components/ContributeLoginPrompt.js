"use client";

import styles from "../app/contribute/contribute.module.css";

export default function ContributeLoginPrompt() {
  return (
    <div className={styles.promptCard}>
      <p className={styles.kicker}>
        <span className={styles.dot} /> KHMER LIVING ARCHIVE
      </p>
      <h2 className={styles.title}>Contributor Sign In Required</h2>
      <p className={styles.sub}>
        Only registered contributors can submit archive entries. Please log in
        with your account to continue.
      </p>
      <a href="/login" className={styles.submitBtn} style={{ textAlign: "center", textDecoration: "none" }}>
        Log in to Contribute
      </a>
      <p className={styles.hint}>
        Need an account? <a href="/signup" className={styles.link}>Sign up here</a>
      </p>
    </div>
  );
}
