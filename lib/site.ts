/** Údaje o aktuálnej verzii – pri novom vydaní stačí zmeniť tu. */
export const release = {
  version: "0.1.0",
  date: "október 2026",
  sizeMB: 42,
  file: "Mandarinka-0.1.0.dmg",
  sha256: "641da8821e284a7cb5c0789271bacd24c618d3b68f8cd3c0ddba2b9f4206a673",
  minMacOS: "macOS 13 Ventura",
};

/** Cesta k súboru v public/. */
export const asset = (path: string) => path;

export const downloadUrl = asset(`/download/${release.file}`);
