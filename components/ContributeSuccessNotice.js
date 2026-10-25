"use client";

import styles from "../app/contribute/contribute.module.css";

export default function ContributeSuccessNotice() {
  return (
    <div
      role="status"
      style={{
        padding: "32px 24px",
        textAlign: "center",
        border: "1px solid var(--border)",
        borderRadius: "var(--card-radius, 8px)",
        background: "rgba(255, 255, 255, 0.03)",
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          margin: "0 auto 16px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(34, 197, 94, 0.15)",
          color: "#22c55e",
          fontSize: "24px",
        }}
      >
        ✓
      </div>
      <h2
        style={{
          fontSize: "18px",
          letterSpacing: "0.04em",
          margin: "0 0 10px 0",
          color: "var(--accent, #d4a373)",
        }}
      >
        ការចូលរួមត្រូវបានបញ្ជូន / Entry Submitted
      </h2>
      <p
        style={{
          margin: "0 0 12px 0",
          lineHeight: "1.6",
          fontSize: "14px",
          color: "var(--text)",
        }}
      >
        ការចូលរួមរបស់អ្នកត្រូវបានបញ្ជូនរួចរាល់ហើយកំពុងរង់ចាំការពិនិត្យពីអ្នកគ្រប់គ្រងបណ្ណសារ។ អ្នកអាចតាមដានស្ថានភាពក្នុងទំព័រ &quot;ការចូលរួមរបស់ខ្ញុំ&quot;។
      </p>
      <p
        style={{
          margin: "0 0 24px 0",
          lineHeight: "1.6",
          fontSize: "13px",
          color: "var(--text-muted)",
        }}
      >
        Your entry has been submitted and is waiting for review. It will appear in the archive once approved. You can track its status in My Entries.
      </p>
      <div
        style={{
          display: "flex",
          gap: "12px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <a
          href="/my-entries"
          className={styles.submitBtn}
          style={{ textDecoration: "none", display: "inline-block" }}
        >
          VIEW MY ENTRIES (ការចូលរួមរបស់ខ្ញុំ)
        </a>
        <a
          href="/"
          className={styles.backLink}
          style={{ display: "inline-flex", alignItems: "center" }}
        >
          ← BACK TO ARCHIVE
        </a>
      </div>
    </div>
  );
}
