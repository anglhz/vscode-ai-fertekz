import LegalPage from "@/components/LegalPage";
import CompanyDetails from "@/components/CompanyDetails";

const PrivacyPolicy = () => (
  <LegalPage
    title="Integritetspolicy"
    description="Så behandlar Fertekz IT personuppgifter vid kontakt, beställning, betalning och leverans av webbplatser."
    path="/integritetspolicy"
  >
    <section>
      <h2>1. Personuppgiftsansvarig</h2>
      <p>
        Fertekz IT i Eskilstuna är personuppgiftsansvarig för den behandling som beskrivs här.
        Frågor om integritet och personuppgifter skickas till{" "}
        <a href="mailto:tommy@fertekz.com">tommy@fertekz.com</a>.
      </p>
    </section>

    <section>
      <h2>2. Vilka uppgifter som behandlas</h2>
      <ul>
        <li>Kontaktuppgifter, exempelvis namn, företag, e-postadress och telefonnummer.</li>
        <li>Information som lämnas i kontakt-, beställnings- och materialformulär.</li>
        <li>Avtals-, abonnemangs-, faktura- och betalningsinformation.</li>
        <li>Material till webbplatsen, exempelvis texter, bilder, länkar, önskemål och grafisk profil.</li>
        <li>Teknisk information som sidvisning, enhetstyp, prestandamätvärden, sessions-id, IP-adress och säkerhetsloggar när det behövs för drift och skydd.</li>
      </ul>
      <p>Fertekz IT lagrar inte fullständiga kortuppgifter. Sådana uppgifter hanteras av Stripe.</p>
    </section>

    <section>
      <h2>3. Varför uppgifterna används</h2>
      <ul>
        <li>För att besvara förfrågningar och boka genomgångar.</li>
        <li>För att ingå och fullgöra avtal samt skapa, leverera, hosta och underhålla webbplatsen.</li>
        <li>För att administrera abonnemang, betalningar, fakturor och kundsupport.</li>
        <li>För att förebygga missbruk, felsöka och förbättra webbplatsens säkerhet och prestanda.</li>
        <li>För att uppfylla rättsliga skyldigheter, exempelvis bokföringskrav.</li>
      </ul>
      <p>
        Den rättsliga grunden är normalt avtal eller åtgärder inför avtal, rättslig förpliktelse
        eller Fertekz IT:s berättigade intresse av att driva, skydda och förbättra tjänsten.
        Om samtycke krävs inhämtas det separat och kan återkallas.
      </p>
    </section>

    <section>
      <h2>4. Leverantörer och mottagare</h2>
      <p>Uppgifter kan behandlas av leverantörer som behövs för tjänsten, bland andra:</p>
      <ul>
        <li>Stripe för betalning, abonnemang och kundportal.</li>
        <li>Supabase för databas, autentisering och serverfunktioner.</li>
        <li>n8n och e-postleverantör för formulärflöden och meddelanden.</li>
        <li>Cloudflare samt hosting- och backupleverantör för DNS, säkerhet, drift och backup.</li>
        <li>Utvecklings- och kodplattform när det behövs för att leverera kundens webbplats.</li>
      </ul>
      <p>
        Leverantörerna får endast behandla uppgifter enligt avtal och för angivna ändamål.
        Uppgifter säljs inte. Om uppgifter behandlas utanför EU/EES används tillämpliga
        skyddsåtgärder, exempelvis EU-kommissionens standardavtalsklausuler.
      </p>
    </section>

    <section>
      <h2>5. Hur länge uppgifterna sparas</h2>
      <p>
        Uppgifter sparas så länge de behövs för förfrågan, kundrelationen och leveransen.
        Kontaktförfrågningar som inte leder till avtal raderas normalt senast tolv månader efter
        senaste kontakt. Efter avslutat abonnemang sparas en sista webbplatsbackup i 30 dagar.
        Därefter raderas den, om uppgifterna inte måste sparas längre på grund av lag, betalning,
        garanti eller rättsligt anspråk. Bokföringsunderlag sparas under den tid lagen kräver.
      </p>
    </section>

    <section>
      <h2>6. Cookies och lokal lagring</h2>
      <p>
        Webbplatsen använder nödvändig lokal lagring för funktioner, säkerhet och ett tillfälligt
        sessions-id för prestandamätning. Fertekz IT använder inte uppgifterna för riktad
        annonsering. Tekniska leverantörer kan sätta strikt nödvändiga cookies för exempelvis
        säkerhet, autentisering och betalning.
      </p>
    </section>

    <section>
      <h2>7. Dina rättigheter</h2>
      <p>
        Du kan begära information om dina uppgifter samt, när förutsättningarna är uppfyllda,
        rättelse, radering, begränsning, dataportabilitet eller invända mot behandling. Kontakta{" "}
        <a href="mailto:tommy@fertekz.com">tommy@fertekz.com</a>. Du har också rätt att lämna
        klagomål till{" "}
        <a href="https://www.imy.se/privatperson/utfora-arenden/lamna-ett-klagomal/" target="_blank" rel="noreferrer">
          Integritetsskyddsmyndigheten (IMY)
        </a>.
      </p>
    </section>

    <section>
      <h2>8. Ändringar</h2>
      <p>Policyn kan uppdateras när tjänsten eller lagkraven förändras. Den aktuella versionen publiceras alltid på denna sida.</p>
    </section>

    <CompanyDetails />
  </LegalPage>
);

export default PrivacyPolicy;
