import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Erik Johansson",
      role: "VD, TechStart AB",
      content: "Tommy levererade exakt vad vi behövde - snabbt och professionellt. Vår nya hemsida har ökat våra förfrågningar med 40%.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Maria Andersson", 
      role: "Frilansande Designer",
      content: "Fantastisk portfolio som Tommy byggde åt mig. Jag får nu betydligt fler klientförfrågningar tack vare min professionella närvaro online.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "David Chen",
      role: "E-handel Entreprenör", 
      content: "Otroligt nöjd med landningssidan. Enkel att uppdatera själv och konverteringsgraden är betydligt högre än väntat.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    }
  ];

  return (
    <section className="py-20 bg-section-bg" id="testimonials">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Vad mina <span className="gradient-text">Kunder Säger</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Läs vad tidigare kunder tycker om samarbetet och resultaten
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.name}
              className="p-6 gradient-card shadow-card hover:shadow-glow transition-all duration-300 group reveal"
              style={{transitionDelay: `${index * 0.15}s`}}
            >
              {/* Rating Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              
              {/* Testimonial Content */}
              <blockquote className="text-muted-foreground mb-6 italic">
                "{testimonial.content}"
              </blockquote>
              
              {/* Author */}
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground mb-6">
            Redo att bli nästa nöjda kund?
          </p>
          <button
            onClick={() => {
              const element = document.querySelector('#contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-colors shadow-glow hover:shadow-hero"
          >
            Starta ditt projekt idag
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;