import Image from "next/image";
import aplikacia from "@/assets/aplikacia.jpg";
import icon from "@/assets/icon.png";
import menu from "@/assets/menu.png";
import pozadie from "@/assets/pozadie.jpg";
import rozmazat from "@/assets/rozmazat.jpg";
import { asset, downloadUrl, release } from "@/lib/site";
import { AppleLogo, Badge, DownloadButton, Num, Section } from "./ui";

export function Header() {
  const links = [
    ["#ako", "Ako to funguje"],
    ["#funkcie", "Funkcie"],
    ["#instalacia", "Inštalácia"],
    ["#otazky", "Otázky"],
  ];
  return (
    <header className="flex items-center gap-6 py-5.5">
      <a href="#" className="flex items-center gap-2.5 text-lg font-bold">
        <Image src={icon} alt="" width={32} height={32} />
        Mandarinka
      </a>
      <nav className="ml-auto hidden gap-5.5 md:flex">
        {links.map(([href, label]) => (
          <a key={href} href={href} className="text-[15px] font-semibold text-cream/60 transition hover:text-cream">
            {label}
          </a>
        ))}
      </nav>
      <div className="ml-auto md:ml-0">
        <DownloadButton small>Stiahnuť</DownloadButton>
      </div>
    </header>
  );
}

