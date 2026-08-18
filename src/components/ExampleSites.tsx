import { Link } from "react-router-dom";
import { ArrowRight, BriefcaseBusiness, Building2, CheckCircle2, Hammer, Scissors, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type ExampleKind = "salon" | "builder" | "consultant";

const examples: { kind: ExampleKind; category: string; title: string; description: string }[] = [
  { kind: "salon", category: "Frisörsalong", title: "Elegant frisörsalong med onlinebokning", description: "Varm och personlig design med behandlingar, priser och en tydlig väg till bokning." },
  { kind: "builder", category: "Lokalt tjänsteföretag", title: "Trygg hemsida för hantverkare", description: "Robust upplägg med tjänster, garantier, referenser och ett snabbt offertflöde." },
  { kind: "consultant", category: "Konsultföretag", title: "Professionell konsultsida", description: "Ren och förtroendeingivande design med expertis, resultat och tydliga kontaktvägar." },
];

const SitePreview = ({ kind, large = false }: { kind: ExampleKind; large?: boolean }) => {
  if (kind === "salon") {
    return (
      <div className={`bg-[#fffaf8] text-[#352b29] overflow-hidden ${large ? "min-h-[560px]" : "h-[370px]"}`}>
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#eaded9] text-[10px]"><span className="font-serif text-base font-bold">Klipp&amp;Dax</span><span className="hidden sm:block">Behandlingar · Priser · Om oss</span><span className="bg-[#a66358] text-white rounded-full px-3 py-1">Boka tid</span></div>
        <div className={`grid grid-cols-2 items-center ${large ? "min-h-[300px]" : "h-[190px]"}`}>
          <div className="p-5 sm:p-8"><span className="uppercase tracking-[.2em] text-[8px] text-[#a66358]">Skönhet på dina villkor</span><h3 className={`${large ? "text-4xl" : "text-xl"} font-serif mt-2 leading-tight`}>Din stund av lugn</h3><p className="text-[9px] sm:text-xs mt-3 text-[#76635f]">Omsorgsfulla behandlingar för hud, hår och naglar — mitt i stan.</p><button className="mt-4 bg-[#a66358] text-white rounded-full px-4 py-2 text-[9px]">Boka behandling</button></div>
          <div className="h-full bg-gradient-to-br from-[#efd9d2] via-[#d5a99e] to-[#9d6258] flex items-center justify-center"><Scissors className={`${large ? "h-24 w-24" : "h-14 w-14"} text-white/80`} /></div>
        </div>
        <div className="px-5 py-4"><p className="font-serif text-sm mb-3">Populära behandlingar</p><div className="grid grid-cols-3 gap-2">{[["Ansiktsbehandling", "från 690 kr"], ["Klippning", "från 495 kr"], ["Naglar", "från 450 kr"]].map(([name, price]) => <div key={name} className="bg-white p-3 rounded-lg shadow-sm"><span className="block text-[9px] font-medium">{name}</span><span className="text-[8px] text-[#a66358]">{price}</span></div>)}</div><p className="text-center text-[9px] mt-4">★★★★★ “Jag känner mig alltid så väl omhändertagen.”</p></div>
      </div>
    );
  }

  if (kind === "builder") {
    return (
      <div className={`bg-[#f5f2ea] text-[#17211b] overflow-hidden ${large ? "min-h-[560px]" : "h-[370px]"}`}>
        <div className="flex items-center justify-between px-5 py-3 bg-[#17211b] text-white text-[10px]"><span className="font-black text-base">SÖRMLANDS BYGG</span><span className="hidden sm:block">Tjänster · Projekt · Områden</span><span className="bg-[#e5a52d] text-[#17211b] font-bold px-3 py-1">Begär offert</span></div>
        <div className={`relative flex items-center bg-gradient-to-r from-[#17211b] to-[#375343] text-white ${large ? "min-h-[300px]" : "h-[190px]"}`}><div className="p-6 sm:p-8 max-w-[70%]"><p className="text-[#e5a52d] text-[8px] uppercase tracking-widest">Lokalt byggföretag</p><h3 className={`${large ? "text-4xl" : "text-xl"} font-black mt-2 leading-tight`}>Tryggt hantverk. Hela vägen.</h3><p className="text-[9px] sm:text-xs text-white/70 mt-3">F-skatt, försäkring och fem års garanti. Kostnadsfri offert inom 24 timmar.</p><button className="mt-4 bg-[#e5a52d] text-[#17211b] font-bold px-4 py-2 text-[9px]">Begär kostnadsfri offert</button></div><Hammer className={`${large ? "h-28 w-28" : "h-16 w-16"} absolute right-8 text-white/15`} /></div>
        <div className="p-5"><div className="flex gap-3 mb-4 text-[8px] font-semibold"><span>✓ F-skatt</span><span>✓ Försäkrat</span><span>✓ Fast kontaktperson</span></div><p className="font-bold text-sm mb-3">Våra tjänster</p><div className="grid grid-cols-3 gap-2">{[["Badrum", "Totalrenovering"], ["Kök", "Snickeri & kakel"], ["Tillbyggnad", "Nyckelfärdigt"]].map(([name, text]) => <div key={name} className="border border-[#d9d3c5] p-3"><span className="block text-[10px] font-bold">{name}</span><span className="text-[8px] text-[#58645d]">{text}</span></div>)}</div></div>
      </div>
    );
  }

  return (
    <div className={`bg-[#f7f9fc] text-[#101d3a] overflow-hidden ${large ? "min-h-[560px]" : "h-[370px]"}`}>
      <div className="flex items-center justify-between px-5 py-3 text-[10px]"><span className="font-bold text-base">Aero Konsult<span className="text-[#326cf4]">.</span></span><span className="hidden sm:block">Expertis · Case · Insikter</span><span className="bg-[#101d3a] text-white rounded px-3 py-1">Boka möte</span></div>
      <div className={`grid grid-cols-[1.25fr_.75fr] items-center ${large ? "min-h-[300px]" : "h-[190px]"}`}><div className="p-6 sm:p-8"><p className="text-[#326cf4] text-[8px] font-bold uppercase tracking-widest">Strategi · Data · Tillväxt</p><h3 className={`${large ? "text-4xl" : "text-xl"} font-bold mt-2 leading-tight`}>Beslut som skapar mätbar tillväxt</h3><p className="text-[9px] sm:text-xs text-[#62708d] mt-3">Vi hjälper ägarledda bolag att växa lönsamt med tydlig strategi och bättre beslutsunderlag.</p><button className="mt-4 bg-[#326cf4] text-white rounded px-4 py-2 text-[9px]">Boka ett första möte</button></div><div className="h-[75%] mr-5 rounded-xl bg-gradient-to-br from-[#dce6ff] to-[#adc3f8] flex items-center justify-center"><BriefcaseBusiness className={`${large ? "h-24 w-24" : "h-14 w-14"} text-[#326cf4]`} /></div></div>
      <div className="px-5 py-4"><div className="flex justify-between items-end mb-3"><p className="font-bold text-sm">Vår expertis</p><Badge className="text-[8px] bg-[#e6edff] text-[#326cf4] border-0">Case: +38% tillväxt</Badge></div><div className="grid grid-cols-3 gap-2">{[["Strategi", "Tillväxtplan"], ["Analys", "Data & KPI"], ["Ledning", "Interim stöd"]].map(([name, text]) => <div key={name} className="bg-white border border-[#e4e9f2] rounded p-3"><span className="block text-[10px] font-bold">{name}</span><span className="text-[8px] text-[#62708d]">{text}</span></div>)}</div><p className="text-[8px] text-center mt-4 text-[#62708d]">Betrott av växande företag i hela Mälardalen</p></div>
    </div>
  );
};

const ExampleSites = () => (
  <section className="py-20" id="examples">
    <div className="container mx-auto px-6">
      <div className="text-center mb-14 reveal">
        <Badge variant="secondary" className="mb-4">Exempel</Badge>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Så kan din nya <span className="gradient-text">hemsida se ut</span></h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Tre designkoncept för olika verksamheter. Din hemsida anpassas alltid efter företagets innehåll, färger, kunder och mål.</p>
      </div>

      <div className="space-y-12">
        {examples.map((example, index) => (
          <Card key={example.kind} className="overflow-hidden gradient-card shadow-card reveal">
            <div className={`grid lg:grid-cols-[1.35fr_.65fr] ${index % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <div className="p-4 sm:p-7 bg-black/20">
                <div className="rounded-xl overflow-hidden shadow-hero border border-white/10">
                  <div className="h-8 bg-[#1e2430] flex items-center gap-1.5 px-3"><span className="h-2.5 w-2.5 rounded-full bg-[#ff6258]"/><span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]"/><span className="h-2.5 w-2.5 rounded-full bg-[#29c940]"/><span className="ml-3 text-[9px] text-white/40">dinhemsida.se</span></div>
                  <SitePreview kind={example.kind} />
                </div>
              </div>
              <div className="p-8 lg:p-10 flex flex-col justify-center">
                <p className="text-sm text-primary font-semibold mb-2">{example.category} · Exempelsida</p>
                <h3 className="text-2xl font-bold mb-4">{example.title}</h3>
                <p className="text-muted-foreground mb-6">{example.description}</p>
                <div className="space-y-2 text-sm mb-7"><p className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary"/> Anpassad för mobil och dator</p><p className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary"/> Tydliga vägar till kontakt</p><p className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary"/> Färger och innehåll efter ditt varumärke</p></div>
                <Button asChild variant="outline" className="w-fit">
                  <a href={`/demo/${example.kind === "salon" ? "frisorsalong" : example.kind === "builder" ? "byggforetag" : "konsultbolag"}`} target="_blank" rel="noopener noreferrer">Se exempelsidan <ArrowRight className="ml-2 h-4 w-4" /></a>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-14 text-center reveal">
        <h3 className="text-2xl font-bold mb-3">Vi skapar hemsidor för fler branscher</h3>
        <p className="text-muted-foreground mb-6">Oavsett verksamhet anpassas upplägget efter vad dina kunder behöver se och göra.</p>
        <div className="flex flex-wrap justify-center gap-3 mb-9">{[[Scissors, "Frisör"], [Hammer, "Bygg"], [BriefcaseBusiness, "Konsult"], [Building2, "Andra företag"]].map(([Icon, label]) => { const ItemIcon = Icon as typeof Scissors; return <Badge key={label as string} variant="secondary" className="px-4 py-2"><ItemIcon className="h-4 w-4 mr-2" />{label as string}</Badge>; })}</div>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto mb-7">Exemplen är fristående designkoncept framtagna för att visa möjligheterna. Din sida får eget innehåll och ett uttryck som passar ditt företag.</p>
        <Button asChild size="lg" variant="outline"><Link to="/projekt">Fler projekt <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
      </div>
    </div>
  </section>
);

export default ExampleSites;
