import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Hem", href: "/#home" },
    { name: "Om mig", href: "/#about" },
    { name: "Exempel", href: "/#examples" },
    { name: "Arbetsprocess", href: "/#process" },
    // { name: "Omdömen", href: "/#testimonials" },
    { name: "Kontakt", href: "/#contact" },
  ];

  const serviceLinks = [
    { name: "Webbutveckling", to: "/webbutveckling" },
    { name: "Webbdesign", to: "/webbdesign" },
    { name: "Responsiv webbdesign", to: "/responsiv-webbdesign" },
    { name: "Hemsidor och priser", to: "/hemsidor" },
    { name: "Landningssida", to: "/tjanster/landningssida" },
    { name: "Företagswebbplats", to: "/tjanster/foretagswebbplats" },
  ];

  const areaLinks = [
    { name: "Webbyrå i Eskilstuna", to: "/webbyra-eskilstuna" },
    { name: "Webbyrå i Strängnäs", to: "/orter/strangnas" },
    { name: "Webbyrå i Katrineholm", to: "/orter/katrineholm" },
    { name: "Webbyrå i Nyköping", to: "/orter/nykoping" },
    { name: "Vad kostar en hemsida?", to: "/vad-kostar-en-hemsida" },
    { name: "Hemsida till företag", to: "/hemsida-till-foretag" },
  ];

  const caseLinks = [
    { name: "Alla projekt", to: "/projekt" },
    { name: "Case: DrogSök.se", to: "/projekt/drogsok" },
    { name: "Case: Intuitive Gaming", to: "/projekt/intuitive-gaming" },
    { name: "Case: Hakuna Potata", to: "/projekt/hakuna-potata" },
  ];

  const handleAnchorClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const element = document.querySelector(href.slice(1));
    if (!element) return;
    event.preventDefault();
    element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-section-bg border-t border-primary/20">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          {/* About */}
          <div>
            <Link to="/" className="inline-block mb-4" aria-label="Fertekz IT – startsidan">
              <img
                src="/fertekz-logo-horizontal.png"
                alt="Fertekz IT"
                className="h-12 w-auto"
                width="299"
                height="100"
                loading="lazy"
              />
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              Webbutvecklare och webbdesigner i Eskilstuna. Moderna, snabba och mobilanpassade
              hemsidor för företag i Sörmland och Mälardalen.
            </p>

            {/* Social Media Links */}
            <div className="flex gap-4">
              <a
                href="mailto:tommy@fertekz.com"
                className="p-2 rounded-full bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
                aria-label="Skicka e-post till tommy@fertekz.com"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/tommyfertkez"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/in/tommyfertkez"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <nav aria-label="Tjänster">
            <h4 className="font-semibold mb-4">Tjänster</h4>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Orter och guider */}
          <nav aria-label="Orter och guider">
            <h4 className="font-semibold mb-4">Orter och guider</h4>
            <ul className="space-y-2">
              {areaLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Quick links + case */}
          <nav aria-label="Snabblänkar">
            <h4 className="font-semibold mb-4">Snabblänkar</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              {caseLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-primary/20 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              © {currentYear} Fertekz IT. Alla rättigheter förbehållna.
            </p>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <span>Skapad med</span>
              <Heart className="h-4 w-4 text-red-500 animate-pulse" />
              <span>i Sverige</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
