import type { NextConfig } from "next";

// Na GitHub Pages beží web v podpriečinku repozitára (napr. /mandarinka) –
// workflow ho nastaví cez NEXT_PUBLIC_BASE_PATH. Lokálne je prázdny.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Statický web (priečinok out/) – GitHub Pages nepotrebuje server.
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
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
