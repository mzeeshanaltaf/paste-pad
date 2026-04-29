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
          fontFamily: "sans-serif",
        }}
      >
        {/* Teal accent bar at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "#0d9488",
            display: "flex",
          }}
        />

        {/* Logo badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 88,
            height: 88,
            borderRadius: 20,
            background: "#0d9488",
            marginBottom: 32,
          }}
        >
          {/* Clipboard icon — pure rectangles, no SVG path */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 5,
            }}
          >
            <div
              style={{
                width: 28,
                height: 8,
                borderRadius: 4,
                background: "white",
                display: "flex",
              }}
            />
            <div
              style={{
                width: 36,
                height: 6,
                borderRadius: 3,
                background: "rgba(255,255,255,0.7)",
                display: "flex",
              }}
            />
            <div
              style={{
                width: 36,
                height: 6,
                borderRadius: 3,
                background: "rgba(255,255,255,0.7)",
                display: "flex",
              }}
            />
            <div
              style={{
                width: 28,
                height: 6,
                borderRadius: 3,
                background: "rgba(255,255,255,0.5)",
                display: "flex",
              }}
            />
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            fontSize: 88,
            fontWeight: 700,
            letterSpacing: "-3px",
            lineHeight: 1,
          }}
        >
          <span style={{ color: "white" }}>Paste</span>
          <span style={{ color: "#0d9488" }}>Pad</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            fontSize: 34,
            color: "#a8a29e",
            marginTop: 20,
            letterSpacing: "-0.5px",
          }}
        >
          Share text snippets instantly — no account needed
        </div>

        {/* CTA pill */}
        <div
          style={{
            display: "flex",
            marginTop: 40,
            background: "#0d9488",
            borderRadius: 50,
            paddingLeft: 36,
            paddingRight: 36,
            paddingTop: 14,
            paddingBottom: 14,
            fontSize: 26,
            fontWeight: 600,
            color: "white",
            letterSpacing: "0.2px",
          }}
        >
          Create a free paste →
        </div>

        {/* Domain */}
        <div
          style={{
            position: "absolute",
            bottom: 36,
            display: "flex",
            fontSize: 22,
            color: "#57534e",
            letterSpacing: "0.5px",
          }}
        >
          paste.zeeshanai.cloud
        </div>
      </div>
    ),
    { ...size }
  );
}
