import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mandarinka – rýchle úpravy súborov pre Mac",
  description:
    "Ťahaj súbor, podrž Shift a vyber akciu. Prevody, zmenšenie, AI zväčšenie, odstránenie pozadia, rozmazanie a ďalšie – offline, priamo na Macu.",
  openGraph: {
    title: "Mandarinka – rýchle úpravy súborov pre Mac",
    description: "Ťahaj súbor, podrž Shift a vyber akciu. Všetko offline, priamo na Macu.",
    type: "website",
    locale: "sk_SK",
  },
};

export const viewport: Viewport = {
  themeColor: "#130f0e",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="sk" className="antialiased">
      <body className="min-h-screen overflow-x-hidden font-sans text-[17px] leading-relaxed">{children}</body>
    </html>
  );
}
