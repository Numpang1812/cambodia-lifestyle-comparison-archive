"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./entry-cards.module.css";
import StoryIllustration, { illustrationCaption } from "./StoryIllustration";

export const cards = [
  {
    num: "01",
    slug: "commute-and-mobility",
    topic: "Commute & Mobility",
    imageConfig: {
      folder: "commute-and-mobility",
      pastPrefix: "past",
      presentPrefix: "present",
      pastCount: 2,
      presentCount: 2,
      ext: "png",
    },
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
    slug: "morning-routine",
    topic: "Morning Routine & School Prep",
    imageConfig: {
      folder: "morning-routine",
      pastPrefix: "past",
      presentPrefix: "present",
      pastCount: 2,
      presentCount: 2,
      ext: "png",
    },
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
    slug: "free-time-and-entertainment",
    topic: "Free Time, Entertainment & Side Hustles",
    imageConfig: {
      folder: "free-time-and-entertainment",
      pastPrefix: "past",
      presentPrefix: "present",
      pastCount: 2,
      presentCount: 2,
      ext: "png",
    },
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
    slug: "street-food-and-cost",
    topic: "Street Food & Cost of Living",
    imageConfig: {
      folder: "street-food-and-cost",
      pastPrefix: "past",
      presentPrefix: "present",
      pastCount: 2,
      presentCount: 2,
      ext: "png",
    },
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
    slug: "romance-and-date-culture",
    topic: "Romance & Dating Culture",
    imageConfig: {
      folder: "romance-and-date-culture",
      pastPrefix: "past",
      presentPrefix: "present",
      pastCount: 2,
      presentCount: 2,
      ext: "png",
    },
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

export function getCardImages(card, era) {
  if (!card) return [];
  const cfg = card.imageConfig || {};
  const folder = cfg.folder || card.slug;
  if (!folder) return [];

  // Strictly separate eras: past(n) for heritage, present(n) for modern
  const isHeritage = era === "heritage";
  const prefix = isHeritage ? (cfg.pastPrefix || "past") : (cfg.presentPrefix || "present");
  const count = isHeritage ? (cfg.pastCount ?? 0) : (cfg.presentCount ?? 0);
  const ext = cfg.ext || "png";

  if (count <= 0) return [];

  const list = [];
  for (let i = 1; i <= count; i++) {
    list.push({
      src: `/assets/images/${folder}/${prefix}${i}.${ext}`,
      name: `${prefix}${i}.${ext}`,
      caption: `${card.topic} · ${prefix.toUpperCase()} ${i}`,
    });
  }
  return list;
}

function ArchivePhotoGallery({ card, era }) {
  const initialPhotos = useMemo(() => getCardImages(card, era), [card, era]);
  const [photos, setPhotos] = useState(initialPhotos);
  const [index, setIndex] = useState(0);

  const isHeritage = era === "heritage";
  const prefix = isHeritage
    ? card.imageConfig?.pastPrefix || "past"
    : card.imageConfig?.presentPrefix || "present";
  const folder = card.imageConfig?.folder || card.slug;

  // Auto-discover pictures directly from filesystem via /api/gallery
  useEffect(() => {
    const base = getCardImages(card, era);
    setPhotos(base);
    setIndex(0);

    let active = true;
    if (folder) {
      fetch(`/api/gallery?folder=${folder}&prefix=${prefix}`)
        .then((res) => res.json())
        .then((data) => {
          if (active && Array.isArray(data?.images) && data.images.length > 0) {
            setPhotos(data.images);
          }
        })
        .catch(() => {});
    }

    return () => {
      active = false;
    };
  }, [card, era, folder, prefix]);

  const total = photos.length;

  // Render placeholder if no pictures exist for this era
  if (total === 0) {
    const isHeritage = era === "heritage";
    const expectedPrefix = isHeritage
      ? card.imageConfig?.pastPrefix || "past"
      : card.imageConfig?.presentPrefix || "present";
    const folder = card.imageConfig?.folder || card.slug;

    return (
      <div className={styles.photoGallery}>
        <div className={styles.photoGalleryHeader}>
          <span className={styles.photoGalleryTitle}>
            ARCHIVE PHOTOGRAPHS · {isHeritage ? "1980s–90s (HERITAGE)" : "2020s (MODERN)"}
          </span>
          <span className={styles.photoGalleryCounter}>
            0 PHOTOGRAPHS
          </span>
        </div>

        <div className={styles.photoFrame}>
          <div className={styles.photoPlaceholder}>
            <svg
              className={styles.placeholderIcon}
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <circle cx="8.5" cy="10" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <p className={styles.placeholderTitle}>
              NO {isHeritage ? "HERITAGE" : "MODERN"} PHOTOGRAPHS ARCHIVED
            </p>
            <p className={styles.placeholderText}>
              There are currently no {isHeritage ? "past" : "present"} photos added for {card.topic}.
            </p>
            <span className={styles.placeholderBadge}>
              PATTERN: {expectedPrefix}1.png, {expectedPrefix}2.png… in /assets/images/{folder}/
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Infinite scroll handlers — loops seamlessly from end to beginning
  const next = () => setIndex((prev) => (prev + 1) % total);
  const prev = () => setIndex((prev) => (prev - 1 + total) % total);

  const current = photos[index % total];
  if (!current) return null;

  return (
    <div className={styles.photoGallery}>
      <div className={styles.photoGalleryHeader}>
        <span className={styles.photoGalleryTitle}>
          ARCHIVE PHOTOGRAPHS · {era === "heritage" ? "1980s–90s" : "2020s"}
        </span>
        <span className={styles.photoGalleryCounter}>
          PHOTO {(index % total) + 1} OF {total} · {current.name}
        </span>
      </div>

      <div className={styles.photoFrame}>
        <img
          key={current.src}
          src={current.src}
          alt={current.caption}
          className={styles.photoImage}
        />

        {total > 1 && (
          <div className={styles.photoControls}>
            <button
              type="button"
              className={styles.photoNavBtn}
              onClick={prev}
              aria-label="Previous photo (infinite scroll)"
            >
              ← Prev
            </button>
            <button
              type="button"
              className={`${styles.photoNavBtn} ${styles.photoNavBtnPrimary}`}
              onClick={next}
              aria-label="Next photo (infinite scroll)"
            >
              Next Photo ↻
            </button>
          </div>
        )}
      </div>

      {total > 1 && (
        <div className={styles.photoPagination}>
          <div className={styles.photoDots}>
            {photos.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`${styles.photoDot} ${i === index % total ? styles.photoDotActive : ""}`}
                onClick={() => setIndex(i)}
                aria-label={`Go to photo ${i + 1}`}
              />
            ))}
          </div>
          <span className={styles.photoInfiniteNote}>
            Infinite scroll active (loops 1 ⇄ {total})
          </span>
        </div>
      )}
    </div>
  );
}

function EntryModal({ card, era, warping, warpPhase, warpDir, onTimeWarp, onClose }) {
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  const data = card[era] ?? {};
  const other = era === "heritage" ? "modern" : "heritage";
  const otherDecade = other === "heritage" ? "1980s" : "2020s";
  const running = warpPhase !== "idle";
  // back = target is heritage (moving left); fwd = target is modern (moving right)
  const back = running ? warpDir === "back" : other === "heritage";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const previousFocus = document.activeElement;
    const page = document.querySelector(".wrap");
    const previousInert = page?.inert;
    if (page) page.inert = true;
    dialogRef.current?.querySelector("button")?.focus({ preventScroll: true });
    function onKey(e) {
      if (e.key === "Escape") closeRef.current?.();
      if (e.key === "Tab") {
        const items = dialogRef.current?.querySelectorAll('button:not(:disabled), a[href], input, [tabindex="0"]');
        if (!items?.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (page) page.inert = previousInert;
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [mounted]);

  // Freeze page scroll while the popup is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Deconstruct (dis) and rebuild (reb) classes on the popup contents
  const bodyClass = [
    styles.modalBody,
    warpPhase === "dis" ? (back ? styles.disBack : styles.disFwd) : "",
    warpPhase === "reb" ? (back ? styles.rebBack : styles.rebFwd) : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (!mounted) return null;

  const modalContent = (
    <div className={styles.modalOverlay} onClick={() => onClose?.()}>
      <div
        ref={dialogRef}
        className={styles.modal}
        data-era={era}
        data-rebuilding={warpPhase === "reb"}
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

        {/* Rebuild photonic scan edge */}
        {warpPhase === "reb" ? (
          <span
            className={`${styles.rebEdge} ${back ? styles.rebEdgeBack : styles.rebEdgeFwd}`}
            aria-hidden="true"
          />
        ) : null}

        <div className={bodyClass} key={era}>
          <p className={styles.kicker}>
            STORY {card.num} / {data.label}
          </p>
          <h2 className={styles.title}>{card.topic}</h2>
          <div className={styles.modalArchitecture}><StoryIllustration era={era} story={card.num} /><span>{illustrationCaption(era, card.num)}</span></div>
          <ChipRow chips={data.chips} />

          <div className={styles.eraPanel}>
            <p className={styles.eraLabel}>{data.label}</p>
            <h3 className={styles.eraHeadline}>{data.headline}</h3>
            <p className={styles.eraDetails}>{data.details}</p>
            {data.role ? <p className={styles.eraRole}>{data.role}</p> : null}
          </div>

          <ArchivePhotoGallery card={card} era={era} />

          <PriceIndex rows={card.priceIndex} />
        </div>

        {/* Compare in place: warp the popup to the other era */}
        <div className={styles.modalFooter}>
          <button
            type="button"
            className={`${styles.warpBtn} ${back ? styles.warpBtnBack : styles.warpBtnFwd} ${running ? styles.warpBtnRunning : ""}`}
            onClick={() => onTimeWarp?.()}
            disabled={warping}
            aria-label={`Time warp to the ${otherDecade} version of ${card.topic}`}
          >
            {/* Back arrow on left when target is 1980s */}
            {back && (
              <span
                className={`${styles.warpArrow} ${styles.warpArrowLeft} ${running ? styles.warpArrowRunBack : ""}`}
                aria-hidden="true"
              >
                ←
              </span>
            )}

            {/* Energy trail */}
            {running && (
              <span
                className={back ? styles.warpTrailBack : styles.warpTrailFwd}
                aria-hidden="true"
              />
            )}

            <span className={styles.warpLabel}>
              {running
                ? (back ? "RECONSTRUCTING 1980s…" : "MATERIALIZING 2020s…")
                : `TIME WARP · ${otherDecade} · ${other === "heritage" ? "HERITAGE" : "MODERN"}`}
            </span>

            {/* Forward arrow on right when target is 2020s */}
            {!back && (
              <span
                className={`${styles.warpArrow} ${styles.warpArrowRight} ${running ? styles.warpArrowRunFwd : ""}`}
                aria-hidden="true"
              >
                →
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

export default function EntryCards({
  era = "modern",
  count = 5,
  query = "",
  selected = null,
  modalEra = null,
  warping = false,
  warpPhase = "idle",
  warpDir = "fwd",
  onSelect,
  onTimeWarp,
  onClose,
  onClearSearch,
}) {
  const terms = useMemo(() => searchTerms(query), [query]);
  const visible = useMemo(() => cards.filter((c) => matches(c, terms)), [terms]);

  return (
    <section aria-label="Lifestyle categories">
      <p className={styles.count} role="status">
        {terms.length
          ? `${visible.length} of ${cards.length} stories matching “${query}”`
          : `${cards.length} stories to explore · Choose an illustration to step inside`}
      </p>

      {visible.length === 0 ? (
        <div className={styles.empty}>
          <h3>No stories found</h3><p>Try “food”, “school” or “bicycle”, or return to the full collection.</p>
          <button type="button" onClick={onClearSearch}>Show all stories <span aria-hidden="true">↗</span></button>
        </div>
      ) : (
        <div className={styles.grid}>
          {visible.map((c, index) => {
            const data = c[era] ?? {};
            return (
              <article key={`${c.num}-${era}`} className={styles.card} data-era={era} style={{ "--entry-delay": `${index * 90}ms` }}>
                <button
                  type="button"
                  className={styles.cardHit}
                  onClick={() => onSelect?.(c)}
                  aria-haspopup="dialog"
                  aria-label={`Open entry: ${c.topic}`}
                  disabled={warping}
                />
                <div className={styles.cardScene}>
                  <div className={styles.cardMeta}><span>STORY / {c.num}</span><span>{era === "heritage" ? "1980s–90s" : "2020s"}</span></div>
                  <StoryIllustration era={era} story={c.num} />
                  <span className={styles.sceneTag}>{illustrationCaption(era, c.num)}</span>
                </div>
                <div className={styles.cardBody}>
                  <span className={styles.kicker}>
                    {era === "heritage" ? "LIFE BEFORE THE CITY LIGHTS" : "LIFE IN A CONNECTED CAMBODIA"}
                  </span>
                  <h3 className={styles.title}>{c.topic}</h3>
                  <p className={styles.cardDescription}>{data.headline}</p>
                  <div className={styles.chipRow}>
                    {(data.chips ?? []).slice(0, 3).map((chip) => (
                      <span key={chip} className={styles.chip}>
                        {chip.replace(/^[^\p{L}\p{N}]+/u, "")}
                      </span>
                    ))}
                  </div>
                  <div className={styles.cardFooter}><span>Step into the story</span><span aria-hidden="true">↗</span></div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {selected ? (
        <EntryModal
          card={selected}
          era={modalEra ?? era}
          warping={warping}
          warpPhase={warpPhase}
          warpDir={warpDir}
          onTimeWarp={onTimeWarp}
          onClose={onClose}
        />
      ) : null}
    </section>
  );
}
