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
  title: "H.C. Lai",
  description: "Designer of spaces and systems.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* CJK fonts via Google Fonts — kept as <link> since next/font/google
            handles CJK subset sizes poorly (auto-subset misses many glyphs). */}
        {/* Instrument Serif — inline @font-face bypasses CSS compilation pipeline */}
        <style dangerouslySetInnerHTML={{ __html: `
          @font-face {
            font-family: 'Instrument Serif';
            src: url('/fonts/InstrumentSerif-Regular.woff2') format('woff2');
            font-weight: 400;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: 'Instrument Serif';
            src: url('/fonts/InstrumentSerif-Italic.woff2') format('woff2');
            font-weight: 400;
            font-style: italic;
            font-display: swap;
          }
        `}} />
        {/* CJK + Instrument Serif fallback via Google Fonts */}
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
