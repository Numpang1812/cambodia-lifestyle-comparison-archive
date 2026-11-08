"use client";

// Mirrors MyEntriesCard styling. The accent encodes which era is missing:
// orange = needs the past (1980s–90s) half, green = needs the present (2020s) half.
const COLOR = {
  heritage: { color: "#e07b39", bg: "rgba(224, 123, 57, 0.12)", border: "rgba(224, 123, 57, 0.4)" },
  modern: { color: "#4ea87a", bg: "rgba(78, 168, 122, 0.12)", border: "rgba(78, 168, 122, 0.4)" },
};

export default function AddEraCard({ card, t }) {
  const missing = card.heritage ? "modern" : "heritage";
  const c = COLOR[missing];
  const titleEn = card.topic?.en || "—";
  const titleKm = card.topic?.km || "";

  return (
    <a
      href={`/contribute?addEra=${encodeURIComponent(card.slug)}&era=${missing}`}
      style={{
        padding: "20px 24px",
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderLeft: `3px solid ${c.color}`,
        borderRadius: "var(--card-radius, 8px)",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        textDecoration: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            font: "11px var(--font-mono)",
            padding: "4px 10px",
            borderRadius: "4px",
            color: c.color,
            background: c.bg,
            border: `1px solid ${c.border}`,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          {missing === "heritage" ? t.addEraMissingPast : t.addEraMissingModern}
        </span>
      </div>

      <div>
        <h3 style={{ margin: "0 0 4px 0", fontSize: "17px", color: "var(--text)" }}>{titleEn}</h3>
        {titleKm ? (
          <p
            style={{
              margin: 0,
              fontSize: "14px",
              color: "var(--text-muted)",
              fontFamily: "var(--font-kantumruy)",
            }}
          >
            {titleKm}
          </p>
        ) : null}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "8px",
          borderTop: "1px solid var(--border)",
        }}
      >
        <span style={{ font: "12px var(--font-mono)", color: "var(--text-muted)" }}>
          {t.addEraContribute}
        </span>
        <span aria-hidden="true" style={{ color: c.color }}>
          →
        </span>
      </div>
    </a>
  );
}
