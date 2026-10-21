/** Údaje o aktuálnej verzii – pri novom vydaní stačí zmeniť tu. */
export const release = {
  version: "0.2.0",
  date: "október 2026",
  sizeMB: 43,
  file: "Mandarinka-0.2.0.dmg",
  sha256: "1f98d9a106dcbd3ef01b1c0e40b638ce133fa92851af44e71b8456169020a9b8",
  minMacOS: "macOS 13 Ventura",
  changes: ["Automatické aktualizácie – nové verzie sa ponúknu samé", "Približovanie fotky v editoroch (trackpad, ⌘+ / ⌘−)", "Rozmazané oblasti sa dajú posúvať, zväčšovať aj otáčať", "Okno „Uložiť ako“ s výberom priečinka", "Nový vzhľad aplikácie a kruhového menu", "Pri viacerých súboroch naraz sa ukáže upozornenie"],
};

/** Cesta k súboru v public/. */
export const asset = (path: string) => path;

export const downloadUrl = asset(`/download/${release.file}`);
