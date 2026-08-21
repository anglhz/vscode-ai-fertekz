import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Hem", href: "/#home" },
    { name: "Om", href: "/#about" },
    { name: "Priser", href: "/#services" },
    { name: "Exempel", href: "/#examples" },
    // { name: "Omdömen", href: "/#testimonials" },
    { name: "Kontakt", href: "/#contact" },
  ];

  // Anchor links on the home page scroll smoothly; every link keeps a real href
  // so crawlers (and middle-click / open-in-new-tab) work normally.
  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsMobileMenuOpen(false);
    if (!href.startsWith("/#")) return;

    const element = document.querySelector(href.slice(1));
    if (!element) return; // not on the home page – let the browser navigate

    event.preventDefault();
    const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
        isScrolled ? "backdrop-blur-glass border-b border-primary/20" : "bg-transparent"
      }`}
      aria-label="Huvudmeny"
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="/#home"
              onClick={(e) => handleNavClick(e, "/#home")}
              className="inline-flex items-center hover:scale-105 transition-transform"
            >
              <img
                src="/fertekz-logo-horizontal.png"
                alt="Fertekz IT"
                className="h-10 w-auto"
                width="299"
                height="100"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-foreground hover:text-primary transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-accent group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button asChild className="shadow-glow">
              <a href="/#contact" onClick={(e) => handleNavClick(e, "/#contact")}>
                Boka gratis genomgång
              </a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              aria-label={isMobileMenuOpen ? "Stäng meny" : "Öppna meny"}
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden backdrop-blur-glass border-t border-primary/20 animate-slide-up">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="block w-full text-left px-3 py-2 text-foreground hover:text-primary hover:bg-primary/10 transition-colors rounded-md"
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-2">
                <Button asChild className="w-full shadow-glow">
                  <a href="/#contact" onClick={(e) => handleNavClick(e, "/#contact")}>
                    Boka gratis genomgång
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
