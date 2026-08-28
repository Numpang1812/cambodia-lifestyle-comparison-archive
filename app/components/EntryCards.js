import styles from "./entry-cards.module.css";

const cards = [
  { num: "01", topic: "Commute & Mobility", modern: { label: "MODERN · 2020s", headline: "Smart Keys, Sleek Scooters & Traffic Boulevards", details: "Dominant use of automatic scooters (Honda Scoopy, PCX, Click, Zoomer-X); ride-hailing apps (Grab); paved roads.", role: "Daily commute doubles as personal style and status." }, heritage: { label: "HERITAGE · 1980s–90s", headline: "Steel Frames, Cyclos & Early Two-Strokes", details: "Single-gear heavy steel bicycles, Cyclos, and early step-through motorbikes (Suzuki Viva 110, Honda Chaly, Honda C70/Dame).", role: "Manual kick-starts and long pedals on dirt roads; high value placed on a first family bike." } },
  { num: "02", topic: "Morning Routine & School Prep", modern: { label: "MODERN · 2020s", headline: "Frictionless Mornings & Digital Schedules", details: "Smartphone alarms; Telegram class announcements; 15-minute routine with indoor running water and electric heaters; instant street breakfast or delivery." }, heritage: { label: "HERITAGE · 1980s–90s", headline: "Dawn Labor, Heavy Buckets & Wood Stoves", details: "5:00 AM start hauling water buckets from the river/pond on shoulder poles to fill clay jars (Pneang); lighting charcoal/wood stoves (Changkran) to reheat rice and fry fish before a long bike commute." } },
  { num: "03", topic: "Free Time, Entertainment & Hustles", modern: { label: "MODERN · 2020s", headline: "Screen Connectivity, Digital Escapes & Malls", details: "YouTube, Netflix, mobile gaming (MLBB/PUBG), coding projects; hanging out in air-conditioned malls (Aeon) and cafes; digital freelance side hustles." }, heritage: { label: "HERITAGE · 1980s–90s", headline: "Open-Air Games, Pagoda Hangouts & Community Labor", details: "Folk games (Sey, Chhoung, street soccer), transistor radios, cassette tapes; pocket money earned through local errands, elder massage (Chap Sos), and copying school notes." } },
  { num: "04", topic: "Street Food & Cost of Living", modern: { label: "MODERN · 2020s", headline: "Global Palates, Boba & On-Demand Delivery", details: "Base street snacks start around 4,000 KHR ($1.00); unlimited access to Korean BBQ, Japanese sushi, milk tea, and app delivery (Nham24/Foodpanda)." }, heritage: { label: "HERITAGE · 1980s–90s", headline: "Cart Bells, Chive Cakes & Post-War Scarcity", details: "100–500 Riel snacks; hyper-local staples only (Num Kchay, Num Krouk, Num Banh Chok, hand-pulled Skor Teanh, uncle-pushed ice cream carts); reliant on morning market hours." } },
  { num: "05", topic: "Romance & Dating Culture", modern: { label: "MODERN · 2020s", headline: "Curated Feeds, Talking Stages & Ambiguity", details: "Romance filtered through Instagram stories and messaging rules; high fear of direct confession; ambiguous labels (situationships, breadcrumbing, FWB)." }, heritage: { label: "HERITAGE · 1980s–90s", headline: "Direct Confessions, Paper Notes & Clear Intentions", details: "No multi-month guessing games; \"I love you\" carried genuine weight; courtship happened through folded paper notes and sharing bicycle rides home." } },
];

function Col({ data, modern }) {
  const lbl = modern ? styles.colLabelModern : styles.colLabelHeritage;
  const box = modern ? styles.colModern : styles.colHeritage;
  return (
    <div className={`${styles.col} ${box}`}>
      <p className={`${styles.colLabel} ${lbl}`}>{data.label}</p>
      <h3 className={styles.colHeadline}>{data.headline}</h3>
      <p className={styles.colDetails}>{data.details}</p>
      {data.role ? <p className={styles.colRole}>{data.role}</p> : null}
    </div>
  );
}

export default function EntryCards() {
  return (
    <>
      {cards.map((c) => (
        <article key={c.num} className={styles.card}>
          <p className={styles.kicker}>CARD {c.num} · {c.topic.toUpperCase()}</p>
          <h2 className={styles.title}>{c.topic}</h2>
          <div className={styles.grid}>
            <Col data={c.modern} modern />
            <Col data={c.heritage} />
          </div>
        </article>
      ))}
    </>
  );
}
