import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Obrázky sú malé a importované staticky – netreba ich optimalizovať na serveri.
  images: { unoptimized: true },
  // Slovenčina je na hlavnej adrese „/“ (stránka /sk bez zmeny adresy), ostatné jazyky na /en, /cs…
  async rewrites() {
    return [{ source: "/", destination: "/sk" }];
  },
  async redirects() {
    return [{ source: "/sk", destination: "/", permanent: true }];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
