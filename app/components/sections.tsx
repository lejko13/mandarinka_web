import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import icon from "@/assets/icon.png";
import batch from "@/assets/okna/batch.jpg";
import blurFaces from "@/assets/okna/blur_faces.jpg";
import compare from "@/assets/okna/compare.jpg";
import copytext from "@/assets/okna/copytext.jpg";
import cutout from "@/assets/okna/cutout.jpg";
import draw from "@/assets/okna/draw.jpg";
import editFonts from "@/assets/okna/edit_fonts.jpg";
import erase from "@/assets/okna/erase.jpg";
import eraseBefore from "@/assets/okna/erase_before.jpg";
import menuEditor from "@/assets/okna/menueditor.jpg";
import nobg from "@/assets/okna/nobg.jpg";
import pages from "@/assets/okna/pages.jpg";
import qr from "@/assets/okna/qr.jpg";
import redact from "@/assets/okna/redact.jpg";
import settings from "@/assets/okna/settings.jpg";
import sign from "@/assets/okna/sign.jpg";
import subtitles from "@/assets/okna/subtitles.jpg";
import transcribe from "@/assets/okna/transcribe.jpg";
import upscale from "@/assets/okna/upscale.jpg";
import videos from "@/assets/okna/videos.jpg";
import watermark from "@/assets/okna/watermark.jpg";
import type { Dict } from "@/dictionaries/sk";
import type { Locale } from "@/lib/i18n";
import { downloadUrl, release } from "@/lib/site";
import { LanguagePicker } from "./language";
import { AppleLogo, DownloadButton, GhostButton, Heading, Num, Pill, Rich, fill } from "./ui";
import { AudioVisual, MetadataVisual, PdfImagesVisual } from "./visuals";
import { Wheel } from "./wheel";

const wrap = "mx-auto w-full max-w-[1200px] px-5 md:px-8";

const kbd =
  "inline-block font-sans rounded-[0.32em] border border-b-[3px] border-white/20 bg-white/6 px-[0.4em] py-[0.02em] text-[0.86em] font-bold text-cream";

/** Rich s klávesom ⇧ Shift a odkazom na .dmg. */
function RichText({ text }: { text: string }) {
  return (
    <Rich
      text={text}
      slots={{
        shift: <kbd className={kbd}>⇧ Shift</kbd>,
        file: (
          <a href={downloadUrl} download className="text-hot hover:underline">
            {release.file}
          </a>
        ),
      }}
    />
  );
}

// MARK: - Hlavička

