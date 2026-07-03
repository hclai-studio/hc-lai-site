import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

const INSTRUMENT_SERIF_TTF =
  "https://fonts.gstatic.com/s/instrumentserif/v5/jizBRFtNs2ka5fXjeivQ4LroWlx-2zI.ttf";

export default async function Icon() {
  const fontData = await fetch(INSTRUMENT_SERIF_TTF).then((res) => res.arrayBuffer());

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
