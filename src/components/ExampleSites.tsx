import { Link } from "react-router-dom";
import { ArrowRight, BriefcaseBusiness, Gauge, PenTool } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type ExampleKind = "tattoo" | "builder" | "consultant";

const examples: { kind: ExampleKind; category: string; title: string; description: string; href: string }[] = [
  { kind: "tattoo", category: "Tatueringsstudio", title: "Obsidian Ink", description: "Mörk och exklusiv studiosida med portfolio, information om studion och tydliga vägar till bokning.", href: "https://obsidian-ink.fertekz.com" },
  { kind: "builder", category: "Energi och fastighet", title: "Nordhamn Energioptimering", description: "Teknisk och förtroendeingivande företagssida med tjänster, mätbara resultat och tydlig väg till behovsanalys.", href: "https://nordhamn.fertekz.com" },
  { kind: "consultant", category: "Konsultföretag", title: "Professionell konsultsida", description: "Ren och förtroendeingivande design med expertis, resultat och tydliga kontaktvägar.", href: "/demo/konsultbolag" },
];

const SitePreview = ({ kind, large = false }: { kind: ExampleKind; large?: boolean }) => {
  if (kind === "tattoo") {
    return (
      <div className={`relative bg-[#050608] text-[#d5d7dc] overflow-hidden ${large ? "min-h-[560px]" : "h-[240px]"}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(69,101,160,.16),transparent_38%)]" />
        <div className="relative flex items-center justify-between px-5 py-4 border-b border-white/5 text-[9px] uppercase tracking-[.18em]"><span className="font-serif text-sm normal-case tracking-normal font-bold text-white">Obsidian Ink</span><span className="hidden sm:block text-white/45">Om studion · Galleri · Lediga tider · Kontakt</span></div>
        <div className={`relative flex flex-col items-center justify-center text-center px-6 ${large ? "min-h-[360px]" : "h-[245px]"}`}>
          <p className="text-[8px] uppercase tracking-[.35em] text-white/40 mb-5">Eskilstuna · Sedan 2005</p>
          <h3 className={`${large ? "text-6xl" : "text-4xl"} font-serif leading-none bg-gradient-to-r from-[#d7dae1] via-[#6883b3] to-[#d7dae1] bg-clip-text text-transparent`}>Obsidian Ink</h3>
          <p className="text-[9px] sm:text-xs text-white/35 max-w-sm mt-5">Modern tatueringsstudio med kvalitet, hantverk och personligt uttryck i fokus.</p>
          <span className="mt-6 border border-white/15 px-5 py-2 text-[8px] uppercase tracking-[.2em]">Se galleri</span>
        </div>
        <div className="relative border-t border-white/5 px-5 py-4 flex items-center justify-between text-[8px] uppercase tracking-[.18em] text-white/35"><span>Realism · Black &amp; Grey · Custom</span><PenTool className="h-4 w-4 text-[#6883b3]" /></div>
      </div>
    );
  }

  if (kind === "builder") {
    return (
      <div className={`bg-[#eef1eb] text-[#183027] overflow-hidden ${large ? "min-h-[560px]" : "h-[240px]"}`}>
        <div className="flex items-center justify-between px-5 py-3 bg-[#f6f8f3] text-[9px] border-b border-[#183027]/10"><span className="font-bold text-sm leading-none">Nordhamn<span className="block text-[6px] uppercase tracking-[.18em] text-[#5b7168] mt-1">Energioptimering</span></span><span className="hidden sm:block">Tjänster · Så arbetar vi · Projekt</span><span className="bg-[#d8ee63] text-[#183027] font-bold px-3 py-1.5 rounded-full">Boka analys</span></div>
        <div className={`relative flex items-center bg-gradient-to-br from-[#17362d] via-[#214b3f] to-[#0f2821] text-white ${large ? "min-h-[300px]" : "h-[190px]"}`}><div className="p-6 sm:p-8 max-w-[78%]"><p className="text-[#d8ee63] text-[7px] uppercase tracking-[.2em]">Energioptimering för fastigheter</p><h3 className={`${large ? "text-4xl" : "text-xl"} font-bold mt-2 leading-tight`}>Lägre energikostnader.</h3><p className="text-[9px] sm:text-xs text-white/65 mt-3">Åtgärder som går att räkna hem – från första mätning till verifierad besparing.</p><span className="inline-block mt-4 bg-[#d8ee63] text-[#183027] font-bold rounded-full px-4 py-2 text-[8px]">Boka behovsanalys</span></div><Gauge className={`${large ? "h-28 w-28" : "h-16 w-16"} absolute right-7 text-[#d8ee63]/25`} /></div>
      </div>
    );
  }

  return (
    <div className={`bg-[#f7f9fc] text-[#101d3a] overflow-hidden ${large ? "min-h-[560px]" : "h-[240px]"}`}>
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

      <div className="grid lg:grid-cols-3 gap-6">
        {examples.map((example) => (
          <Card key={example.kind} className="overflow-hidden gradient-card shadow-card reveal">
            <div className="h-full flex flex-col">
              <div className="p-3 bg-black/20">
                <div className="rounded-xl overflow-hidden shadow-hero border border-white/10">
                  <div className="h-8 bg-[#1e2430] flex items-center gap-1.5 px-3"><span className="h-2.5 w-2.5 rounded-full bg-[#ff6258]"/><span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]"/><span className="h-2.5 w-2.5 rounded-full bg-[#29c940]"/><span className="ml-3 text-[9px] text-white/40">dinhemsida.se</span></div>
                  <SitePreview kind={example.kind} />
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <p className="text-sm text-primary font-semibold mb-2">{example.category} · Exempelsida</p>
                <h3 className="text-xl font-bold mb-3">{example.title}</h3>
                <p className="text-sm text-muted-foreground mb-5 flex-1">{example.description}</p>
                <Button asChild variant="outline" size="sm" className="w-fit">
                  <a href={example.href} target="_blank" rel="noopener noreferrer">Se exempelsidan <ArrowRight className="ml-2 h-4 w-4" /></a>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-10 text-center reveal">
        <Button asChild size="lg" variant="outline"><Link to="/projekt">Fler projekt <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
      </div>
    </div>
  </section>
);

export default ExampleSites;
