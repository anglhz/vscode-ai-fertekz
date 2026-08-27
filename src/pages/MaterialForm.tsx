import { FormEvent, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, Building2, CheckCircle2, FileText, Link2, Loader2, LockKeyhole, Palette, Send, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Seo from "@/components/seo/Seo";
import { supabase } from "@/integrations/supabase/client";

type MaterialData = {
  packageId: string;
  companyName: string;
  organizationNumber: string;
  contactName: string;
  email: string;
  phone: string;
  existingWebsite: string;
  businessDescription: string;
  services: string;
  targetAudience: string;
  serviceArea: string;
  websiteGoals: string;
  desiredPages: string;
  primaryCta: string;
  differentiators: string;
  designPreferences: string;
  brandColors: string;
  inspirationSites: string;
  contentNotes: string;
  displayContactDetails: string;
  socialLinks: string;
  materialLink: string;
  additionalNotes: string;
  website: string;
};

const initialData: MaterialData = {
  packageId: "", companyName: "", organizationNumber: "", contactName: "", email: "", phone: "",
  existingWebsite: "", businessDescription: "", services: "", targetAudience: "", serviceArea: "",
  websiteGoals: "", desiredPages: "", primaryCta: "", differentiators: "", designPreferences: "",
  brandColors: "", inspirationSites: "", contentNotes: "", displayContactDetails: "", socialLinks: "",
  materialLink: "", additionalNotes: "", website: "",
};

const MaterialForm = () => {
  const [searchParams] = useSearchParams();
  const checkoutSessionId = searchParams.get("session_id") ?? "";
  const [data, setData] = useState<MaterialData>(initialData);
  const [verification, setVerification] = useState<"checking" | "verified" | "denied">("checking");
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    let active = true;

    const verifyPayment = async () => {
      if (!checkoutSessionId) {
        setVerificationError("En säker materiallänk saknas. Öppna formuläret från betalningsbekräftelsen.");
        setVerification("denied");
        return;
      }

      const { data: response, error: invokeError } = await supabase.functions.invoke("submit-material-form", {
        body: { action: "verify", checkoutSessionId },
      });
      if (!active) return;

      if (invokeError || !response?.success || !response?.customer) {
        setVerificationError(response?.error ?? await edgeFunctionError(invokeError) ?? "Beställningen kunde inte verifieras.");
        setVerification("denied");
        return;
      }

      setData((current) => ({
        ...current,
        packageId: response.customer.packageId,
        companyName: response.customer.companyName,
        email: response.customer.email,
      }));
      setVerification("verified");
    };

    void verifyPayment();
    return () => { active = false; };
  }, [checkoutSessionId]);

  const update = (field: keyof MaterialData, value: string) => setData((current) => ({ ...current, [field]: value }));

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const { data: response, error: invokeError } = await supabase.functions.invoke("submit-material-form", {
      body: { ...data, consent, checkoutSessionId },
    });
    if (invokeError || !response?.success) {
      setError(response?.error ?? await edgeFunctionError(invokeError) ?? "Materialet kunde inte skickas. Försök igen.");
      setLoading(false);
      return;
    }
    setComplete(true);
    setLoading(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (verification !== "verified") {
    return (
      <main className="min-h-screen gradient-hero flex items-center justify-center px-6 py-16">
        <Seo title="Säkert materialformulär | Fertekz IT" description="Verifiering av beställning inför materialinlämning." path="/material" noindex />
        <Card className="max-w-xl p-10 text-center gradient-card shadow-glow">
          {verification === "checking" ? (
            <Loader2 className="h-14 w-14 text-primary mx-auto mb-6 animate-spin" />
          ) : (
            <LockKeyhole className="h-14 w-14 text-primary mx-auto mb-6" />
          )}
          <h1 className="text-3xl font-bold mb-4">
            {verification === "checking" ? "Verifierar beställningen…" : "Säker materiallänk krävs"}
          </h1>
          <p className="text-muted-foreground mb-8">
            {verification === "checking"
              ? "Vänta medan betalningen kontrolleras säkert mot Stripe."
              : verificationError}
          </p>
          {verification === "denied" && <Button asChild><Link to="/#contact">Kontakta Fertekz IT</Link></Button>}
        </Card>
      </main>
    );
  }

  if (complete) {
    return (
      <main className="min-h-screen gradient-hero flex items-center justify-center px-6 py-16">
        <Seo title="Material mottaget | Fertekz IT" description="Bekräftelse på inskickat webbplatsmaterial." path="/material" noindex />
        <Card className="max-w-xl p-10 text-center gradient-card shadow-glow">
          <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Tack, materialet är mottaget!</h1>
          <p className="text-muted-foreground mb-8">Jag går igenom dina svar och hör av mig om något behöver kompletteras. Därefter börjar arbetet med hemsidan.</p>
          <Button asChild><Link to="/">Till startsidan</Link></Button>
        </Card>
      </main>
    );
  }

  const field = (id: keyof MaterialData, label: string, required = false, placeholder = "", readOnly = false) => (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}{required && <span className="text-primary"> *</span>}</Label>
      <Input id={id} value={data[id]} onChange={(event) => update(id, event.target.value)} required={required} placeholder={placeholder} readOnly={readOnly} className={readOnly ? "opacity-70" : undefined} />
    </div>
  );

  const area = (id: keyof MaterialData, label: string, required = false, placeholder = "") => (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}{required && <span className="text-primary"> *</span>}</Label>
      <Textarea id={id} value={data[id]} onChange={(event) => update(id, event.target.value)} required={required} placeholder={placeholder} rows={4} maxLength={5000} />
    </div>
  );

  return (
    <main className="min-h-screen gradient-hero py-10 px-5 sm:px-6">
      <Seo title="Materialformulär | Fertekz IT" description="Skicka information och material till din nya hemsida." path="/material" noindex />
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8"><ArrowLeft className="h-4 w-4" /> Till startsidan</Link>
        <div className="text-center mb-10">
          <p className="text-sm gradient-text font-semibold mb-2">Nästa steg</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Material till din hemsida</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">Svara så utförligt du kan. Du behöver inte skriva perfekta webbtexter – informationen används som underlag när sidan byggs.</p>
        </div>

        <form onSubmit={submit} className="space-y-7">
          <input value={data.website} onChange={(event) => update("website", event.target.value)} className="absolute -left-[9999px]" tabIndex={-1} autoComplete="off" aria-hidden="true" />

          <Card className="p-6 sm:p-8 gradient-card">
            <SectionTitle icon={Building2} number="1" title="Företaget och kontaktpersonen" />
            <div className="grid sm:grid-cols-2 gap-5">
              {field("companyName", "Företagsnamn", true, "Företaget AB", true)}
              {field("organizationNumber", "Organisationsnummer", false, "XXXXXX-XXXX")}
              {field("contactName", "Kontaktperson", true, "För- och efternamn")}
              {field("email", "E-post", true, "namn@foretag.se", true)}
              {field("phone", "Telefon", false, "070-123 45 67")}
              {field("existingWebsite", "Nuvarande hemsida", false, "https://...")}
            </div>
          </Card>

          <Card className="p-6 sm:p-8 gradient-card">
            <SectionTitle icon={Target} number="2" title="Verksamhet och målgrupp" />
            <div className="space-y-5">
              {area("businessDescription", "Beskriv företaget och verksamheten", true, "Vad gör ni, hur länge har ni funnits och vad är viktigt för kunderna att känna till?")}
              {area("services", "Tjänster eller produkter", true, "Lista och beskriv det ni erbjuder. Ta gärna med priser om de ska visas.")}
              {area("targetAudience", "Vilka är era viktigaste kunder?", true, "Privatpersoner eller företag, ålder, bransch, behov och typiska problem ni löser.")}
              {area("serviceArea", "Geografiskt område", false, "Orter, län eller hela Sverige.")}
              {area("differentiators", "Varför ska kunden välja er?", false, "Erfarenhet, garantier, arbetssätt, certifieringar eller andra styrkor.")}
            </div>
          </Card>

          <Card className="p-6 sm:p-8 gradient-card">
            <SectionTitle icon={FileText} number="3" title="Webbplatsens innehåll" />
            <div className="space-y-5">
              {area("websiteGoals", "Vad ska hemsidan främst uppnå?", true, "Exempel: fler offertförfrågningar, bokningar, telefonsamtal eller stärkt förtroende.")}
              {area("desiredPages", "Vilka sidor eller sektioner behövs?", true, "Exempel: Startsida, Tjänster, Om oss, Referenser, FAQ och Kontakt.")}
              {field("primaryCta", "Viktigaste knappen", false, "Exempel: Begär offert, Boka tid eller Ring oss")}
              {area("contentNotes", "Texter och annat innehåll", false, "Klistra in befintliga texter eller beskriv vad som måste finnas med.")}
              {area("displayContactDetails", "Kontaktuppgifter som ska visas", false, "Adress, telefon, e-post och öppettider.")}
              {area("socialLinks", "Sociala medier och externa länkar", false, "En länk per rad.")}
            </div>
          </Card>

          <Card className="p-6 sm:p-8 gradient-card">
            <SectionTitle icon={Palette} number="4" title="Design och uttryck" />
            <div className="space-y-5">
              {area("designPreferences", "Hur ska hemsidan kännas?", false, "Exempel: modern, exklusiv, varm, lekfull, minimalistisk eller robust. Nämn även sådant du vill undvika.")}
              {field("brandColors", "Färger", false, "Färgkoder eller beskrivning av önskade färger")}
              {area("inspirationSites", "Hemsidor du gillar", false, "Länka till några sidor och skriv kort vad du gillar med dem.")}
            </div>
          </Card>

          <Card className="p-6 sm:p-8 gradient-card">
            <SectionTitle icon={Link2} number="5" title="Logotyp, bilder och filer" />
            <div className="space-y-5">
              {field("materialLink", "Länk till material", false, "Google Drive, Dropbox, OneDrive eller WeTransfer")}
              <p className="text-sm text-muted-foreground">Lägg logotyp, bilder, dokument och eventuell grafisk profil i en delad mapp. Kontrollera att länken går att öppna utan inloggning.</p>
              {area("additionalNotes", "Övrigt", false, "Tidsram, särskilda önskemål eller något annat jag behöver känna till.")}
            </div>
          </Card>

          <Card className="p-6 sm:p-8 gradient-card">
            <div className="flex items-start gap-3">
              <Checkbox id="consent" checked={consent} onCheckedChange={(checked) => setConsent(checked === true)} />
              <Label htmlFor="consent" className="leading-relaxed">Jag intygar att företaget har rätt att använda materialet och godkänner att uppgifterna behandlas för att ta fram hemsidan. <span className="text-primary">*</span></Label>
            </div>
            {error && <p className="text-sm text-destructive mt-5" role="alert">{error}</p>}
            <Button type="submit" size="lg" className="w-full mt-6 shadow-glow" disabled={loading || !consent}>
              {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Send className="h-4 w-4 mr-2" />}
              {loading ? "Sparar material..." : "Skicka materialet"}
            </Button>
          </Card>
        </form>
      </div>
    </main>
  );
};

const edgeFunctionError = async (error: unknown) => {
  if (!error || typeof error !== "object" || !("context" in error)) {
    return error instanceof Error ? error.message : null;
  }

  const context = (error as { context?: unknown }).context;
  if (!(context instanceof Response)) return error instanceof Error ? error.message : null;

  try {
    const body = await context.clone().json() as { error?: unknown };
    return typeof body.error === "string" ? body.error : error instanceof Error ? error.message : null;
  } catch {
    return error instanceof Error ? error.message : null;
  }
};

const SectionTitle = ({ icon: Icon, number, title }: { icon: typeof Building2; number: string; title: string }) => (
  <div className="flex items-center gap-3 mb-6">
    <span className="h-10 w-10 rounded-full bg-primary/15 text-primary flex items-center justify-center"><Icon className="h-5 w-5" /></span>
    <h2 className="text-xl sm:text-2xl font-bold"><span className="text-primary">{number}.</span> {title}</h2>
  </div>
);

export default MaterialForm;
