import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { SITE } from "@/lib/content";
import "./globals.css";

const grava = localFont({
  src: [
    {
      path: "../../public/fonts/grava/Grava Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/grava/Grava Roman.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/grava/Grava Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/grava/Grava SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/grava/Grava Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/grava/Grava Oblique.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/grava/Grava Bold Oblique.otf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-grava",
  display: "swap",
});

const gravaDisplay = localFont({
  src: [
    {
      path: "../../public/fonts/grava/Grava Display Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/grava/Grava Display Roman.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/grava/Grava Display Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/grava/Grava Display Semi Bold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/grava/Grava Display Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/grava/Grava Display Oblique.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/grava/Grava Display Bold Oblique.otf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-grava-display",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#efeeea" },
    { media: "(prefers-color-scheme: dark)", color: "#121212" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Architect & Climate-Responsive Designer`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "profile",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    locale: SITE.locale,
    firstName: "Crystal",
    lastName: "Kizor",
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en" className={`${grava.variable} ${gravaDisplay.variable}`}>
    <head>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
    </head>
    <body className="bg-[#121212] text-[#d0d0d0] antialiased overflow-x-hidden">
      {children}
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" strategy="beforeInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" strategy="beforeInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/lenis@1.2.3/dist/lenis.min.js" strategy="beforeInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/motion@11.18.2/dist/motion.js" strategy="beforeInteractive" />
    </body>
  </html>
);

export default RootLayout;
