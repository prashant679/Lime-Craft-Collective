import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const alt = "Lime Craft Collective — Handcrafted Luxury Textures";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F7F3E8",
          border: "16px solid #C1592E",
          padding: "60px 40px",
        }}
      >
        {/* Brand Kicker */}
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#C1592E",
            marginBottom: 24,
            fontWeight: 700,
          }}
        >
          Lime Craft Collective
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            fontSize: 56,
            fontWeight: 700,
            color: "#1F1A15",
            textAlign: "center",
            marginBottom: 24,
            lineHeight: 1.15,
          }}
        >
          Handcrafted Luxury Textures
        </div>

        {/* Subtitle */}
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#6B6259",
            textAlign: "center",
            maxWidth: "840px",
            lineHeight: 1.5,
          }}
        >
          Transforming raw concrete into elegant architectural statements across residential and commercial spaces.
        </div>

        {/* Badges / Finishes */}
        <div
          style={{
            display: "flex",
            marginTop: 40,
            gap: "24px",
          }}
        >
          {["Micro Concrete", "Limewash", "Textured Finish", "Terrazzo"].map((item) => (
            <div
              key={item}
              style={{
                display: "flex",
                backgroundColor: "#1F1A15",
                color: "#F7F3E8",
                padding: "8px 20px",
                borderRadius: "9999px",
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: "0.05em",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
