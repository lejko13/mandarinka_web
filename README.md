# Mandarinka – web

Stránka na stiahnutie aplikácie Mandarinka pre macOS. **Next.js 16 + Tailwind CSS 4**, beží na **Verceli**.

## Vývoj

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # produkčný build
```

## Štruktúra

```
app/page.tsx                  poskladanie stránky
app/components/sections.tsx   sekcie (úvod, ako to funguje, funkcie, ukážky, inštalácia, otázky…)
app/components/ui.tsx         tlačidlo na stiahnutie, odznak, sekcia, číslo kroku
app/globals.css               farby a pomôcky v Tailwinde (rovnaké ako aplikácia)
lib/site.ts                   verzia, veľkosť, názov .dmg, SHA-256
assets/                       obrázky (ikona, kruhové menu, ukážky okien)
public/download/              Mandarinka-<verzia>.dmg na stiahnutie
public/licencie.txt           licencie pribaleného softvéru (Real-ESRGAN, ncnn, MoltenVK)
```

## Zverejnenie

Repozitár je prepojený s Vercelom – každý `git push` na `main` web automaticky postaví a zverejní.

## Nová verzia aplikácie

V priečinku aplikácie (`~/systemy/mandarinka`):

```bash
./build.sh && OUT_DIR=../madarinka_web/public/download ./Scripts/make_dmg.sh 0.2.0
```

Potom v `lib/site.ts` zmeň `version`, `file`, `sizeMB` a `sha256` (skript ich vypíše),
zmaž starý `.dmg` z `public/download/` a pushni.
