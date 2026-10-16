import { ImageResponse } from "next/og";
import { SITE } from "@/lib/content";

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const Image = () =>
  new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#1a1411",
          color: "#f2eee5",
          padding: "72px",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, letterSpacing: 6, opacity: 0.55 }}>
          <span>CRYSTAL KIZOR</span>
          <span>ENUGU, NIGERIA</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 86, lineHeight: 1.02, letterSpacing: -2, maxWidth: 940, display: "flex" }}>
            Building for the climate we actually live in.
          </div>
          <div style={{ marginTop: 34, fontSize: 26, color: "#c4653a", display: "flex" }}>
            Architecture · Education · Opportunity
          </div>
        </div>

        <div style={{ display: "flex", gap: 36, fontSize: 20, letterSpacing: 3, opacity: 0.5 }}>
          <span>STUDIO COKA</span>
          <span>THE EFFECTIVE ARCHITECT</span>
          <span>ELEVATED</span>
          <span>AKO ALLIANCE</span>
        </div>
      </div>
    ),
    size,
  );

export default Image;
