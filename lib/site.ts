/** Údaje o aktuálnej verzii – pri novom vydaní stačí zmeniť tu. */
export const release = {
  version: "0.1.0",
  date: "október 2026",
  sizeMB: 42,
  file: "Mandarinka-0.1.0.dmg",
  sha256: "641da8821e284a7cb5c0789271bacd24c618d3b68f8cd3c0ddba2b9f4206a673",
  minMacOS: "macOS 13 Ventura",
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Cesta k súboru v public/ (s prefixom repozitára na GitHub Pages). */
export const asset = (path: string) => `${basePath}${path}`;

export const downloadUrl = asset(`/download/${release.file}`);
