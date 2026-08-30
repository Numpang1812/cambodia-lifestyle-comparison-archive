import {
  Space_Grotesk,
  Playfair_Display,
  Courier_Prime,
} from "next/font/google";
import "./globals.css";
import collection from "../collection.config.js";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["500", "600", "700"],
});

const courier = Courier_Prime({
  subsets: ["latin"],
  variable: "--font-courier",
  weight: ["400", "700"],
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
      className={`${grotesk.variable} ${playfair.variable} ${courier.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
