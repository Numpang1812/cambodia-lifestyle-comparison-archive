"use client";

import { useRef } from "react";
import styles from "../app/contribute/contribute.module.css";
import { VALID_TOPICS } from "../app/lib/contribute-validation";
import StoryIllustration from "../app/components/StoryIllustration";

export default function ContributeSelectField({
  id,
  label,
  value,
  onChange,
  error,
  required = false,
  era,
  design,
  storyTopic,
}) {
  const gallery = useRef(null);
  if (id === "artwork") {
    const previewTopic = storyTopic || value || VALID_TOPICS[0];
    const designs = [1, 2, 3];
    return (
      <fieldset style={{ minWidth: 0, margin: 0, padding: 0, border: 0 }}>
        <legend className={styles.label}>{label}</legend>
        {error && (
          <p className={styles.fieldError} role="alert">
            {error}
          </p>
        )}
        <div
          className={styles.printGrid}
          style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}
        >
          {designs.map((print) => {
            const selected = value === previewTopic && design === print;
            return (
              <button
                key={print}
                type="button"
                className={styles.printChoice}
                style={{ padding: 0 }}
                aria-label={`${previewTopic}, design ${print}`}
                aria-pressed={selected}
                onClick={() => onChange(previewTopic, print)}
              >
                <span className={styles.printImage} data-era={era} aria-hidden="true">
                  <StoryIllustration topic={previewTopic} era={era} design={print} />
                  {selected && <span className={styles.printStamp}>✓</span>}
                </span>
              </button>
            );
          })}
        </div>
        <button
          id={id}
          type="button"
          className={styles.galleryTrigger}
          aria-haspopup="dialog"
          aria-label="See more cover artwork"
          onClick={() => gallery.current.showModal()}
        >
          {value && value !== previewTopic && (
            <span className={styles.printImage} data-era={era} aria-hidden="true">
              <StoryIllustration topic={value} era={era} design={design} />
              <span className={styles.printStamp}>✓</span>
            </span>
          )}
          See more <span aria-hidden="true">↗</span>
        </button>
        <dialog ref={gallery} className={styles.galleryDialog} aria-labelledby={`${id}-heading`}>
          <header className={styles.galleryHeader}>
            <h2 id={`${id}-heading`}>{era === "heritage" ? "Heritage" : "Modern"} cover artwork</h2>
            <button
              type="button"
              className={styles.galleryTrigger}
              onClick={() => gallery.current.close()}
            >
              Done
            </button>
          </header>
          <div className={styles.printGrid}>
            {VALID_TOPICS.map((topic) =>
              designs.map((print) => {
                const selected = value === topic && design === print;
                return (
                  <label key={`${topic}-${print}`} className={styles.printChoice}>
                    <input
                      type="radio"
                      name={id}
                      value={`${topic}:${print}`}
                      aria-label={`${topic}, design ${print}`}
                      checked={selected}
                      onChange={() => onChange(topic, print)}
                    />
                    <span className={styles.printImage} data-era={era} aria-hidden="true">
                      <StoryIllustration topic={topic} era={era} design={print} />
                      {selected && <span className={styles.printStamp}>✓</span>}
                    </span>
                  </label>
                );
              })
            )}
          </div>
        </dialog>
      </fieldset>
    );
  }
  return (
    <fieldset className={styles.topicIndex} aria-describedby={error ? `${id}-error` : undefined}>
      <legend className={styles.label}>
        {label} {required && <span className={styles.requiredStar}>*</span>}
      </legend>
      {error && (
        <span id={`${id}-error`} className={styles.fieldError} role="alert">
          {error}
        </span>
      )}
      <div className={styles.topicGrid}>
        {VALID_TOPICS.map((topic, index) => (
          <label key={topic} className={`${styles.printChoice} ${styles.topicTab}`}>
            <input
              id={index === 0 ? id : undefined}
              type="radio"
              name={id}
              value={topic}
              checked={value === topic}
              required={required}
              onChange={() => onChange(topic)}
            />
            <span aria-hidden="true">
              {value === topic ? "✓" : String(index + 1).padStart(2, "0")}
            </span>
            {topic}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