export function Header({ t, lang }: { t: Dict; lang: Locale }) {
  const links = [
    ["#funkcie", t.nav.features],
    ["#ako", t.nav.how],
    ["#sukromie", t.nav.privacy],
    ["#instalacia", t.nav.install],
    ["#otazky", t.nav.faq],
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-black/65 backdrop-blur-xl backdrop-saturate-150">
      <div className={`${wrap} flex h-15 items-center gap-4 md:gap-6`}>
        <a href="#" className="flex items-center gap-2.5 text-[17px] font-bold tracking-tight">
          <Image src={icon} alt="" width={28} height={28} />
          Mandarinka
        </a>
        <nav className="ml-auto hidden gap-7 lg:flex">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="text-[14.5px] font-medium text-cream/60 transition hover:text-cream">
              {label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2.5 lg:ml-2">
          <LanguagePicker current={lang} label={t.nav.language} />
          <DownloadButton small>{t.nav.download}</DownloadButton>
        </div>
      </div>
    </header>
  );
}

// MARK: - Úvod

export function Hero({ t }: { t: Dict }) {
  return (
    // Na počítači presne jedna obrazovka pod hlavičkou (60 px + okraj) – nadpis aj kruh sa prispôsobia výške okna.
    <section className="relative md:h-[calc(100svh-61px)] md:min-h-[600px]">
      {/* Oranžová žiara ako na titulnej strane prezentácie */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(760px_420px_at_18%_-5%,rgb(255_128_48/0.22),transparent_70%),radial-gradient(640px_520px_at_78%_45%,rgb(255_100_40/0.12),transparent_70%)]"
      />
      <div className={`${wrap} relative grid items-center gap-12 pt-14 pb-20 md:h-full md:grid-cols-[1.05fr_1fr] md:gap-10 md:py-[4vh]`}>
        <div>
          <Image
            src={icon}
            alt=""
            width={72}
            height={72}
            preload
            className="h-[clamp(52px,8vh,72px)] w-auto drop-shadow-[0_10px_24px_rgb(255_110_40/0.4)]"
          />
          <h1 className="mt-[clamp(16px,3vh,24px)] text-[clamp(56px,min(9vw,12vh),108px)] leading-[0.95] font-extrabold tracking-[-0.05em]">
            Mandarinka<span className="text-[#ff7a2f]">.</span>
          </h1>
          <p className="mt-[clamp(16px,3vh,24px)] max-w-[30em] text-[clamp(18px,min(2vw,2.6vh),23px)] leading-snug font-medium text-cream/80">
            {t.hero.tagline}
          </p>
          <p className="mt-[clamp(10px,2vh,16px)] max-w-[34em] text-[16.5px] leading-relaxed text-cream/55">
            <RichText text={t.hero.text} />
          </p>
          <div className="mt-[clamp(20px,4vh,32px)] flex flex-wrap items-center gap-3">
            <DownloadButton>
              <AppleLogo />
              {t.hero.downloadMac}
            </DownloadButton>
            <GhostButton href="#funkcie">{t.hero.seeFeatures}</GhostButton>
          </div>
          <p className="mt-3.5 text-[13.5px] text-cream/45">
            {fill(t.hero.meta, { version: release.version, size: String(release.sizeMB) })}
          </p>
        </div>
        {/* Kruh + prepínač pod ním (~110 px) sa zmestia do výšky obrazovky */}
        <div className="relative mx-auto w-full max-w-[540px] md:w-[min(540px,calc(100svh-60px-8vh-110px))] md:min-w-[380px]">
          <Wheel t={t.wheel} />
        </div>
      </div>
    </section>
  );
}

export function Stats({ t }: { t: Dict }) {
  return (
    <div className={wrap}>
      <div className="card grid grid-cols-2 divide-white/8 md:grid-cols-4 md:divide-x">
        {t.stats.map(([value, label]) => (
          <div key={value} className="px-6 py-6 md:px-8">
            <div className="text-hot-gradient text-[clamp(30px,3.6vw,42px)] leading-none font-extrabold tracking-[-0.03em]">
              {value}
            </div>
            <div className="mt-2 text-[14px] leading-snug text-cream/55">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// MARK: - Ako to funguje

export function HowItWorks({ t }: { t: Dict }) {
  return (
    <section id="ako" className={`${wrap} scroll-mt-20 pt-28`}>
      <div className="slide px-6 py-10 md:px-14 md:py-14">
        <div className="eyebrow mb-3">{t.how.eyebrow}</div>
        <h2 className="text-[clamp(30px,4.2vw,48px)] leading-[1.05] font-extrabold tracking-[-0.035em]">{t.how.title}</h2>
        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {t.how.steps.map(([title, text], i) => (
            <div key={i} className="card p-6">
              <Num n={i + 1} />
              <h3 className="mt-5 mb-2 text-[19px] font-bold tracking-tight">{title}</h3>
              <p className="text-[15px] leading-relaxed text-cream/60">{text}</p>
            </div>
          ))}
        </div>
        <ul className="dot-list mt-8 grid gap-3 text-[15px] text-cream/60 md:grid-cols-2 md:gap-x-10">
          {t.how.notes.map(([b, text], i) => (
            <li key={i}>
              <b className="text-cream">{b}</b> – {text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// MARK: - Prehľad

/** Ikony a „Nové“ k dlaždiciam prehľadu – v rovnakom poradí ako t.overview.tiles. */
const overviewIcons: [string, boolean][] = [
  ["🧽", true], ["🌍", false], ["✏️", false], ["⬛", false], ["🪄", true],
  ["🎬", true], ["🔍", false], ["🔎", true], ["⚖️", true], ["🔳", true],
  ["📍", false], ["🎙", false], ["🎚", false], ["✂️", false], ["🖍", true],
  ["📑", true], ["✍️", false], ["©", false], ["📦", false], ["🎛", true],
];

export function Overview({ t }: { t: Dict }) {
  return (
    <section className={`${wrap} pt-28`}>
      <Heading eyebrow={t.overview.eyebrow} title={t.overview.title} lead={t.overview.lead} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {t.overview.tiles.map(([title, text], i) => {
          const [emoji, isNew] = overviewIcons[i] ?? ["•", false];
          return (
            <div key={i} className="card relative p-4.5">
              {isNew && (
                <span className="bg-hot absolute top-3.5 right-3.5 rounded-full px-2 py-0.5 text-[9.5px] font-extrabold tracking-[0.12em] text-white uppercase">
                  {t.overview.newBadge}
                </span>
              )}
              <div className="mb-3 text-[22px] leading-none">{emoji}</div>
              <h3 className="mb-1 pr-10 text-[15px] leading-tight font-bold tracking-tight">{title}</h3>
              <p className="text-[13px] leading-snug text-cream/55">{text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// MARK: - Funkcie podľa druhu súboru

type FeatureKey = keyof Dict["features"];
type FeatureText = Dict["features"][FeatureKey];

/** Okno aplikácie; voliteľne malá fotka „Pred“ v rohu. */
function Shot({ img, alt, before, beforeLabel }: { img: StaticImageData; alt: string; before?: StaticImageData; beforeLabel?: string }) {
  return (
    <div className="relative">
      <Image src={img} alt={alt} sizes="(max-width: 768px) 100vw, 680px" className="win h-auto w-full" />
      {before && (
        <div className="absolute -bottom-6 -left-3 w-[36%] md:-left-8">
          <Image src={before} alt="" sizes="260px" className="win h-auto w-full rounded-lg" />
          <span className="absolute top-2 left-2 rounded-full bg-black/65 px-2 py-0.5 text-[10px] font-extrabold tracking-[0.12em] text-white uppercase">
            {beforeLabel}
          </span>
        </div>
      )}
    </div>
  );
}

/** Obrázok alebo vlastná ukážka ku každej funkcii. */
function visual(key: FeatureKey, t: Dict): ReactNode {
  const alt = t.features[key].alt;
  const shots: Partial<Record<FeatureKey, StaticImageData>> = {
    noBackground: nobg, blur: blurFaces, upscale, cutout, draw, subtitles, videos, transcribe, edit: editFonts,
    redact, compare, pages, sign, qr, batch, watermark, copyText: copytext, menu: menuEditor,
  };
  switch (key) {
    case "erase":
      return <Shot img={erase} before={eraseBefore} beforeLabel={t.labels.before} alt={alt} />;
    case "metadata":
      return <MetadataVisual t={t.visuals} />;
    case "enhance":
      return <AudioVisual t={t.visuals} />;
    case "images":
      return <PdfImagesVisual t={t.visuals} />;
    default:
      return <Shot img={shots[key]!} alt={alt} />;
  }
}

function Bullets({ items, small = false }: { items: string[]; small?: boolean }) {
  return (
    <ul className={`dot-list grid text-cream/60 [&_b]:font-bold [&_b]:text-cream ${small ? "gap-1.5 text-[14px]" : "gap-2.5 text-[15.5px]"}`}>
      {items.map((item, i) => (
        <li key={i}>
          <Rich text={item} />
        </li>
      ))}
    </ul>
  );
}

function How({ label, text }: { label: string; text: string }) {
  return (
    <p className="card mt-6 rounded-xl px-4 py-3 text-[14px] text-cream/75">
      <b className="text-hot">{label}</b> {text}
    </p>
  );
}

/** Veľký slajd ako v prezentácii: text vľavo, okno vpravo (alebo naopak). */
function DetailSlide({ f, labels, visual, flip }: { f: FeatureText; labels: Dict["labels"]; visual: ReactNode; flip: boolean }) {
  return (
    <article className="slide grid items-center gap-10 px-6 py-10 md:grid-cols-[0.85fr_1.15fr] md:gap-14 md:px-12 md:py-14 lg:px-14">
      <div className={flip ? "md:order-2" : ""}>
        <Pill on>{f.eyebrow}</Pill>
        <h3 className="mt-4 text-[clamp(28px,3.3vw,40px)] leading-[1.06] font-extrabold tracking-[-0.035em]">{f.title}</h3>
        <p className="mt-4 text-[16.5px] leading-relaxed text-cream/60 [&_b]:font-bold [&_b]:text-cream">
          <Rich text={f.lead} />
        </p>
        <div className="mt-6 mb-3 text-[11px] font-extrabold tracking-[0.24em] text-cream/40 uppercase">{labels.whatYouCanDo}</div>
        <Bullets items={f.items} />
        <How label={labels.how} text={f.how} />
      </div>
      <div className={flip ? "md:order-1" : ""}>{visual}</div>
    </article>
  );
}

/** Menší slajd – okno hore, text dole (dva vedľa seba). */
function CompactSlide({ f, labels, visual }: { f: FeatureText; labels: Dict["labels"]; visual: ReactNode }) {
  return (
    <article className="slide flex flex-col px-6 pt-8 pb-7 md:px-9">
      <div className="mb-8 flex min-h-[240px] items-center justify-center md:min-h-[300px]">{visual}</div>
      <Pill on>{f.eyebrow}</Pill>
      <h3 className="mt-3.5 mb-2.5 text-[25px] leading-[1.1] font-extrabold tracking-[-0.03em]">{f.title}</h3>
      <p className="mb-4 text-[15px] leading-relaxed text-cream/60 [&_b]:font-bold [&_b]:text-cream">
        <Rich text={f.lead} />
      </p>
      <Bullets items={f.items} small />
      <div className="mt-auto">
        <How label={labels.how} text={f.how} />
      </div>
    </article>
  );
}

type CategoryKey = keyof Dict["categories"];

const categories: { id: CategoryKey; emoji: string; big: FeatureKey[]; small: FeatureKey[] }[] = [
  { id: "fotky", emoji: "📷", big: ["erase", "noBackground", "metadata"], small: ["blur", "upscale", "cutout", "draw"] },
  { id: "video", emoji: "🎬", big: ["subtitles", "videos"], small: ["transcribe", "enhance"] },
  { id: "pdf", emoji: "📄", big: ["edit", "redact"], small: ["compare", "pages", "sign", "images"] },
  { id: "dalsie", emoji: "✨", big: ["qr"], small: ["batch", "watermark", "copyText", "menu"] },
];

export function CategoryNav({ t }: { t: Dict }) {
  return (
    <div id="funkcie" className="sticky top-15 z-40 mt-28 scroll-mt-15 border-y border-white/8 bg-black/70 backdrop-blur-xl">
      <nav className={`${wrap} flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]`}>
        {categories.map((c) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            className="flex shrink-0 items-center gap-2 rounded-full bg-white/6 px-4 py-2 text-[14.5px] font-semibold text-cream/80 shadow-[inset_0_0_0_0.5px_rgb(255_255_255/0.14)] transition hover:bg-white/12 hover:text-cream"
          >
            <span>{c.emoji}</span>
            {t.categories[c.id].name}
            <span className="text-[12px] text-cream/40">{c.big.length + c.small.length}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}

export function Features({ t }: { t: Dict }) {
  return (
    <>
      {categories.map((c) => {
        const text = t.categories[c.id];
        return (
          <section key={c.id} id={c.id} className={`${wrap} scroll-mt-32 pt-24`}>
            <Heading eyebrow={`${c.emoji}  ${text.name}`} title={text.title} lead={text.lead} />
            <div className="grid gap-6">
              {c.big.map((key, i) => (
                <DetailSlide key={key} f={t.features[key]} labels={t.labels} visual={visual(key, t)} flip={i % 2 === 1} />
              ))}
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {c.small.map((key) => (
                <CompactSlide key={key} f={t.features[key]} labels={t.labels} visual={visual(key, t)} />
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}

const moreIcons = ["🗜", "🔁", "🔒", "✂️", "🔄", "🎨", "⏩", "📸", "🎵", "⏱", "📎", "🏷", "🔢", "🕓", "↩️"];

export function MoreTools({ t }: { t: Dict }) {
  return (
    <section className={`${wrap} pt-28`}>
      <Heading eyebrow={t.more.eyebrow} title={t.more.title} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {t.more.tiles.map(([title, text], i) => (
          <div key={i} className="card p-4.5">
            <div className="mb-3 text-[20px] leading-none">{moreIcons[i] ?? "•"}</div>
            <h3 className="mb-1 text-[15px] font-bold tracking-tight">{title}</h3>
            <p className="text-[13px] leading-snug text-cream/55">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// MARK: - Súkromie

const modelSizes = ["92 MB", "215 MB", "550 MB", "2,3 GB"];
const pillarIcons = ["🔒", "👤", "💳"];

export function Privacy({ t }: { t: Dict }) {
  return (
    <section id="sukromie" className={`${wrap} scroll-mt-20 pt-28`}>
      <div className="slide grid gap-10 px-6 py-10 md:grid-cols-[1.1fr_1fr] md:items-center md:px-14 md:py-14">
        <div>
          <Pill on>{t.privacy.pill}</Pill>
          <h2 className="mt-4 text-[clamp(30px,4vw,46px)] leading-[1.05] font-extrabold tracking-[-0.035em]">{t.privacy.title}</h2>
          <p className="mt-4 text-[16.5px] leading-relaxed text-cream/60 [&_b]:text-cream">
            <Rich text={t.privacy.text} />
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {t.privacy.pillars.map(([title, text], i) => (
              <div key={i} className="card p-4">
                <div className="mb-2 text-[20px] leading-none">{pillarIcons[i]}</div>
                <b className="block text-[14.5px]">{title}</b>
                <span className="text-[13px] leading-snug text-cream/55">{text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl bg-[linear-gradient(rgb(28_26_25/0.92),rgb(14_13_13/0.96))] p-6 shadow-[0_0_0_0.5px_rgb(255_255_255/0.22),0_24px_60px_rgb(0_0_0/0.65)]">
          <div className="eyebrow mb-4">{t.privacy.downloadTitle}</div>
          <ul className="grid gap-1">
            {t.privacy.models.map((tool, i) => (
              <li key={i} className="flex items-center justify-between gap-3 border-b border-white/6 py-3.5 last:border-0">
                <b className="text-[15px]">{tool}</b>
                <span className="rounded-full bg-white/6 px-2.5 py-1 font-mono text-[12.5px] text-cream/70">{modelSizes[i]}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[13px] leading-snug text-cream/45">{t.privacy.note}</p>
        </div>
      </div>
    </section>
  );
}

// MARK: - Inštalácia, verzia, otázky

export function Install({ t }: { t: Dict }) {
  return (
    <section id="instalacia" className={`${wrap} scroll-mt-20 pt-28`}>
      <div className="slide grid gap-10 px-6 py-10 md:grid-cols-[1fr_1.1fr] md:items-center md:px-14 md:py-14">
        <div>
          <Pill on>{t.install.pill}</Pill>
          <h2 className="mt-4 text-[clamp(30px,4vw,46px)] leading-[1.05] font-extrabold tracking-[-0.035em]">{t.install.title}</h2>
          <ol className="mt-7 grid gap-3">
            {t.install.steps.map((step, i) => (
              <li key={i} className="flex gap-3.5 text-[15.5px] leading-relaxed text-cream/75 [&_b]:text-cream">
                <Num n={i + 1} size="sm" />
                <div>
                  <RichText text={step} />
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-[13.5px] leading-relaxed text-cream/45">{t.install.note}</p>
        </div>
        <div>
          <Image src={settings} alt={t.install.shotAlt} sizes="(max-width: 768px) 100vw, 600px" className="win h-auto w-full" />
          <p className="mt-4 text-center text-[13.5px] text-cream/45">{t.install.shotCaption}</p>
        </div>
      </div>
    </section>
  );
}

function Notes({ items }: { items: string[] }) {
  return (
    <ul className="dot-list mt-4 grid gap-2 text-[15px] text-cream/60">
      {items.map((text, i) => (
        <li key={i}>{text}</li>
      ))}
    </ul>
  );
}

export function Release({ t }: { t: Dict }) {
  return (
    <section className={`${wrap} pt-6`}>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="card p-7">
          <Pill on>{fill(t.release.badge, { version: release.version, date: t.release.date })}</Pill>
          <h3 className="mt-4 text-[22px] font-extrabold tracking-tight">{t.release.title}</h3>
          <p className="mt-2 text-[15px] text-cream/60">{t.release.text}</p>
          <Notes items={t.release.changes} />
        </div>
        <div className="card p-7">
          <h3 className="text-[22px] font-extrabold tracking-tight">{t.release.notesTitle}</h3>
          <Notes items={t.release.notes} />
        </div>
      </div>
    </section>
  );
}

export function Faq({ t }: { t: Dict }) {
  const code = "rounded-md bg-white/6 px-1.5 py-0.5 font-mono text-[12.5px] text-cream";
  const items: [string, ReactNode][] = [
    ...t.faq.items.map(([q, a]) => [q, a] as [string, ReactNode]),
    [
      t.faq.checksumQuestion,
      <>
        {fill(t.faq.checksumIntro, { file: release.file })}
        <br />
        <code className={`${code} break-all`}>{release.sha256}</code>
        <br />
        {t.faq.checksumVerify} <code className={code}>shasum -a 256 {release.file}</code>
      </>,
    ],
  ];
  return (
    <section id="otazky" className={`${wrap} scroll-mt-20 pt-28`}>
      <Heading eyebrow={t.faq.eyebrow} title={t.faq.title} center />
      <div className="mx-auto grid max-w-[860px] gap-2.5">
        {items.map(([q, a]) => (
          <details key={q} className="card group rounded-2xl px-5.5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4.5 text-[16px] font-bold [&::-webkit-details-marker]:hidden">
              {q}
              <span className="plus text-[22px] leading-none font-bold text-hot transition-transform">+</span>
            </summary>
            <div className="pb-5 text-[15px] leading-relaxed text-cream/60">{a}</div>
          </details>
        ))}
      </div>
    </section>
  );
}

// MARK: - Záver

export function FinalCta({ t }: { t: Dict }) {
  return (
    <section className={`${wrap} pt-28 pb-20`}>
      <div className="slide flex flex-col items-center px-6 py-16 text-center md:py-24">
        <Image src={icon} alt="" width={84} height={84} className="drop-shadow-[0_14px_30px_rgb(255_110_40/0.4)]" />
        <h2 className="mt-7 text-[clamp(38px,6vw,68px)] leading-[1] font-extrabold tracking-[-0.045em]">{t.final.title}</h2>
        <p className="mt-5 max-w-[34em] text-[18px] text-cream/60">{t.final.text}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <DownloadButton>
            <AppleLogo />
            {t.hero.downloadMac}
          </DownloadButton>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {t.final.pills.map((p) => (
            <Pill key={p}>{p}</Pill>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/8">
      <div className={`${wrap} flex items-center justify-between gap-4 py-8 text-[13.5px] text-cream/45`}>
        <div className="flex items-center gap-2.5 text-[15px] font-bold text-cream">
          <Image src={icon} alt="" width={24} height={24} />
          Mandarinka
        </div>
        <p>© 2026 Leo Fudaly</p>
      </div>
    </footer>
  );
}
