"use client";

import styles from "../app/contribute/contribute.module.css";
import { VALID_TOPICS } from "../app/lib/contribute-validation";

export default function ContributeSelectField({
  id,
  label,
  value,
  onChange,
  error,
  required = false,
}) {
  return (
    <div className={styles.field}>
      <div className={styles.labelRow}>
        <label htmlFor={id} className={styles.label}>
          {label} {required && <span className={styles.requiredStar}>*</span>}
        </label>
        {error ? (
          <span className={styles.fieldError} role="alert">
            {error}
          </span>
        ) : null}
      </div>

      <select
        id={id}
        className={`${styles.select} ${error ? styles.inputError : ""}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">-- Choose one of the 5 topics --</option>
        {VALID_TOPICS.map((topic) => (
          <option key={topic} value={topic}>
            {topic}
          </option>
        ))}
      </select>
    </div>
  );
}
