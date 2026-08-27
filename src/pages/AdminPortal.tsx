import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import {
  BookOpen, Check, CheckCircle2, ClipboardCheck, ExternalLink, FileText, LogOut,
  Mail, MessageSquareText, Phone, RefreshCw, Search, Trash2, Users,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { useAuth } from "@/hooks/useAuth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Customer = Tables<"customers">;
type Material = Tables<"material_submissions">;

const statuses = {
  material_received: "Material mottaget",
  planning: "Planering",
  production: "Produktion",
  review: "Kundgranskning",
  complete: "Klar",
  paused: "Pausad",
} as const;

const checklistItems = [
  ["kickoff", "Kickoff genomförd", "Bekräfta mål, omfattning, kontaktväg och tidsplan."],
  ["domain", "Domän och DNS", "Kontrollera ägare, DNS-åtkomst, e-post och eventuell flytt."],
  ["brand", "Logotyp och grafisk profil", "Säkerställ användbara filer, färger, typsnitt och bildrättigheter."],
  ["structure", "Sidstruktur godkänd", "Bestäm sidor, navigation och viktigaste konverteringsväg."],
  ["copy", "Texter klara", "Rubriker, tjänster, om oss, kontakt, priser och vanliga frågor."],
  ["images", "Bilder klara", "Optimera format, filnamn och alt-texter; kontrollera rättigheter."],
  ["design", "Design godkänd", "Få ett samlat godkännande på startsida, färger och mobilvy."],
  ["forms", "Formulär och länkar testade", "Testa e-post, n8n, telefon, sociala länkar och bokning."],
  ["seo", "Grundläggande SEO", "Titlar, beskrivningar, rubriker, schema, sitemap och indexering."],
  ["legal", "Juridik och integritet", "Organisationsuppgifter, integritetstext, cookies och samtycken."],
  ["launch", "Lanseringskontroll", "Mobil, prestanda, 404, SSL, analytics, backup och sluttest."],
  ["handover", "Överlämning", "Skicka åtkomst, supportväg, abonnemangsvillkor och nästa uppföljning."],
] as const;

const customerGuide = [
  ["Affären", "Vad säljer kunden, till vem och vilket problem löser de?"],
  ["Målet", "Vilken handling är viktigast: ringa, boka, köpa eller begära offert?"],
  ["Erbjudandet", "Tjänster, priser, geografiskt område, garantier och viktigaste skillnader."],
  ["Förtroende", "Referenser, recensioner, certifikat, erfarenhet, team och riktiga bilder."],
  ["Innehållet", "Vilka sidor behövs och vem godkänner texter och bilder?"],
  ["Designen", "Önskad känsla, färger, inspirationssidor och sådant kunden vill undvika."],
  ["Tekniken", "Domän, e-post, bokningssystem, analytics och externa integrationer."],
  ["Planen", "Leveransdatum, granskningsrundor, ansvar och exakt nästa steg."],
];

const meetingGuide = [
  ["1. Nuläge", "Har ni en hemsida idag? Vad fungerar och vad fungerar inte?"],
  ["2. Behov", "Varför tittar ni på en ny hemsida just nu?"],
  ["3. Kundresa", "Hur hittar kunder er och vad vill ni att de ska göra på sidan?"],
  ["4. Omfattning", "Vilka tjänster, sidor, språk, formulär eller bokningsflöden behövs?"],
  ["5. Material", "Finns logotyp, bilder och texter, eller behövs hjälp att ta fram dem?"],
  ["6. Beslut", "Vem fattar beslut och vilka behöver godkänna resultatet?"],
  ["7. Tid", "Finns ett önskat lanseringsdatum eller en viktig kampanj?"],
  ["8. Paket", "Förklara vad som ingår, månadspris, ändringar, support och uppsägningstid."],
  ["9. Nästa steg", "Sammanfatta behovet och boka nästa konkreta aktivitet innan mötet avslutas."],
];

const operationsGuide = [
  ["Domän och ägande", "Domänen registreras och betalas av kunden i kundens eget namn. Fertekz IT får teknisk åtkomst för DNS och publicering."],
  ["DNS och skydd", "Använd Cloudflare för DNS, proxy, cache och grundläggande skydd. Webbtrafik proxas; MX- och verifieringsposter för e-post ska vara DNS only."],
  ["Hosting", "Publicera webbplatsen separat per kund på Hetzner-servern. Dokumentera domän, vhost, sökväg, GitHub-repo och driftsättningsmetod."],
  ["SSL", "Använd ett giltigt certifikat på origin-servern och Cloudflare i läget Full (strict). Kontrollera automatisk förnyelse och både www- och huvuddomän."],
  ["Extern backup", "Ta daglig krypterad backup till Hetzner Storage Box eller annan separat lagring. Behåll 30 dagliga och 12 månatliga kopior och provåterställ kvartalsvis."],
  ["E-post", "Hosta inte kundens e-post på webbservern. Rekommendera Microsoft 365 Business Basic eller Google Workspace; kunden äger och betalar licenserna."],
  ["Microsoft 365 och domän", "Verifiera kundens domän i Microsoft 365 och lägg in Microsofts MX-, SPF- och DKIM-poster i DNS. Därefter kan kunden använda adresser som namn@kundensdomän.se."],
  ["Vad abonnemanget omfattar", "Hosting, SSL, tekniskt underhåll och extern backup ingår inom rimlig trafik och lagring. Domän, e-postlicenser och större specialfunktioner tillkommer."],
  ["Vid uppsägning", "Bekräfta slutdatum, lämna ut kundens material och åtkomster, dokumentera domän/DNS och ange hur länge sista backupen behålls. Radera personuppgifter enligt villkoren."],
];

const cancellationGuide = [
  ["1. Uppsägningen registreras", "Kunden avslutar via Stripe Customer Portal eller kontaktar Fertekz IT. Välj avslut vid slutet av aktuell betalningsperiod, inte omedelbart."],
  ["2. Bekräfta slutdatum", "Skicka en skriftlig bekräftelse med sista aktiva dag och förklara att inga fler månadsdebiteringar görs."],
  ["3. Tjänsten fortsätter", "Hemsida, hosting, SSL, support och backup fortsätter som vanligt till den redan betalda periodens slut."],
  ["4. Kontrollera Stripe", "Verifiera cancel_at_period_end och slutdatum i Stripe. Webhooken ska uppdatera posten i stripe_subscriptions."],
  ["5. Förbered överlämning", "Samla kundens domänuppgifter, logotyp, bilder och egna texter. Bekräfta vad som lämnas ut enligt avtalet."],
  ["6. Stäng webbdriften", "Efter slutdatumet stoppas hosting, support, tekniskt underhåll och löpande ändringar. Domän och separat e-post påverkas inte."],
  ["7. Sista backup", "Skapa och dokumentera en sista backup. Behåll den i 30 dagar efter slutdatumet om inget annat har avtalats."],
  ["8. Radera och dokumentera", "Efter 30 dagar tas webbplats och kundmaterial bort från server och backup. Behåll bara bokföringsunderlag och sådant som måste sparas enligt lag."],
];

const AdminPortal = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading } = useAuth();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [fetching, setFetching] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!loading && !user) navigate("/auth", { replace: true });
  }, [loading, user, navigate]);

  const load = async () => {
    setFetching(true);
    const [customerResult, materialResult] = await Promise.all([
      supabase.from("customers").select("*").order("updated_at", { ascending: false }),
      supabase.from("material_submissions").select("*").order("created_at", { ascending: false }),
    ]);
    setFetching(false);
    if (customerResult.error || materialResult.error) {
      toast.error(customerResult.error?.message ?? materialResult.error?.message ?? "Kunde inte hämta kunder");
      return;
    }
    setCustomers(customerResult.data ?? []);
    setMaterials(materialResult.data ?? []);
    setSelectedId((current) => current ?? customerResult.data?.[0]?.id ?? null);
  };

  useEffect(() => {
    if (isAdmin) load();
  }, [isAdmin]);

  const selected = customers.find((customer) => customer.id === selectedId) ?? null;
  const selectedMaterials = materials.filter((material) => material.customer_id === selectedId);

  useEffect(() => setNotes(selected?.notes ?? ""), [selected?.id, selected?.notes]);

  const filteredCustomers = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return customers;
    return customers.filter((customer) =>
      `${customer.company_name} ${customer.contact_name} ${customer.email}`.toLowerCase().includes(query),
    );
  }, [customers, search]);

  const updateCustomer = async (id: string, values: Partial<Customer>) => {
    const update = { ...values, updated_at: new Date().toISOString() };
    const { error } = await supabase.from("customers").update(update).eq("id", id);
    if (error) {
      toast.error(error.message);
      return false;
    }
    setCustomers((current) => current.map((customer) => customer.id === id ? { ...customer, ...update } : customer));
    return true;
  };

  const toggleChecklist = async (key: string, checked: boolean) => {
    if (!selected) return;
    const checklist = { ...asChecklist(selected.checklist), [key]: checked };
    if (await updateCustomer(selected.id, { checklist })) toast.success("Checklistan uppdaterades");
  };

  const deleteCustomer = async (customer: Customer) => {
    setDeleting(true);
    const { error } = await supabase.from("customers").delete().eq("id", customer.id);
    setDeleting(false);
    if (error) {
      toast.error(`Kunden kunde inte raderas: ${error.message}`);
      return;
    }

    const remaining = customers.filter((item) => item.id !== customer.id);
    setCustomers(remaining);
    setMaterials((current) => current.filter((material) => material.customer_id !== customer.id));
    setSelectedId(remaining[0]?.id ?? null);
    toast.success(`${customer.company_name} och allt kopplat material har raderats`);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Laddar…</div>;
  if (user && !isAdmin) return <NoAccess email={user.email ?? "kontot"} />;

  const activeCount = customers.filter((customer) => !["complete", "paused"].includes(customer.status)).length;
  const reviewCount = customers.filter((customer) => customer.status === "review").length;

  return (
    <div className="min-h-screen bg-background">
      <Helmet><title>Adminportal | Fertekz IT</title><meta name="robots" content="noindex, nofollow" /></Helmet>
      <div className="container mx-auto px-5 sm:px-6 py-8 space-y-7">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div><p className="text-sm text-primary font-semibold">Fertekz IT</p><h1 className="text-3xl font-bold">Adminportal</h1></div>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline"><Link to="/admin/seo"><Search className="h-4 w-4 mr-2" />SEO-panel</Link></Button>
            <Button variant="outline" onClick={load} disabled={fetching}><RefreshCw className={`h-4 w-4 mr-2 ${fetching ? "animate-spin" : ""}`} />Uppdatera</Button>
            <Button variant="ghost" onClick={async () => { await supabase.auth.signOut(); navigate("/auth"); }}><LogOut className="h-4 w-4" /></Button>
          </div>
        </header>

        <div className="grid sm:grid-cols-3 gap-4">
          <Kpi icon={Users} label="Kunder" value={customers.length} />
          <Kpi icon={ClipboardCheck} label="Aktiva projekt" value={activeCount} />
          <Kpi icon={MessageSquareText} label="Väntar på granskning" value={reviewCount} />
        </div>

        <Tabs defaultValue="customers" className="space-y-6">
          <TabsList className="h-auto flex-wrap justify-start">
            <TabsTrigger value="customers">Kunder och material</TabsTrigger>
            <TabsTrigger value="delivery">Lathund: kundleverans</TabsTrigger>
            <TabsTrigger value="meeting">Lathund: informationsmöte</TabsTrigger>
            <TabsTrigger value="operations">Lathund: drift & kundägande</TabsTrigger>
            <TabsTrigger value="cancellation">Lathund: uppsägning</TabsTrigger>
          </TabsList>

          <TabsContent value="customers">
            <div className="grid lg:grid-cols-[320px_1fr] gap-6 items-start">
              <Card className="lg:sticky lg:top-6">
                <CardHeader><CardTitle className="text-lg">Kundregister</CardTitle><CardDescription>Kunder skapas från materialformuläret.</CardDescription></CardHeader>
                <CardContent className="space-y-4">
                  <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Sök företag, namn eller e-post" />
                  <div className="space-y-2 max-h-[65vh] overflow-y-auto pr-1">
                    {filteredCustomers.length === 0 && <p className="text-sm text-muted-foreground py-4">Inga kunder hittades.</p>}
                    {filteredCustomers.map((customer) => (
                      <button key={customer.id} onClick={() => setSelectedId(customer.id)} className={`w-full text-left rounded-lg border p-3 transition-colors ${selectedId === customer.id ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`}>
                        <span className="font-semibold block truncate">{customer.company_name}</span>
                        <span className="text-xs text-muted-foreground block truncate">{customer.contact_name} · {customer.email}</span>
                        <Badge variant="secondary" className="mt-2 text-[10px]">{statusLabel(customer.status)}</Badge>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {!selected ? <EmptyCustomer /> : (
                <div className="space-y-6">
                  <CustomerHeader customer={selected} onStatus={(status) => updateCustomer(selected.id, { status })} />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <InfoCard title="Kontakt" rows={[
                      ["Kontaktperson", selected.contact_name], ["E-post", selected.email], ["Telefon", selected.phone], ["Org.nr", selected.organization_number],
                    ]} />
                    <InfoCard title="Projekt" rows={[
                      ["Paket", packageLabel(selected.package_id)], ["Kund sedan", formatDate(selected.created_at)], ["Senast uppdaterad", formatDate(selected.updated_at)], ["Materialinskick", String(selectedMaterials.length)],
                    ]} />
                  </div>

                  <Card>
                    <CardHeader><CardTitle className="text-lg">Projektchecklista</CardTitle><CardDescription>Sparas per kund och fungerar som din arbetsordning.</CardDescription></CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-3">
                      {checklistItems.map(([key, title, help]) => {
                        const checked = asChecklist(selected.checklist)[key] === true;
                        return <label key={key} className={`flex gap-3 rounded-lg border p-4 cursor-pointer ${checked ? "border-primary/40 bg-primary/5" : "border-border"}`}>
                          <Checkbox checked={checked} onCheckedChange={(value) => toggleChecklist(key, value === true)} />
                          <span><strong className="text-sm block">{title}</strong><span className="text-xs text-muted-foreground">{help}</span></span>
                        </label>;
                      })}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader><CardTitle className="text-lg">Material från kunden</CardTitle><CardDescription>Alla inskick, senaste först.</CardDescription></CardHeader>
                    <CardContent className="space-y-5">
                      {selectedMaterials.length === 0 ? <p className="text-sm text-muted-foreground">Inget material är kopplat till kunden.</p> : selectedMaterials.map((material, index) => <MaterialView key={material.id} material={material} index={index} />)}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader><CardTitle className="text-lg">Interna anteckningar</CardTitle><CardDescription>Syns bara för administratörer.</CardDescription></CardHeader>
                    <CardContent>
                      <Textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows={6} placeholder="Beslut, frågor, nästa steg och sådant du vill komma ihåg…" />
                      <Button className="mt-4" onClick={async () => { if (await updateCustomer(selected.id, { notes })) toast.success("Anteckningarna sparades"); }}>Spara anteckningar</Button>
                    </CardContent>
                  </Card>

                  <Card className="border-destructive/40">
                    <CardHeader><CardTitle className="text-lg text-destructive">Radera kund</CardTitle><CardDescription>Tar permanent bort kundprofilen, anteckningar, checklista och alla kopplade materialinskick.</CardDescription></CardHeader>
                    <CardContent>
                      <AlertDialog>
                        <AlertDialogTrigger asChild><Button variant="destructive"><Trash2 className="h-4 w-4 mr-2" />Radera kunden</Button></AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Radera {selected.company_name}?</AlertDialogTitle>
                            <AlertDialogDescription>Åtgärden kan inte ångras. Kundens profil och alla materialinskick tas bort permanent. Stripe-abonnemang och filer i externa materialmappar påverkas inte.</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Avbryt</AlertDialogCancel>
                            <AlertDialogAction disabled={deleting} onClick={() => deleteCustomer(selected)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">{deleting ? "Raderar…" : "Ja, radera allt"}</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="delivery"><Guide title="Kundgenomgång – från material till lansering" description="Använd frågorna i kickoffen och inför varje viktig avstämning." items={customerGuide} /></TabsContent>
          <TabsContent value="meeting"><Guide title="Informationsmöte – första samtalet" description="En enkel struktur för att förstå behovet och hjälpa kunden välja rätt nästa steg." items={meetingGuide} /></TabsContent>
          <TabsContent value="operations"><Guide title="Drift, domän, backup och e-post" description="Standardupplägget för en trygg leverans med tydligt ägande och ansvar." items={operationsGuide} /></TabsContent>
          <TabsContent value="cancellation"><Guide title="Uppsägning – från besked till radering" description="Arbetsordning när en kund avslutar sitt Fertekz-abonnemang." items={cancellationGuide} /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const CustomerHeader = ({ customer, onStatus }: { customer: Customer; onStatus: (status: string) => void }) => (
  <Card><CardContent className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
    <div><p className="text-sm text-primary font-semibold">Kundprofil</p><h2 className="text-3xl font-bold">{customer.company_name}</h2><div className="flex flex-wrap gap-3 mt-3 text-sm text-muted-foreground"><a className="hover:text-primary" href={`mailto:${customer.email}`}><Mail className="inline h-4 w-4 mr-1" />{customer.email}</a>{customer.phone && <a className="hover:text-primary" href={`tel:${customer.phone}`}><Phone className="inline h-4 w-4 mr-1" />{customer.phone}</a>}</div></div>
    <div className="space-y-2 min-w-52"><Label htmlFor="customer-status">Projektstatus</Label><select id="customer-status" value={customer.status} onChange={(event) => onStatus(event.target.value)} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">{Object.entries(statuses).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></div>
  </CardContent></Card>
);

const MaterialView = ({ material, index }: { material: Material; index: number }) => {
  const rows: [string, string | null][] = [
    ["Verksamheten", material.business_description], ["Tjänster/produkter", material.services], ["Målgrupp", material.target_audience], ["Serviceområde", material.service_area],
    ["Mål med hemsidan", material.website_goals], ["Önskade sidor", material.desired_pages], ["Viktigaste knapp", material.primary_cta], ["Varför välja företaget", material.differentiators],
    ["Designönskemål", material.design_preferences], ["Färger", material.brand_colors], ["Inspirationssidor", material.inspiration_sites], ["Texter/innehåll", material.content_notes],
    ["Kontaktuppgifter på sidan", material.display_contact_details], ["Sociala länkar", material.social_links], ["Övrigt", material.additional_notes],
  ];
  return <details open={index === 0} className="rounded-lg border border-border"><summary className="cursor-pointer p-4 font-semibold">Material {formatDate(material.created_at)} {index === 0 && <Badge className="ml-2">Senaste</Badge>}</summary><div className="border-t border-border p-4 space-y-5">{material.existing_website && <DataBlock label="Nuvarande hemsida" value={material.existing_website} />}{rows.filter(([, value]) => value).map(([label, value]) => <DataBlock key={label} label={label} value={value!} />)}{material.material_link && <Button asChild variant="outline"><a href={material.material_link} target="_blank" rel="noopener noreferrer">Öppna materialmapp <ExternalLink className="h-4 w-4 ml-2" /></a></Button>}</div></details>;
};

const DataBlock = ({ label, value }: { label: string; value: string }) => <div><h4 className="text-xs uppercase tracking-wide text-muted-foreground font-semibold mb-1">{label}</h4><p className="text-sm whitespace-pre-wrap break-words">{value}</p></div>;
const InfoCard = ({ title, rows }: { title: string; rows: [string, string | null][] }) => <Card><CardHeader><CardTitle className="text-lg">{title}</CardTitle></CardHeader><CardContent><dl className="space-y-3">{rows.map(([label, value]) => <div key={label} className="flex justify-between gap-4 border-b border-border pb-2"><dt className="text-sm text-muted-foreground">{label}</dt><dd className="text-sm text-right break-all">{value || "–"}</dd></div>)}</dl></CardContent></Card>;
const Kpi = ({ icon: Icon, label, value }: { icon: typeof Users; label: string; value: number }) => <Card><CardContent className="p-5 flex items-center gap-4"><span className="h-11 w-11 rounded-full bg-primary/15 text-primary flex items-center justify-center"><Icon className="h-5 w-5" /></span><div><p className="text-2xl font-bold">{value}</p><p className="text-sm text-muted-foreground">{label}</p></div></CardContent></Card>;
const Guide = ({ title, description, items }: { title: string; description: string; items: string[][] }) => <Card><CardHeader><BookOpen className="h-9 w-9 text-primary mb-3" /><CardTitle className="text-2xl">{title}</CardTitle><CardDescription>{description}</CardDescription></CardHeader><CardContent className="grid md:grid-cols-2 gap-4">{items.map(([heading, body]) => <div key={heading} className="rounded-lg border border-border p-5"><h3 className="font-semibold flex gap-2"><Check className="h-5 w-5 text-primary shrink-0" />{heading}</h3><p className="text-sm text-muted-foreground mt-2 pl-7">{body}</p></div>)}</CardContent></Card>;
const EmptyCustomer = () => <Card><CardContent className="py-20 text-center"><FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" /><h2 className="text-xl font-semibold">Ingen kund vald</h2><p className="text-sm text-muted-foreground mt-2">Välj en kund i listan för att se material och projektinformation.</p></CardContent></Card>;
const NoAccess = ({ email }: { email: string }) => <div className="min-h-screen flex items-center justify-center px-6"><Card className="max-w-md"><CardHeader><CardTitle>Ingen behörighet</CardTitle><CardDescription>{email} saknar adminrollen.</CardDescription></CardHeader><CardContent><Button variant="outline" onClick={() => supabase.auth.signOut()}>Logga ut</Button></CardContent></Card></div>;
const asChecklist = (value: Customer["checklist"]): Record<string, boolean> => value && typeof value === "object" && !Array.isArray(value) ? Object.fromEntries(Object.entries(value).map(([key, item]) => [key, item === true])) : {};
const statusLabel = (status: string) => statuses[status as keyof typeof statuses] ?? status;
const packageLabel = (id: string | null) => ({ start: "Start", foretag: "Företag", pro: "Pro" }[id ?? ""] ?? id ?? "–");
const formatDate = (value: string) => new Intl.DateTimeFormat("sv-SE", { dateStyle: "medium" }).format(new Date(value));

export default AdminPortal;
