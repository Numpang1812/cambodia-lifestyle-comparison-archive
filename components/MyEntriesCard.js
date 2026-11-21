"use client";

import styles from "../app/contribute/contribute.module.css";

const STATUS = {
  pending: {
    color: "#eab308",
    label: { en: "Pending review", km: "កំពុងរង់ចាំការពិនិត្យ" },
    guidance: {
      en: "Waiting for review. It is not public yet; you can still edit it.",
      km: "កំពុងរង់ចាំការពិនិត្យ។ វាមិនទាន់បង្ហាញជាសាធារណៈទេ តែអ្នកអាចកែបាន។",
    },
  },
  published: {
    color: "#22c55e",
    label: { en: "Published", km: "បានបោះពុម្ពផ្សាយ" },
    guidance: {
      en: "Public in the archive. You can open or edit it any time.",
      km: "បង្ហាញជាសាធារណៈក្នុងបណ្ណសារ។ អ្នកអាចបើក ឬកែបានគ្រប់ពេល។",
    },
  },
  returned: {
    color: "#f97316",
    label: { en: "Returned", km: "បានប្រគល់ត្រឡប់" },
    guidance: {
      en: "Revise the content or source, then resubmit for review.",
      km: "កែសម្រួលខ្លឹមសារ ឬប្រភព រួចដាក់ស្នើម្តងទៀតដើម្បីពិនិត្យ។",
    },
  },
  unknown: {
    color: "var(--text-muted)",
    label: { en: "Status unknown", km: "មិនស្គាល់ស្ថានភាព" },
    guidance: {
      en: "Status not recognised here. Open the entry to check or edit it.",
      km: "មិនស្គាល់ស្ថានភាពនេះទេ។ សូមបើកធាតុដើម្បីពិនិត្យ ឬកែ។",
    },
  },
};

const DATE_LABELS = {
  created_at: { en: "Submitted", km: "ដាក់ស្នើ" },
  updated_at: { en: "Updated", km: "កែប្រែ" },
};

export default function MyEntriesCard({ entry, lang = "en" }) {
  const statusKey = ["pending", "published", "returned"].includes(entry.status)
    ? entry.status
    : "unknown";
  const status = STATUS[statusKey];
  const locale = lang === "km" ? "km-KH" : "en-US";
  const title = Array.isArray(entry.title) ? entry.title : [entry.title, entry.title_km];
  const topic = Array.isArray(entry.topic) ? entry.topic[0] : entry.topic;
  const dates = ["created_at", "updated_at"]
    .map((field) => {
      const parsed = entry[field] ? new Date(entry[field]) : null;
      if (!parsed || Number.isNaN(parsed.getTime())) return null;
      return {
        field,
        iso: entry[field],
        text: parsed.toLocaleDateString(locale, {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      };
    })
    .filter(Boolean);
  const canPreview = statusKey === "pending" || statusKey === "returned";
  const previewFields = [
    { key: "content", label: { en: "Content", km: "ខ្លឹមសារ" }, value: entry.content },
    { key: "source", label: { en: "Source", km: "ប្រភព" }, value: entry.source },
  ];

  return (
    <article className={styles.card} style={{ display: "grid", gap: "10px" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "4px 16px",
        }}
      >
        <span className={styles.label} style={{ color: status.color }}>
          {status.label[lang] || status.label.en}
        </span>
        <span className={styles.hint}>{entry.timeline || "—"}</span>
      </div>

      <div>
        <h3 style={{ margin: 0, fontSize: "17px", color: "var(--text)" }}>{title[0] || "—"}</h3>
        {title[1] ? (
          <p className={styles.sub} style={{ fontFamily: "var(--font-kantumruy)" }}>
            {title[1]}
          </p>
        ) : null}
      </div>

      <p className={styles.hint} style={{ margin: 0 }}>
        {status.guidance[lang] || status.guidance.en}
      </p>

      {dates.length > 0 && (
        <p className={styles.hint} style={{ margin: 0 }}>
          {dates.map((date) => (
            <span key={date.field} style={{ marginRight: "12px" }}>
              {DATE_LABELS[date.field][lang] || DATE_LABELS[date.field].en}{" "}
              <time dateTime={date.iso}>{date.text}</time>
            </span>
          ))}
        </p>
      )}

      {canPreview && (
        <details>
          <summary className={styles.link} style={{ cursor: "pointer", padding: "6px 0" }}>
            {lang === "km" ? "មើលការដាក់ស្នើ" : "Preview submission"}
          </summary>
          {previewFields.map((field) => {
            const labeled = Array.isArray(field.value);
            const parts = (labeled ? field.value : [field.value])
              .map((part, index) => ({
                index,
                text: typeof part === "string" || typeof part === "number" ? String(part) : "",
              }))
              .filter((part) => part.text.trim());
            return (
              <div key={field.key} className={styles.field} style={{ marginTop: "10px" }}>
                <span className={styles.label}>{field.label[lang] || field.label.en}</span>
                {parts.length === 0 && (
                  <p className={styles.hint} style={{ margin: 0 }}>
                    —
                  </p>
                )}
                {parts.map((part) => (
                  <p
                    key={part.index}
                    lang={labeled ? (part.index === 0 ? "en" : "km") : undefined}
                    style={{
                      margin: 0,
                      fontSize: "14px",
                      lineHeight: 1.6,
                      color: "var(--text)",
                      whiteSpace: "pre-wrap",
                      overflowWrap: "anywhere",
                      fontFamily: labeled && part.index === 1 ? "var(--font-kantumruy)" : undefined,
                    }}
                  >
                    {labeled && (
                      <span className={styles.label}>{part.index === 0 ? "EN · " : "KM · "}</span>
                    )}
                    {part.text}
                  </p>
                ))}
              </div>
            );
          })}
        </details>
      )}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          paddingTop: "10px",
          borderTop: "1px solid var(--border)",
        }}
      >
        <span className={styles.hint}>{topic || "—"}</span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
          {statusKey === "published" && (
            <a
              href={`/?entry=${entry.id}`}
              className={styles.link}
              style={{ display: "inline-flex", alignItems: "center", minHeight: "44px" }}
            >
              View in archive
            </a>
          )}
          <a
            href={`/contribute?edit=${entry.id}`}
            className={styles.link}
            style={{ display: "inline-flex", alignItems: "center", minHeight: "44px" }}
          >
            {statusKey === "returned" ? "Revise and resubmit" : "Edit entry"}
          </a>
        </div>
      </div>
    </article>
  );
}
