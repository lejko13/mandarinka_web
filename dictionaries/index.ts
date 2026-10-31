import type { Locale } from "@/lib/i18n";
import type { Dict } from "./sk";

const dictionaries: Record<Locale, () => Promise<Dict>> = {
  sk: () => import("./sk").then((m) => m.default),
  cs: () => import("./cs").then((m) => m.default),
  pl: () => import("./pl").then((m) => m.default),
  de: () => import("./de").then((m) => m.default),
  en: () => import("./en").then((m) => m.default),
  hu: () => import("./hu").then((m) => m.default),
  uk: () => import("./uk").then((m) => m.default),
  it: () => import("./it").then((m) => m.default),
  fr: () => import("./fr").then((m) => m.default),
  es: () => import("./es").then((m) => m.default),
};

export const getDictionary = (locale: Locale) => dictionaries[locale]();
