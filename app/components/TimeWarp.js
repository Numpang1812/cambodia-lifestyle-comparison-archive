"use client";

import { useEffect, useRef } from "react";

/**
 * Time Warp Engine — horizontal hyperspace sweep, pure <canvas>,
 * 1.2s, ~220 GPU-light streak particles via rAF.
 *
 * Phase 1 (0.00–0.40s): stars accelerate left→right, stretch into
 *                       motion-blur streaks (variable velocities).
 * Phase 2 (0.40–0.80s): peak flux — flash spikes; onSwap() fires once
 *                       so the era/theme swap lands under peak blur.
 * Phase 3 (0.80–1.20s): streaks decelerate, resolve, onDone() fires.
 *
 * Memory-safe: single rAF handle, listener cleanup on unmount/deactivate.
 */

const DURATION = 1200; // ms
const STAR_COUNT = 220;

// Timeline fractions
const ACCEL_END = 0.34; // 0.00–0.40s
const PEAK_END = 0.67; // 0.40–0.80s (peak flux window)

const TINTS = {
  modern: [0, 242, 254], // electric cyan
  heritage: [200, 138, 62], // dusty amber
};

export default function TimeWarp({ active, target, onSwap, onDone }) {
  const canvasRef = useRef(null);
  const cbs = useRef({});
  cbs.current = { onSwap, onDone };

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let swapFired = false;
    let raf = 0;

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    const tint = TINTS[target] ?? TINTS.modern;
    const rgb = tint.join(",");

    // Star field — x position, horizontal velocity, thickness
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      v: (0.4 + Math.random() * 1.6) * dpr,
      w: (1 + Math.random() * 1.5) * dpr,
    }));

    const start = performance.now();

    const draw = (now) => {
      const t = (now - start) / DURATION;

      if (t >= 1) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cbs.current.onDone?.();
        return;
      }

      if (!swapFired && t >= ACCEL_END) {
        swapFired = true;
        cbs.current.onSwap?.();
      }

      // Velocity curve: quadratic accel → hold → linear decel
      let speed;
      if (t < ACCEL_END) {
        const p = t / ACCEL_END;
        speed = 4 + 30 * p * p;
      } else if (t < PEAK_END) {
        speed = 34;
      } else {
        speed = 2 + 32 * (1 - (t - PEAK_END) / (1 - PEAK_END));
      }

      // Flash intensity: sine spike across peak flux window
      let flash = 0;
      if (t >= ACCEL_END && t < PEAK_END) {
        const p = (t - ACCEL_END) / (PEAK_END - ACCEL_END);
        flash = Math.sin(p * Math.PI);
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Era tint wash at peak
      if (flash > 0) {
        ctx.fillStyle = `rgba(${rgb},${(flash * 0.2).toFixed(3)})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Streaks — motion-blur tails scale with velocity
      const alpha = (0.25 + flash * 0.55).toFixed(3);
      ctx.strokeStyle = `rgba(${rgb},${alpha})`;
      for (const s of stars) {
        s.x += s.v * speed;
        if (s.x - 60 * dpr > canvas.width) {
          s.x = -Math.random() * 40 * dpr;
          s.y = Math.random() * canvas.height;
        }
        const len = Math.max(2 * dpr, s.v * speed * 0.35);
        ctx.lineWidth = s.w;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(Math.max(0, s.x - len), s.y);
        ctx.stroke();
      }

      // White core flash at peak
      if (flash > 0) {
        ctx.fillStyle = `rgba(255,255,255,${(flash * 0.32).toFixed(3)})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [active, target]);

  return (
    <canvas
      ref={canvasRef}
      className={`warp-canvas${active ? " active" : ""}`}
      aria-hidden="true"
    />
  );
}