"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./entry-cards.module.css";
import StoryIllustration, { illustrationCaption } from "./StoryIllustration";
import {
  translations,
  rawCardsData as cards,
  getTranslatedCard,
} from "../lib/translations";
import {
  searchTerms,
  scoreCard,
  filterCardsByTerms,
} from "../lib/search";

export { cards, searchTerms };

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

function PriceIndex({ rows, title }) {
  if (!rows?.length) return null;
  return (
    <div className={styles.priceIndex}>
      <p className={styles.priceTitle}>{title || "PRICE INDEX — 1980s ⇄ 2020s"}</p>
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
    return (
      <div className={styles.photoGallery}>
        <div className={styles.photoGalleryHeader}>
          <span className={styles.photoGalleryTitle}>
            {t.archivePhotosTitle(isHeritage)}
          </span>
          <span className={styles.photoGalleryCounter}>
            {lang === "km" ? "០ រូបថត" : "0 PHOTOGRAPHS"}
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
              {t.noPhotosTitle(isHeritage)}
            </p>
            <p className={styles.placeholderText}>
              {t.noPhotosDesc(isHeritage, card.topic)}
            </p>
            <span className={styles.placeholderBadge}>
              {t.photoPatternBadge(prefix, folder)}
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
          {t.archivePhotosTitle(isHeritage)}
        </span>
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
          <span className={styles.photoInfiniteNote}>
            {t.infiniteScrollNote(total)}
          </span>
        </div>
      )}
    </div>
  );
}

function EntryModal({ card, era, lang = "en", warping, warpPhase, warpDir, onTimeWarp, onClose }) {
  const t = translations[lang] || translations.en;
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  const data = card[era] ?? {};
  const other = era === "heritage" ? "modern" : "heritage";
  const otherDecade = other === "heritage" ? (lang === "km" ? "ទសវត្សរ៍ ៨០" : "1980s") : (lang === "km" ? "ទសវត្សរ៍ ២០២០" : "2020s");
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

  const rawStoryNum = card.rawNum || card.num;

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

        {/* Rebuild photonic scan edge */}
        {warpPhase === "reb" ? (
          <span
            className={`${styles.rebEdge} ${back ? styles.rebEdgeBack : styles.rebEdgeFwd}`}
            aria-hidden="true"
          />
        ) : null}

        <div className={bodyClass} key={era}>
          <p className={styles.kicker}>
            {t.storyLabel} {card.num} / {data.label}
          </p>
          <h2 className={styles.title}>{card.topic}</h2>
          <div className={styles.modalArchitecture}>
            <StoryIllustration era={era} story={rawStoryNum} lang={lang} />
            <span>{illustrationCaption(era, rawStoryNum, lang)}</span>
          </div>
          <ChipRow chips={data.chips} />

          <div className={styles.eraPanel}>
            <p className={styles.eraLabel}>{data.label}</p>
            <h3 className={styles.eraHeadline}>{data.headline}</h3>
            <p className={styles.eraDetails} style={{ whiteSpace: "pre-line" }}>{data.details}</p>
            {data.role ? <p className={styles.eraRole}>{data.role}</p> : null}
            {data.source ? (
              <div className={styles.eraSource}>
                <span className={styles.sourceTag}>{t.cardSourceLabel || t.source || "SOURCE"}:</span> {data.source}
              </div>
            ) : null}
          </div>

          <ArchivePhotoGallery card={card} era={era} lang={lang} />

          <PriceIndex rows={card.priceIndex} title={t.priceIndexTitle} />
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
                ? (back ? t.warpingToPast : t.warpingToPresent)
                : (back ? t.warpToPast : t.warpToPresent)}
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
  lang = "en",
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
  const t = translations[lang] || translations.en;
  const terms = useMemo(() => searchTerms(query), [query]);

  // Keyword-based search matching scoped to the active era (past vs present):
  // When browsing 1980s Heritage, queries search only past entries and keywords;
  // when browsing 2020s Modern, queries search only present entries and keywords.
  const visibleRaw = useMemo(
    () => filterCardsByTerms(cards, terms, query, era),
    [terms, query, era]
  );
  const visible = useMemo(
    () => visibleRaw.map((c) => getTranslatedCard(c, lang)),
    [visibleRaw, lang]
  );

  const translatedSelected = useMemo(
    () => (selected ? getTranslatedCard(selected, lang) : null),
    [selected, lang]
  );

  return (
    <section aria-label="Lifestyle categories">
      <p className={styles.count} role="status">
        {terms.length
          ? t.storiesCountMatch(visible.length, cards.length)
          : t.storiesCountAll}
      </p>

      {visible.length === 0 ? (
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
                  aria-label={`Open entry: ${c.topic}`}
                  disabled={warping}
                />
                <div className={styles.cardScene}>
                  <div className={styles.cardMeta}>
                    <span>{t.storyLabel} / {c.num}</span>
                    <span>{era === "heritage" ? (lang === "km" ? "ទសវត្សរ៍ ៨០–៩០" : "1980s–90s") : (lang === "km" ? "ទសវត្សរ៍ ២០២០" : "2020s")}</span>
                  </div>
                  <StoryIllustration era={era} story={rawStoryNum} lang={lang} />
                  <span className={styles.sceneTag}>{illustrationCaption(era, rawStoryNum, lang)}</span>
                </div>
                <div className={styles.cardBody}>
                  <span className={styles.kicker}>
                    {era === "heritage" ? t.kickerHeritage : t.kickerModern}
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
                  {data.source ? (
                    <div className={styles.cardSource}>
                      <span className={styles.cardSourceLabel}>{t.cardSourceLabel || "Source"}:</span> {data.source}
                    </div>
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
