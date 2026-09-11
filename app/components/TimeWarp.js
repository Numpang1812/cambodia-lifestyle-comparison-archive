"use client";

import { useEffect, useRef } from "react";

export const WARP_TIMING = { full: { duration: 2100, swap: 420 }, quick: { duration: 1700, swap: 320 } };

export default function TimeWarp({ active, target, onSwap, onDone, mode = "full" }) {
  const canvasRef = useRef(null);
  const callbacks = useRef({ onSwap, onDone });
  callbacks.current = { onSwap, onDone };

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!ctx || reduced.matches) {
      callbacks.current.onSwap?.();
      callbacks.current.onDone?.();
      return;
    }
    const { duration, swap } = WARP_TIMING[mode];
    let frame;
    let swapped = false;
    let width = 0;
    let height = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
    const start = performance.now();
    const tint = target === "heritage" ? "235,178,112" : "145,228,216";
    const direction = target === "heritage" ? -1 : 1;
    const particles = Array.from({ length: mode === "quick" ? 55 : 100 }, (_, i) => ({
      angle: i * 2.39996, distance: .08 + (i % 17) / 22, speed: .4 + (i % 7) / 9,
    }));
    const draw = (now) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      // Swap even when a background tab resumes after the full duration.
      if (!swapped && elapsed >= swap) {
        swapped = true;
        callbacks.current.onSwap?.();
      }
      ctx.clearRect(0, 0, width, height);
      if (t >= 1 || reduced.matches) {
        if (!swapped) callbacks.current.onSwap?.();
        callbacks.current.onDone?.();
        return;
      }
      const pulse = Math.pow(Math.sin(Math.PI * t), 2);
      const opacity = Math.sin(Math.PI * Math.min(t / .5, 1)) * .32;
      const cx = width * .55;
      const cy = height * .42;
      const reach = Math.hypot(width, height) * .6;
      ctx.strokeStyle = `rgba(${tint},${Math.max(0, opacity)})`;
      ctx.lineWidth = 1;
      for (const p of particles) {
        const radius = ((p.distance + direction * t * p.speed + 2) % 1) * reach;
        const tail = radius - direction * (8 + pulse * 70) * p.speed;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(p.angle) * tail, cy + Math.sin(p.angle) * tail);
        ctx.lineTo(cx + Math.cos(p.angle) * radius, cy + Math.sin(p.angle) * radius);
        ctx.stroke();
      }
      // Transparent construction plane leaves the rebuilding components visible.
      const progress = Math.max(0, (elapsed - swap) / (duration - swap));
      if (progress > 0) {
        const x = width * (direction === 1 ? progress : 1 - progress);
        const glow = ctx.createLinearGradient(x - 55, 0, x + 55, 0);
        glow.addColorStop(0, `rgba(${tint},0)`);
        glow.addColorStop(.5, `rgba(${tint},${.09 * Math.sin(progress * Math.PI)})`);
        glow.addColorStop(1, `rgba(${tint},0)`);
        ctx.fillStyle = glow;
        ctx.fillRect(x - 55, 0, 110, height);
      }
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      ctx.clearRect(0, 0, width, height);
    };
  }, [active, target, mode]);

  return <canvas ref={canvasRef} className={`warp-canvas${active ? " active" : ""}`} aria-hidden="true" />;
}
