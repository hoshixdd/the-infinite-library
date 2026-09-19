import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import "./museum-chrome.css";
import "./scroll-stability.css";
import { Nav } from "@/components/shell/Nav";
import { Progress } from "@/components/shell/Progress";
import { CustomCursor } from "@/components/shell/CustomCursor";
import { MuseumCanvasMount } from "@/components/canvas/MuseumCanvasMount";
import { TransitionWipe } from "@/components/rooms/TransitionWipe";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const ibm = IBM_Plex_Mono({
  variable: "--font-ibm",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "THE INFINITE LIBRARY",
    template: "%s · THE INFINITE LIBRARY",
  },
  description:
    "A cinematic literary museum — 20 authors, 20 voices, one scroll-as-camera journey through Filipino and world literature.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${inter.variable} ${ibm.variable} h-full antialiased`}
    >
      <body className="relative min-h-full">
        <MuseumCanvasMount />
        <TransitionWipe />
        <div className="pointer-events-auto"><Nav /></div>
        <Progress />
        <CustomCursor />
        <main className="pointer-events-none relative z-10 flex-1">{children}</main>
      </body>
    </html>
  );
}
