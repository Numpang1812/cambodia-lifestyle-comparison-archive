"use client";

import styles from "../app/contribute/contribute.module.css";

export default function ContributeTextField({
  id,
  label,
  value,
  onChange,
  error,
  placeholder,
  multiline = false,
  required = false,
  hint,
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

      {multiline ? (
        <textarea
          id={id}
          className={`${styles.textarea} ${error ? styles.inputError : ""}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
        />
      ) : (
        <input
          id={id}
          type="text"
          className={`${styles.input} ${error ? styles.inputError : ""}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
      {hint && !error && <span className={styles.hint}>{hint}</span>}
    </div>
  );
}
