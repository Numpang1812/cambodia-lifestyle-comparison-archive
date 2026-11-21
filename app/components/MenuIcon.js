"use client";

// Single consistent stroke icon set for the settings dropdown. All use
// currentColor so a parent rule can colour them uniformly.
const PATHS = {
  play: <path d="M8 5.5l10 6.5-10 6.5z" />,
  pause: <path d="M9 5v14M15 5v14" />,
  entries: (
    <>
      <path d="M8 6h11M8 12h11M8 18h11" />
      <path d="M4 6h.01M4 12h.01M4 18h.01" />
    </>
  ),
  review: (
    <>
      <path d="M12 3l7 3v5c0 4.4-3 8-7 10-4-2-7-5.6-7-10V6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  logout: (
    <>
      <path d="M15 4h3a1 1 0 011 1v14a1 1 0 01-1 1h-3" />
      <path d="M10 12h10" />
      <path d="M16 8l4 4-4 4" />
    </>
  ),
  login: (
    <>
      <path d="M10 4H7a1 1 0 00-1 1v14a1 1 0 001 1h3" />
      <path d="M4 12h10" />
      <path d="M10 8l4 4-4 4" />
    </>
  ),
  signup: (
    <>
      <circle cx="10" cy="9" r="3" />
      <path d="M4 20c0-3 2.7-5 6-5" />
      <path d="M18 8v6M15 11h6" />
    </>
  ),
};

export default function MenuIcon({ name }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name] || null}
    </svg>
  );
}
