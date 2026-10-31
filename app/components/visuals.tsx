import Image from "next/image";
import jazero from "@/assets/okna/jazero.jpg";
import doc1 from "@/assets/okna/pdf/doc-1.jpg";
import doc2 from "@/assets/okna/pdf/doc-2.png";
import doc3 from "@/assets/okna/pdf/doc-3.jpg";
import page from "@/assets/okna/pdf/page.png";
import type { Dict } from "@/dictionaries/sk";

type Texts = Dict["visuals"];

/** Panel ako sklenené okno v prezentácii (tmavý, tenký okraj, hlboký tieň). */
function Glass({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={`rounded-2xl bg-[linear-gradient(rgb(28_26_25/0.92),rgb(14_13_13/0.96))] shadow-[0_0_0_0.5px_rgb(255_255_255/0.22),0_24px_60px_rgb(0_0_0/0.65)] ${className}`}
    >
      {children}
    </div>
  );
}

/** Metadáta: fotka a údaje, ktoré zmiznú (copyright ostane). */
const metaIcons = ["📍", "📱", "🕓", "🖥"];

export function MetadataVisual({ t }: { t: Texts }) {
  return (
    <Glass className="mx-auto w-full max-w-[440px] p-4">
      <Image src={jazero} alt={t.photoAlt} sizes="440px" className="mb-3 h-40 w-full rounded-xl object-cover" />
      <div className="grid gap-2">
        {t.metadata.map(([key, value], i) => (
          <div key={key} className="flex items-center gap-3 rounded-xl bg-white/5 px-3.5 py-2.5">
            <span className="w-5 text-center">{metaIcons[i]}</span>
            <div className="flex-1 leading-tight">
              <b className="block text-[14px]">{key}</b>
              <s className="text-[12.5px] text-cream/45">{value}</s>
            </div>
            <span className="font-bold text-[#ff6b5b]">✕</span>
          </div>
        ))}
        <div className="flex items-center gap-3 rounded-xl bg-[#1f3b26]/60 px-3.5 py-2.5 shadow-[inset_0_0_0_1px_rgb(74_222_128/0.35)]">
          <span className="w-5 text-center">©</span>
          <div className="flex-1 leading-tight">
            <b className="block text-[14px]">{t.copyright}</b>
            <span className="text-[12.5px] text-cream/60">{t.copyrightKeep}</span>
          </div>
          <span className="font-bold text-[#4ade80]">✓</span>
        </div>
      </div>
    </Glass>
  );
}

/** Vlna zvuku: pred (šum) a po (čistý hlas) – rovnaké „náhodné“ hodnoty pri každom vykreslení. */
function wave(noisy: boolean) {
  let seed = 7;
  const random = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  return Array.from({ length: 56 }, (_, i) => {
    const t = i / 55;
    const speech = (Math.sin(t * 9.5) * 0.5 + 0.5) * (0.35 + 0.65 * Math.abs(Math.sin(t * 23)));
    const v = speech * (Math.floor(t * 8) % 3 ? 1 : 0.15);
    const value = noisy ? Math.max(v * (0.55 + random() * 0.7), 0.18 + random() * 0.24) : v * 0.78 + 0.02;
    return Math.max(value, 0.03);
  });
}

export function AudioVisual({ t }: { t: Texts }) {
  const track = (label: string, noisy: boolean) => (
    <div>
      <div className="mb-1.5 text-[12px] font-bold text-cream/60">{label}</div>
      <div className="flex h-16 items-center gap-[2px] rounded-xl bg-white/5 px-1.5">
        {wave(noisy).map((v, i) => (
          <i
            key={i}
            className={`block flex-1 rounded-sm ${noisy ? "bg-white/40" : "bg-[linear-gradient(#ffb35c,#f0602a)]"}`}
            style={{ height: `${Math.round(v * 100)}%` }}
          />
        ))}
      </div>
    </div>
  );
  return (
    <Glass className="mx-auto w-full max-w-[460px] p-5">
      {track(t.audioBefore, true)}
      <div className="bg-hot mx-auto my-3.5 w-max rounded-full px-4 py-1.5 text-[13px] font-extrabold text-white shadow-[0_6px_16px_rgb(255_110_40/0.35)]">
        ✨ {t.audioButton}
      </div>
      {track(t.audioAfter, false)}
      <div className="mt-4 grid grid-cols-3 gap-2 text-[11.5px] leading-snug text-cream/60">
        {t.audioStats.map(([b, text]) => (
          <span key={b} className="rounded-lg bg-white/6 px-2.5 py-2">
            <b className="block text-[13px] text-cream">{b}</b>
            {text}
          </span>
        ))}
      </div>
    </Glass>
  );
}

/** Obrázky z PDF: strana → priečinok so samostatnými obrázkami. */
export function PdfImagesVisual({ t }: { t: Texts }) {
  const items = [
    [doc1, "doc 1.jpg"],
    [doc2, "doc 2.png"],
    [doc3, "doc 3.jpg"],
  ] as const;
  return (
    <div className="flex items-center justify-center gap-4">
      <Image src={page} alt={t.pdfPageAlt} sizes="200px" className="w-[42%] max-w-[200px] rounded-md shadow-[0_18px_40px_rgb(0_0_0/0.6)]" />
      <span className="text-[28px] text-hot">→</span>
      <Glass className="w-[48%] max-w-[230px] p-3">
        <div className="mb-2.5 text-[12.5px] font-bold">📁 {t.pdfFolder}</div>
        <div className="grid grid-cols-2 gap-2.5">
          {items.map(([img, name]) => (
            <div key={name} className="flex flex-col items-center gap-1 text-[10.5px] text-cream/70">
              <Image src={img} alt="" sizes="100px" className="aspect-square w-full rounded-md object-cover" />
              {name}
            </div>
          ))}
        </div>
      </Glass>
    </div>
  );
}
