import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "H.C. Lai — Designer of spaces and systems.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const fontsDir = join(process.cwd(), "app/fonts");
  const serifRegular = await readFile(join(fontsDir, "InstrumentSerif-Regular-OG.ttf"));
  const serifItalic = await readFile(join(fontsDir, "InstrumentSerif-Italic-OG.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F2EFE9",
        }}
      >
        <div
          style={{
            fontFamily: "Instrument Serif",
            fontSize: 150,
            fontWeight: 400,
            color: "#1C1B17",
            lineHeight: 1,
          }}
        >
          H.C. Lai
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            marginTop: 28,
            fontSize: 38,
            transform: "translateX(-6px)",
          }}
        >
          <span style={{ fontFamily: "Instrument Serif", color: "#1C1B17", marginRight: 8 }}>
            —
          </span>
          <span style={{ fontFamily: "Instrument Serif", fontStyle: "italic", color: "#6B6862" }}>
            Designer of
          </span>
          <span style={{ fontFamily: "Instrument Serif", color: "#1C1B17", marginLeft: 8 }}>
            spaces and systems.
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Instrument Serif", data: serifRegular, style: "normal", weight: 400 },
        { name: "Instrument Serif", data: serifItalic, style: "italic", weight: 400 },
      ],
    }
  );
}
