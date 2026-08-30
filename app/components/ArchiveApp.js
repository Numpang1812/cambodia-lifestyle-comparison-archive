"use client";

import { useEffect, useRef, useState } from "react";
import collection from "../../collection.config.js";
import EntryCards from "./EntryCards";
import TimeWarp from "./TimeWarp";

const ERAS = [
  { id: "heritage", label: "1980s · HERITAGE" },
  { id: "modern", label: "2020s · MODERN" },
];

// TimeWarp fires onSwap at peak flux (~0.42 of 1.2s)
export default function ArchiveApp() {
  const [era, setEra] = useState("modern");
  const [warping, setWarping] = useState(false);
  const targetRef = useRef("modern");

  // Drive the whole token layer from one attribute
  useEffect(() => {
    document.documentElement.dataset.era = era;
  }, [era]);

  function toggle(next) {
    if (warping || next === era) return;

    // Reduced motion: instant swap, no canvas
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setEra(next);
      return;
    }

    targetRef.current = next;
    setWarping(true);
  }

  function handleSwap() {
    setEra(targetRef.current);
  }

  function handleDone() {
    setWarping(false);
  }

  return (
    <>
      <TimeWarp
        active={warping}
        target={targetRef.current}
        onSwap={handleSwap}
        onDone={handleDone}
      />

      <div className={warping ? "wrap content-warp" : "wrap"}>
        <header className="siteHeader">
          <p className="kicker">Khmer Living Archive</p>
          <h1 className="title">{collection.name}</h1>
          <p className="description">{collection.description}</p>

          <div className="eraToggle" role="group" aria-label="Switch era">
            {ERAS.map((e) => (
              <button
                key={e.id}
                type="button"
                className={era === e.id ? "eraBtn active" : "eraBtn"}
                onClick={() => toggle(e.id)}
                disabled={warping}
                aria-pressed={era === e.id}
              >
                {e.label}
              </button>
            ))}
          </div>

          <div className="infoGrid">
            <div className="infoCard">
              <p className="cardLabel">CURATED BY</p>
              <p className="cardValue">{collection.curator}</p>
            </div>
            <div className="infoCard">
              <p className="cardLabel">SOURCE</p>
              <p className="cardValue">{collection.source}</p>
            </div>
          </div>
        </header>

        <EntryCards era={era} count={collection.entries?.length ?? 5} />

        <footer className="footer">
          Built in ICT 340 — Vibe Coding, American University of Phnom Penh,
          Fall 2026. This archive is under construction all semester. Come back
          in December.
        </footer>
      </div>
    </>
  );
}