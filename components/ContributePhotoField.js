"use client";

import { useRef } from "react";
import styles from "../app/contribute/contribute.module.css";

export default function ContributePhotoField({
  id,
  file,
  previewUrl,
  onChange,
  error,
  disabled = false,
}) {
  const inputRef = useRef(null);
  const sizeMb = file?.size ? (file.size / (1024 * 1024)).toFixed(1) + " MB" : "";

  return (
    <div className={styles.field}>
      <div className={styles.labelRow}>
        <label htmlFor={id} className={styles.label}>
          PHOTO <span className={styles.requiredStar}>*</span>
        </label>
        {error && <span className={styles.fieldError} role="alert">{error}</span>}
      </div>

      <input
        id={id}
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className={styles.hiddenFileInput}
        onChange={onChange}
        disabled={disabled}
      />

      <div
        className={`${styles.uploadZone} ${error ? styles.inputError : ""}`}
        onClick={() => !disabled && inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => !disabled && (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
      >
        {previewUrl ? (
          <div className={styles.previewContainer}>
            <img src={previewUrl} alt="Upload preview" className={styles.previewImage} />
            <div className={styles.previewMeta}>
              <span className={styles.previewName}>{file?.name}</span>
              <span className={styles.previewSize}>{sizeMb}</span>
              <span className={styles.changeBtn}>Click to change photo</span>
            </div>
          </div>
        ) : (
          <div className={styles.uploadPrompt}>
            <div className={styles.uploadIconBadge}>
              <span aria-hidden="true">⇪</span>
            </div>
            <div className={styles.uploadText}>
              <span className={styles.uploadAction}>Choose Archive Photo</span>
              <span className={styles.hint}>JPEG, JPG, PNG, or WEBP (Max 5MB)</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
