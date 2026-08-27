import type { LandingPageContent } from "@/content/landingPages";

const AREAS = [
  "Eskilstuna",
  "Södermanland",
  "Sörmland",
  "Strängnäs",
  "Katrineholm",
  "Nyköping",
  "Mälardalen",
];

export const servicePages: Record<string, LandingPageContent> = {
  webbutveckling: {
    slug: "/webbutveckling",
    title: "Webbutveckling i React & TypeScript | Fertekz IT",
    description:
      "Webbutveckling med React, TypeScript och Node.js. Jag bygger snabba, tillgängliga och sökmotorvänliga webbplatser för företag i Eskilstuna och Mälardalen.",
    eyebrow: "Webbutveckling",
    h1: "Webbutveckling – kod som gör hemsidan snabb, stabil och sökbar",
    intro:
      "Webbutveckling handlar om det som händer bakom designen: struktur, prestanda, kodkvalitet och integrationer. Jag bygger webbplatser från grunden i React och TypeScript i stället för färdiga mallar, vilket gör att sidan laddar snabbt, blir enkel att vidareutveckla och inte drar med sig onödiga plugins.",
    highlights: [
      { label: "Stack", value: "React + TypeScript" },
      { label: "Leveranstid", value: "2–4 veckor" },
      { label: "Abonnemang", value: "Från 299 kr/mån" },
    ],
    sections: [
      {
        heading: "Vad ingår i ett utvecklingsuppdrag",
        bullets: [
          "Uppsättning av projekt, versionshantering och driftmiljö",
          "Komponentbaserad kod som är enkel att bygga vidare på",
          "Kontaktformulär och e-postutskick som faktiskt kommer fram",
          "Teknisk SEO: titlar, metabeskrivningar, canonical, sitemap och strukturerad data",
          "Prestandaoptimering av bilder, typsnitt och JavaScript",
          "Grundläggande tillgänglighet: semantisk HTML, tangentbordsnavigering och kontrast",
        ],
      },
      {
        heading: "Teknik jag arbetar med",
        paragraphs: [
          "React och TypeScript för gränssnittet, Node.js för serverlogik och Supabase eller MySQL när sidan behöver en databas. För innehåll som ändras ofta kopplar jag på ett enkelt adminläge så att du kan uppdatera texter och bilder själv.",
          "Jag använder inte WordPress. Det är ett bra verktyg i rätt sammanhang, men för de flesta småföretagssidor innebär det fler plugins, mer underhåll och sämre prestanda än en handbyggd sida.",
        ],
      },
      {
        heading: "Integrationer och funktioner",
        bullets: [
          "Bokningsförfrågningar och offertformulär",
          "Nyhetsbrev och e-postnotiser",
          "Kartor, öppettider och Google Business-koppling",
          "Statistik och mätning av besökare och konverteringar",
          "Inloggat läge när verksamheten behöver det",
        ],
      },
      {
        heading: "Så går arbetet till",
        paragraphs: [
          "Vi börjar med ett kostnadsfritt samtal där du berättar vad sidan ska göra. Därefter väljer vi rätt abonnemang och tidplan. Under bygget får du en länk till en testversion så att du kan följa arbetet och lämna synpunkter före lansering.",
        ],
      },
    ],
    faqs: [
      {
        question: "Kan du bygga vidare på en befintlig sida?",
        answer:
          "Ja, om koden går att arbeta med. Jag tittar först på den nuvarande lösningen och säger ärligt om det är bättre att bygga om från grunden.",
      },
      {
        question: "Äger jag koden efteråt?",
        answer:
          "Ja. Du äger domän, innehåll och kod och får full tillgång vid leverans.",
      },
      {
        question: "Kan jag uppdatera innehållet själv?",
        answer:
          "Ja. Du får en enkel manual, och vid behov ett adminläge där du byter texter och bilder utan att röra koden.",
      },
    ],
    serviceName: "Webbutveckling",
    areaServed: AREAS,
    breadcrumb: [
      { name: "Hem", path: "/" },
      { name: "Webbutveckling", path: "/webbutveckling" },
    ],
    related: [
      { label: "Webbdesign", path: "/webbdesign" },
      { label: "Responsiv webbdesign", path: "/responsiv-webbdesign" },
      { label: "Hemsidor och paket", path: "/hemsidor" },
      { label: "Case: DrogSök.se", path: "/projekt/drogsok" },
    ],
  },

  webbdesign: {
    slug: "/webbdesign",
    title: "Webbdesign för företag – modern och tydlig | Fertekz IT",
    description:
      "Webbdesign som är snygg och begriplig. Jag formger struktur, typografi och färg så att besökaren förstår vad du erbjuder och tar kontakt. Eskilstuna och Mälardalen.",
    eyebrow: "Webbdesign",
    h1: "Webbdesign som leder besökaren till att höra av sig",
    intro:
      "Design på webben är inte bara utseende – det är i vilken ordning informationen kommer, hur lätt det är att hitta kontaktuppgifterna och om sidan känns seriös på tre sekunder. Jag formger utifrån vad dina kunder faktiskt letar efter, och håller uttrycket i linje med ditt varumärke.",
    highlights: [
      { label: "Underlag", value: "Skiss innan bygge" },
      { label: "Revideringar", value: "Ingår" },
      { label: "Mobil först", value: "Alltid" },
    ],
    sections: [
      {
        heading: "Vad designarbetet omfattar",
        bullets: [
          "Innehållsstruktur: vilka sidor och sektioner du behöver, och i vilken ordning",
          "Typografi och färgskala anpassad efter ditt varumärke",
          "Layout för mobil, surfplatta och dator",
          "Bildval, beskärning och komprimering",
          "Knappar och formulär som är tydliga att använda",
          "Kontrast och läsbarhet enligt tillgänglighetsriktlinjer",
        ],
      },
      {
        heading: "Har du redan en grafisk profil?",
        paragraphs: [
          "Då utgår jag från den: logotyp, färger och typsnitt används rakt av så att webbplatsen känns igen från ditt övriga material. Saknar du profil bygger vi en enkel visuell riktning tillsammans – tillräckligt för att sidan ska hålla ihop utan att det blir ett stort varumärkesprojekt.",
        ],
      },
      {
        heading: "Design och prestanda hänger ihop",
        paragraphs: [
          "Animationer, stora bilder och många typsnitt kostar laddningstid, och långsamma sidor tappar besökare. Jag håller kvar de visuella effekter som gör intryck och tar bort det som bara kostar. Bilder levereras i moderna format och laddas i den ordning som gör att sidan känns snabb.",
        ],
      },
    ],
    faqs: [
      {
        question: "Får jag se designen innan ni bygger?",
        answer:
          "Ja. Du får ett förslag på struktur och utseende innan kodningen börjar, och du säger till om något ska ändras.",
      },
      {
        question: "Hur många ändringsrundor ingår?",
        answer:
          "Vi jobbar tills du är nöjd med grunden. Större riktningsbyten sent i projektet påverkar tidplanen, och det säger jag till om i förväg.",
      },
      {
        question: "Kan designen anpassas efter min bransch?",
        answer:
          "Ja. En hantverkarsida och en konsultsida behöver olika ton, upplägg och bildmaterial.",
      },
    ],
    serviceName: "Webbdesign",
    areaServed: AREAS,
    breadcrumb: [
      { name: "Hem", path: "/" },
      { name: "Webbdesign", path: "/webbdesign" },
    ],
    related: [
      { label: "Webbutveckling", path: "/webbutveckling" },
      { label: "Responsiv webbdesign", path: "/responsiv-webbdesign" },
      { label: "Hemsidor och paket", path: "/hemsidor" },
      { label: "Case: Hakuna Potata", path: "/projekt/hakuna-potata" },
    ],
  },

  hemsidor: {
    slug: "/hemsidor",
    title: "Hemsidor för företag – paket och priser | Fertekz IT",
    description:
      "Hemsida till fast månadspris från 299 kr utan startavgift. Hosting, SSL, support och löpande ändringar ingår. Jämför abonnemangen Start, Företag och Pro.",
    eyebrow: "Hemsidor",
    h1: "Hemsidor för företag – välj rätt omfattning från början",
    intro:
      "Här är en samlad översikt över tre enkla abonnemang för olika verksamheter. Alla priser anges per månad exklusive moms, utan startavgift eller bindningstid. Abonnemanget gäller till slutet av den redan betalda perioden.",
    highlights: [
      { label: "Start", value: "299 kr/mån" },
      { label: "Företag", value: "399 kr/mån" },
      { label: "Leveranstid", value: "2–4 veckor" },
    ],
    sections: [
      {
        heading: "Landningssida – en sida som gör en sak bra",
        paragraphs: [
          "En enkelsidig webbplats med allt det viktigaste: vad du erbjuder, för vem, bevis på att du kan jobbet och kontaktuppgifter. Passar dig som är ny, driver kampanj eller bara behöver finnas online på ett trovärdigt sätt.",
        ],
        bullets: [
          "Responsiv design och kontaktformulär",
          "Grundläggande SEO och koppling till Google",
          "Publicering på din egen domän",
        ],
      },
      {
        heading: "Företagswebbplats – flera sidor och mer innehåll",
        paragraphs: [
          "Upp till fem sidor, till exempel start, tjänster, om oss, referenser och kontakt. Passar verksamheter som har flera tjänsteområden eller vill kunna ranka på fler söktermer.",
        ],
        bullets: [
          "Egen sida per tjänst, vilket ger fler ingångar från Google",
          "Bildmaterial, referenser och FAQ",
          "Strukturerad data för företagsinformation",
        ],
      },
      {
        heading: "Drift och support",
        paragraphs: [
          "Webbhotell, SSL, uppdateringar och säkerhetskopior ingår i samtliga abonnemang. Du får också support och ett antal mindre innehållsändringar varje månad.",
        ],
      },
      {
        heading: "Vilket paket passar dig?",
        bullets: [
          "En tjänst, ett tydligt erbjudande, snabb start: landningssida",
          "Flera tjänster eller orter du vill synas på: företagswebbplats",
          "Osäker: hör av dig, jag rekommenderar det mindre alternativet om det räcker",
        ],
      },
    ],
    faqs: [
      {
        question: "Tillkommer några kostnader utöver priset?",
        answer:
          "Domänregistrering och eventuella större tillägg debiteras separat. Hosting och SSL ingår. Alla priser anges exklusive moms.",
      },
      {
        question: "Kan jag börja litet och bygga ut senare?",
        answer:
          "Ja. En landningssida kan byggas ut till en flersidig webbplats utan att göras om från grunden.",
      },
      {
        question: "Hur lång tid tar det?",
        answer:
          "Normalt två till fyra veckor från att innehåll och bilder är på plats.",
      },
    ],
    serviceName: "Hemsidor för företag",
    areaServed: AREAS,
    breadcrumb: [
      { name: "Hem", path: "/" },
      { name: "Hemsidor", path: "/hemsidor" },
    ],
    related: [
      { label: "Start – 299 kr/mån", path: "/tjanster/landningssida" },
      { label: "Företag – 399 kr/mån", path: "/tjanster/foretagswebbplats" },
      { label: "Vad kostar en hemsida?", path: "/vad-kostar-en-hemsida" },
      { label: "Webbutveckling", path: "/webbutveckling" },
    ],
  },

  "responsiv-webbdesign": {
    slug: "/responsiv-webbdesign",
    title: "Responsiv webbdesign – hemsidor som fungerar i mobilen | Fertekz IT",
    description:
      "Responsiv webbdesign med mobilen först. Jag bygger hemsidor som är läsbara, snabba och lätta att använda på telefon, surfplatta och dator.",
    eyebrow: "Responsiv webbdesign",
    h1: "Responsiv webbdesign – bygg för mobilen först",
    intro:
      "De flesta som hittar ett lokalt företag via Google gör det i telefonen. Om sidan är trög, texten liten eller knapparna svåra att träffa försvinner besökaren till nästa träff. Responsiv design innebär att layouten anpassar sig efter skärmen i stället för att krympas ihop.",
    highlights: [
      { label: "Metod", value: "Mobile first" },
      { label: "Testas på", value: "Mobil, platta, dator" },
      { label: "Mål", value: "Godkända Core Web Vitals" },
    ],
    sections: [
      {
        heading: "Vad som faktiskt görs",
        bullets: [
          "Layouten byggs för liten skärm först och byggs ut uppåt",
          "Knappar och länkar får tillräckligt stora tryckytor",
          "Typografi som är läsbar utan att zooma",
          "Bilder i rätt storlek och format för varje skärm",
          "Meny som är lätt att nå med tummen",
          "Formulär med rätt tangentbordstyp för e-post och telefon",
        ],
      },
      {
        heading: "Prestanda på mobilnät",
        paragraphs: [
          "En sida kan kännas snabb på kontorets wifi och långsam på 4G. Jag mäter laddningstid, layoutförskjutning och svarstid vid interaktion, och optimerar bilder, typsnitt och JavaScript tills värdena ligger inom Googles rekommendationer.",
        ],
      },
      {
        heading: "Mobilanpassning och SEO",
        paragraphs: [
          "Google indexerar mobilversionen av din sida. Innehåll som göms eller tas bort i mobilen räknas därför sämre. Jag håller allt viktigt innehåll och alla viktiga länkar tillgängliga på alla skärmstorlekar.",
        ],
      },
    ],
    faqs: [
      {
        question: "Min sida ser konstig ut i mobilen – går den att rädda?",
        answer:
          "Ofta ja. Jag går igenom sidan och säger vad som kan justeras och vad som kräver ombyggnad.",
      },
      {
        question: "Behövs en separat mobilsajt?",
        answer:
          "Nej. En responsiv sida använder samma adress och samma innehåll på alla enheter, vilket också är bättre för SEO.",
      },
      {
        question: "Ingår mobilanpassning i alla paket?",
        answer: "Ja, alltid – det är inget tillval.",
      },
    ],
    serviceName: "Responsiv webbdesign",
    areaServed: AREAS,
    breadcrumb: [
      { name: "Hem", path: "/" },
      { name: "Responsiv webbdesign", path: "/responsiv-webbdesign" },
    ],
    related: [
      { label: "Webbdesign", path: "/webbdesign" },
      { label: "Webbutveckling", path: "/webbutveckling" },
      { label: "Hemsidor och paket", path: "/hemsidor" },
      { label: "Case: Intuitive Gaming", path: "/projekt/intuitive-gaming" },
    ],
  },
};