export function Hero() {
  return (
    <section className="grid items-center gap-10 pt-5 pb-16 md:grid-cols-[1.05fr_1fr] md:pt-12">
      <div>
        <Badge>Prvá verzia · {release.version}</Badge>
        <h1 className="mt-4.5 mb-5 text-[clamp(42px,6vw,68px)] leading-[1.04] font-bold tracking-tight">
          Ťahaj súbor.
          <br />
          Podrž{" "}
          <kbd className="rounded-[0.28em] border border-b-[3px] border-white/20 bg-white/5 px-[0.35em] py-[0.05em] align-[0.08em] font-sans text-[0.72em]">
            ⇧ Shift
          </kbd>
          .
          <br />
          <span className="text-hot-gradient">Hotovo.</span>
        </h1>
        <p className="mb-7.5 max-w-[34em] text-[19px] text-cream/60">
          Mandarinka je malá aplikácia pre Mac, ktorá ti pri kurzore otvorí kruhové menu s rýchlymi úpravami.
          Prevod na JPG, menšia fotka, odstránenie pozadia, rozmazanie tváre či AI zväčšenie – jedným pohybom
          myšou, bez otvárania ďalších programov.
        </p>
        <div className="flex flex-col items-start gap-3">
          <DownloadButton>
            <AppleLogo />
            Stiahnuť pre macOS
          </DownloadButton>
          <span className="text-sm text-cream/60">
            {release.sizeMB} MB · {release.minMacOS} a novší · Apple Silicon aj Intel
          </span>
        </div>
      </div>
      <div className="mx-auto w-full max-w-[460px] md:max-w-none">
        <Image
          src={menu}
          alt="Kruhové menu Mandarinky s akciami pre obrázok"
          priority
          className="h-auto w-full animate-float drop-shadow-[0_30px_60px_rgb(0_0_0/0.55)] motion-reduce:animate-none"
        />
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    ["Chyť súbor", "Fotku, PDF alebo dokument – na ploche, vo Finderi, kdekoľvek. Začni ho ťahať."],
    ["Podrž Shift", "Pri kurzore sa otvorí kruhové menu. Vnútri prevody formátov, vonku nástroje."],
    ["Pusti na akciu", "Výsledok sa uloží hneď vedľa originálu. Originál ostane nezmenený."],
  ];
  return (
    <Section
      id="ako"
      title="Ako to funguje"
      subtitle="Žiadne nahrávanie na web, žiadne otváranie programov. Tri kroky a súbor je hotový."
    >
      <div className="grid gap-4.5 md:grid-cols-3">
        {steps.map(([title, text], i) => (
          <div key={title} className="card p-6">
            <Num n={i + 1} />
            <h3 className="mt-4 mb-1.5 text-[19px] font-bold">{title}</h3>
            <p className="text-[15.5px] text-cream/60">{text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

const features: [string, string, string][] = [
  ["⇄", "Prevody formátov", "JPG, PNG, HEIC, PDF, Word (DOCX), TXT, RTF, HTML. Viac fotiek naraz spojí do jedného PDF."],
  ["✦", "AI zväčšenie", "Z malej alebo „kockatej“ fotky spraví 4× väčšiu a ostrú. AI model beží priamo v Macu."],
  ["◐", "Bez pozadia", "Jedným pohybom odstráni pozadie fotky – osoba, zviera či produkt ostane na priehľadnom pozadí."],
  ["✂", "Vystrihnúť", "Klikni na objekt a AI ho vystrihne. Alebo laso – klikaj body okolo toho, čo chceš."],
  ["◌", "Rozmazať", "Tváre, texty, ŠPZ či čísla účtov. Nájde ich samé, oblasti posúvaš, zväčšuješ aj otáčaš."],
  ["▣", "Pozadie", "Obrázok na farebné pozadie so zaoblením a tieňom – profesionálne screenshoty za sekundu."],
  ["⌗", "Orezať", "Voľne alebo na presný pomer: 1:1 na Instagram, 9:16 na stories, 16:9 na YouTube."],
  ["↓", "Zmenšiť", "9 MB fotka na menej ako 1 MB – na poslanie mailom alebo na web. Zmenší aj PDF."],
  ["⌀", "Metadáta", "Odstráni z fotky polohu (GPS) a údaje o telefóne bez straty kvality."],
  ["✎", "Upraviť dokument", "Prepíš text vo Worde, RTF či TXT. Nájsť a nahradiť, tučné písmo, počet slov."],
];

export function Features() {
  return (
    <Section
      id="funkcie"
      title="Čo všetko vie"
      subtitle="Menu sa prispôsobí súboru – pri fotke ponúkne iné akcie ako pri PDF či Worde."
    >
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
        {features.map(([icon, title, text]) => (
          <div key={title} className="card p-6">
            <span className="mb-3 inline-grid h-9.5 w-9.5 place-items-center rounded-xl bg-hot-deep/15 text-[19px] font-bold text-hot">
              {icon}
            </span>
            <h3 className="mb-1.5 text-[19px] font-bold">{title}</h3>
            <p className="text-[15.5px] text-cream/60">{text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function Screenshots() {
  const shots = [
    { img: rozmazat, title: "Rozmazať", text: "„Nájsť texty“ zakryje e-mail, telefón aj IBAN", alt: "Okno Rozmazať – automaticky nájdené texty sú rozmazané" },
    { img: pozadie, title: "Pozadie", text: "farba, odsadenie, zaoblenie, tieň a pomer strán", alt: "Okno Pozadie – logo na oranžovom pozadí" },
    { img: aplikacia, title: "Aplikácia", text: "návod a všetky nastavenia na jednom mieste", alt: "Hlavné okno Mandarinky s návodom a nastaveniami" },
  ];
  return (
    <Section
      title="Ukážky"
      subtitle="Editory majú vlastný tmavý vzhľad a pri uložení cez obrázok prejde „skenovací“ lúč."
    >
      <div className="grid items-start gap-4.5 md:grid-cols-[1.25fr_1.25fr_1fr]">
        {shots.map((s) => (
          <figure key={s.title}>
            <Image
              src={s.img}
              alt={s.alt}
              className="h-auto w-full rounded-2xl border border-white/10 shadow-[0_24px_50px_rgb(0_0_0/0.5)]"
            />
            <figcaption className="mt-3 text-[14.5px] text-cream/60">
              <b className="text-cream">{s.title}</b> – {s.text}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

export function Privacy() {
  return (
    <Section>
      <div className="card flex flex-col items-center gap-5.5 p-8.5 text-center md:flex-row md:text-left">
        <div className="bg-hot grid h-17.5 w-17.5 shrink-0 place-items-center rounded-[22px] text-[32px] shadow-[0_10px_30px_rgb(247_84_33/0.4)]">
          🔒
        </div>
        <div>
          <h2 className="mb-2 text-[28px] font-bold tracking-tight">Všetko offline, priamo na tvojom Macu</h2>
          <p className="text-cream/60">
            Mandarinka neposiela tvoje fotky ani dokumenty nikam na internet. AI zväčšenie, odstránenie pozadia aj
            hľadanie tvárí bežia na čipe tvojho Macu. Žiadne účty, žiadne servery, žiadne sledovanie.
          </p>
        </div>
      </div>
    </Section>
  );
}

export function Install() {
  const steps = [
    <>
      <b>Stiahni</b>{" "}
      <a href={downloadUrl} download className="text-hot hover:underline">
        {release.file}
      </a>{" "}
      a otvor ho.
    </>,
    <>
      <b>Pretiahni</b> ikonu Mandarinky do priečinka <b>Aplikácie</b>.
    </>,
    <>
      <b>Otvor</b> Mandarinku z Aplikácií alebo cez Spotlight (⌘ + medzerník).
    </>,
    <>
      Ak macOS napíše, že <i>„nemôže overiť vývojára“</i>, klikni <b>Hotovo</b> a choď do{" "}
      <b>Nastavenia systému → Súkromie a bezpečnosť</b>. Úplne dole klikni <b>Aj tak otvoriť</b> a potvrď.{" "}
      <span className="text-cream/60">
        (Na macOS 13 a 14 stačí na aplikáciu kliknúť pravým tlačidlom → Otvoriť → Otvoriť.)
      </span>
    </>,
    <>
      Keď prvýkrát uložíš súbor na Plochu, do Dokumentov či Stiahnutých, macOS sa opýta na prístup – daj{" "}
      <b>Povoliť</b>.
    </>,
  ];
  return (
    <Section
      id="instalacia"
      title="Inštalácia"
      subtitle="Trvá to minútu. Pri prvom otvorení treba macOS raz potvrdiť, že aplikácii veríš."
    >
      <ol className="grid max-w-[760px] gap-3">
        {steps.map((content, i) => (
          <li key={i} className="flex gap-4 rounded-2xl border border-white/10 bg-panel px-4.5 py-4">
            <Num n={i + 1} size="sm" />
            <div>{content}</div>
          </li>
        ))}
      </ol>
      <p className="mt-4.5 max-w-[760px] text-[15px] text-cream/60">
        Prečo to upozornenie? Ide o prvú verziu, ktorá ešte nie je overená (notarizovaná) cez Apple. Overenie príde
        v ďalšej verzii – potom sa aplikácia otvorí bez otázok.
      </p>
    </Section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 list-disc space-y-1.5 pl-5 text-cream/60 marker:text-hot">
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}

export function Release() {
  return (
    <Section>
      <div className="grid gap-4.5 md:grid-cols-2">
        <div className="card p-6">
          <Badge>
            Verzia {release.version} · {release.date}
          </Badge>
          <h3 className="mt-3 mb-1.5 text-[22px] font-bold">Prvá verzia</h3>
          <p className="text-cream/60">
            Toto je úplne prvé vydanie Mandarinky. Všetko podstatné funguje, ale môžeš naraziť na drobnosti. Ak niečo
            nejde, alebo máš nápad, daj vedieť.
          </p>
          <Bullets
            items={[
              "Kruhové menu cez ťahanie + Shift",
              "Prevody obrázkov, PDF a dokumentov",
              "AI zväčšenie, bez pozadia, vystrihnutie",
              "Editory: orezať, rozmazať, pozadie, upraviť text",
              "Okno „Uložiť ako“ s výberom priečinka",
            ]}
          />
        </div>
        <div className="card p-6">
          <h3 className="mb-1.5 text-[22px] font-bold">Na čo myslieť</h3>
          <Bullets
            items={[
              "Prevod PDF → Word prenesie text, nie presné rozloženie strany.",
              "AI zväčšenie je pre fotky do 2048 px – väčšie sa zväčšia rýchlo 2×.",
              "AI vystrihnutie a „Bez pozadia“ potrebujú macOS 14 Sonoma a novší.",
              "WebP sa ponúkne len vtedy, ak ho tvoj macOS vie zapísať.",
              "Verzia pre Windows je v pláne.",
            ]}
          />
        </div>
      </div>
    </Section>
  );
}

export function Faq() {
  const items: [string, React.ReactNode][] = [
    ["Posiela Mandarinka moje súbory na internet?", "Nie. Všetky úpravy aj AI funkcie bežia priamo na tvojom Macu. Internet nepotrebuje."],
    [
      "Prepíše mi pôvodný súbor?",
      "Nie. Výsledok sa vždy uloží ako nový súbor (napríklad „Foto rozmazané.jpg“). Pri editoroch si môžeš vybrať názov aj priečinok a pri rovnakom názve sa rozhodneš, či ponechať oba, alebo nahradiť.",
    ],
    [
      "Menu sa neotvára, keď podržím Shift.",
      "Skontroluj, či Mandarinka beží (ikona v Docku alebo hore v menu bare). Súbor najprv začni ťahať a až potom podrž Shift. Menu sa dá otvoriť aj bez ťahania cez „Otvoriť súbor…“ v aplikácii.",
    ],
    [
      "Prečo sa macOS pýta na prístup k Ploche?",
      "macOS chráni Plochu, Dokumenty a Stiahnuté. Mandarinka tam potrebuje uložiť výsledok, preto sa raz opýta. Ak sa nechceš pýtať vôbec, v nastaveniach Mandarinky klikni pri „Prístup k priečinkom“ na Otvoriť a zapni ju v zozname Full Disk Access.",
    ],
    [
      "Dá sa vypnúť ikona v Docku?",
      "Áno. V hlavnom okne Mandarinky vypni „Zobrazovať v Docku“ – aplikácia potom beží len na pozadí, prípadne s malou ikonou v menu bare.",
    ],
    ["Ako Mandarinku odinštalujem?", "Ukonči ju (⌘Q) a presuň ju z Aplikácií do koša."],
    [
      "Je súbor na stiahnutie bezpečný?",
      <>
        Kontrolný súčet SHA-256 súboru {release.file}:
        <br />
        <code className="rounded-md bg-white/5 px-1.5 py-0.5 font-mono text-[13px] break-all text-cream">
          {release.sha256}
        </code>
        <br />
        Overíš ho v Termináli príkazom{" "}
        <code className="rounded-md bg-white/5 px-1.5 py-0.5 font-mono text-[13px] text-cream">
          shasum -a 256 {release.file}
        </code>
        .
      </>,
    ],
  ];
  return (
    <Section id="otazky" title="Časté otázky">
      <div className="grid max-w-[820px] gap-2.5">
        {items.map(([q, a]) => (
          <details key={q} className="group rounded-2xl border border-white/10 bg-panel px-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4.5 font-bold [&::-webkit-details-marker]:hidden">
              {q}
              <span className="plus text-[22px] font-bold text-hot transition-transform">+</span>
            </summary>
            <div className="pb-4.5 text-cream/60">{a}</div>
          </details>
        ))}
      </div>
    </Section>
  );
}

export function FinalCta() {
  return (
    <section className="flex flex-col items-center gap-4 pt-20 pb-24 text-center">
      <Image src={icon} alt="" width={96} height={96} className="drop-shadow-[0_16px_30px_rgb(247_84_33/0.35)]" />
      <h2 className="text-[clamp(30px,4vw,40px)] font-bold tracking-tight">Vyskúšaj Mandarinku</h2>
      <DownloadButton>Stiahnuť pre macOS</DownloadButton>
      <span className="text-sm text-cream/60">
        Verzia {release.version} · {release.sizeMB} MB · macOS 13+
      </span>
    </section>
  );
}

export function Footer() {
  const link = "text-hot hover:underline";
  return (
    <footer className="border-t border-white/10 pt-6.5 pb-10 text-sm text-cream/60">
      <p className="mb-1.5">© 2026 Leo Fudaly · Mandarinka</p>
      <p>
        AI zväčšenie používa{" "}
        <a className={link} href="https://github.com/xinntao/Real-ESRGAN">
          Real-ESRGAN
        </a>{" "}
        (BSD-3-Clause, Xintao Wang),{" "}
        <a className={link} href="https://github.com/Tencent/ncnn">
          ncnn
        </a>{" "}
        (BSD-3-Clause, Tencent) a{" "}
        <a className={link} href="https://github.com/KhronosGroup/MoltenVK">
          MoltenVK
        </a>{" "}
        (Apache-2.0).{" "}
        <a className={link} href={asset("/licencie.txt")}>
          Celé licencie
        </a>
        .
      </p>
    </footer>
  );
}
