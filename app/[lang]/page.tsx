import { notFound } from "next/navigation";
import { getDictionary } from "@/dictionaries";
import { hasLocale } from "@/lib/i18n";
import { ScrollManager } from "../components/scroll";
import {
  CategoryNav,
  Faq,
  Features,
  FinalCta,
  Footer,
  Header,
  Hero,
  HowItWorks,
  Install,
  MoreTools,
  Overview,
  Privacy,
  Release,
  Stats,
} from "../components/sections";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);
  return (
    <>
      <ScrollManager />
      <Header t={t} lang={lang} />
      <main>
        <Hero t={t} />
        <Stats t={t} />
        <HowItWorks t={t} />
        <Overview t={t} />
        {/* Lišta kategórií je prilepená len počas funkcií */}
        <div>
          <CategoryNav t={t} />
          <Features t={t} />
        </div>
        <MoreTools t={t} />
        <Privacy t={t} />
        <Install t={t} />
        <Release t={t} />
        <Faq t={t} />
        <FinalCta t={t} />
      </main>
      <Footer />
    </>
  );
}
