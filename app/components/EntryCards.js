"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./entry-cards.module.css";

export const cards = [
  {
    num: "01",
    topic: "Commute & Mobility",
    modern: {
      label: "MODERN · 2020s",
      headline: "Smart Keys, Sleek Scooters & Traffic Boulevards",
      details:
        "Dominant use of automatic scooters (Honda Scoopy, PCX, Click, Zoomer-X); ride-hailing apps (Grab); paved roads.",
      role: "Daily commute doubles as personal style and status.",
      chips: ["⚡ Grab 24/7", "🛴 PCX & Click", "🗺️ Paved boulevards"],
    },
    heritage: {
      label: "HERITAGE · 1980s–90s",
      headline: "Steel Frames, Cyclos & Early Two-Strokes",
      details:
        "Single-gear heavy steel bicycles, Cyclos, and early step-through motorbikes (Suzuki Viva 110, Honda Chaly, Honda C70/Dame).",
      role: "Manual kick-starts and long pedals on dirt roads; high value placed on a first family bike.",
      chips: ["🚲 Cyclo era", "🛞 Dirt roads", "🔑 Kick-start only"],
    },
    photos: [
      "Sleek PCX scooter at a Phnom Penh intersection",
      "Grab driver with helmet + phone mount",
      "Aeon mall parking deck of scooters",
    ],
  },
  {
    num: "02",
    topic: "Morning Routine & School Prep",
    modern: {
      label: "MODERN · 2020s",
      headline: "Frictionless Mornings & Digital Schedules",
      details:
        "Smartphone alarms; Telegram class announcements; 15-minute routine with indoor running water and electric heaters; instant street breakfast or delivery.",
      chips: ["🔴 Live Telegram", "⏰ 15-min routine"],
    },
    heritage: {
      label: "HERITAGE · 1980s–90s",
      headline: "Dawn Labor, Heavy Buckets & Wood Stoves",
      details:
        "5:00 AM start hauling water buckets from the river/pond on shoulder poles to fill clay jars (Pneang); lighting charcoal/wood stoves (Changkran) to reheat rice and fry fish before a long bike commute.",
      chips: ["🪣 River dawn", "🔥 Changkran stove"],
    },
    photos: [
      "Phone alarm and Telegram notification stack",
      "Electric kettle + instant noodles on a small counter",
      "Street breakfast cart before school",
    ],
  },
  {
    num: "03",
    topic: "Free Time, Entertainment & Side Hustles",
    modern: {
      label: "MODERN · 2020s",
      headline: "Screen Connectivity, Digital Escapes & Malls",
      details:
        "YouTube, Netflix, mobile gaming (MLBB/PUBG), coding projects; hanging out in air-conditioned malls (Aeon) and cafes; digital freelance side hustles.",
      chips: ["📺 Netflix+", "🎮 MLBB / PUBG", "💻 Digital hustles"],
    },
    heritage: {
      label: "HERITAGE · 1980s–90s",
      headline: "Open-Air Games, Pagoda Hangouts & Community Labor",
      details:
        "Folk games (Sey, Chhoung, street soccer), transistor radios, cassette tapes; pocket money earned through local errands, elder massage (Chap Sos), and copying school notes.",
      chips: ["📻 Transistor radio", "🎖️ Folk games"],
    },
    photos: [
      "Mobile gaming setup — phone + earbuds",
      "Aeon mall food court hangout",
      "Laptop freelance grind in a coffee shop",
    ],
  },
  {
    num: "04",
    topic: "Street Food & Cost of Living",
    modern: {
      label: "MODERN · 2020s",
      headline: "Global Palates, Boba & On-Demand Delivery",
      details:
        "Base street snacks start around 4,000 KHR ($1.00); unlimited access to Korean BBQ, Japanese sushi, milk tea, and app delivery (Nham24/Foodpanda).",
      chips: ["🚴 Foodpanda Now", "🍜 Nham24", "🧋 Boba culture"],
    },
    heritage: {
      label: "HERITAGE · 1980s–90s",
      headline: "Cart Bells, Chive Cakes & Post-War Scarcity",
      details:
        "100–500 Riel snacks; hyper-local staples only (Num Kchay, Num Krouk, Num Banh Chok, hand-pulled Skor Teanh, uncle-pushed ice cream carts); reliant on morning market hours.",
      chips: ["🔔 Cart bells", "🪙 100–500 Riel"],
    },
    priceIndex: [
      { item: "Street snack", past: "100–500 Riel", present: "≈4,000 KHR ($1.00)" },
      { item: "Num Banh Chok bowl", past: "~200 Riel", present: "~5,000 KHR" },
      { item: "Iced drink", past: "Skor Teanh ~100 Riel", present: "Boba ~8,000 KHR ($2.00)" },
    ],
    photos: [
      "Boba row on a modern Phnom Penh street",
      "Nham24 delivery rider at a noodle stall",
      "Korean BBQ plate on a tabletop",
    ],
  },
  {
    num: "05",
    topic: "Romance & Dating Culture",
    modern: {
      label: "MODERN · 2020s",
      headline: "Curated Feeds, Talking Stages & Ambiguity",
      details:
        "Romance filtered through Instagram stories and messaging rules; high fear of direct confession; ambiguous labels (situationships, breadcrumbing, FWB).",
      chips: ["💬 IG Stories", "🐍 Breadcrumbing"],
    },
    heritage: {
      label: "HERITAGE · 1980s–90s",
      headline: "Direct Confessions, Paper Notes & Clear Intentions",
      details:
        "No multi-month guessing games; \"I love you\" carried genuine weight; courtship happened through folded paper notes and sharing bicycle rides home.",
      chips: ["✉️ Paper notes", "🚲 Rides home"],
    },
    photos: [
      "Folded paper note in a school pencil case",
      "Two bicycles parked under a mango tree",
      "Old photograph — couple by a radio",
    ],
  },
];

