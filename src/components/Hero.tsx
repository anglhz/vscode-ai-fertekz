import { Button } from "@/components/ui/button";
import { ArrowDown, Check } from "lucide-react";
import heroProfile from "@/assets/new-hero-profile.webp";

const Hero = () => {
  return (
    <section className="min-h-screen gradient-hero flex items-center justify-center relative overflow-hidden pt-16">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-96 h-96 rounded-full bg-primary/10 animate-float" />
        <div className="absolute -bottom-1/2 -right-1/2 w-96 h-96 rounded-full bg-accent/10 animate-float" style={{animationDelay: '3s'}} />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left animate-slide-up">
            <div className="inline-block mb-4 px-4 py-2 rounded-full backdrop-blur-glass border border-primary/20">
              <span className="text-sm gradient-text font-medium">Från 299 kr/mån · Ingen startavgift</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="block">En hemsida som</span>
              <span className="shine-text animate-glow">jobbar för dig</span>
              <span className="block text-2xl md:text-3xl mt-4 text-muted-foreground font-medium">
                till ett enkelt månadspris
              </span>
            </h1>
            
            <div className="flex justify-center lg:justify-start mb-8">
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl text-center lg:text-left">
                Modern design, hosting, support och löpande ändringar i ett tydligt abonnemang. Du slipper en stor startkostnad.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-6 text-sm text-muted-foreground">
              {["Mobilanpassad", "SEO-redo", "Support ingår"].map((item) => (
                <span key={item} className="flex items-center gap-1.5"><Check className="h-4 w-4 text-primary" />{item}</span>
              ))}
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
              <Button 
                size="lg" 
                className="group shadow-glow hover:shadow-hero transition-all duration-300"
                onClick={() => {
                  const element = document.querySelector('#services');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Se abonnemang
                <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#contact">Boka gratis genomgång</a>
              </Button>
            </div>
          </div>
          
          {/* Profile Image */}
          <div className="relative animate-slide-up" style={{animationDelay: '0.3s'}}>
            <div className="relative">
              <img
                src={heroProfile}
                alt="Tommy Fernández, webbutvecklare och webbdesigner i Eskilstuna"
                width={1024}
                height={1024}
                className="w-full max-w-lg mx-auto rounded-2xl shadow-hero animate-glow"
                fetchPriority="high"
                loading="eager"
                decoding="async"
              />

              <div className="absolute inset-0 rounded-2xl gradient-accent opacity-20" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-primary" />
      </div>
    </section>
  );
};

export default Hero;
