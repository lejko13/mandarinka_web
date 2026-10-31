/** Jazyky webu – rovnaké ako v aplikácii (Localization.swift), v rovnakom poradí. */
export const languages = [
  { code: "sk", name: "Slovenčina", flag: "🇸🇰", og: "sk_SK" },
  { code: "cs", name: "Čeština", flag: "🇨🇿", og: "cs_CZ" },
  { code: "pl", name: "Polski", flag: "🇵🇱", og: "pl_PL" },
  { code: "de", name: "Deutsch", flag: "🇩🇪", og: "de_DE" },
  { code: "en", name: "English", flag: "🇬🇧", og: "en_US" },
  { code: "hu", name: "Magyar", flag: "🇭🇺", og: "hu_HU" },
  { code: "uk", name: "Українська", flag: "🇺🇦", og: "uk_UA" },
  { code: "it", name: "Italiano", flag: "🇮🇹", og: "it_IT" },
  { code: "fr", name: "Français", flag: "🇫🇷", og: "fr_FR" },
  { code: "es", name: "Español", flag: "🇪🇸", og: "es_ES" },
] as const;

export type Locale = (typeof languages)[number]["code"];

export const defaultLocale: Locale = "sk";

export const locales = languages.map((l) => l.code) as Locale[];

export const hasLocale = (value: string): value is Locale => (locales as string[]).includes(value);

/** Adresa jazyka: slovenčina na hlavnej adrese „/“, ostatné „/en“, „/cs“… */
export const localePath = (code: Locale) => (code === defaultLocale ? "/" : `/${code}`);
