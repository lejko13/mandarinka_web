import type { ReactNode } from "react";
import { downloadUrl } from "@/lib/site";

/** Hlavné oranžové tlačidlo na stiahnutie. */
export function DownloadButton({ small = false, children }: { small?: boolean; children: ReactNode }) {
  return (
    <a
      href={downloadUrl}
      download
      className={`bg-hot inline-flex items-center gap-2.5 rounded-full font-bold text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.35)] transition hover:-translate-y-px active:scale-[0.98] ${
        small
          ? "px-4.5 py-2 text-[14.5px] shadow-[0_4px_16px_rgb(240_96_42/0.35)]"
          : "px-7 py-3.5 text-[17px] shadow-[0_10px_30px_rgb(240_96_42/0.4)] hover:shadow-[0_14px_38px_rgb(240_96_42/0.55)]"
      }`}
    >
      {children}
    </a>
  );
}

/** Sivé tlačidlo s obrysom (druhá akcia). */
export function GhostButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-full bg-white/8 px-6 py-3.5 text-[17px] font-bold text-cream shadow-[inset_0_0_0_1px_rgb(255_255_255/0.14)] transition hover:bg-white/12"
    >
      {children}
    </a>
  );
}

export function AppleLogo() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="currentColor"
        d="M16.4 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9-.7 0-1.8-.8-3-.8-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.8-2.3.9-1.3 1.3-2.6 1.3-2.6s-2.5-1-2.5-3.8zM14.1 5.8c.6-.8 1.1-1.9 1-3-1 0-2.1.7-2.8 1.5-.6.7-1.1 1.8-1 2.9 1 .1 2.1-.6 2.8-1.4z"
      />
    </svg>
  );
}

/** Kapsula: oranžová (štítok nad nadpisom slajdu) alebo sivá (vlastnosti). */
export function Pill({ on = false, children }: { on?: boolean; children: ReactNode }) {
  return (
    <span
      className={`inline-block w-fit self-start rounded-full px-3 py-1 font-extrabold ${
        on
          ? "bg-hot text-[11px] tracking-[0.14em] text-white uppercase"
          : "bg-white/8 text-[12.5px] text-cream/85 shadow-[inset_0_0_0_0.5px_rgb(255_255_255/0.14)]"
      }`}
    >
      {children}
    </span>
  );
}

/** Nadpis sekcie: malý oranžový nadpis, veľký nadpis a voliteľný úvod. */
export function Heading({
  eyebrow,
  title,
  lead,
  center = false,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={`mb-10 ${center ? "mx-auto max-w-[760px] text-center" : "max-w-[760px]"}`}>
      <div className="eyebrow mb-3">{eyebrow}</div>
      <h2 className="text-[clamp(32px,4.6vw,52px)] leading-[1.05] font-extrabold tracking-[-0.035em]">{title}</h2>
      {lead && <p className="mt-4 text-[18px] leading-relaxed text-cream/60">{lead}</p>}
    </div>
  );
}

/** Oranžový krúžok s číslom (kroky, inštalácia). */
export function Num({ n, size = "lg" }: { n: number; size?: "lg" | "sm" }) {
  return (
    <span
      className={`bg-hot grid shrink-0 place-items-center rounded-full font-extrabold text-white shadow-[0_6px_16px_rgb(255_110_40/0.35)] ${
        size === "lg" ? "h-10 w-10 text-[17px]" : "h-7.5 w-7.5 text-[14px]"
      }`}
    >
      {n}
    </span>
  );
}

/** Dosadí hodnoty do textu: fill("Verzia {version}", { version: "1.0" }). */
export function fill(text: string, values: Record<string, string>) {
  return text.replace(/\{(\w+)\}/g, (all, key: string) => values[key] ?? all);
}

/** Text zo slovníka: **tučné** a {slot} nahradené prvkom (napr. kláves, odkaz). */
export function Rich({ text, slots = {} }: { text: string; slots?: Record<string, ReactNode> }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*|\{\w+\})/g).map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) return <b key={i}>{part.slice(2, -2)}</b>;
        const slot = /^\{(\w+)\}$/.exec(part)?.[1];
        if (slot && slot in slots) return <span key={i}>{slots[slot]}</span>;
        return part;
      })}
    </>
  );
}
