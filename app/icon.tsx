import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default async function Icon() {
  const fontData = await readFile(join(process.cwd(), "app/fonts/InstrumentSerif-Regular-OG.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F2EFE9",
        }}
      >
        <div
          style={{
            fontFamily: "Instrument Serif",
            fontSize: 300,
            color: "#1C1B17",
            transform: "translateY(-18px)",
          }}
        >
          H.
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Instrument Serif",
          data: fontData,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
