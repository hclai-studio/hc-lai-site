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
        {/* CJK fonts via Google Fonts — kept as <link> since next/font/google
            handles CJK subset sizes poorly (auto-subset misses many glyphs). */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Noto+Serif+SC:wght@400;700&family=Noto+Sans+SC:wght@400;700&display=swap"
          rel="stylesheet"
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
