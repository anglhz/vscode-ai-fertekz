export interface LandingSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface LandingFaq {
  question: string;
  answer: string;
}

export interface LandingPageContent {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string;
  highlights: { label: string; value: string }[];
  sections: LandingSection[];
  faqs: LandingFaq[];
  serviceName: string;
  areaServed: string[];
  breadcrumb: { name: string; path: string }[];
  related: { label: string; path: string }[];
}

const CONTACT_AREAS = [
  "Eskilstuna",
  "Södermanland",
  "Sörmland",
  "Strängnäs",
  "Katrineholm",
  "Nyköping",
  "Mälardalen",
];

const commonRelated = [
  { label: "Webbyrå i Eskilstuna", path: "/webbyra-eskilstuna" },
  { label: "Vad kostar en hemsida?", path: "/vad-kostar-en-hemsida" },
  { label: "Hemsida till företag", path: "/hemsida-till-foretag" },
  { label: "Start – 299 kr/mån", path: "/tjanster/landningssida" },
  { label: "Företag – 399 kr/mån", path: "/tjanster/foretagswebbplats" },
];

const relatedExcept = (path: string) => commonRelated.filter((link) => link.path !== path);

export const landingPages: Record<string, LandingPageContent> = {
  "webbyra-eskilstuna": {
    slug: "/webbyra-eskilstuna",
    title: "Webbyrå i Eskilstuna | Hemsidor från 299 kr/mån – Fertekz IT",
    description:
      "Lokal webbyrå i Eskilstuna. Mobilanpassade hemsidor från 299 kr/mån utan startavgift, med hosting, SSL och support inkluderat.",
    eyebrow: "Webbyrå Eskilstuna",
    h1: "Webbyrå i Eskilstuna – hemsidor som ger dig fler kunder",
    intro:
      "Fertekz IT är en enmansdriven webbyrå i Eskilstuna. Du pratar direkt med den som bygger sidan – ingen säljare, inga mellanhänder och inga överraskningar på fakturan. Jag bygger moderna, snabba och mobilanpassade webbplatser för småföretag, hantverkare, konsulter och lokala verksamheter i Eskilstuna och resten av Sörmland.",
    highlights: [
      { label: "Från", value: "299 kr/mån" },
      { label: "Leveranstid", value: "2–4 veckor" },
      { label: "Svar inom", value: "24 timmar" },
    ],
    sections: [
      {
        heading: "Varför välja en lokal webbyrå i Eskilstuna?",
        paragraphs: [
          "En stor byrå i Stockholm ser dig som ett ärendenummer. Jag ser dig som en granne. Vi kan ta ett möte över en kaffe i centrala Eskilstuna, gå igenom din verksamhet på plats och prata om vad dina kunder faktiskt söker efter innan en enda rad kod skrivs.",
          "Att jobba lokalt betyder också att jag förstår marknaden. Ett byggföretag i Eskilstuna konkurrerar inte med hela Sverige – det konkurrerar med fem andra företag i samma stad. Det påverkar hur sidan byggs, vilka ord som används och hur den optimeras för Google.",
        ],
        bullets: [
          "Direktkontakt med utvecklaren – inga mellanled",
          "Fast månadspris utan startavgift",
          "Lokal SEO för Eskilstuna, Strängnäs, Katrineholm och Nyköping",
          "Du äger domän, kod och innehåll – alltid",
        ],
      },
      {
        heading: "Vad ingår i en hemsida från Fertekz IT",
        paragraphs: [
          "Alla sidor byggs med modern teknik (React och TypeScript) i stället för tunga mallsystem. Det gör att sidan laddar snabbt, får bra betyg i Googles hastighetsmätningar och fungerar lika bra i mobilen som på en stor skärm.",
        ],
        bullets: [
          "Anpassad design efter ditt varumärke – ingen färdig mall",
          "Mobiloptimering och snabb laddningstid",
          "Kontaktformulär som mejlar dig direkt",
          "Grundläggande SEO: titlar, beskrivningar, rubrikstruktur och sitemap",
          "Google Maps, öppettider och sociala medier",
          "Enkel manual så att du kan byta texter och bilder själv",
        ],
      },
      {
        heading: "Så går ett projekt till",
        paragraphs: [
          "Processen är avsiktligt enkel. De flesta kunder lägger under fem timmar av sin egen tid på hela projektet.",
        ],
        bullets: [
          "1. Kostnadsfri konsultation – vi går igenom mål, budget och innehåll",
          "2. Du skickar material: texter, logotyp och eventuella bilder",
          "3. Jag bygger sidan och skickar en förhandsvisning på en riktig adress",
          "4. Du ger feedback, vi justerar och sidan lanseras",
        ],
      },
      {
        heading: "Priser utan överraskningar",
        paragraphs: [
          "Fertekz Start kostar 299 kr/mån för en tydlig ensideshemsida. Företag kostar 399 kr/mån och omfattar upp till fem sidor. Pro kostar 499 kr/mån för upp till sju sidor, mer SEO och prioriterad support.",
          "Hosting, SSL, säkerhetskopior, tekniskt underhåll, support och löpande mindre ändringar ingår. Ingen startavgift eller bindningstid tillkommer. Vid avslut gäller abonnemanget till slutet av den redan betalda perioden. Alla priser är exklusive moms.",
        ],
      },
    ],
    faqs: [
      {
        question: "Vad kostar en hemsida hos en webbyrå i Eskilstuna?",
        answer:
          "Hos Fertekz IT kostar en ensideshemsida 299 kr/mån och en företagswebbplats med upp till fem sidor 399 kr/mån, exklusive moms och utan startavgift.",
      },
      {
        question: "Hur lång tid tar det att få en ny hemsida?",
        answer:
          "Normalt 2–4 veckor från att materialet är inlämnat. En enklare landningssida kan gå snabbare.",
      },
      {
        question: "Träffas vi fysiskt i Eskilstuna?",
        answer:
          "Gärna. Vi kan ses i Eskilstuna eller ta mötet digitalt – det som passar dig bäst.",
      },
      {
        question: "Ingår drift i abonnemanget?",
        answer:
          "Ja. Hosting, SSL, backup, tekniskt underhåll och support ingår i alla abonnemang.",
      },
    ],
    serviceName: "Webbyrå i Eskilstuna",
    areaServed: CONTACT_AREAS,
    breadcrumb: [
      { name: "Hem", path: "/" },
      { name: "Webbyrå Eskilstuna", path: "/webbyra-eskilstuna" },
    ],
    related: relatedExcept("/webbyra-eskilstuna"),
  },

  "vad-kostar-en-hemsida": {
    slug: "/vad-kostar-en-hemsida",
    title: "Vad kostar en hemsida 2026? Priser & prisexempel | Fertekz IT",
    description:
      "Vad kostar en hemsida per månad? Jämför abonnemang för landningssida och företagswebbplats med drift, support och ändringar inkluderat.",
    eyebrow: "Prisguide",
    h1: "Vad kostar en hemsida? Priser, prisexempel och dolda kostnader",
    intro:
      "Hos Fertekz betalar du ett fast månadspris i stället för en stor engångskostnad. Priset beror främst på antal sidor, hur mycket innehåll du behöver hjälp med och hur många löpande ändringar som ska ingå.",
    highlights: [
      { label: "Start", value: "299 kr/mån" },
      { label: "Företag", value: "399 kr/mån" },
      { label: "Pro", value: "499 kr/mån" },
    ],
    sections: [
      {
        heading: "Prisnivåer på den svenska marknaden",
        bullets: [
          "Gör-det-själv med mall (Wix, Squarespace): 0–200 kr/mån, men kostar dig tid och ger sällan bra hastighet eller SEO",
          "Frilansare eller liten byrå: 3 000–20 000 kr för en färdig sida",
          "Etablerad webbyrå: 30 000–150 000 kr, ofta med strategiarbete och grafisk profil",
          "E-handel eller system: 50 000 kr och uppåt beroende på integrationer",
        ],
        paragraphs: [
          "För de flesta småföretag är intervallet 3 000–15 000 kronor rätt nivå. Går du under det får du oftast en mall utan anpassning. Går du över betalar du för projektledning och möten snarare än för själva sidan.",
        ],
      },
      {
        heading: "Vad påverkar priset mest?",
        bullets: [
          "Antal sidor – varje extra sida kräver design, innehåll och test (hos mig 1 000 kr/st)",
          "Om texterna finns färdiga – textproduktion är ofta den dyraste posten hos byråer",
          "Bilder – egen fotografering kostar, bra bildbank är billigare",
          "Funktioner – bokning, betalning, inloggning eller kundportal höjer priset",
          "Flerspråkighet – varje språk är i praktiken en ny uppsättning innehåll",
        ],
      },
      {
        heading: "Löpande kostnader du inte får glömma",
        paragraphs: [
          "I Fertekz abonnemang samlas bygge, drift och löpande hjälp i samma månadskostnad.",
        ],
        bullets: [
          "Domän: ca 200–300 kr per år för .se eller .com",
          "Webbhotell: 50–150 kr per månad för en vanlig sida",
          "SSL-certifikat: ingår normalt kostnadsfritt",
          "Hosting, SSL, uppdateringar, säkerhetskopior och support: ingår i samtliga abonnemang",
        ],
      },
      {
        heading: "Konkreta prisexempel",
        bullets: [
          "Hantverkare med en tydlig tjänst: Start för 299 kr/mån",
          "Konsultföretag med flera tjänstesidor: Företag för 399 kr/mån",
          "Restaurang med meny, bokningslänk och mer innehåll: Pro för 499 kr/mån",
          "Frilansare med enkel portfolio: Start för 299 kr/mån",
        ],
        paragraphs: [
          "Alla priser är exklusive moms. Ingen startavgift eller bindningstid tillkommer. Abonnemanget kan avslutas när som helst och gäller till slutet av den redan betalda perioden.",
        ],
      },
      {
        heading: "Är en billig hemsida en dålig hemsida?",
        paragraphs: [
          "Nej – men en billig hemsida utan plan är det. Det som avgör om sidan tjänar in sig är om den laddar snabbt, fungerar i mobilen, går att hitta på Google och gör det uppenbart hur man kontaktar dig. Det går att göra på en enda välbyggd sida. En dyr sida med tio undersidor som ingen läser är sämre affär än en billig sida som ringer in kunder.",
        ],
      },
    ],
    faqs: [
      {
        question: "Vad kostar en enkel hemsida?",
        answer:
          "En enkel men professionell landningssida kostar 299 kr/mån hos Fertekz IT, exklusive moms och utan startavgift.",
      },
      {
        question: "Vad kostar en hemsida per månad?",
        answer:
          "Fertekz abonnemang kostar 299, 399 eller 499 kr per månad beroende på omfattning. Hosting, backup, uppdateringar och support ingår; domän debiteras separat.",
      },
      {
        question: "Ingår texterna i priset?",
        answer:
          "Du levererar texterna, vilket håller priset nere. Behöver du hjälp med textproduktion offereras det separat.",
      },
      {
        question: "Kan jag betala i delbetalning?",
        answer:
          "Ja, större projekt delas normalt upp i en delbetalning vid start och en vid leverans.",
      },
    ],
    serviceName: "Webbutveckling till fast månadspris",
    areaServed: CONTACT_AREAS,
    breadcrumb: [
      { name: "Hem", path: "/" },
      { name: "Vad kostar en hemsida", path: "/vad-kostar-en-hemsida" },
    ],
    related: relatedExcept("/vad-kostar-en-hemsida"),
  },

  "hemsida-till-foretag": {
    slug: "/hemsida-till-foretag",
    title: "Hemsida till företag – pris och innehåll | Fertekz IT",
    description:
      "Behöver företaget en ny hemsida? Upp till fem sidor för 399 kr/mån utan startavgift. Mobilanpassning, SEO, hosting och support ingår.",
    eyebrow: "För företag",
    h1: "Hemsida till företag – vad den ska innehålla och vad den kostar",
    intro:
      "En företagshemsida har ett enda jobb: göra det lätt för en potentiell kund att förstå vad du gör och ta kontakt. Allt annat är dekoration. Här går jag igenom vad en företagswebbplats bör innehålla, vad den kostar och hur du undviker de vanligaste misstagen.",
    highlights: [
      { label: "Pris", value: "399 kr/mån" },
      { label: "Ingår", value: "5 sidor" },
      { label: "Extra sida", value: "1 000 kr" },
    ],
    sections: [
      {
        heading: "De fem sidor de flesta företag behöver",
        bullets: [
          "Startsida – vad ni gör, för vem och varför man ska välja er",
          "Tjänster – en tydlig genomgång av erbjudandet, gärna med prisintervall",
          "Om oss – ansikten, historia och kompetens skapar förtroende",
          "Referenser – kundcase och omdömen som bevisar att ni levererar",
          "Kontakt – formulär, telefon, mejl, adress och öppettider",
        ],
        paragraphs: [
          "Har ni flera tydligt olika tjänster lönar det sig nästan alltid att ge varje tjänst en egen sida i stället för att klämma in allt på en. Det ger fler ingångar från Google och gör innehållet mer relevant för besökaren.",
        ],
      },
      {
        heading: "Vad som faktiskt får besökare att höra av sig",
        bullets: [
          "Telefonnumret synligt högst upp – många ringer hellre än fyller i formulär",
          "Prisindikation, även ungefärlig – sidor utan pris tappar besökare",
          "Kort formulär: namn, mejl och meddelande räcker oftast",
          "Tydligt löfte om svarstid, till exempel svar inom 24 timmar",
          "Riktiga bilder på verksamheten i stället för generiska bildbanksbilder",
        ],
      },
      {
        heading: "Teknik som håller",
        paragraphs: [
          "Sidan byggs med React och TypeScript, publiceras på snabb hosting och får automatiskt SSL. Den är byggd för att klara Googles krav på hastighet och mobilanpassning, vilket i sin tur påverkar var ni hamnar i sökresultaten.",
          "Ni får också grundläggande sökmotoroptimering på plats från dag ett: rätt sidtitlar, beskrivningar, rubrikstruktur, sitemap och strukturerad data så att Google förstår vad företaget gör och var det finns.",
        ],
      },
      {
        heading: "Pris och tillval",
        bullets: [
          "Företagswebbplats med upp till fem sidor: 399 kr/mån",
          "Extra sida: 1 000 kr per styck",
          "Textproduktion, fotografering eller logotyp: offert",
          "Domänregistrering och uppsättning: ca 200–300 kr per år",
          "Hosting, SSL, backup, support och två mindre ändringar per månad ingår",
        ],
        paragraphs: ["Alla priser är exklusive moms."],
      },
    ],
    faqs: [
      {
        question: "Vad kostar en hemsida till ett företag?",
        answer:
          "En företagswebbplats med upp till fem sidor kostar 399 kr/mån exklusive moms, utan startavgift.",
      },
      {
        question: "Kan jag uppdatera företagssidan själv?",
        answer:
          "Ja. Du får en enkel manual och kan själv byta texter och bilder efter leverans.",
      },
      {
        question: "Hjälper ni med Google-synlighet?",
        answer:
          "Grundläggande SEO ingår i alla projekt: sidtitlar, beskrivningar, rubrikstruktur, sitemap och strukturerad data för lokal sökning.",
      },
      {
        question: "Äger företaget hemsidan efteråt?",
        answer:
          "Ja, ni äger både domän och innehåll och får full tillgång efter leverans.",
      },
    ],
    serviceName: "Företagswebbplats",
    areaServed: CONTACT_AREAS,
    breadcrumb: [
      { name: "Hem", path: "/" },
      { name: "Hemsida till företag", path: "/hemsida-till-foretag" },
    ],
    related: relatedExcept("/hemsida-till-foretag"),
  },

  landningssida: {
    slug: "/tjanster/landningssida",
    title: "Landningssida 299 kr/mån – snabb start online | Fertekz IT",
    description:
      "Professionell landningssida för 299 kr/mån utan startavgift. Modern design, mobiloptimering, kontaktformulär, SEO, hosting och support ingår.",
    eyebrow: "Tjänst",
    h1: "Landningssida för 299 kr/mån – hela verksamheten på en sida",
    intro:
      "En landningssida är en enda välbyggd sida som presenterar din verksamhet och leder besökaren till ett kontaktformulär eller ett telefonnummer. Det är det snabbaste och billigaste sättet att komma igång online – och för många småföretag är det allt som behövs.",
    highlights: [
      { label: "Pris", value: "299 kr/mån" },
      { label: "Startavgift", value: "0 kr" },
      { label: "Leverans", value: "1–2 veckor" },
    ],
    sections: [
      {
        heading: "Det här ingår",
        bullets: [
          "Modern, anpassad design på en sida",
          "Mobiloptimering – sidan byggs för mobilen först",
          "Kontaktformulär som mejlar förfrågningar direkt till dig",
          "Grundläggande SEO med titel, beskrivning och strukturerad data",
          "Snabb laddning och SSL",
          "Kort manual så att du kan byta text och bilder själv",
        ],
      },
      {
        heading: "Vem passar en landningssida för?",
        paragraphs: [
          "Landningssidan passar dig som har en tydlig tjänst och en tydlig målgrupp: hantverkare, frisörer, personliga tränare, konsulter, städfirmor, lokala tjänsteföretag och alla som just har startat och vill se om det finns efterfrågan innan de investerar mer.",
          "Den passar också som kampanjsida vid sidan av en befintlig webbplats, till exempel för en specifik tjänst eller ett tidsbegränsat erbjudande.",
        ],
      },
      {
        heading: "Så byggs en landningssida som konverterar",
        bullets: [
          "Ett tydligt löfte högst upp – vad du gör och för vem, på en rad",
          "Bevis direkt efter: omdömen, kundlogotyper eller bilder på utfört arbete",
          "Tjänster och pris i klartext, inte gömt bakom ett formulär",
          "Kontaktmöjlighet som återkommer flera gånger under sidan",
          "Telefonnummer som går att trycka på i mobilen",
        ],
      },
      {
        heading: "Vill du växa senare?",
        paragraphs: [
          "Landningssidan byggs så att den går att bygga ut. När verksamheten växer kan den kompletteras med tjänstesidor, referenssidor och blogg – du betalar då 1 000 kr per extra sida i stället för att börja om från början.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hur snabbt kan landningssidan vara klar?",
        answer:
          "Oftast inom en till två veckor från att texter och logotyp är inlämnade.",
      },
      {
        question: "Passar en landningssida för företag?",
        answer:
          "Ja, särskilt för småföretag som vill synas online utan en stor sajt.",
      },
      {
        question: "Kan jag bygga ut sidan senare?",
        answer:
          "Ja. Extra sidor läggs till för 1 000 kr per styck och du behåller designen.",
      },
    ],
    serviceName: "Landningssida",
    areaServed: CONTACT_AREAS,
    breadcrumb: [
      { name: "Hem", path: "/" },
      { name: "Tjänster", path: "/#services" },
      { name: "Landningssida", path: "/tjanster/landningssida" },
    ],
    related: relatedExcept("/tjanster/landningssida"),
  },

  foretagswebbplats: {
    slug: "/tjanster/foretagswebbplats",
    title: "Företagswebbplats 399 kr/mån | Fertekz IT Eskilstuna",
    description:
      "Professionell företagswebbplats med upp till fem sidor för 399 kr/mån utan startavgift. Design, SEO, hosting, support och ändringar ingår.",
    eyebrow: "Tjänst",
    h1: "Företagswebbplats för 399 kr/mån",
    intro:
      "En komplett webbplats för företag som behöver mer än en sida: tjänster, referenser, om oss och kontakt – byggt så att både kunder och Google hittar rätt. Fast månadspris, ingen startavgift och en tydlig process.",
    highlights: [
      { label: "Pris", value: "399 kr/mån" },
      { label: "Sidor", value: "upp till 5" },
      { label: "Leverans", value: "2–4 veckor" },
    ],
    sections: [
      {
        heading: "Det här ingår",
        bullets: [
          "Anpassad design med upp till fem sidor: Start, Tjänster, Om oss, Kontakt och Referenser",
          "Kontaktformulär, Google Maps och koppling till sociala medier",
          "Grundläggande SEO på varje sida",
          "Snabb laddning och mobiloptimering",
          "Manual för egna uppdateringar",
        ],
      },
      {
        heading: "Tillval",
        bullets: [
          "Extra sidor: 1 000 kr per styck",
          "Textproduktion, fotografering och logotyp: offert",
          "Domänregistrering och uppsättning: ca 200–300 kr per år",
          "Flerspråkig sida: offert",
        ],
      },
      {
        heading: "Drift och support",
        paragraphs: [
          "Webbhotell, SSL, säkerhetskopior, uppdateringar, support och två mindre ändringar per månad ingår i Företag-abonnemanget.",
          "Driftavtal är helt frivilligt. Väljer du bort det ansvarar du själv för webbhotell och uppdateringar – jag hjälper gärna till med rekommendationer.",
        ],
      },
      {
        heading: "Så går det till",
        bullets: [
          "1. Kort möte där vi går igenom behov och mål",
          "2. Du skickar material: texter, logotyp och bilder",
          "3. Jag bygger sidan och skickar en förhandsvisning",
          "4. Du ger feedback, vi justerar och sidan lanseras",
        ],
        paragraphs: ["Leveranstid: cirka 2–4 veckor. Alla priser är exklusive moms."],
      },
    ],
    faqs: [
      {
        question: "Vad kostar en företagswebbplats?",
        answer:
          "399 kr/mån exklusive moms för upp till fem sidor, utan startavgift.",
      },
      {
        question: "Ingår drift och support?",
        answer:
          "Ja. Hosting, SSL, backup, tekniskt underhåll och support ingår i månadspriset.",
      },
      {
        question: "Kan ni flytta över en befintlig hemsida?",
        answer:
          "Ja, befintligt innehåll kan flyttas över till den nya sidan. Omfattningen påverkar priset och ingår i offerten.",
      },
    ],
    serviceName: "Företagswebbplats",
    areaServed: CONTACT_AREAS,
    breadcrumb: [
      { name: "Hem", path: "/" },
      { name: "Tjänster", path: "/#services" },
      { name: "Företagswebbplats", path: "/tjanster/foretagswebbplats" },
    ],
    related: relatedExcept("/tjanster/foretagswebbplats"),
  },
};

const cityPage = (city: string, slug: string, distance: string, extra: string): LandingPageContent => ({
  slug: `/orter/${slug}`,
  title: `Webbyrå i ${city} | Hemsidor från 299 kr/mån – Fertekz IT`,
  description: `Hemsidor för företag i ${city} från 299 kr/mån utan startavgift. Mobilanpassning, SEO, hosting och support ingår.`,
  eyebrow: `Webbyrå ${city}`,
  h1: `Webbyrå i ${city} – hemsidor för lokala företag`,
  intro: `Fertekz IT bygger hemsidor för företag i ${city} och resten av Sörmland. Jag utgår från Eskilstuna, ${distance}, vilket gör det enkelt att ses på plats när det behövs. Du får ett fast månadspris, direktkontakt med utvecklaren och en sida som laddar snabbt och fungerar i mobilen.`,
  highlights: [
    { label: "Från", value: "299 kr/mån" },
    { label: "Leveranstid", value: "2–4 veckor" },
    { label: "Svar inom", value: "24 timmar" },
  ],
  sections: [
    {
      heading: `Lokal synlighet i ${city}`,
      paragraphs: [
        `De flesta som söker en tjänst i ${city} skriver in tjänsten plus ortsnamnet i Google. Därför byggs varje sida med lokal sökmotoroptimering: ortsnamnet finns i sidtitlar, rubriker och strukturerad data, och företaget kopplas ihop med sin geografiska plats så att Google förstår var ni verkar.`,
        extra,
      ],
    },
    {
      heading: "Vad du får",
      bullets: [
        "Anpassad design efter ert varumärke",
        "Mobiloptimering och snabb laddningstid",
        "Kontaktformulär som mejlar er direkt",
        "Grundläggande SEO med lokal inriktning",
        "Google Maps, öppettider och kontaktuppgifter",
        "Manual så att ni kan uppdatera innehållet själva",
      ],
    },
    {
      heading: "Priser",
      bullets: [
        "Start med en ensideshemsida: 299 kr/mån",
        "Företag med upp till fem sidor: 399 kr/mån",
        "Pro med upp till sju sidor: 499 kr/mån",
        "Hosting, SSL, backup, support och löpande ändringar ingår",
      ],
      paragraphs: ["Alla priser är exklusive moms."],
    },
  ],
  faqs: [
    {
      question: `Bygger ni hemsidor åt företag i ${city}?`,
      answer: `Ja. Fertekz IT utgår från Eskilstuna och tar uppdrag i hela Sörmland och Mälardalen, inklusive ${city}.`,
    },
    {
      question: "Måste vi ses fysiskt?",
      answer:
        "Nej, hela projektet går att sköta digitalt. Men vi kan lika gärna ses på plats om ni föredrar det.",
    },
    {
      question: "Vad kostar det?",
      answer:
        "Start kostar 299 kr/mån, Företag 399 kr/mån och Pro 499 kr/mån, exklusive moms och utan startavgift.",
    },
  ],
  serviceName: `Webbyrå i ${city}`,
  areaServed: [city, "Södermanland", "Sörmland", "Mälardalen"],
  breadcrumb: [
    { name: "Hem", path: "/" },
    { name: "Orter", path: "/webbyra-eskilstuna" },
    { name: city, path: `/orter/${slug}` },
  ],
  related: [
    { label: "Webbyrå i Eskilstuna", path: "/webbyra-eskilstuna" },
    { label: "Vad kostar en hemsida?", path: "/vad-kostar-en-hemsida" },
    { label: "Hemsida till företag", path: "/hemsida-till-foretag" },
  ],
});

landingPages["strangnas"] = cityPage(
  "Strängnäs",
  "strangnas",
  "cirka 30 minuter bort",
  "Strängnäs har många små tjänsteföretag, besöksnäring och konsulter där en tydlig och snabb webbplats gör stor skillnad mot en gammal mall som inte fungerar i mobilen.",
);

landingPages["katrineholm"] = cityPage(
  "Katrineholm",
  "katrineholm",
  "cirka 40 minuter bort",
  "I Katrineholm är konkurrensen om lokala söktermer fortfarande låg, vilket gör att en välbyggd sida ofta syns på Googles första sida betydligt snabbare än i storstäderna.",
);

landingPages["nykoping"] = cityPage(
  "Nyköping",
  "nykoping",
  "cirka en timme bort",
  "Nyköping har ett brett näringsliv med allt från hantverk till besöksnäring. En sida med tydliga tjänster, priser och kontaktvägar konverterar oftast bättre än en snygg men otydlig startsida.",
);

export const allLandingPages = Object.values(landingPages);
