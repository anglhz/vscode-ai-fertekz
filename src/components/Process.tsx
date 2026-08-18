import { Card } from "@/components/ui/card";
import { CheckCircle, ClipboardList, CreditCard, Eye, Palette, Rocket } from "lucide-react";

const steps = [
  { icon: CreditCard, title: "Välj abonnemang", description: "Välj Start, Företag eller Pro utifrån hur mycket innehåll och löpande hjälp du behöver." },
  { icon: ClipboardList, title: "Betala första månaden", description: "Abonnemanget startar med en månads betalning i förskott. Ingen startavgift tillkommer." },
  { icon: CheckCircle, title: "Skicka material", description: "Du svarar på några frågor om företaget och skickar logotyp, färger och bilder om du har." },
  { icon: Palette, title: "Jag bygger", description: "Jag tar fram innehåll, design och teknik för en snabb, mobilanpassad och sökbar webbplats." },
  { icon: Eye, title: "Du granskar", description: "Du får en privat förhandsvisning och kan lämna mindre justeringar före lansering." },
  { icon: Rocket, title: "Publicering & support", description: "Sidan publiceras på din domän. Drift, backup, support och löpande ändringar fortsätter att ingå." },
];

const Process = () => (
  <section className="py-20" id="process">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16 reveal">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Från val till <span className="gradient-text">publicerad hemsida</span></h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">En enkel process där du alltid vet vad nästa steg är.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <Card key={step.title} className="relative p-6 gradient-card shadow-card hover:shadow-glow transition-all duration-300 reveal">
              <div className="absolute -top-4 -left-4 w-9 h-9 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">{String(index + 1).padStart(2, "0")}</div>
              <Icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm">{step.description}</p>
            </Card>
          );
        })}
      </div>
      <div className="text-center mt-14">
        <button onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })} className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-colors shadow-glow">
          Boka gratis genomgång
        </button>
      </div>
    </div>
  </section>
);

export default Process;
