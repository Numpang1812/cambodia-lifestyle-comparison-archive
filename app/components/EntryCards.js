"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./entry-cards.module.css";
import StoryIllustration from "./StoryIllustration";
import SearchExcerpt from "./SearchExcerpt";
import { translations, getTranslatedCard } from "../lib/translations";
import { searchTerms, scoreCard, filterCardsByTerms } from "../lib/search";

export { searchTerms };

export function matches(c, terms, era = null) {
  return scoreCard(c, terms, "", era) > 0;
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

export function getCardImages(card, era) {
  if (!card) return [];
  const cfg = card.imageConfig || card.image_config || {};

  const topicLabel =
    typeof card.topic === "object"
      ? card.topic?.en || card.topic?.km || ""
      : card.topic || "Archive Entry";

  // Build image URL using image_config
  if (cfg.url && typeof cfg.url === "string") {
    return [
      {
        src: cfg.url,
        name: "entry-photo",
        caption: topicLabel,
      },
    ];
  }

  if (cfg.path && typeof cfg.path === "string") {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const bucket = cfg.bucket || "photos";
    const src = cfg.path.startsWith("http")
      ? cfg.path
      : `${supabaseUrl}/storage/v1/object/public/${bucket}/${cfg.path}`;
    return [
      {
        src,
        name: "entry-photo",
        caption: topicLabel,
      },
    ];
  }

  if (
    card.image &&
    typeof card.image === "string" &&
    (card.image.startsWith("http://") ||
      card.image.startsWith("https://") ||
      card.image.startsWith("/"))
  ) {
    return [
      {
        src: card.image,
        name: "entry-photo",
        caption: topicLabel,
      },
    ];
  }

  const folder = cfg.folder || card.slug;
  if (!folder) return [];

  // Strictly separate eras: past(n) for heritage, present(n) for modern
  const isHeritage = era === "heritage";
  const prefix = isHeritage ? cfg.pastPrefix || "past" : cfg.presentPrefix || "present";
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

function ArchivePhotoGallery({ card, era, lang = "en" }) {
  const t = translations[lang] || translations.en;
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
    if (folder && !card.imageConfig?.url && !card.imageConfig?.path && !card.image) {
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

  if (!total) return null;

  // Infinite scroll handlers — loops seamlessly from end to beginning
  const next = () => setIndex((prev) => (prev + 1) % total);
  const prev = () => setIndex((prev) => (prev - 1 + total) % total);

  const current = photos[index % total];
  if (!current) return null;

  return (
    <div className={styles.photoGallery}>
      <div className={styles.photoGalleryHeader}>
        <span className={styles.photoGalleryTitle}>{t.archivePhotosTitle(isHeritage)}</span>
        <span className={styles.photoGalleryCounter}>
          {t.photoCounter((index % total) + 1, total)}
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
              aria-label={t.prevPhoto}
            >
              {t.prevPhoto}
            </button>
            <button
              type="button"
              className={`${styles.photoNavBtn} ${styles.photoNavBtnPrimary}`}
              onClick={next}
              aria-label={t.nextPhoto}
            >
              {t.nextPhoto}
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
          <span className={styles.photoInfiniteNote}>{t.infiniteScrollNote(total)}</span>
        </div>
      )}
    </div>
  );
}

function EntryModal({
  card,
  era,
  lang = "en",
  currentUser = null,
  warping,
  warpPhase,
  warpDir,
  onTimeWarp,
  onClose,
  onDelete,
}) {
  const t = translations[lang] || translations.en;
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  const data = card[era] ?? {};
  const other = era === "heritage" ? "modern" : "heritage";
  const running = warpPhase !== "idle";
  // back = target is heritage (moving left); fwd = target is modern (moving right)
  const back = running ? warpDir === "back" : other === "heritage";
  const otherAvailable = Boolean(card[other]);

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
        const items = dialogRef.current?.querySelectorAll(
          'button:not(:disabled), a[href], input, [tabindex="0"]'
        );
        if (!items?.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
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

  const rawStoryNum = card.rawNum || card.num;

  const modalContent = (
    <div className={styles.modalOverlay} onClick={() => onClose?.()}>
      <div
        ref={dialogRef}
        className={styles.modal}
        data-era={era}
        data-rebuilding={!otherAvailable && warpPhase === "reb"}
        role="dialog"
        aria-modal="true"
        aria-labelledby="entry-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={styles.modalClose}
          onClick={() => onClose?.()}
          aria-label={t.closeEntry}
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

        <header>
          <p className={styles.kicker}>
            {t.storyLabel} {card.num} / {data.label}
          </p>
          <h2 id="entry-modal-title" className={styles.title}>
            {data.headline || card.topic}
          </h2>
          {data.headline && data.headline !== card.topic ? (
            <p className={styles.eraLabel}>{card.topic}</p>
          ) : null}
        </header>

        {otherAvailable && (
          <div
            className={styles.panorama}
            role="group"
            aria-label={lang === "km" ? "ប្រៀបធៀបសម័យ" : "Compare eras"}
            data-expanded={running ? (back ? "heritage" : "modern") : era}
            data-running={running}
          >
            {["heritage", "modern"].map((choice) => {
              const past = choice === "heritage";
              const active = choice === era;
              const decade = past ? t.eraPastDecade : t.eraPresentDecade;
              const cue = past
                ? lang === "km"
                  ? "← មើលអតីតកាល"
                  : "← View past"
                : lang === "km"
                  ? "មើលបច្ចុប្បន្ន →"
                  : "View present →";
              return (
                <button
                  key={choice}
                  type="button"
                  className={styles.eraScene}
                  data-era={choice}
                  aria-label={active ? decade : cue}
                  aria-pressed={active}
                  aria-disabled={active || warping}
                  onClick={() => !warping && !active && onTimeWarp?.()}
                >
                  <StoryIllustration era={choice} story={rawStoryNum} topic={card} lang={lang} />
                  <span>{active ? decade : cue}</span>
                </button>
              );
            })}
          </div>
        )}

        {!otherAvailable && (
          <p className={styles.eraLabel}>
            {era === "heritage"
              ? lang === "km"
                ? "មិនទាន់មានសាច់រឿងសម័យបច្ចុប្បន្នទេ។"
                : "No present-day version yet."
              : lang === "km"
                ? "មិនទាន់មានសាច់រឿងសម័យអតីតកាលទេ។"
                : "No past version yet."}
          </p>
        )}

        <ArchivePhotoGallery key={era} card={card} era={era} lang={lang} />

        <div className={bodyClass} key={`body-${era}`}>
          <div className={styles.eraPanel}>
            <p className={styles.eraDetails} style={{ whiteSpace: "pre-line" }}>
              {data.details}
            </p>
            {data.role ? <p className={styles.eraRole}>{data.role}</p> : null}
            {data.source ? (
              <div className={styles.eraSource}>
                <span className={styles.sourceTag}>
                  {t.cardSourceLabel || t.source || "SOURCE"}:
                </span>{" "}
                {data.source}
              </div>
            ) : null}
          </div>

          <ChipRow chips={data.chips} />
        </div>

        {currentUser?.id && card?.owner && currentUser.id === card.owner ? (
          <div className={styles.modalFooter}>
            <div className={styles.ownerControls}>
              <a
                href={`/contribute?edit=${card.id}`}
                className={styles.editEntryBtn}
                aria-label="Edit this archive entry"
              >
                <span aria-hidden="true">✎</span> {lang === "km" ? "កែប្រែព័ត៌មាន" : "Edit Entry"}
              </a>
              <button
                type="button"
                className={styles.deleteEntryBtn}
                onClick={() => onDelete?.(card)}
                aria-label="Delete this archive entry"
              >
                <span aria-hidden="true">✕</span> {lang === "km" ? "លុបព័ត៌មាន" : "Delete Entry"}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

export default function EntryCards({
  cards = [],
  loading = false,
  era = "modern",
  lang = "en",
  count = 5,
  query = "",
  selected = null,
  modalEra = null,
  warping = false,
  warpPhase = "idle",
  warpDir = "fwd",
  currentUser = null,
  onSelect,
  onTimeWarp,
  onClose,
  onClearSearch,
  onDelete,
}) {
  const t = translations[lang] || translations.en;
  const terms = useMemo(() => searchTerms(query), [query]);

  // Keyword-based search matching scoped to the active era (past vs present):
  // When browsing 1980s Heritage, queries search only past entries and keywords;
  // when browsing 2020s Modern, queries search only present entries and keywords.
  const eraCards = useMemo(() => cards.filter((c) => Boolean(c[era])), [cards, era]);
  const visibleRaw = useMemo(
    () => filterCardsByTerms(eraCards, terms, query, era),
    [eraCards, terms, query, era]
  );
  const visible = useMemo(
    () => visibleRaw.map((c) => getTranslatedCard(c, lang, era)),
    [visibleRaw, lang, era]
  );

  const translatedSelected = useMemo(
    () => (selected ? getTranslatedCard(selected, lang, modalEra ?? era) : null),
    [selected, lang, modalEra, era]
  );

  return (
    <section aria-label="Lifestyle categories">
      <p className={styles.count} role="status">
        {loading
          ? lang === "km"
            ? "កំពុងផ្ទុកទិន្នន័យបណ្ណសារ..."
            : "Loading archive entries..."
          : terms.length
            ? t.storiesCountMatch(visible.length, eraCards.length)
            : t.storiesCountAll(eraCards.length)}
      </p>

      {loading ? (
        <div className={styles.loadingState} role="status">
          <div className={styles.loadingSpinner} aria-hidden="true" />
          <p>
            {lang === "km"
              ? "កំពុងទាញយកទិន្នន័យពី Supabase..."
              : "Loading entries from Supabase..."}
          </p>
        </div>
      ) : cards.length === 0 ? (
        <div className={styles.empty} role="status">
          <h3>
            {lang === "km"
              ? "មិនទាន់មានទិន្នន័យនៅក្នុងបណ្ណសារនៅឡើយទេ"
              : "No entries in the archive yet"}
          </h3>
          <p>
            {lang === "km"
              ? "មិនទាន់មានរឿងរ៉ាវនៅឡើយទេ។ សូមត្រឡប់មកមើលនៅពេលក្រោយ។"
              : "No stories yet. Please check back later."}
          </p>
        </div>
      ) : visible.length === 0 ? (
        <div className={styles.empty}>
          <h3>{t.noStoriesFound}</h3>
          <p>{t.noStoriesHint}</p>
          <button type="button" onClick={onClearSearch}>
            {t.showAllStories} <span aria-hidden="true">↗</span>
          </button>
        </div>
      ) : (
        <div className={styles.grid}>
          {visible.map((c, index) => {
            const data = c[era] ?? {};
            const rawStoryNum = c.rawNum || c.num;
            return (
              <article
                key={`${c.rawNum || c.num}-${era}`}
                className={styles.card}
                data-era={era}
                style={{ "--entry-delay": `${index * 90}ms` }}
              >
                <button
                  type="button"
                  className={styles.cardHit}
                  onClick={() => {
                    const raw = cards.find((r) => r.num === c.rawNum || r.num === c.num) || c;
                    onSelect?.(raw);
                  }}
                  aria-haspopup="dialog"
                  aria-label={`${t.stepIntoStory}: ${data.headline || c.topic}`}
                  disabled={warping}
                />
                <div className={styles.cardScene}>
                  <div className={styles.cardMeta}>
                    <span>
                      {t.storyLabel} / {c.num}
                    </span>
                    <span>
                      {era === "heritage"
                        ? lang === "km"
                          ? "ទសវត្សរ៍ ៨០–៩០"
                          : "1980s–90s"
                        : lang === "km"
                          ? "ទសវត្សរ៍ ២០២០"
                          : "2020s"}
                    </span>
                  </div>
                  <StoryIllustration era={era} story={rawStoryNum} topic={c} lang={lang} />
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.title}>{data.headline || c.topic}</h3>
                  {terms.length ? (
                    <p className={styles.cardDescription}>
                      <SearchExcerpt card={visibleRaw[index]} era={era} terms={terms} lang={lang} />
                    </p>
                  ) : typeof data.details === "string" && data.details.trim() ? (
                    <p className={styles.cardDescription}>{data.details}</p>
                  ) : null}
                  <div className={styles.cardFooter}>
                    <span>{t.stepIntoStory}</span>
                    <span aria-hidden="true">↗</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {translatedSelected ? (
        <EntryModal
          card={translatedSelected}
          era={modalEra ?? era}
          lang={lang}
          currentUser={currentUser}
          warping={warping}
          warpPhase={warpPhase}
          warpDir={warpDir}
          onTimeWarp={onTimeWarp}
          onClose={onClose}
          onDelete={onDelete}
        />
      ) : null}
    </section>
  );
}
