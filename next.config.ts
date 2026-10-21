import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Obrázky sú malé a importované staticky – netreba ich optimalizovať na serveri.
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
