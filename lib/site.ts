/** Údaje o aktuálnej verzii – pri novom vydaní stačí zmeniť tu. */
export const release = {
  version: "0.3.0",
  date: "október 2026",
  sizeMB: 50,
  file: "Mandarinka-0.3.0.dmg",
  sha256: "e39d1c616670a5ba07739a8e73572f7960339d2190fdd32f448da9d9915705e0",
  minMacOS: "macOS 13 Ventura",
  changes: ["AI titulky do videa – štýly, poloha, otáčanie, ⌘Z a vypálenie do videa", "Vodoznaky – tvoje logo alebo text na fotky aj videá", "Úprava PDF vrátane naskenovaných (rozpoznanie textu so slovenským slovníkom)", "7 jazykov aplikácie a vlastná farba", "Metadáta aj pri videu, vystrihovanie lasom a ďalšie vylepšenia"],
};

/** Cesta k súboru v public/. */
export const asset = (path: string) => path;

export const downloadUrl = asset(`/download/${release.file}`);
