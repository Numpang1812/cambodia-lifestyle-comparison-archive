import styles from "./entry-cards.module.css";

const cards = [
  {
    num: "01",
    span: "wide",
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
  },
  {
    num: "02",
    span: "half",
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
  },
  {
    num: "03",
    span: "half",
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
  },
  {
    num: "04",
    span: "wide",
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
  },
  {
    num: "05",
    span: "mid",
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
  },
];

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

export default function EntryCards({ era = "modern", count = 5 }) {
  return (
    <section aria-label="Lifestyle categories">
      <p className={styles.count}>
        entries in the archive: {count}
      </p>

      <div className={styles.grid}>
        {cards.map((c) => {
          const data = c[era];
          return (
            <article
              key={c.num}
              className={`${styles.card} ${
                c.span === "wide"
                  ? styles.wide
                  : c.span === "mid"
                    ? styles.mid
                    : styles.half
              }`}
            >
              <p className={styles.kicker}>
                CARD {c.num} · {c.topic.toUpperCase()}
              </p>
              <h2 className={styles.title}>{c.topic}</h2>

              <ChipRow chips={data.chips} />

              <div className={styles.eraPanel}>
                <p className={styles.eraLabel}>{data.label}</p>
                <h3 className={styles.eraHeadline}>{data.headline}</h3>
                <p className={styles.eraDetails}>{data.details}</p>
                {data.role ? (
                  <p className={styles.eraRole}>{data.role}</p>
                ) : null}
              </div>

              <PriceIndex rows={c.priceIndex} />
            </article>
          );
        })}
      </div>
    </section>
  );
}