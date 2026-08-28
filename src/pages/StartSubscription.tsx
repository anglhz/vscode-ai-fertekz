import { FormEvent, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, Check, CreditCard, Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Seo from "@/components/seo/Seo";
import { supabase } from "@/integrations/supabase/client";

const packages = {
  start: { name: "Fertekz Start", price: 299, description: "En komplett ensideshemsida", features: ["Mobilanpassad design", "Kontaktformulär", "Grundläggande SEO", "Hosting, SSL och backup", "1 mindre ändring per månad"] },
  foretag: { name: "Fertekz Företag", price: 399, description: "Upp till fem sidor för företaget", features: ["Unik mobilanpassad design", "Kontakt- eller offertformulär", "Lokal SEO", "Hjälp med text och bild", "2 mindre ändringar per månad"] },
  pro: { name: "Fertekz Pro", price: 499, description: "Mer innehåll, SEO och prioriterad support", features: ["Upp till sju sidor", "Fler tjänste- och ortssidor", "Besöksstatistik", "Prioriterad support", "3 mindre ändringar per månad"] },
} as const;

type PackageId = keyof typeof packages;

const StartSubscription = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedPackage = searchParams.get("paket") as PackageId | null;
  const packageId: PackageId = requestedPackage && requestedPackage in packages ? requestedPackage : "foretag";
  const selected = packages[packageId];
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const packageOptions = useMemo(() => Object.entries(packages) as [PackageId, (typeof packages)[PackageId]][], []);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!termsAccepted) {
      setError("Du behöver godkänna tjänstevillkoren innan du fortsätter till betalningen.");
      return;
    }
    setLoading(true);
    setError(null);
    const { data, error: invokeError } = await supabase.functions.invoke("create-checkout-session", {
      body: { packageId, email, company, origin: window.location.origin, termsAccepted },
    });
    if (invokeError || !data?.url) {
      setError(data?.error ?? invokeError?.message ?? "Betalningen kunde inte startas. Försök igen eller kontakta mig.");
      setLoading(false);
      return;
    }
    window.location.assign(data.url);
  };

  return (
    <main className="min-h-screen gradient-hero py-10 px-6">
      <Seo title={`Starta ${selected.name} | Fertekz IT`} description={`Beställ ${selected.name} för ${selected.price} kr/mån. Ingen startavgift.`} path="/starta" noindex />
      <div className="max-w-5xl mx-auto">
        <Link to="/#services" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8"><ArrowLeft className="h-4 w-4" /> Tillbaka till paketen</Link>
        <div className="text-center mb-10">
          <p className="text-sm gradient-text font-semibold mb-2">Säker beställning</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Starta ditt abonnemang</h1>
          <p className="text-muted-foreground">Betala första månaden nu. Ingen startavgift eller bindningstid – avsluta när som helst till periodens slut.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <Card className="p-7 gradient-card order-2 lg:order-1">
            <h2 className="text-xl font-semibold mb-5">1. Välj paket</h2>
            <div className="grid gap-3 mb-8">
              {packageOptions.map(([id, item]) => (
                <button key={id} type="button" onClick={() => setSearchParams({ paket: id })} className={`text-left rounded-lg border p-4 transition-colors ${id === packageId ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`}>
                  <div className="flex justify-between gap-4"><span className="font-semibold">{item.name}</span><span className="font-bold">{item.price} kr/mån</span></div>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                </button>
              ))}
            </div>

            <form onSubmit={submit} className="space-y-5">
              <h2 className="text-xl font-semibold">2. Dina uppgifter</h2>
              <div><label htmlFor="company" className="text-sm font-medium block mb-2">Företag</label><Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} required maxLength={120} placeholder="Företagsnamn AB" /></div>
              <div><label htmlFor="email" className="text-sm font-medium block mb-2">E-post</label><Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required maxLength={254} placeholder="namn@foretag.se" /></div>
              <label htmlFor="terms" className="flex items-start gap-3 rounded-lg border border-border p-4 text-sm leading-relaxed cursor-pointer">
                <input id="terms" type="checkbox" checked={termsAccepted} onChange={(event) => setTermsAccepted(event.target.checked)} required className="mt-1 h-4 w-4 accent-primary shrink-0" />
                <span>
                  Jag godkänner <Link to="/tjanstevillkor" target="_blank" rel="noreferrer" className="text-primary underline underline-offset-2">tjänstevillkoren</Link>. Jag förstår att webbplatsen tillhandahålls som en tjänst under abonnemanget, att källkod inte ingår och att webbplatsen avpubliceras när abonnemanget upphör.
                </span>
              </label>
              {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
              <Button type="submit" size="lg" className="w-full shadow-glow" disabled={loading || !termsAccepted}>
                {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <CreditCard className="h-4 w-4 mr-2" />}
                Gå till säker betalning · {selected.price} kr
              </Button>
              <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground"><Lock className="h-3.5 w-3.5" /> Kortuppgifter hanteras säkert av Stripe.</p>
            </form>
          </Card>

          <Card className="p-7 gradient-card shadow-glow order-1 lg:order-2 lg:sticky lg:top-8">
            <p className="text-sm text-primary font-medium mb-2">Din beställning</p>
            <h2 className="text-3xl font-bold mb-2">{selected.name}</h2>
            <p className="text-muted-foreground mb-6">{selected.description}</p>
            <div className="border-y border-border py-5 mb-6 flex items-end justify-between"><span>Första månaden</span><span><strong className="text-3xl">{selected.price} kr</strong> <small className="text-muted-foreground">exkl. moms</small></span></div>
            <ul className="space-y-3 mb-6">{selected.features.map((feature) => <li key={feature} className="flex gap-3 text-sm"><Check className="h-5 w-5 text-primary shrink-0" />{feature}</li>)}</ul>
            <p className="text-xs text-muted-foreground">Därefter {selected.price} kr/mån exkl. moms, fakturerat månadsvis i förskott. Domän och eventuella tillägg debiteras separat.</p>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default StartSubscription;
