# SEO-audit & tillväxtstrategi — fertekz.com

Datum: 2026-08-07 · Domän: https://fertekz.com · Marknad: Sverige (Semrush-databas `se`)

Datakällor: Semrush (sökvolymer, SERP, svårighetsgrad), teknisk SEO-skanning
(teknisk hygien), Google Search Console (nyverifierad — ingen historik ännu),
samt manuell granskning av kodbasen. Där data saknas står det uttryckligen
"ej mätbart" i stället för en gissning.

---

## 1. Sammanfattning och betyg

| Område | Betyg (0–100) | Kommentar |
|---|---|---|
| Teknisk SEO | 82 | Stark grund: snabb, mobilanpassad, korrekt robots.txt och sitemap. Begränsas av att sidan renderas i webbläsaren (ingen SSR). |
| On-page SEO | 70 → 84 | Var 70 med en enda sida. Höjt av de nya landningssidorna med egna titlar, H1 och strukturerad data. |
| Innehåll | 45 → 72 | Från en enda sida till nio indexerbara sidor med unikt innehåll. Saknar fortfarande case-sidor och blogg. |
| Sökordstäckning | 30 → 68 | Täcker nu de tre viktigaste kommersiella termerna. Saknar långsvansinnehåll. |
| Auktoritet / länkar | Ej mätbart | Semrush har ingen data alls för domänen — profilen är i praktiken tom. Detta är den största återstående bromsen. |
| AI-sökoptimering | 65 | llms.txt finns och är utökad, strukturerad data är rik. Begränsas av klientrendering. |
| Konvertering | 72 | Pris, telefon och formulär finns. Saknar sticky mobil-CTA och synligt telefonnummer i menyn. |
| **Totalt** | **~72** | Tekniskt välskött sajt vars enda verkliga problem var att den inte hade några sidor att ranka med. |

**Viktigaste insikten:** konkurrensen är osedvanligt låg. "webbyrå eskilstuna"
har svårighetsgrad 8/100 enligt Semrush. Det är inte auktoritet som saknades
— det var sidor.

---

## 2. Teknisk SEO

**Fungerar redan:**

- Startsidan svarar 200, HTTPS med giltigt certifikat.
- `robots.txt` tillåter alla crawlers och pekar på sitemap.
- `sitemap.xml` finns och är nu uppdaterad med samtliga nio URL:er.
- `<meta name="viewport">` och `lang="sv"` korrekt satta.
- Ingen `noindex` på indexerbara sidor; 404-sidan sätter noindex dynamiskt.
- Hero-bilden är WebP och preloadas med `fetchpriority="high"` för LCP.
- Rik strukturerad data: Person, LocalBusiness och FAQPage.
- Google Search Console verifierad för fertekz.com, sitemap inskickad.

**Kvarstående begränsningar:**

1. **Ingen serverrendering.** Sidan är en klientrenderad SPA. Googlebot kör
   JavaScript och ser innehållet, men förhandsvisningar i LinkedIn, Slack och
   Facebook — samt flera AI-crawlers — läser bara den statiska `index.html`.
   Sidspecifika titlar och beskrivningar syns därför inte för dem.
   Åtgärd om det blir viktigt: migrera till SSR eller statisk generering
   (skriv "/" i chatten → "Migrate to TanStack Start").
2. **Core Web Vitals i fält:** ej mätbart ännu — kräver trafikdata i Search
   Console. Labbmässigt ser laddningen bra ut tack vare WebP + preload.
3. **Sitemap är statisk.** Vid fler sidor bör den genereras automatiskt via
   ett `prebuild`-skript i stället för att underhållas för hand.

---

## 3. On-page-genomgång

| Sida | Titel | H1 | Ordantal | Strukturerad data |
|---|---|---|---|---|
| `/` | Webbutvecklare i Eskilstuna \| Tommy Fernández | Hej, mitt namn är Tommy … | ~900 | Person, LocalBusiness, FAQPage |
| `/webbyra-eskilstuna` | Webbyrå i Eskilstuna \| Hemsidor från 3 000 kr | Webbyrå i Eskilstuna – hemsidor som ger dig fler kunder | ~800 | Service, FAQPage, BreadcrumbList |
| `/vad-kostar-en-hemsida` | Vad kostar en hemsida 2026? | Vad kostar en hemsida? … | ~850 | Service, FAQPage, BreadcrumbList |
| `/hemsida-till-foretag` | Hemsida till företag – pris och innehåll | Hemsida till företag … | ~700 | Service, FAQPage, BreadcrumbList |
| `/tjanster/landningssida` | Landningssida 3 000 kr | Landningssida för 3 000 kr … | ~650 | Service, FAQPage, BreadcrumbList |
| `/tjanster/foretagswebbplats` | Företagswebbplats från 7 000 kr | Företagswebbplats från 7 000 kr | ~650 | Service, FAQPage, BreadcrumbList |
| `/orter/strangnas` \| `/katrineholm` \| `/nykoping` | Webbyrå i {ort} | Webbyrå i {ort} … | ~500 vardera | Service, FAQPage, BreadcrumbList |

