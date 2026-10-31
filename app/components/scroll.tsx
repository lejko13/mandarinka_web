"use client";

import { useEffect } from "react";

/**
 * Odkazy na sekcie (#funkcie, #sukromie…) plynulo posunú stránku, ale do adresy nič nepridajú.
 * Po obnovení stránky je vždy hore – prehliadač si polohu nepamätá a prípadné # z adresy zmizne.
 */
export function ScrollManager() {
  useEffect(() => {
    history.scrollRestoration = "manual";
    if (location.hash) history.replaceState(null, "", location.pathname + location.search);
    window.scrollTo(0, 0);

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.("a[href^='#']");
      if (!link) return;
      const id = link.getAttribute("href")!.slice(1);
      event.preventDefault();
      const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const target = id ? document.getElementById(id) : null;
      if (target) target.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
      else window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
