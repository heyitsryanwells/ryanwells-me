import type { Metadata } from "next";
import { Archivo, Archivo_Narrow, Martian_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { site } from "@/lib/content";

/**
 * Type system.
 *
 * Chosen to stay off the AI-default stack (Inter, Geist, Space Grotesk,
 * JetBrains Mono, and IBM Plex Mono, which has become the signature face of
 * this exact spec-sheet genre).
 *
 * Archivo and Archivo Narrow are one superfamily covering body and display, so
 * the two roles relate rather than merely coexist. Narrow keeps page titles on
 * a single line, which the layout's density depends on.
 *
 * Martian Mono carries every label, ref and caption. It is deliberately wide
 * and engineered, which suits the instrument-panel palette and the space
 * motif. Because it is already wide, `.type-label` tracking is reduced in
 * globals.css; the usual 0.11em pushes it past the nav at the lg breakpoint.
 *
 * Faces are wired to the neutral --face-* roles, so swapping type never
 * requires touching the stylesheet.
 */
const faceBody = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--face-body",
  display: "swap",
});

const faceMono = Martian_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--face-mono",
  display: "swap",
});

const faceDisplay = Archivo_Narrow({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--face-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} - ${site.role}`,
    template: `%s - ${site.name}`,
  },
  description: site.tagline,
  openGraph: {
    title: `${site.name} - ${site.role}`,
    description: site.tagline,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} - ${site.role}`,
    description: site.tagline,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${faceBody.variable} ${faceMono.variable} ${faceDisplay.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <a
          href="#main"
          className="type-label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
