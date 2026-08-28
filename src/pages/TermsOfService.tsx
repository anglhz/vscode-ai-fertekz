import LegalPage from "@/components/LegalPage";
import CompanyDetails from "@/components/CompanyDetails";

const TermsOfService = () => (
  <LegalPage
    title="Tjänstevillkor"
    description="Villkor för webbplatsabonnemang, betalning, leverans, support och uppsägning hos Fertekz IT."
    path="/tjanstevillkor"
  >
    <section>
      <h2>1. Om villkoren</h2>
      <p>
        Dessa villkor gäller webbplatsabonnemang och relaterade tjänster från Fertekz IT i
        Eskilstuna. Avtalet består av vald paketbeskrivning, orderbekräftelse, eventuell offert
        och dessa villkor. Vid motstridighet gäller en individuellt undertecknad offert eller
        orderbekräftelse framför dessa allmänna villkor.
      </p>
    </section>

    <section>
      <h2>2. Beställning och betalning</h2>
      <p>
        Avtalet ingås när beställningen och betalningen har bekräftats. Abonnemanget betalas
        månadsvis i förskott genom Stripe och förnyas automatiskt tills det sägs upp. Aktuellt
        pris och vad som ingår visas före betalningen. Om inget annat anges är priser till
        företag exklusive moms. Domän, e-post, licenser och andra externa kostnader kan tillkomma
        om de inte uttryckligen ingår i ordern.
      </p>
      <p>
        Vid en misslyckad betalning kan tjänsten begränsas eller pausas efter att kunden fått
        möjlighet att uppdatera sin betalningsmetod.
      </p>
    </section>

    <section>
      <h2>3. Leverans och kundens ansvar</h2>
      <p>
        Arbetet startar när nödvändigt material och tillgångar har lämnats. Kunden ansvarar för
        att uppgifter är korrekta, att material får användas och att återkoppling lämnas inom
        rimlig tid. Uppskattade leveranstider kan flyttas om underlag eller beslut försenas.
      </p>
      <p>
        Kunden ansvarar för verksamhetens juridiska innehåll, inklusive branschspecifika krav,
        erbjudanden, produktinformation och material som publiceras på webbplatsen.
      </p>
    </section>

    <section>
      <h2>4. Vad abonnemanget omfattar</h2>
      <p>
        Abonnemanget omfattar de sidor, funktioner, löpande ändringar och den support som anges
        för det valda paketet. Större omdesign, ny avancerad funktionalitet, integrationer,
        copywriting, fotografering och arbete utanför paketet offereras separat innan arbetet
        utförs.
      </p>
      <p>
        Tjänsten är en webbplats som tjänst. Kunden köper en löpande publicerings-, drift- och
        supporttjänst och inte en överlåtelse eller avbetalning av webbplatsens källkod.
      </p>
    </section>

    <section>
      <h2>5. Hosting, SSL, backup, domän och e-post</h2>
      <p>
        När detta ingår ansvarar Fertekz IT för normal drift, SSL-certifikat, tekniskt underhåll
        och backup under aktiv abonnemangsperiod. Planerat underhåll och störningar hos externa
        leverantörer kan påverka tillgängligheten. Domän och e-post är separata tjänster om inte
        annat uttryckligen avtalats. Kunden ska, där det är möjligt, stå som innehavare av sin
        domän och sitt e-postkonto.
      </p>
    </section>

    <section>
      <h2>6. Material och rättigheter</h2>
      <p>
        Kunden behåller rättigheterna till eget material, såsom domän, logotyp, bilder och texter.
        Kunden ger Fertekz IT rätt att använda materialet för att leverera tjänsten. Webbplatsen,
        dess design, källkod, återanvändbara komponenter, mallar och tekniska lösning ägs av
        Fertekz IT eller dess licensgivare. Kunden får en begränsad, icke överlåtbar nyttjanderätt
        till den publicerade webbplatsen under aktiv abonnemangsperiod. Källkod, repository och
        driftsmiljö ingår inte i abonnemanget och överlåts inte om inte ett separat skriftligt
        avtal säger annat. Tredjepartsmaterial och programvara omfattas av respektive licensvillkor.
      </p>
      <p>
        Kunden kan begära en kopia av sitt eget material. Eventuellt friköp eller överlåtelse av
        webbplatsen, kod eller andra rättigheter kräver ett separat skriftligt avtal och offereras
        utifrån webbplatsens omfattning.
      </p>
    </section>

    <section>
      <h2>7. Uppsägning</h2>
      <p>
        Abonnemanget har ingen bindningstid och kan sägas upp via sidan{" "}
        <a href="/hantera-abonnemang">Hantera abonnemang</a> eller genom e-post till{" "}
        <a href="mailto:tommy@fertekz.com?subject=Uppsägning%20av%20abonnemang">tommy@fertekz.com</a>.
        Tjänsten fortsätter till slutet av den redan betalda månadsperioden och därefter görs inga
        nya debiteringar.
      </p>
      <p>
        Efter slutdatumet upphör hosting, support, underhåll och löpande ändringar. En sista backup
        sparas i 30 dagar och raderas sedan. Nyttjanderätten upphör och webbplatsen avpubliceras vid
        slutdatumet. Kunden kan fram till dess begära ut sitt eget material. Kundens separat
        registrerade domän och e-post påverkas inte av uppsägningen.
      </p>
    </section>

    <section>
      <h2>8. Fel, reklamation och ansvar</h2>
      <p>
        Fel ska anmälas till Fertekz IT så snart som möjligt med en tydlig beskrivning. Fertekz IT
        får skälig tid att undersöka och rätta ett fel som omfattas av tjänsten. Parterna ansvarar
        för direkta skador som orsakats genom avtalsbrott, inom de begränsningar som följer av
        tvingande lag. Ingen part ansvarar för försening som beror på en händelse utanför partens
        rimliga kontroll.
      </p>
    </section>

    <section>
      <h2>9. Företagskund och konsument</h2>
      <p>
        Tjänsten riktar sig i första hand till företag. Om kunden handlar huvudsakligen för privat
        bruk gäller tvingande konsumentlagstiftning framför villkor som är mindre förmånliga.
        Information om eventuell ångerrätt lämnas i samband med beställningen. En konsument kan
        efter kontakt med Fertekz IT även vända sig till{" "}
        <a href="https://www.arn.se/" target="_blank" rel="noreferrer">Allmänna reklamationsnämnden (ARN)</a>.
      </p>
    </section>

    <section>
      <h2>10. Kontakt, lag och tvist</h2>
      <p>
        Frågor, reklamationer och uppsägningar skickas till Fertekz IT via{" "}
        <a href="mailto:tommy@fertekz.com">tommy@fertekz.com</a>. Svensk lag tillämpas. Tvist ska i
        första hand lösas genom dialog och annars av behörig svensk domstol, med de rättigheter en
        konsument har enligt tvingande lag.
      </p>
    </section>

    <section>
      <h2>11. Ändringar av villkoren</h2>
      <p>
        Villkoren kan ändras för framtida beställningar. Väsentliga ändringar som påverkar ett
        pågående abonnemang meddelas i skälig tid innan de börjar gälla.
      </p>
    </section>

    <CompanyDetails />
  </LegalPage>
);

export default TermsOfService;
