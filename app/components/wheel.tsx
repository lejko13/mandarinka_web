"use client";

import {
  AudioLines,
  Brush,
  Camera,
  Captions,
  Copyright,
  Crop,
  Eraser,
  EyeOff,
  FileAudio,
  FileImage,
  FileText,
  FileType,
  FileVideo,
  Files,
  Gauge,
  Hash,
  Images,
  Layers,
  Lock,
  MapPinOff,
  Music,
  Package,
  Pencil,
  QrCode,
  RectangleHorizontal,
  RotateCw,
  ScanText,
  Scissors,
  ScissorsLineDashed,
  Shrink,
  Signature,
  Sparkles,
  TextQuote,
  VolumeX,
  WandSparkles,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { Dict } from "@/dictionaries/sk";
import { fill } from "./ui";

// Kruhové menu ako v aplikácii (RadialMenu.swift): rovnaké polomery, medzery a zaoblenie výsekov.
const SIZE = 470;
const O = SIZE / 2;
const HOLE = 58;
const INNER: [number, number] = [65, 125];
const OUTER: [number, number] = [131, 192];
const GAP = 6;
const CORNER = 11;

type ToolKey = keyof Dict["wheel"]["tools"];
type KindKey = keyof Dict["wheel"]["kinds"];
type Tool = { title: string; detail: string; icon?: LucideIcon };
type Kind = { id: KindKey; fileIcon: LucideIcon; inner: string[]; outer: ToolKey[] };

const ICONS: Record<ToolKey, LucideIcon> = {
  compress: Shrink,
  metadata: MapPinOff,
  upscale: Sparkles,
  noBackground: WandSparkles,
  erase: Eraser,
  crop: Crop,
  rotate: RotateCw,
  cutout: Scissors,
  blur: EyeOff,
  draw: Brush,
  background: Layers,
  watermark: Copyright,
  copyText: ScanText,
  export: Package,
  subtitles: Captions,
  transcribe: TextQuote,
  enhance: AudioLines,
  speed: Gauge,
  frame: Camera,
  audioOnly: Music,
  mute: VolumeX,
  trim: ScissorsLineDashed,
  edit: Pencil,
  editDocument: Pencil,
  sign: Signature,
  pages: Files,
  redact: RectangleHorizontal,
  password: Lock,
  images: Images,
  words: Hash,
  qr: QrCode,
};

/** Rovnaké nástroje a poradie ako predvolený kruh v aplikácii (MenuItems.defaults, jeden súbor). */
const KINDS: Kind[] = [
  {
    id: "foto",
    fileIcon: FileImage,
    inner: ["PNG", "HEIC", "PDF"],
    outer: ["compress", "metadata", "upscale", "noBackground", "erase", "crop", "rotate", "cutout", "blur", "draw", "background", "watermark", "copyText", "export"],
  },
  {
    id: "video",
    fileIcon: FileVideo,
    inner: ["MOV", "GIF"],
    outer: ["subtitles", "transcribe", "enhance", "compress", "speed", "rotate", "frame", "metadata", "watermark", "audioOnly", "mute", "export"],
  },
  {
    id: "pdf",
    fileIcon: FileText,
    inner: ["JPG", "PNG", "TXT", "DOCX"],
    outer: ["edit", "sign", "pages", "redact", "password", "watermark", "compress", "images", "copyText", "metadata", "words"],
  },
  { id: "zvuk", fileIcon: FileAudio, inner: ["WAV", "AIFF"], outer: ["transcribe", "enhance", "trim"] },
  { id: "dokument", fileIcon: FileType, inner: ["PDF", "TXT", "RTF", "HTML"], outer: ["editDocument", "words", "qr"] },
];

/** Výsek medzikružia so zaoblenými rohmi a rovnako širokou medzerou – prepis RingSegment zo SwiftUI. */
function segmentPath(centerDeg: number, spanDeg: number, r0: number, r1: number) {
  const half = GAP / 2;
  const rho = Math.min(CORNER, (r1 - r0) / 2 - 1);
  const rad = (d: number) => (d * Math.PI) / 180;
  const a = rad(centerDeg - spanDeg / 2);
  const b = rad(centerDeg + spanDeg / 2);
  const h = half + rho;
  const point = (r: number, t: number) => ({ x: O + r * Math.cos(t), y: O + r * Math.sin(t) });
  const foot = (c: { x: number; y: number }, edge: number, inward: number) => {
    const ux = Math.cos(edge), uy = Math.sin(edge);
    const along = (c.x - O) * ux + (c.y - O) * uy;
    return { x: O + along * ux + half * Math.cos(edge + inward), y: O + along * uy + half * Math.sin(edge + inward) };
  };
  const dOut = r1 - rho, dIn = r0 + rho;
  const p1 = a + Math.asin(h / dOut), p2 = b - Math.asin(h / dOut);
  const p3 = b - Math.asin(h / dIn), p4 = a + Math.asin(h / dIn);
  const c1 = point(dOut, p1), c2 = point(dOut, p2), c3 = point(dIn, p3), c4 = point(dIn, p4);
  const f1 = foot(c1, a, Math.PI / 2), f2 = foot(c2, b, -Math.PI / 2);
  const f3 = foot(c3, b, -Math.PI / 2), f4 = foot(c4, a, Math.PI / 2);
  const t1 = point(r1, p1), t2 = point(r1, p2), t3 = point(r0, p3), t4 = point(r0, p4);
  const n = (v: number) => v.toFixed(2);
  const P = (q: { x: number; y: number }) => `${n(q.x)} ${n(q.y)}`;
  const bigOut = p2 - p1 > Math.PI ? 1 : 0, bigIn = p3 - p4 > Math.PI ? 1 : 0;
  return [
    `M ${P(f1)}`,
    `A ${rho} ${rho} 0 0 1 ${P(t1)}`,
    `A ${r1} ${r1} 0 ${bigOut} 1 ${P(t2)}`,
    `A ${rho} ${rho} 0 0 1 ${P(f2)}`,
    `L ${P(f3)}`,
    `A ${rho} ${rho} 0 0 1 ${P(t3)}`,
    `A ${r0} ${r0} 0 ${bigIn} 0 ${P(t4)}`,
    `A ${rho} ${rho} 0 0 1 ${P(f4)}`,
    "Z",
  ].join(" ");
}

type Slot = { tool: Tool; key: string; d: string; x: number; y: number; inner: boolean };

function layout(kind: Kind, t: Dict["wheel"]): Slot[] {
  const inner: Tool[] = kind.inner.map((format) => ({ title: format, detail: fill(t.convert, { format }) }));
  const outer: Tool[] = kind.outer.map((key) => ({ title: t.tools[key][0], detail: t.tools[key][1], icon: ICONS[key] }));
  const rings: [Tool[], [number, number], boolean][] = [
    [inner, INNER, true],
    [outer, OUTER, false],
  ];
  return rings.flatMap(([tools, [r0, r1], inner]) => {
    const step = 360 / tools.length;
    return tools.map((tool, i) => {
      const mid = -90 + i * step;
      const r = (r0 + r1) / 2;
      return {
        tool,
        key: `${inner ? "i" : "o"}${i}-${tool.title}`,
        d: segmentPath(mid, step, r0, r1),
        x: O + r * Math.cos((mid * Math.PI) / 180),
        y: O + r * Math.sin((mid * Math.PI) / 180),
        inner,
      };
    });
  });
}

/** % zo šírky kruhu – písmo aj ikony sa zmenšujú spolu s kruhom (jednotka cqw). */
const cq = (px: number) => `${((px / SIZE) * 100).toFixed(3)}cqw`;
const HOT_SCALE = 1.045;
/** Poloha v % kruhu, zaokrúhlená – server aj prehliadač dajú rovnaký text (inak chyba hydratácie). */
const pct = (v: number) => `${((v / SIZE) * 100).toFixed(3)}%`;

export function Wheel({ t }: { t: Dict["wheel"] }) {
  const [kindIndex, setKindIndex] = useState(0);
  const [hovered, setHovered] = useState<string | null>(null);
  const [auto, setAuto] = useState<string | null>(null);
  const [interacting, setInteracting] = useState(false);
  const kind = KINDS[kindIndex];
  const slots = layout(kind, t);
  const file = t.files[kind.id];

  // Ukážka: kým sa nikto nedotkne, kruh sám prechádza nástrojmi (ako keby niekto hýbal myšou).
  useEffect(() => {
    if (interacting || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const outer = slots.filter((s) => !s.inner);
    let i = 0;
    const timer = window.setInterval(() => {
      setAuto(outer[i % outer.length].key);
      i += 1;
    }, 1600);
    return () => window.clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interacting, kindIndex]);

  const hotKey = hovered ?? (interacting ? null : auto);
  const hot = slots.find((s) => s.key === hotKey);
  const ordered = hot ? [...slots.filter((s) => s !== hot), hot] : slots;
  const FileIcon = kind.fileIcon;

  return (
    <div className="flex w-full flex-col items-center">
      <div
        className="relative w-full select-none [container-type:inline-size]"
        onMouseEnter={() => setInteracting(true)}
        onMouseLeave={() => {
          setInteracting(false);
          setHovered(null);
        }}
      >
        {/* Žiara za kruhom – sklo má čo „rozmazať“ */}
        <div
          aria-hidden
          className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle_at_40%_35%,rgb(255_120_50/0.35),rgb(255_80_30/0.08)_55%,transparent_72%)] blur-2xl"
        />
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="relative block h-auto w-full" role="img" aria-label={fill(t.aria, { file })}>
          <defs>
            <linearGradient id="seg-outer" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="rgb(34 31 30 / 0.9)" />
              <stop offset="1" stopColor="rgb(16 15 15 / 0.95)" />
            </linearGradient>
            <linearGradient id="seg-inner" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="rgb(28 26 25 / 0.94)" />
              <stop offset="1" stopColor="rgb(12 11 11 / 0.97)" />
            </linearGradient>
            <linearGradient id="seg-hot" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ff9438" />
              <stop offset="1" stopColor="#f75421" />
            </linearGradient>
            <linearGradient id="seg-rim" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="rgb(255 255 255 / 0.38)" />
              <stop offset="1" stopColor="rgb(255 255 255 / 0.08)" />
            </linearGradient>
            <linearGradient id="seg-rim-hot" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="rgb(255 255 255 / 0.55)" />
              <stop offset="1" stopColor="rgb(255 255 255 / 0.2)" />
            </linearGradient>
            <linearGradient id="center-rim" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ff9438" />
              <stop offset="1" stopColor="rgb(247 84 33 / 0.5)" />
            </linearGradient>
          </defs>
          <g style={{ filter: "drop-shadow(0 18px 30px rgb(0 0 0 / 0.55))" }}>
            {ordered.map((s) => {
              const isHot = s === hot;
              return (
                <path
                  key={s.key}
                  d={s.d}
                  fill={isHot ? "url(#seg-hot)" : s.inner ? "url(#seg-inner)" : "url(#seg-outer)"}
                  stroke={isHot ? "url(#seg-rim-hot)" : "url(#seg-rim)"}
                  strokeWidth={1}
                  className="cursor-pointer transition-[transform,filter] duration-150 ease-out"
                  style={{
                    transformOrigin: `${O}px ${O}px`,
                    transform: isHot ? `scale(${HOT_SCALE})` : "scale(1)",
                    filter: isHot ? "drop-shadow(0 0 14px rgb(247 84 33 / 0.7))" : undefined,
                  }}
                  onMouseEnter={() => setHovered(s.key)}
                  onClick={() => {
                    setInteracting(true);
                    setHovered(s.key);
                  }}
                />
              );
            })}
            <circle cx={O} cy={O} r={HOLE} fill="rgb(14 13 13 / 0.94)" stroke="url(#center-rim)" strokeWidth={1.5} />
          </g>
        </svg>

        {/* Popisy výsekov – HTML nad SVG, presne v strede výseku (pri hoveri sa posunú so zväčšením) */}
        {slots.map((s) => {
          const isHot = s === hot;
          const k = isHot ? HOT_SCALE : 1;
          const x = O + (s.x - O) * k, y = O + (s.y - O) * k;
          const Icon = s.tool.icon;
          return (
            <div
              key={s.key}
              className="pointer-events-none absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-[0.8cqw] text-center transition-[left,top] duration-150"
              style={{ left: pct(x), top: pct(y), width: Icon ? cq(84) : undefined }}
            >
              {Icon && (
                <Icon
                  strokeWidth={2.2}
                  className={isHot ? "text-white" : "text-[#ff8a3d]"}
                  style={{ width: cq(17), height: cq(17) }}
                />
              )}
              <span
                className={`font-bold whitespace-nowrap ${isHot ? "text-white" : "text-cream"}`}
                style={{
                  fontSize: Icon ? cq(s.tool.title.length > 12 ? 9.6 : 10.8) : cq(14),
                  letterSpacing: Icon ? "0.01em" : "0.06em",
                }}
              >
                {s.tool.title}
              </span>
            </div>
          );
        })}

        {/* Stred: súbor, pri hoveri popis nástroja */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center text-center"
          style={{ width: cq(HOLE * 2 - 20), height: cq(HOLE * 2 - 20), gap: cq(5) }}
        >
          {hot ? (
            <>
              {hot.tool.icon ? (
                <hot.tool.icon className="text-[#ff8a3d]" strokeWidth={2.2} style={{ width: cq(20), height: cq(20) }} />
              ) : (
                <span className="font-extrabold text-[#ff8a3d]" style={{ fontSize: cq(15) }}>
                  {hot.tool.title}
                </span>
              )}
              <span className="leading-tight font-semibold text-cream/90" style={{ fontSize: cq(9.5) }}>
                {hot.tool.detail}
              </span>
            </>
          ) : (
            <>
              <FileIcon className="text-cream/85" strokeWidth={1.6} style={{ width: cq(34), height: cq(34) }} />
              <span className="font-medium text-cream/55" style={{ fontSize: cq(10) }}>
                {file}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Druh súboru – kruh sa prispôsobí ako v aplikácii */}
      <div className="mt-4 flex flex-wrap justify-center gap-1.5" role="tablist" aria-label={t.kindsLabel}>
        {KINDS.map((k, i) => (
          <button
            key={k.id}
            type="button"
            role="tab"
            aria-selected={i === kindIndex}
            onClick={() => {
              setKindIndex(i);
              setHovered(null);
              setAuto(null);
            }}
            className={`rounded-full px-3.5 py-1.5 text-[13px] font-bold transition ${
              i === kindIndex
                ? "bg-hot text-white shadow-[0_4px_14px_rgb(240_96_42/0.35)]"
                : "bg-white/7 text-cream/70 shadow-[inset_0_0_0_0.5px_rgb(255_255_255/0.14)] hover:bg-white/12 hover:text-cream"
            }`}
          >
            {t.kinds[k.id]}
          </button>
        ))}
      </div>
      <p className="mt-2.5 text-center text-[12.5px] text-cream/40">{t.hint}</p>
    </div>
  );
}
