import type { Metadata } from "next";
import {
  Inter,
  JetBrains_Mono,
  Instrument_Serif,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { site } from "@/lib/content";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
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

/**
 * Applies the saved theme before first paint so the page never flashes the
 * default. Delete this along with <ThemeSwitcher /> once a direction is picked.
 */
const noFlashScript = `
(function(){try{
  var valid=['terminal','editorial','signal'];
  var q=new URLSearchParams(location.search).get('theme');
  var t=(q&&valid.indexOf(q)>-1)?q:localStorage.getItem('rw-theme');
  if(t&&valid.indexOf(t)>-1){document.documentElement.setAttribute('data-theme',t);}
}catch(e){}})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="terminal"
      className={`${inter.variable} ${jetbrains.variable} ${instrument.variable} ${spaceGrotesk.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-bg text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <ThemeSwitcher />
      </body>
    </html>
  );
}
