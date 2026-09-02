import type { Metadata } from "next";
import "@fontsource/quicksand/300.css";
import "@fontsource/quicksand/400.css";
import "@fontsource/quicksand/500.css";
import "@fontsource/quicksand/600.css";
import "@fontsource/quicksand/700.css";
import "./globals.css";

// Stand-in for heva's proprietary "madeCarvingSoft" typeface — see
// STYLE_GUIDE.md. Swap this for the real font once you have the licensed
// files (or a webfont link) from heva.
export const metadata: Metadata = {
  title: "heva sprint scaffold",
  description: "Blank-canvas prototype scaffold for the Head of Product design sprint.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
