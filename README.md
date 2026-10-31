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
app/[lang]/page.tsx           poskladanie stránky (jeden jazyk)
app/[lang]/layout.tsx         <html lang>, titulok a popis pre vyhľadávače v danom jazyku
app/[lang]/globals.css        dizajn ako prezentácia (čierna, oranžová žiara, sklenené okná)
app/components/sections.tsx   sekcie (úvod, funkcie podľa kategórií, súkromie, inštalácia, otázky…)
app/components/wheel.tsx      interaktívne kruhové menu (hover, druh súboru)
app/components/language.tsx   výber jazyka v hlavičke (ako v aplikácii)
app/components/visuals.tsx    ukážky metadát, zvuku a obrázkov z PDF
app/components/ui.tsx         tlačidlá, štítky, nadpisy, Rich (**tučné**, {slot})
dictionaries/sk.ts            všetky texty – slovenčina je zdroj, typ Dict
dictionaries/<jazyk>.ts       preklady (cs, pl, de, en, hu, uk, it, fr, es) – rovnaká štruktúra
lib/i18n.ts                   zoznam jazykov, vlajky, adresy (sk na „/“, ostatné /en, /cs…)
lib/site.ts                   verzia, veľkosť, názov .dmg, SHA-256
assets/okna/                  snímky okien (fotky CC0, vymyslené dokumenty)
public/download/              Mandarinka-<verzia>.dmg na stiahnutie
```

Nový text: pridaj ho do `dictionaries/sk.ts` a do všetkých ostatných jazykov (TypeScript ohlási chýbajúci kľúč).

## Zverejnenie

Repozitár je prepojený s Vercelom – každý `git push` na `main` web automaticky postaví a zverejní.

## Nová verzia aplikácie

V priečinku aplikácie (`~/systemy/mandarinka`):

```bash
./build.sh && OUT_DIR=../madarinka_web/public/download ./Scripts/make_dmg.sh 0.2.0
```

Potom v `lib/site.ts` zmeň `version`, `file`, `sizeMB` a `sha256` (skript ich vypíše), v slovníkoch `release`,
zmaž starý `.dmg` z `public/download/` a pushni.
