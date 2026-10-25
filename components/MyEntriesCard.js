"use client";

const STATUS_CONFIG = {
  pending: {
    label: "Pending Review · កំពុងរង់ចាំការពិនិត្យ",
    color: "#eab308",
    bg: "rgba(234, 179, 8, 0.12)",
    border: "rgba(234, 179, 8, 0.35)",
  },
  published: {
    label: "Published · បានបោះពុម្ពផ្សាយ",
    color: "#22c55e",
    bg: "rgba(34, 197, 94, 0.12)",
    border: "rgba(34, 197, 94, 0.35)",
  },
  returned: {
    label: "Returned · បានប្រគល់ត្រឡប់",
    color: "#ef4444",
    bg: "rgba(239, 68, 68, 0.12)",
    border: "rgba(239, 68, 68, 0.35)",
  },
};

export default function MyEntriesCard({ entry }) {
  const statusKey = entry.status || "pending";
  const status = STATUS_CONFIG[statusKey] || STATUS_CONFIG.pending;

  const titleEn = Array.isArray(entry.title) ? entry.title[0] : entry.title || "Untitled";
  const titleKm = Array.isArray(entry.title) ? entry.title[1] : entry.title_km || "";
  const topic = Array.isArray(entry.topic) ? entry.topic[0] : entry.topic || "";

  return (
    <article
      style={{
        padding: "20px 24px",
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--card-radius, 8px)",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
        <span
          style={{
            font: "11px var(--font-mono)",
            padding: "4px 10px",
            borderRadius: "4px",
            color: status.color,
            background: status.bg,
            border: `1px solid ${status.border}`,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          {status.label}
        </span>
        <span style={{ font: "11px var(--font-mono)", color: "var(--text-muted)" }}>
          {entry.timeline || "—"}
        </span>
      </div>

      <div>
        <h3 style={{ margin: "0 0 4px 0", fontSize: "17px", color: "var(--text)" }}>
          {titleEn}
        </h3>
        {titleKm && (
          <p style={{ margin: 0, fontSize: "14px", color: "var(--text-muted)", fontFamily: "var(--font-kantumruy)" }}>
            {titleKm}
          </p>
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "8px", borderTop: "1px solid var(--border)", flexWrap: "wrap", gap: "10px" }}>
        <span style={{ font: "12px var(--font-mono)", color: "var(--text-muted)" }}>
          {topic}
        </span>
        <div style={{ display: "flex", gap: "10px" }}>
          {statusKey === "published" && (
            <a href={`/?entry=${entry.id}`} style={{ font: "11px var(--font-mono)", color: "var(--accent)", textDecoration: "underline" }}>
              VIEW IN ARCHIVE
            </a>
          )}
          <a href={`/contribute?edit=${entry.id}`} style={{ font: "11px var(--font-mono)", color: "var(--accent)", textDecoration: "underline" }}>
            EDIT ENTRY →
          </a>
        </div>
      </div>
    </article>
  );
}
