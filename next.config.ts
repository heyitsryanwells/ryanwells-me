import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages serves static files only, so the whole site is exported to
  // ./out at build time. No server, no API routes, no ISR.
  output: "export",

  // Emits /about/index.html rather than /about.html, which every static host
  // resolves the same way. Avoids extensionless-URL edge cases.
  trailingSlash: true,

  // The image optimizer needs a running server. Portraits are pre-sized and
  // converted to WebP in public/ instead, so this costs nothing.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
