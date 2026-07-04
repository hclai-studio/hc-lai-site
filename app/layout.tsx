import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/app/components/Header";

const geist = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});


export const metadata: Metadata = {
  metadataBase: new URL("https://hclai.studio"),
  title: {
    default: "H.C. Lai — Designer of spaces and systems.",
    template: "%s — H.C. Lai",
  },
  description: "五个 AI 项目的完整记录：从视觉标准判定到手写 RAG 管线。",
  openGraph: {
    title: "H.C. Lai — Designer of spaces and systems.",
    description: "五个 AI 项目的完整记录：从视觉标准判定到手写 RAG 管线。",
    url: "/",
    siteName: "H.C. Lai",
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "H.C. Lai — Designer of spaces and systems.",
    description: "五个 AI 项目的完整记录：从视觉标准判定到手写 RAG 管线。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* Instrument Serif latin subset (regular + italic) — the two files every
            page needs immediately; CJK slices load on demand via unicode-range. */}
        <link
          rel="preload"
          href="/fonts/instrument-serif/jizBRFtNs2ka5fXjeivQ4LroWlx-6zUTjnTLgNs.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/instrument-serif/jizHRFtNs2ka5fXjeivQ4LroWlx-6zAjjH7Motmp5g.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* Chiron Sung HK — single character-subset file (was 109 unicode-range slices) */}
        <link
          rel="preload"
          href="/fonts/chiron-sung-subset/chiron-sung-hk-subset.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* Noto Sans SC 400 — most widely used weight (card/header subtitles, above the
            fold on every page); 700 loads via swap, it's only below the fold in article h2/h3. */}
        <link
          rel="preload"
          href="/fonts/noto-sans-sc-subset/noto-sans-sc-400-subset.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geist.variable} ${geistMono.variable} font-sans antialiased bg-cream text-ink`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
