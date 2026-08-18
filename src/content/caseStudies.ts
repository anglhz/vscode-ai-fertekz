import codbaseLogo from "@/assets/codbase-logo.webp.asset.json";

export interface CaseStudyContent {
  slug: string;
  title: string;
  description: string;
  name: string;
  h1: string;
  intro: string;
  context: string;
  challenge: string[];
  solution: string[];
  decisions: string[];
  tech: string[];
  liveUrl: string;
  image: string;
  imageAlt: string;
  /**
   * Mätbara resultat anges endast när de är bekräftade av kunden.
   * Lämna tom tills siffror finns – hitta aldrig på utfall.
   */
  results: string[];
  related: { label: string; path: string }[];
}

export const caseStudies: Record<string, CaseStudyContent> = {
  drogsok: {
    slug: "/projekt/drogsok",
    title: "Case: DrogSök.se – sökverktyg för läkemedel | Fertekz IT",
    description:
      "Case study: DrogSök.se, ett söknings- och uppslagsverktyg för läkemedel byggt i React, TypeScript, Node.js och MySQL av Fertekz IT.",
    name: "DrogSök.se",
    h1: "DrogSök.se – sökverktyg för läkemedelsuppgifter",
    intro:
      "DrogSök.se är en webbplats där bland annat polisanställda snabbt kan slå upp specifika läkemedel. Fokus låg på sökhastighet, träffsäkerhet och ett gränssnitt som fungerar lika bra i mobilen som på en arbetsdator.",
    context:
      "Uppslagsverktyg som används i tjänst behöver ge svar på några sekunder. Användaren har ofta bara ett preparatnamn eller en del av ett namn att utgå från och behöver hitta rätt post utan att bläddra genom långa listor.",
    challenge: [
      "Söka i en större datamängd utan att sidan känns långsam",
      "Hantera stavningsvarianter och delvis inskrivna namn",
      "Presentera resultaten kompakt men läsbart på liten skärm",
      "Hålla datan strukturerad och enkel att uppdatera",
    ],
    solution: [
      "Ett React-gränssnitt med sökfält som filtrerar resultat medan man skriver",
      "Ett Node.js-API mot en MySQL-databas som håller läkemedelsposterna",
      "TypeScript genom hela kedjan för att fånga fel i datamodellen tidigt",
      "Responsiv resultatlista där viktigaste uppgiften syns först",
    ],
    decisions: [
      "Sökningen körs mot servern i stället för att hela datamängden laddas ned till webbläsaren – det håller första laddningen liten.",
      "Gränssnittet är avskalat med hög kontrast, eftersom verktyget används i arbetssituationer och inte som marknadsföringssida.",
      "Datamodellen är normaliserad så att nya preparat kan läggas till utan att gränssnittet behöver byggas om.",
    ],
    tech: ["React", "TypeScript", "Node.js", "MySQL"],
    liveUrl: "https://drogsok.se",
    image: "/project-images/drogsok.webp",
    imageAlt: "Startsidan på DrogSök.se med sökfältet för läkemedel",
    results: [],
    related: [
      { label: "Webbutveckling", path: "/webbutveckling" },
      { label: "Hemsidor och paket", path: "/hemsidor" },
      { label: "Case: Intuitive Gaming", path: "/projekt/intuitive-gaming" },
    ],
  },

  "intuitive-gaming": {
    slug: "/projekt/intuitive-gaming",
    title: "Case: Intuitive Gaming – webbplats för serverhosting | Fertekz IT",
    description:
      "Case study: Intuitive Gaming, en webbplats med fokus på serverhosting för gamers, byggd i Next.js, TypeScript och Supabase av Fertekz IT.",
    name: "Intuitive Gaming",
    h1: "Intuitive Gaming – webbplats för serverhosting",
    intro:
      "Intuitive Gaming är en gamingverksamhet med inriktning på serverhosting. Webbplatsen ska förklara vad som ingår i olika serveralternativ och göra det enkelt att komma vidare till beställning.",
    context:
      "Målgruppen är van vid tekniska produkter och jämför alternativ snabbt. Sidan behövde därför presentera specifikationer och priser tydligt, med ett uttryck som passar gaming utan att bli rörigt.",
    challenge: [
      "Presentera flera serveralternativ jämförbart utan att sidan blir tung",
      "Hålla ett mörkt, gamingnära uttryck med bibehållen läsbarhet",
      "Snabb laddning trots grafiskt rikt innehåll",
      "Struktur som klarar att fler produkter läggs till",
    ],
    solution: [
      "Next.js för snabb sidladdning och bra grund för sökmotorindexering",
      "Supabase som datakälla för innehåll och produktinformation",
      "Komponentbaserad uppbyggnad så att nya paket läggs till som data, inte som ny kod",
      "TypeScript för tydliga datatyper i produktlistningen",
    ],
    decisions: [
      "Mörkt färgtema med hög kontrast på text och knappar, så att uttrycket håller utan att läsbarheten tappas.",
      "Bilder komprimeras och laddas först när de behövs, vilket håller nere laddningstiden på mobil.",
      "Innehållet ligger i databasen i stället för hårdkodat, så att sortimentet kan ändras utan utvecklarhjälp.",
    ],
    tech: ["Next.js", "TypeScript", "Supabase"],
    liveUrl: "https://intuitive-gaming.com",
    image: "/project-images/intuitive-gaming.webp",
    imageAlt: "Webbplatsen Intuitive Gaming som visar serverhosting-erbjudanden",
    results: [],
    related: [
      { label: "Responsiv webbdesign", path: "/responsiv-webbdesign" },
      { label: "Webbutveckling", path: "/webbutveckling" },
      { label: "Case: Hakuna Potata", path: "/projekt/hakuna-potata" },
    ],
  },

  "hakuna-potata": {
    slug: "/projekt/hakuna-potata",
    title: "Case: Hakuna Potata – webbplats för restaurangkedja | Fertekz IT",
    description:
      "Case study: Hakuna Potata, en amerikansk snabbmatskedja med inriktning på bakpotatis. Webbplats och app byggd med React Native, Express och MongoDB.",
    name: "Hakuna Potata",
    h1: "Hakuna Potata – digital närvaro för en snabbmatskedja",
    intro:
      "Hakuna Potata är en snabbmatskedja i USA med bakpotatis som specialitet. Uppdraget handlade om att presentera konceptet och menyn på ett aptitligt sätt och göra det enkelt att hitta till restaurangerna.",
    context:
      "En restaurangbesökare vill snabbt se vad som serveras, vad det kostar och var närmaste ställe ligger – oftast i telefonen, ofta strax innan besöket.",
    challenge: [
      "Visa meny och koncept snabbt på mobil",
      "Hantera flera platser med olika information",
      "Behålla ett lekfullt varumärkesuttryck utan att tumma på läsbarheten",
      "Innehåll som personalen kan uppdatera när menyn ändras",
    ],
    solution: [
      "Mobilanpassad presentation av meny och koncept",
      "Express-baserat API med MongoDB för meny- och platsdata",
      "React Native i den mobila delen av projektet",
      "Bildhantering anpassad för matbilder i hög kvalitet men låg filstorlek",
    ],
    decisions: [
      "Menyn ligger som data i databasen, så att priser och rätter kan ändras utan ny release.",
      "Stora matbilder komprimeras och laddas stegvis, eftersom bildkvalitet är säljande men får inte göra sidan långsam.",
      "Platsinformation är strukturerad per restaurang så att fler orter kan läggas till.",
    ],
    tech: ["React Native", "Express", "MongoDB", "IoT"],
    liveUrl: "https://hakunapotata.com",
    image: "/project-images/hakuna-potata.webp",
    imageAlt: "Webbplatsen Hakuna Potata med presentation av bakpotatismenyn",
    results: [],
    related: [
      { label: "Webbdesign", path: "/webbdesign" },
      { label: "Hemsidor och paket", path: "/hemsidor" },
      { label: "Case: DrogSök.se", path: "/projekt/drogsok" },
    ],
  },

  codbase: {
    slug: "/projekt/codbase",
    title: "Case: CoDBase – community-webbplats för Call of Duty | Fertekz IT",
    description:
      "Case study: CoDBase, en gaming community för Call of Duty 1 med tävlingar och LAN. Webbplats byggd i Node.js, JavaScript, HTML och CSS av Fertekz IT.",
    name: "CoDBase",
    h1: "CoDBase – community-webbplats för Call of Duty",
    intro:
      "CoDBase är en gaming community kring Call of Duty 1 som arrangerar tävlingar, LAN och andra community-event. Webbplatsen samlar information om kommande event, anmälan och allt som spelarna behöver veta inför en match.",
    context:
      "En aktiv spelgemenskap lever på att det är enkelt att hänga med. Medlemmarna behöver snabbt se vad som är på gång, hur man anmäler sig och vilka regler som gäller – ofta från mobilen mitt i en spelkväll.",
    challenge: [
      "Samla event, tävlingar och LAN på ett ställe i stället för spridda inlägg",
      "Göra anmälan och regler tydliga för både nya och rutinerade spelare",
      "Ett uttryck som känns rätt för Call of Duty-communityn utan att bli svårläst",
      "Innehåll som arrangörerna kan uppdatera löpande inför varje event",
    ],
    solution: [
      "Node.js i botten som serverar sidorna och hanterar event- och anmälningsdata",
      "Ett gränssnitt i HTML, CSS och JavaScript med fokus på snabb laddning",
      "Tydlig struktur för event: datum, format, regler och anmälan i samma vy",
      "Mörkt tema med communityns logotyp och färger som röd tråd",
    ],
    decisions: [
      "Sidorna hålls lätta utan tunga ramverk, eftersom innehållet i första hand är text och listor – det ger snabb laddning även på svaga uppkopplingar.",
      "Eventinformation ligger som data i stället för hårdkodad text, så att arrangörerna kan lägga upp nya tävlingar utan utvecklarhjälp.",
      "Mörk bakgrund med hög kontrast på text och knappar, vilket passar gaming-uttrycket och samtidigt håller läsbarheten uppe.",
    ],
    tech: ["Node.js", "JavaScript", "HTML", "CSS"],
    liveUrl: "https://codbase.eu",
    image: codbaseLogo.url,
    imageAlt: "CoDBase logotyp – gaming community för Call of Duty",
    results: [],
    related: [
      { label: "Webbutveckling", path: "/webbutveckling" },
      { label: "Webbdesign", path: "/webbdesign" },
      { label: "Case: Intuitive Gaming", path: "/projekt/intuitive-gaming" },
    ],
  },
};
