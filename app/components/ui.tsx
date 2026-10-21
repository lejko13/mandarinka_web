import type { ReactNode } from "react";
import { downloadUrl } from "@/lib/site";

/** Hlavné oranžové tlačidlo na stiahnutie. */
export function DownloadButton({ small = false, children }: { small?: boolean; children: ReactNode }) {
  return (
    <a
      href={downloadUrl}
      download
      className={`bg-hot inline-flex items-center gap-2.5 rounded-full border border-white/25 font-bold text-white transition hover:-translate-y-px active:scale-[0.98] ${
        small
          ? "px-4.5 py-2 text-[15px] shadow-[0_4px_16px_rgb(247_84_33/0.3)]"
          : "px-6.5 py-3.5 text-[17px] shadow-[0_8px_28px_rgb(247_84_33/0.38)] hover:shadow-[0_12px_34px_rgb(247_84_33/0.55)]"
      }`}
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

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-full bg-hot-deep/15 px-3 py-1 text-[13px] font-bold tracking-wide text-hot">
      {children}
    </span>
  );
}

/** Sekcia s nadpisom a podnadpisom. */
export function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-6 py-14">
      {title && <h2 className="mb-2 text-[clamp(30px,4vw,40px)] font-bold tracking-tight">{title}</h2>}
      {subtitle && <p className="mb-8 max-w-[40em] text-cream/60">{subtitle}</p>}
      {children}
    </section>
  );
}

/** Oranžový krúžok s číslom (kroky, inštalácia). */
export function Num({ n, size = "lg" }: { n: number; size?: "lg" | "sm" }) {
  return (
    <span
      className={`bg-hot grid shrink-0 place-items-center rounded-full font-extrabold shadow-[0_6px_18px_rgb(247_84_33/0.45)] ${
        size === "lg" ? "h-11.5 w-11.5 text-xl" : "h-7.5 w-7.5 text-[15px]"
      }`}
    >
      {n}
    </span>
  );
}
