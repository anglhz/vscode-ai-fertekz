import { Card } from "@/components/ui/card";
import { ClipboardList, CreditCard, Palette, Rocket } from "lucide-react";

const steps = [
  { icon: CreditCard, title: "Välj abonnemang", description: "Välj paket och betala den första månaden säkert via Stripe. Ingen startavgift tillkommer." },
  { icon: ClipboardList, title: "Skicka material", description: "Du svarar på några frågor om företaget och skickar logotyp, färger och bilder om du har." },
  { icon: Palette, title: "Design och granskning", description: "Jag bygger sidan och du får en privat förhandsvisning för återkoppling före lansering." },
  { icon: Rocket, title: "Publicering och support", description: "Sidan publiceras på din domän. Drift, backup, support och löpande ändringar fortsätter att ingå." },
];

const Process = () => (
  <section className="py-20" id="process">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16 reveal">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Från val till <span className="gradient-text">publicerad hemsida</span></h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">En enkel process där du alltid vet vad nästa steg är.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
