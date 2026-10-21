import {
  Faq,
  Features,
  FinalCta,
  Footer,
  Header,
  Hero,
  HowItWorks,
  Install,
  Privacy,
  Release,
  Screenshots,
} from "./components/sections";

export default function Home() {
  return (
    <>
      {/* Oranžová žiara za úvodom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-50 h-[900px] bg-[radial-gradient(ellipse_60%_55%_at_70%_30%,rgb(255_148_56/0.22),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-[1120px] px-6">
        <Header />
        <main>
          <Hero />
          <HowItWorks />
          <Features />
          <Screenshots />
          <Privacy />
          <Install />
          <Release />
          <Faq />
          <FinalCta />
        </main>
        <Footer />
      </div>
    </>
  );
}
