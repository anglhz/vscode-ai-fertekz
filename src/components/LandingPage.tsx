import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Mail, Phone } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/seo/Seo";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/components/seo/schema";
import type { LandingPageContent } from "@/content/landingPages";

const LandingPage = ({ page }: { page: LandingPageContent }) => {
  return (
    <div className="min-h-screen">
      <Seo
        title={page.title}
        description={page.description}
        path={page.slug}
        jsonLd={[
          breadcrumbSchema(page.breadcrumb),
          serviceSchema({
            name: page.serviceName,
            description: page.description,
            areaServed: page.areaServed,
          }),
          faqSchema(page.faqs),
        ]}
      />
      <Navigation />

      <main>
        {/* Hero */}
        <section className="gradient-hero pt-32 pb-16">
          <div className="container mx-auto px-6">
            <nav aria-label="Brödsmulor" className="mb-6 text-sm text-muted-foreground">
              <ol className="flex flex-wrap items-center gap-2">
                {page.breadcrumb.map((crumb, index) => (
                  <li key={crumb.path} className="flex items-center gap-2">
                    {index < page.breadcrumb.length - 1 ? (
                      <Link to={crumb.path} className="hover:text-primary transition-colors">
                        {crumb.name}
                      </Link>
                    ) : (
                      <span className="text-foreground">{crumb.name}</span>
                    )}
                    {index < page.breadcrumb.length - 1 && <span aria-hidden="true">/</span>}
                  </li>
                ))}
              </ol>
            </nav>

            <div className="inline-block mb-4 px-4 py-2 rounded-full backdrop-blur-glass border border-primary/20">
              <span className="text-sm gradient-text font-medium">{page.eyebrow}</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight max-w-4xl">
              {page.h1}
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-8">
              {page.intro}
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              {page.highlights.map((item) => (
                <div
                  key={item.label}
                  className="px-5 py-3 rounded-xl gradient-card border border-primary/20"
                >
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{item.label}</p>
                  <p className="text-lg font-semibold gradient-text">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="shadow-glow">
                <a href="/#contact">
                  Se abonnemang
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary/30">
                <a href="tel:+46734145099">
                  <Phone className="mr-2 h-4 w-4" />
                  073-414 50 99
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Content sections */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl space-y-12">
              {page.sections.map((section) => (
                <article key={section.heading}>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">{section.heading}</h2>
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph} className="text-muted-foreground mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets && (
                    <ul className="space-y-2 mt-4">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3 text-muted-foreground">
                          <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-section-bg">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8">Vanliga frågor</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
              {page.faqs.map((faq) => (
                <Card key={faq.question} className="p-6 gradient-card border-primary/20">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA + internal links */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <Card className="p-8 md:p-12 gradient-card border-primary/20 shadow-glow mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Redo att komma igång?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl">
                Berätta kort om din verksamhet så rekommenderar jag rätt abonnemang inom 24 timmar.
                Konsultationen är kostnadsfri och du binder dig inte till något.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="shadow-glow">
                  <a href="/#contact">Kontakta mig</a>
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
              {page.related.map((link) => (
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

export default LandingPage;
