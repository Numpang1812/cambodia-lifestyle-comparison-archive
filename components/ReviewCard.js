"use client";

const BTN = {
  font: "14px var(--font-mono)",
  padding: "10px 14px",
  minHeight: "44px",
  background: "transparent",
  borderRadius: "4px",
  border: "1px solid var(--border)",
  cursor: "pointer",
  flex: "1 1 140px",
};

export default function ReviewCard({ entry, t, lang, busy, locked, onDecide }) {
  const titleEn = Array.isArray(entry.title) ? entry.title[0] : entry.title;
  const titleKm = Array.isArray(entry.title) ? entry.title[1] : entry.title_km;
  const rawSummary = lang === "km" ? titleKm || titleEn : titleEn || titleKm;
  const summaryTitle =
    typeof rawSummary === "string" || typeof rawSummary === "number" ? String(rawSummary) : "—";
  const timeline =
    typeof entry.timeline === "string" || typeof entry.timeline === "number"
      ? String(entry.timeline)
      : "";
  const rawTopic = Array.isArray(entry.topic)
    ? lang === "km"
      ? entry.topic[1] || entry.topic[0]
      : entry.topic[0] || entry.topic[1]
    : entry.topic;
  const topicText =
    typeof rawTopic === "string" || typeof rawTopic === "number" ? String(rawTopic) : "";
  const cfg = entry.image_config || {};
  const rawPhoto =
    [cfg.url, entry.image].find(
      (v) => typeof v === "string" && /^(https?:\/\/[^\\]+|\/[^\/\\][^\\]*)$/i.test(v.trim())
    ) ||
    (typeof cfg.path === "string" && cfg.path.trim() && !/^[\\/]{2}|^\\/.test(cfg.path.trim())
      ? `${(process.env.NEXT_PUBLIC_SUPABASE_URL || "").replace(/\/$/, "")}/storage/v1/object/public/${cfg.bucket || "photos"}/${cfg.path.trim().replace(/^\/+/, "")}`
      : "");
  const photo =
    typeof rawPhoto === "string" && /^(https?:\/\/[^\\]+|\/[^\/\\][^\\]*)$/i.test(rawPhoto)
      ? rawPhoto
      : "";
  const isHeritage =
    /1980|1985|199\d|heritage|past/i.test(timeline) ||
    (parseInt(timeline, 10) >= 1800 && parseInt(timeline, 10) <= 1999);

  return (
    <article
      aria-busy={busy}
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--card-radius, 8px)",
        overflow: "hidden",
      }}
    >
      <details>
        <summary style={{ padding: "16px 20px", cursor: "pointer" }}>
          <span
            style={{
              display: "inline-flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "8px 16px",
            }}
          >
            <span
              style={{
                font: "11px var(--font-mono)",
                color: "#eab308",
                textTransform: "uppercase",
              }}
            >
              {entry.status || "pending"}
            </span>
            <span style={{ fontSize: "17px", fontWeight: 600, color: "var(--text)" }}>
              {summaryTitle}
            </span>
            <span style={{ font: "12px var(--font-mono)", color: "var(--text-muted)" }}>
              {timeline || "—"}
            </span>
          </span>
        </summary>
        <div
          style={{ padding: "0 20px 20px", display: "flex", flexDirection: "column", gap: "12px" }}
        >
          {[
            ["title", entry.title, entry.title_km],
            ["content", entry.content, null],
            ["topic", entry.topic, null],
            ["source", entry.source, null],
          ].map(([field, value, legacyKm]) => (
            <div key={field}>
              <p
                style={{
                  margin: 0,
                  font: "11px var(--font-mono)",
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                }}
              >
                {field === "source" ? t.cardSourceLabel : field}
              </p>
              {["en", "km"].map((code, index) => {
                const raw = Array.isArray(value)
                  ? value[index]
                  : index === 0
                    ? value
                    : field === "title"
                      ? legacyKm
                      : null;
                const text =
                  typeof raw === "string" || typeof raw === "number" ? String(raw).trim() : "";
                return text ? (
                  <p
                    key={code}
                    lang={code}
                    style={{
                      margin: 0,
                      fontSize: "14px",
                      color: "var(--text)",
                      whiteSpace: "pre-wrap",
                      overflowWrap: "anywhere",
                      fontFamily: code === "km" ? "var(--font-kantumruy)" : undefined,
                    }}
                  >
                    <span style={{ font: "11px var(--font-mono)", color: "var(--text-muted)" }}>
                      {code.toUpperCase()}
                    </span>{" "}
                    {text}
                  </p>
                ) : null;
              })}
            </div>
          ))}
          <p style={{ margin: 0, font: "12px var(--font-mono)", color: "var(--text-muted)" }}>
            {timeline || "—"}
          </p>
          {photo ? (
            <img
              src={photo}
              alt={topicText || summaryTitle}
              loading="lazy"
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "6px",
                border: "1px solid var(--border)",
                display: "block",
              }}
            />
          ) : (
            <p style={{ margin: 0, fontSize: "14px", color: "var(--text-muted)" }}>
              {t.noPhotosDesc(isHeritage, topicText || summaryTitle)}
            </p>
          )}
          {entry.keywords && (!Array.isArray(entry.keywords) || entry.keywords.length) ? (
            <p
              style={{
                margin: 0,
                fontSize: "14px",
                color: "var(--text)",
                whiteSpace: "pre-wrap",
                overflowWrap: "anywhere",
              }}
            >
              {Array.isArray(entry.keywords) &&
              entry.keywords.every((k) => typeof k === "string" || typeof k === "number")
                ? entry.keywords.join(" · ")
                : typeof entry.keywords === "string" || typeof entry.keywords === "number"
                  ? String(entry.keywords)
                  : JSON.stringify(entry.keywords, null, 2)}
            </p>
          ) : null}
          {entry.price_index != null && entry.price_index !== "" ? (
            <div>
              <p style={{ margin: 0, font: "11px var(--font-mono)", color: "var(--text-muted)" }}>
                {t.priceIndexTitle}
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  color: "var(--text)",
                  whiteSpace: "pre-wrap",
                  overflowWrap: "anywhere",
                }}
              >
                {typeof entry.price_index === "string" || typeof entry.price_index === "number"
                  ? String(entry.price_index)
                  : JSON.stringify(entry.price_index, null, 2)}
              </p>
            </div>
          ) : null}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              paddingTop: "8px",
              borderTop: "1px solid var(--border)",
            }}
          >
            <button
              type="button"
              disabled={locked}
              onClick={() => onDecide(entry, "published")}
              style={{
                ...BTN,
                color: "#22c55e",
                borderColor: "rgba(34, 197, 94, 0.4)",
                opacity: locked ? 0.5 : 1,
              }}
            >
              {t.reviewApprove}
            </button>
            <button
              type="button"
              disabled={locked}
              onClick={() => onDecide(entry, "returned")}
              style={{
                ...BTN,
                color: "#f97316",
                borderColor: "rgba(249, 115, 22, 0.4)",
                opacity: locked ? 0.5 : 1,
              }}
            >
              {t.reviewReturn}
            </button>
          </div>
          {busy ? (
            <p role="status" style={{ margin: 0, fontSize: "14px", color: "var(--text-muted)" }}>
              {t.reviewBusy}
            </p>
          ) : null}
        </div>
      </details>
    </article>
  );
}
