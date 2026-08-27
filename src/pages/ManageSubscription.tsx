import { Link } from "react-router-dom";
import { CalendarCheck, CreditCard, ExternalLink, FileArchive, Mail, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import Seo from "@/components/seo/Seo";

const portalUrl = import.meta.env.VITE_STRIPE_CUSTOMER_PORTAL_URL?.trim();

const ManageSubscription = () => (
  <div className="min-h-screen bg-background">
    <Seo title="Hantera abonnemang | Fertekz IT" description="Hantera betalningsuppgifter, fakturor och avsluta ditt abonnemang hos Fertekz IT." path="/hantera-abonnemang" noindex />
    <Navigation />
    <main className="gradient-hero pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-sm font-semibold text-primary mb-3">För befintliga kunder</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-5">Hantera ditt abonnemang</h1>
          <p className="text-lg text-muted-foreground">I Stripes säkra kundportal kan du se fakturor, uppdatera betalningsuppgifter och avsluta abonnemanget.</p>
        </div>

        <Card className="p-7 sm:p-9 gradient-card shadow-hero mb-8 text-center">
          <CreditCard className="h-10 w-10 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-3">Öppna Stripe kundportal</h2>
          <p className="text-muted-foreground mb-6">Använd samma e-postadress som vid beställningen. Stripe verifierar din identitet innan några abonnemangs- eller betalningsuppgifter visas.</p>
          {portalUrl ? (
            <Button asChild size="lg"><a href={portalUrl} target="_blank" rel="noopener noreferrer">Hantera abonnemang <ExternalLink className="h-4 w-4 ml-2" /></a></Button>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Självbetjäningen aktiveras snart. Kontakta mig så hjälper jag dig direkt.</p>
              <Button asChild size="lg"><a href="mailto:tommy@fertekz.com?subject=Hantera%20abonnemang">Kontakta Fertekz IT <Mail className="h-4 w-4 ml-2" /></a></Button>
            </div>
          )}
        </Card>

        <div className="grid md:grid-cols-3 gap-5 mb-10">
          <Info icon={CalendarCheck} title="Aktiv till periodens slut" text="Vid uppsägning fortsätter hemsidan och supporten till slutet av den redan betalda månadsperioden." />
          <Info icon={ShieldCheck} title="Inga fler debiteringar" text="När uppsägningen är registrerad tar Stripe inte betalt för en ny period." />
          <Info icon={FileArchive} title="Ditt material är ditt" text="Du behåller domän, logotyp, bilder och egna texter. En sista backup sparas i 30 dagar efter slutdatumet." />
        </div>

        <Card className="p-7 gradient-card">
          <h2 className="text-xl font-bold mb-4">Vad händer när abonnemanget avslutas?</h2>
          <ol className="space-y-3 text-sm text-muted-foreground list-decimal pl-5">
            <li>Du får ett bekräftat slutdatum för abonnemanget.</li>
            <li>Hemsidan, hosting, support och backup fortsätter till slutet av den betalda perioden.</li>
            <li>Efter slutdatumet upphör hosting, tekniskt underhåll och löpande ändringar.</li>
            <li>Domänen och separat e-post hos exempelvis Microsoft 365 påverkas inte.</li>
            <li>Webbplatsens sista backup sparas i 30 dagar och tas därefter bort.</li>
          </ol>
          <Button asChild variant="link" className="px-0 mt-4"><Link to="/#contact">Har du frågor? Kontakta mig</Link></Button>
        </Card>
      </div>
    </main>
    <Footer />
  </div>
);

const Info = ({ icon: Icon, title, text }: { icon: typeof CalendarCheck; title: string; text: string }) => (
  <Card className="p-6 gradient-card"><Icon className="h-7 w-7 text-primary mb-4" /><h2 className="font-semibold mb-2">{title}</h2><p className="text-sm text-muted-foreground">{text}</p></Card>
);

export default ManageSubscription;
