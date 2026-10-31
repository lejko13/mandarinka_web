/** Údaje o aktuálnej verzii – pri novom vydaní zmeň tu (texty „Čo je nové“ sú v dictionaries/*.ts → release). */
export const release = {
  version: "0.3.0",
  sizeMB: 50,
  file: "Mandarinka-0.3.0.dmg",
  sha256: "e39d1c616670a5ba07739a8e73572f7960339d2190fdd32f448da9d9915705e0",
};

/** Cesta k súboru v public/. */
export const asset = (path: string) => path;

export const downloadUrl = asset(`/download/${release.file}`);
