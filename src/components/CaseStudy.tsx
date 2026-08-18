import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ExternalLink, Mail } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/seo/Seo";
import { breadcrumbSchema, caseStudySchema } from "@/components/seo/schema";
import type { CaseStudyContent } from "@/content/caseStudies";

const CaseStudy = ({ study }: { study: CaseStudyContent }) => {
  const breadcrumb = [
    { name: "Hem", path: "/" },
    { name: "Projekt", path: "/projekt" },
    { name: study.name, path: study.slug },
  ];

  return (
    <div className="min-h-screen">
      <Seo
        title={study.title}
        description={study.description}
        path={study.slug}
        image={study.image}
        type="article"
        jsonLd={[
          breadcrumbSchema(breadcrumb),
          caseStudySchema({
            name: study.name,
            description: study.description,
            path: study.slug,
            image: study.image,
            tech: study.tech,
            liveUrl: study.liveUrl,
          }),
        ]}
      />
      <Navigation />

      <main>
        <section className="gradient-hero pt-32 pb-16">
          <div className="container mx-auto px-6">
            <nav aria-label="Brödsmulor" className="mb-6 text-sm text-muted-foreground">
              <ol className="flex flex-wrap items-center gap-2">
                {breadcrumb.map((crumb, index) => (
                  <li key={crumb.path} className="flex items-center gap-2">
                    {index < breadcrumb.length - 1 ? (
                      <a href={crumb.path} className="hover:text-primary transition-colors">
                        {crumb.name}
                      </a>
                    ) : (
                      <span className="text-foreground">{crumb.name}</span>
                    )}
                    {index < breadcrumb.length - 1 && <span aria-hidden="true">/</span>}
                  </li>
                ))}
              </ol>
            </nav>

            <div className="inline-block mb-4 px-4 py-2 rounded-full backdrop-blur-glass border border-primary/20">
              <span className="text-sm gradient-text font-medium">Kundcase</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight max-w-4xl">
              {study.h1}
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-8">{study.intro}</p>

            <div className="flex flex-wrap gap-2 mb-8">
              {study.tech.map((tech) => (
                <Badge key={tech} variant="outline" className="border-primary/30">
                  {tech}
                </Badge>
              ))}
            </div>

            <Button asChild size="lg" className="shadow-glow">
              <a href={study.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Besök {study.name}
              </a>
            </Button>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-6">
            <img
              src={study.image}
              alt={study.imageAlt}
              width={1200}
              height={675}
              loading="lazy"
              decoding="async"
              className="w-full max-w-4xl rounded-2xl border border-primary/20 shadow-card object-cover"
            />
          </div>
        </section>

        <section className="pb-16">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl space-y-12">
              <article>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Bakgrund</h2>
                <p className="text-muted-foreground leading-relaxed">{study.context}</p>
              </article>

              <article>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Utmaning</h2>
                <ul className="space-y-2">
                  {study.challenge.map((item) => (
                    <li key={item} className="text-muted-foreground leading-relaxed">
                      • {item}
                    </li>
                  ))}
                </ul>
              </article>

              <article>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Lösning</h2>
                <ul className="space-y-2">
                  {study.solution.map((item) => (
                    <li key={item} className="text-muted-foreground leading-relaxed">
                      • {item}
                    </li>
                  ))}
                </ul>
              </article>

              <article>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Tekniska och designmässiga val</h2>
                {study.decisions.map((item) => (
                  <p key={item} className="text-muted-foreground mb-4 leading-relaxed">
                    {item}
                  </p>
                ))}
              </article>

              {study.results.length > 0 && (
                <article>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Resultat</h2>
                  <ul className="space-y-2">
                    {study.results.map((item) => (
                      <li key={item} className="text-muted-foreground leading-relaxed">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </article>
              )}
            </div>
          </div>
        </section>

        <section className="py-16 bg-section-bg">
          <div className="container mx-auto px-6">
            <Card className="p-8 md:p-12 gradient-card border-primary/20 shadow-glow mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Vill du ha något liknande?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl">
                Berätta kort om din verksamhet så rekommenderar jag rätt abonnemang inom 24 timmar.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="shadow-glow">
                  <a href="/#contact">
                    Kontakta mig
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary/30">
                  <a href="mailto:tommy@fertekz.com">
                    <Mail className="mr-2 h-4 w-4" />
                    tommy@fertekz.com
                  </a>
                </Button>
              </div>
            </Card>

            <h2 className="text-xl font-semibold mb-4">Läs vidare</h2>
            <ul className="flex flex-wrap gap-3">
              {study.related.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="inline-block px-4 py-2 rounded-lg border border-primary/20 text-sm text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CaseStudy;
