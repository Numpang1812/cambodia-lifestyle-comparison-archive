"use client";

export default function Atmosphere({ era, paused }) {
  return (
    <div className="atmosphere" data-scene={era} data-paused={paused} aria-hidden="true">
      <div className="atmosphere-glow" />
      <div className="atmosphere-grid" />
      <div className="dust-cloud dust-cloud-one" /><div className="dust-cloud dust-cloud-two" />
      {Array.from({ length: 56 }, (_, i) => (
        <i key={i} className="atmosphere-particle" style={{
          "--x": `${(i * 37.7 + 3) % 100}%`, "--y": `${(i * 23.3 + 7) % 100}%`,
          "--size": `${i % 7 === 0 ? 3 : 1.5}px`, "--duration": `${16 + i % 13}s`,
          "--delay": `${-i * 1.7}s`, "--alpha": .2 + (i % 5) * .12,
        }} />
      ))}
    </div>
  );
}