Alla titlar ligger under 60 tecken exklusive varumärkessuffix, alla
beskrivningar under 160 tecken, varje sida har exakt en H2-hierarki under en
enda H1, och samtliga har självrefererande canonical.

**Åtgärdat i denna omgång:** ortssidorna är kortare än övriga och bör byggas
ut med lokala referenser när de första kunderna i respektive stad är klara —
annars riskerar de att uppfattas som tunna doorway-sidor.

---

## 4. Sökordsanalys (Semrush, databas `se`)

| Sökord | Volym/mån | Svårighet | CPC | Målsida |
|---|---|---|---|---|
| vad kostar en hemsida | 210 | 14/100 | $2,02 | `/vad-kostar-en-hemsida` |
| webbyrå eskilstuna | 110 | 8/100 | $2,37 | `/webbyra-eskilstuna` |
| hemsida företag pris | 50 | 8/100 | $3,68 | `/hemsida-till-foretag` |
| hemsida eskilstuna | 10 | 0/100 | $0 | `/webbyra-eskilstuna` |
| webbutvecklare eskilstuna | ingen data | — | — | `/` |
| webbdesign eskilstuna | ingen data | — | — | `/webbyra-eskilstuna` |
| webbyrå sörmland | ingen data | — | — | ortssidorna |
| seo eskilstuna | ingen data | — | — | ej täckt ännu |

"Ingen data" betyder att Semrush inte registrerat tillräcklig volym — inte
att ingen söker. Lokala termer med under tio sökningar per månad hamnar ofta
under mätgränsen men konverterar ändå mycket bra.

**Tolkning:** volymerna är små i absoluta tal, men köpintentionen är hög och
konkurrensen minimal. Tio besökare som söker "webbyrå eskilstuna" är värda
mer än tusen som söker "vad är html". CPC på 2–4 dollar visar att
annonsörer betalar för exakt dessa klick.

**Nästa sökordsvåg (långsvans, bör bli blogg- eller guidesidor):**
"hemsida wordpress eller egen kod", "byta webbyrå", "vad kostar seo",
"hemsida hantverkare", "google företagsprofil hjälp", "hemsida restaurang pris".

---

## 5. Konkurrentanalys

SERP för "webbyrå eskilstuna" (Semrush, topp 10):

| # | Domän | URL-mönster |
|---|---|---|
| 1 | agenci.se | /webbyra-eskilstuna/ |
| 2 | bizmedia.se | /webbyra-eskilstuna/ |
| 3 | webone.se | startsida |
| 4 | sormlandswebbyra.se | /webbyra/eskilstuna/ |
| 5 | fostira.se | /webbyra/webbyra-eskilstuna/ |
| 6 | infid.dev | /webbyra-eskilstuna/ |
| 7 | rocketdigital.se | /webbyra-eskilstuna/ |
| 8 | capace.se | /webbyra/eskilstuna/ |
| 9 | malbia.se | /webbyra-eskilstuna/ |
| 10 | gdstudio.se | startsida |

**Mönstret är entydigt:** åtta av tio rankar med en dedikerad ortssida, inte
med startsidan. Fram till nu hade fertekz.com ingen sådan sida alls — det var
den enskilt största orsaken till utebliven synlighet. Nu finns den.

**Konkurrenternas svaghet:** flera av dem är rikstäckande byråer som skapat
mallade ortssidor för dussintals städer. Deras "Eskilstuna"-sida är samma text
med utbytt ortsnamn. En genuint lokal sida med riktiga priser, riktiga case och
ett riktigt ansikte slår mallar över tid — särskilt när Google väger in
lokala signaler.

---

## 6. Innehållsplan (12 månader)

**Kvartal 1 — grunden (klar i denna omgång plus två tillägg)**
- Ortssida Eskilstuna, prisguide, företagssida, två tjänstesidor, tre ortssidor ✔
- Att göra: case-sida för DrogSök.se och för Hakuna Potata

**Kvartal 2 — förtroende**
- "Så väljer du webbyrå — 7 frågor att ställa"
- "Wordpress eller egen kod? Ärlig jämförelse"
- Case-sida för Intuitive-Gaming
- Om-sida med riktig bakgrund, år i branschen och kompetenser (E-E-A-T)

**Kvartal 3 — branschsidor**
- "Hemsida för hantverkare" · "Hemsida för restaurang" · "Hemsida för konsult"
- Varje sida med branschspecifika exempel och prisintervall

**Kvartal 4 — bredd**
- "Vad kostar SEO?" · "Google Företagsprofil — komplett guide"
- "Checklista: 12 saker att fixa på din hemsida i år"
- Uppdatera prisguiden med årtal

En ny sida varannan vecka räcker gott i den här nischen. Kvalitet slår kvantitet
när konkurrensen ligger på svårighetsgrad 8.

---

## 7. AI-sökoptimering (ChatGPT, Gemini, Perplexity)

**Redan på plats:** `llms.txt` (nu utökad med alla sidor, priser, kontaktdata
och serviceområde), LocalBusiness- och Service-schema, FAQPage-schema på varje
sida, tydliga frågeformulerade rubriker.

