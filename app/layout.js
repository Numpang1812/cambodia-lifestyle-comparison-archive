import { Kantumruy_Pro, Moulpali } from "next/font/google";
import "./globals.css";
import collection from "../collection.config.js";

const kantumruy = Kantumruy_Pro({
  subsets: ["khmer", "latin"],
  variable: "--font-kantumruy",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const moulpali = Moulpali({
  subsets: ["khmer", "latin"],
  weight: "400",
  variable: "--font-moulpali",
  display: "swap",
});

export const metadata = {
  title: `${collection.name} — Khmer Living Archive`,
  description: collection.description,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-era="modern"
      className={`${kantumruy.variable} ${moulpali.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
