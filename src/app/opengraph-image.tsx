import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Paste Pad — Share text snippets instantly";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0f1117",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 96,
            height: 96,
            borderRadius: 24,
            background: "#0d9488",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            width={48}
            height={48}
          >
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
          </svg>
        </div>
        <div
          style={{
            fontSize: 80,
            fontWeight: 700,
            color: "white",
            letterSpacing: "-2px",
          }}
        >
          Paste<span style={{ color: "#0d9488" }}>Pad</span>
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#a8a29e",
            marginTop: -8,
          }}
        >
          Share text snippets instantly
        </div>
      </div>
    ),
    { ...size }
  );
}
