"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { languages, localePath, type Locale } from "@/lib/i18n";

/** Výber jazyka ako v aplikácii (Nastavenia → Jazyk aplikácie): vlajka, názov, fajka pri vybranom. */
export function LanguagePicker({ current, label }: { current: Locale; label: string }) {
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const selected = languages.find((l) => l.code === current) ?? languages[0];

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!box.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={box} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full bg-white/7 px-3.5 py-2 text-[14px] font-semibold text-cream shadow-[inset_0_0_0_0.5px_rgb(255_255_255/0.16)] transition hover:bg-white/12"
      >
        <span className="text-[15px] leading-none">{selected.flag}</span>
        <span className="hidden sm:inline">{selected.name}</span>
        <ChevronDown className={`h-3.5 w-3.5 text-cream/60 transition-transform ${open ? "rotate-180" : ""}`} strokeWidth={2.6} />
      </button>
      <ul
        role="listbox"
        aria-label={label}
        className={`absolute right-0 mt-1.5 w-[200px] origin-top-right rounded-[12px] bg-[#221e1c]/95 p-1 shadow-[inset_0_0_0_0.5px_rgb(255_255_255/0.2),0_18px_40px_rgb(0_0_0/0.6)] backdrop-blur-xl transition duration-150 ${
          open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        {languages.map((l) => {
          const isCurrent = l.code === current;
          return (
            <li key={l.code} role="option" aria-selected={isCurrent}>
              <a
                href={localePath(l.code)}
                hrefLang={l.code}
                lang={l.code}
                onClick={() => setOpen(false)}
                className={`group flex items-center gap-2.5 rounded-[8px] px-2.5 py-1.5 text-[14px] font-semibold text-cream transition-colors hover:bg-[linear-gradient(180deg,#ff9438,#f75421)] hover:text-white ${
                  isCurrent ? "bg-white/7" : ""
                }`}
              >
                <span className="text-[15px] leading-none">{l.flag}</span>
                <span className="flex-1">{l.name}</span>
                {isCurrent && <Check className="h-3.5 w-3.5 text-[#ff8a3d] group-hover:text-white" strokeWidth={3} />}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
