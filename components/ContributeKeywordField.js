"use client";

import { useRef } from "react";
import styles from "../app/contribute/contribute.module.css";

export default function ContributeKeywordField({ value, onChange }) {
  const input = useRef(null);
  const { tags, draft } = value;

  function tokenize(text) {
    const parts = text.split(/\s+/u);
    const remainder = parts.pop();
    onChange({ tags: [...tags, ...parts.filter(Boolean)], draft: remainder });
  }

  function remove(index) {
    onChange({ tags: tags.filter((_, i) => i !== index), draft });
    input.current.focus();
  }

  return (
    <div className={styles.field}>
      <label htmlFor="keywords" className={styles.label}>
        Keywords
      </label>
      <div className={styles.keywordBox}>
        {tags.map((tag, index) => (
          <span className={styles.keywordChip} key={`${index}-${tag}`}>
            {tag}
            <button
              type="button"
              aria-label={`Remove keyword: ${tag}`}
              onClick={() => remove(index)}
            >
              ×
            </button>
          </span>
        ))}
        <input
          ref={input}
          id="keywords"
          aria-describedby="keyword-hint"
          placeholder={tags.length ? "Add keyword" : "e.g. commute cyclo market"}
          value={draft}
          onChange={(event) => {
            if (event.nativeEvent.isComposing) onChange({ tags, draft: event.target.value });
            else tokenize(event.target.value);
          }}
          onCompositionEnd={(event) => tokenize(event.currentTarget.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.nativeEvent.isComposing) {
              event.preventDefault();
              if (draft) tokenize(`${draft} `);
            }
          }}
        />
      </div>
      <span id="keyword-hint" className={styles.hint}>
        Optional. Press Space to add a keyword.
      </span>
    </div>
  );
}
