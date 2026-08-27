import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, ShieldCheck, Sparkles, Zap } from "lucide-react";
import SubscriptionDecisionDialog from "@/components/SubscriptionDecisionDialog";

const packages = [
  {
    id: "start",
    name: "Start",
    price: "299",
    description: "För dig som vill komma igång enkelt.",
    icon: Zap,
    features: [
      "En komplett ensideshemsida",
      "Mobilanpassad design",
      "Kontaktformulär",
      "Grundläggande SEO",
      "Hosting, SSL och backup",
      "1 mindre ändring per månad",
    ],
  },
  {
    id: "foretag",
    name: "Företag",
    price: "399",
    description: "För ett etablerat företag som vill synas bättre.",
    icon: Sparkles,
    popular: true,
    features: [
      "Upp till 5 sidor",
      "Unik, mobilanpassad design",
      "Kontakt- eller offertformulär",
      "Grundläggande lokal SEO",
      "Hjälp med texter och bilder",
      "Hosting, SSL och backup",
      "2 mindre ändringar per månad",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "499",
    description: "För dig som behöver mer innehåll och stöd.",
    icon: ShieldCheck,
    features: [
      "Upp till 7 sidor",
      "Fler tjänste- och ortssidor",
      "Genomarbetad textstruktur",
      "Lokal SEO och besöksstatistik",
      "Hosting, SSL och backup",
      "3 mindre ändringar per månad",
      "Prioriterad support",
    ],
  },
];

const faqs = [
  {
    question: "Vad är SEO?",
    answer: "SEO står för sökmotoroptimering och handlar om att göra hemsidan tydlig, snabb och lätt för Google att förstå. Jag sätter bland annat rätt sidtitlar, beskrivningar, rubriker och teknisk struktur så att företaget får bättre möjlighet att synas när potentiella kunder söker efter dina tjänster.",
  },
  {
    question: "Tillkommer någon startavgift?",
    answer: "Nej. Du betalar bara den första månaden i förskott när abonnemanget startar.",
  },
  {
    question: "Finns det någon bindningstid?",
    answer: "Nej. Du kan avsluta när som helst och abonnemanget gäller till slutet av den redan betalda månadsperioden. Därefter görs inga fler debiteringar.",
  },
];

const About = () => {
  const [selectedPackage, setSelectedPackage] = useState<{ id: string; name: string } | null>(null);

  return (
  <>
  <section className="py-20 bg-section-bg" id="services">
    <div className="container mx-auto px-6">
      <div className="text-center mb-14 reveal">
        <Badge variant="secondary" className="mb-4">Ingen startavgift</Badge>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          En modern hemsida till <span className="gradient-text">fast månadspris</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Välj ett tydligt abonnemang och slipp en stor investering. Jag bygger, publicerar och tar hand om hemsidan medan du fokuserar på företaget.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        {packages.map((item, index) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.name}
              className={`relative p-8 gradient-card transition-all duration-300 reveal ${item.popular ? "border-primary shadow-glow lg:-translate-y-3" : "shadow-card hover:shadow-glow"}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              {item.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Populärast</Badge>
              )}
              <Icon className="h-9 w-9 text-primary mb-5" />
              <h3 className="text-2xl font-bold mb-2">Fertekz {item.name}</h3>
              <p className="text-muted-foreground min-h-12">{item.description}</p>
              <div className="my-7">
                <span className="text-5xl font-bold gradient-text">{item.price} kr</span>
                <span className="text-muted-foreground"> / mån</span>
              </div>
              <ul className="space-y-3 mb-8">
                {item.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm">
                    <Check className="h-5 w-5 text-primary shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full shadow-glow" variant={item.popular ? "default" : "outline"} onClick={() => setSelectedPackage({ id: item.id, name: item.name })}>
                Starta {item.name}
              </Button>
            </Card>
          );
        })}
      </div>

      <p className="text-center text-sm text-muted-foreground mb-20">
        Alla priser är exklusive moms. Ingen startavgift. Månadsvis betalning i förskott och ingen bindningstid. Domänkostnad tillkommer. <a href="/hantera-abonnemang" className="text-primary hover:underline">Hantera abonnemang</a>
      </p>

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Vanliga frågor</h2>
          <p className="text-muted-foreground">Tydliga villkor utan överraskningar.</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details key={faq.question} className="group rounded-lg border border-border gradient-card">
              <summary className="cursor-pointer list-none p-5 font-semibold flex items-center justify-between">
                {faq.question}<span className="text-primary text-xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="px-5 pb-5 text-muted-foreground">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  </section>
  <SubscriptionDecisionDialog selected={selectedPackage} onClose={() => setSelectedPackage(null)} />
  </>
  );
};

export default About;
