import { Card } from "@/components/ui/card";
import { PiggyBank, RefreshCw, UserRoundCheck } from "lucide-react";

const reasons = [
  {
    icon: PiggyBank,
    title: "Ingen stor startkostnad",
    description: "Du får en professionell hemsida utan att behöva lägga en stor engångssumma innan den börjat skapa värde.",
  },
  {
    icon: RefreshCw,
    title: "Hemsidan hålls aktuell",
    description: "Hosting, SSL, backup, tekniskt underhåll och löpande mindre ändringar ingår enligt ditt paket.",
  },
  {
    icon: UserRoundCheck,
    title: "En personlig kontakt",
    description: "Du har direktkontakt med personen som lär känna verksamheten, bygger sidan och hjälper dig efter lanseringen.",
  },
];

const WhyFertekz = () => (
  <section className="py-16" id="about" aria-labelledby="why-fertekz-heading">
    <div className="container mx-auto px-6">
      <div className="text-center max-w-3xl mx-auto mb-12 reveal">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">Därför Fertekz IT</p>
        <h2 id="why-fertekz-heading" className="text-4xl md:text-5xl font-bold mb-5">
          En hemsida som fortsätter vara <span className="gradient-text">omhändertagen</span>
        </h2>
        <p className="text-xl text-muted-foreground">
          Abonnemangsmodellen passar företag som vill ha en modern hemsida, personlig hjälp och en förutsägbar kostnad – utan att själva behöva sköta tekniken.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {reasons.map((reason, index) => {
          const Icon = reason.icon;
          return (
            <Card
              key={reason.title}
              className="p-7 gradient-card shadow-card hover:shadow-glow transition-all duration-300 reveal"
              style={{ transitionDelay: `${index * 0.07}s` }}
            >
              <div className="h-11 w-11 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-5">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{reason.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{reason.description}</p>
            </Card>
          );
        })}
      </div>
    </div>
  </section>
);

export default WhyFertekz;