**Varför det spelar roll:** AI-assistenter svarar allt oftare på frågor som
"vem bygger hemsidor i Eskilstuna och vad kostar det". De föredrar källor med
explicita, verifierbara fakta — pris i siffror, ort i klartext, kontaktväg.
Vaga formuleringar som "kontakta oss för offert" plockas inte upp.

**Att göra:**
1. Skaffa omnämnanden på tredjepartssidor (Google Företagsprofil, hitta.se,
   allabolag, lokala företagsregister) — AI-modeller korsrefererar entiteter.
2. Behåll priserna synliga i text, inte i bilder.
3. Överväg SSR om AI-crawlers som inte kör JavaScript ska se undersidorna.

---

## 8. Länkstrategi

Semrush har ingen backlinkdata för domänen, vilket i praktiken betyder en
i det närmaste tom profil. Prioriterade, realistiska källor:

1. **Google Företagsprofil** — viktigast av allt för lokal synlighet, gratis,
   tar 20 minuter. Gör detta först.
2. **Kundernas sidor** — en diskret "Webb av Fertekz IT"-länk i sidfoten på
   levererade projekt. Fråga alltid om lov.
3. **Lokala kataloger** — hitta.se, eniro, allabolag, Eskilstuna
   näringslivsregister, företagarna.se.
4. **Branschprofiler** — GitHub, LinkedIn, Behance med länk till domänen.
5. **Lokala samarbeten** — sponsra en förening, skriv gästinlägg hos en lokal
   redovisningsbyrå eller fotograf som delar målgrupp.

Undvik köpta länkpaket. Med den här svårighetsgraden behövs inga.

---

## 9. Konverteringsoptimering

**Fungerar:** priser står utskrivna, kontaktformulär finns, omdömen finns,
process förklaras steg för steg.

**Att förbättra, i prioritetsordning:**
1. Sticky CTA-knapp i mobil ("Ring" / "Få offert") som följer med vid scroll.
2. Telefonnumret synligt i menyraden på desktop, inte bara i kontaktsektionen.
3. Löfte om svarstid ("svar inom 24 timmar") direkt vid formuläret.
4. Trygghetsrad ovanför vecket: fast pris · du äger sidan · svar inom 24 h.
5. Tacksida efter formulärskick i stället för bara en toast — den går att
   mäta som konvertering.

---

## 10. Prioriterad åtgärdslista — topp 20 efter effekt

Genomfört i denna omgång (1–8):

1. Ortssida `/webbyra-eskilstuna` som matchar SERP-mönstret ✔
2. Prisguide `/vad-kostar-en-hemsida` mot högsta volymen ✔
3. `/hemsida-till-foretag` för kommersiell intention ✔
4. Tjänstesidor för landningssida och företagswebbplats ✔
5. Tre ortssidor: Strängnäs, Katrineholm, Nyköping ✔
6. Sidspecifika titlar, beskrivningar och canonical via react-helmet-async ✔
7. Service-, FAQPage- och BreadcrumbList-schema per sida ✔
8. Uppdaterad sitemap.xml och utökad llms.txt ✔

Kvar att göra, i ordning:

9. Skapa och verifiera Google Företagsprofil för Eskilstuna
10. Case-sidor för DrogSök.se, Intuitive-Gaming och Hakuna Potata
11. Sticky mobil-CTA och telefonnummer i menyn
12. Om-sida med riktiga meriter och år i branschen
13. Be tre befintliga kunder om en fotnotslänk i sidfoten
14. Registrera i hitta.se, eniro och allabolag
15. Tacksida efter formulärskick
16. Bygg ut ortssidorna med lokala kundcase när de finns
17. Branschsidor: hantverkare, restaurang, konsult
18. Automatisera sitemap via prebuild-skript när sidorna blir fler
19. Följ upp Search Console efter 30 dagar och justera titlar med låg CTR
20. Överväg SSR-uppgradering om sociala förhandsvisningar per sida blir viktiga

---

## 11. Vad du realistiskt kan förvänta dig

- **Vecka 1–3:** Google indexerar de nya sidorna. Kontrollera i Search Console.
- **Månad 1–3:** de lokala termerna med låg svårighet börjar ge placeringar,
  troligen sida 1–2. Volymerna är små, så räkna i enstaka besök per dag.
- **Månad 3–6:** med Google Företagsprofil och några länkar bör
  "webbyrå eskilstuna" vara nåbar på topp 5.
- **Månad 6–12:** prisguiden är det som kan ge bredast trafik nationellt,
  men den kräver att sidan uppdateras och länkas till.

Med de här volymerna är målet inte tusentals besökare. Målet är fem till tio
kvalificerade förfrågningar i månaden — och det räcker för att fylla
kalendern i en enmansverksamhet.

---

## 12. Förbehåll

- Backlinkprofil och domänauktoritet är ej mätbara: Semrush har ingen data.
- Search Console-historik saknas eftersom domänen verifierades nyligen.
- Core Web Vitals i fält kan inte bedömas utan trafikdata.
- Alla sökvolymer är Semrush-estimat och ska läsas som storleksordningar,
  inte exakta tal.
