import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { getDictionary } from "@/dictionaries";
import { hasLocale, languages, localePath, locales } from "@/lib/i18n";
import "./globals.css";

/** Na Macu sa použije systémové písmo SF Pro (ako v aplikácii), inde Inter. */
const inter = Inter({ subsets: ["latin", "latin-ext", "cyrillic"], variable: "--font-inter", display: "swap" });

/** Všetky jazyky sa vygenerujú vopred (statické stránky), iné adresy sú 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = await getDictionary(lang);
  const og = languages.find((l) => l.code === lang)?.og;
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: localePath(lang),
      languages: Object.fromEntries([...locales.map((l) => [l, localePath(l)]), ["x-default", "/"]]),
    },
    openGraph: { title: t.meta.title, description: t.meta.ogDescription, type: "website", locale: og },
  };
}

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <html lang={lang} className={inter.variable}>
      <body className="min-h-screen overflow-x-hidden font-sans text-[17px] leading-relaxed">{children}</body>
    </html>
  );
}
