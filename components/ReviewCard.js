"use client";

const BTN = {
  font: "11px var(--font-mono)",
  padding: "6px 12px",
  background: "transparent",
  borderRadius: "4px",
  border: "1px solid var(--border)",
  cursor: "pointer",
};

export default function ReviewCard({ entry, t, busy, onDecide }) {
  const titleEn = Array.isArray(entry.title) ? entry.title[0] : entry.title || "—";
  const titleKm = Array.isArray(entry.title) ? entry.title[1] : entry.title_km || "";
  const topic = Array.isArray(entry.topic) ? entry.topic[0] : entry.topic || "";
  const statusKey = entry.status || "pending";

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
        <span style={{ font: "11px var(--font-mono)", color: "#eab308", textTransform: "uppercase", letterSpacing: "0.5px" }}>
          {statusKey}
        </span>
        <span style={{ font: "11px var(--font-mono)", color: "var(--text-muted)" }}>
          {entry.timeline || "—"}
        </span>
      </div>

      <div>
        <h3 style={{ margin: "0 0 4px 0", fontSize: "17px", color: "var(--text)" }}>{titleEn}</h3>
        {titleKm ? (
          <p style={{ margin: 0, fontSize: "14px", color: "var(--text-muted)", fontFamily: "var(--font-kantumruy)" }}>
            {titleKm}
          </p>
        ) : null}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "8px", borderTop: "1px solid var(--border)", flexWrap: "wrap", gap: "10px" }}>
        <span style={{ font: "12px var(--font-mono)", color: "var(--text-muted)" }}>{topic}</span>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="button"
            disabled={busy}
            onClick={() => onDecide(entry, "published")}
            style={{ ...BTN, color: "#22c55e", borderColor: "rgba(34, 197, 94, 0.4)", opacity: busy ? 0.5 : 1 }}
          >
            {busy ? t.reviewBusy : t.reviewApprove}
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => onDecide(entry, "returned")}
            style={{ ...BTN, color: "#f97316", borderColor: "rgba(249, 115, 22, 0.4)", opacity: busy ? 0.5 : 1 }}
          >
            {t.reviewReturn}
          </button>
        </div>
      </div>
    </article>
  );
}