// Search — case-insensitive, every whitespace-separated term must hit
export function matches(c, terms) {
  if (terms.length === 0) return true;
  const hay = [
    c.num,
    c.topic,
    c.modern?.label, c.modern?.headline, c.modern?.details, c.modern?.role,
    c.heritage?.label, c.heritage?.headline, c.heritage?.details, c.heritage?.role,
    ...(c.modern?.chips ?? []),
    ...(c.heritage?.chips ?? []),
    ...(c.photos ?? []),
    ...(c.priceIndex ?? []).flatMap((r) => [r.item, r.past, r.present]),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return terms.every((t) => hay.includes(t));
}

export function searchTerms(query) {
  return query.trim().toLowerCase().split(/\s+/).filter(Boolean);
}

function ChipRow({ chips }) {
  if (!chips?.length) return null;
  return (
    <div className={styles.chipRow}>
      {chips.map((chip) => (
        <span key={chip} className={styles.chip}>
          {chip}
        </span>
      ))}
    </div>
  );
}

function PriceIndex({ rows }) {
  if (!rows?.length) return null;
  return (
    <div className={styles.priceIndex}>
      <p className={styles.priceTitle}>PRICE INDEX — 1980s ⇄ 2020s</p>
      {rows.map((r) => (
        <div key={r.item} className={styles.priceRow}>
          <span className={styles.priceItem}>{r.item}</span>
          <span className={styles.pricePast}>{r.past}</span>
          <span className={styles.pricePresent}>{r.present}</span>
        </div>
      ))}
    </div>
  );
}

function MiniGallery({ photos, topic }) {
  const list = photos?.length ? photos : ["Photo placeholder — add images in EntryCards.js"];
  const n = list.length;
  const [i, setI] = useState(0);
  const step = (d) => setI((p) => (p + d + n) % n);

  return (
    <div className={styles.gallery}>
      <div className={styles.slide} role="img" aria-label={`${topic} photo ${i + 1} of ${n}`}>
        <span className={styles.slideMark} aria-hidden="true">📷</span>
        <span className={styles.slideLabel}>
          PHOTO {i + 1} / {n}
        </span>
        <span className={styles.slideCaption}>{list[i]}</span>
      </div>
      <div className={styles.galleryNav}>
        <button
          type="button"
          className={styles.galleryBtn}
          onClick={() => step(-1)}
          aria-label={`Previous photo in ${topic}`}
        >
          ←
        </button>
        <span className={styles.galleryCount} aria-live="polite">
          {i + 1} / {n}
        </span>
        <button
          type="button"
          className={styles.galleryBtn}
          onClick={() => step(1)}
          aria-label={`Next photo in ${topic}`}
        >
          →
        </button>
      </div>
    </div>
  );
}

function EntryModal({ card, era, onClose }) {
  const data = card[era] ?? {};

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Freeze page scroll while the popup is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div className={styles.modalOverlay} onClick={() => onClose?.()}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-label={`${card.topic} — entry details`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={styles.modalClose}
          onClick={() => onClose?.()}
          aria-label="Close entry"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <path
              d="M1 1l12 12M13 1L1 13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <p className={styles.kicker}>
          CARD {card.num} · {card.topic.toUpperCase()}
        </p>
        <h2 className={styles.title}>{card.topic}</h2>

        <ChipRow chips={data.chips} />

        <div className={styles.eraPanel}>
          <p className={styles.eraLabel}>{data.label}</p>
          <h3 className={styles.eraHeadline}>{data.headline}</h3>
          <p className={styles.eraDetails}>{data.details}</p>
          {data.role ? <p className={styles.eraRole}>{data.role}</p> : null}
        </div>

        <MiniGallery photos={card.photos ?? []} topic={card.topic} />
        <PriceIndex rows={card.priceIndex} />
      </div>
    </div>
  );
}

export default function EntryCards({
  era = "modern",
  count = 5,
  query = "",
  selected = null,
  onSelect,
  onClose,
}) {
  const terms = useMemo(() => searchTerms(query), [query]);
  const visible = useMemo(() => cards.filter((c) => matches(c, terms)), [terms]);

  return (
    <section aria-label="Lifestyle categories">
      <p className={styles.count}>
        {terms.length
          ? `entries matched: ${visible.length} / ${cards.length}`
          : `entries in the archive: ${count}`}
      </p>

      {visible.length === 0 ? (
        <p className={styles.empty}>
          no entries match “{query}” — try another word.
        </p>
      ) : (
        <div className={styles.grid}>
          {visible.map((c) => {
            const data = c[era] ?? {};
            return (
              <article key={c.num} className={styles.card}>
                <button
                  type="button"
                  className={styles.cardHit}
                  onClick={() => onSelect?.(c)}
                  aria-haspopup="dialog"
                  aria-label={`Open entry: ${c.topic}`}
                />
                <div className={styles.cardBody}>
                  <span className={styles.kicker}>
                    CARD {c.num} · {c.topic.toUpperCase()}
                  </span>
                  <span className={styles.title}>{c.topic}</span>
                  <div className={styles.chipRow}>
                    {(data.chips ?? []).slice(0, 3).map((chip) => (
                      <span key={chip} className={styles.chip}>
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
                <span className={styles.chevron} aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 14 14">
                    <path
                      d="M7 1v12M1 7h12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </article>
            );
          })}
        </div>
      )}

      {selected ? (
        <EntryModal card={selected} era={era} onClose={onClose} />
      ) : null}
    </section>
  );
}
