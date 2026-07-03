import { ImageResponse } from "next/og";

export const alt = "H.C. Lai — Designer of spaces and systems.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INSTRUMENT_SERIF_TTF =
  "https://fonts.gstatic.com/s/instrumentserif/v5/jizBRFtNs2ka5fXjeivQ4LroWlx-2zI.ttf";

export default async function Image() {
  const fontData = await fetch(INSTRUMENT_SERIF_TTF).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          backgroundColor: "#F2EFE9",
          paddingLeft: 110,
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
            fontFamily: "Instrument Serif",
            fontSize: 38,
            fontWeight: 400,
            color: "#6B6862",
            marginTop: 28,
          }}
        >
          — Designer of spaces and systems.
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
