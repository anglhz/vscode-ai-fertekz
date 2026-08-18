import { SITE_URL } from "@/components/seo/Seo";

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `${SITE_URL}${item.path}`,
  })),
});

export const serviceSchema = (opts: {
  name: string;
  description: string;
  areaServed: string[];
  priceRange?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: opts.name,
  description: opts.description,
  serviceType: "Webbutveckling",
  provider: {
    "@type": "LocalBusiness",
    name: "Fertekz IT",
    url: SITE_URL,
    telephone: "+46734145099",
    email: "tommy@fertekz.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Eskilstuna",
      addressRegion: "Södermanland",
      addressCountry: "SE",
    },
  },
  areaServed: opts.areaServed.map((name) => ({ "@type": "Place", name })),
  ...(opts.priceRange ? { offers: { "@type": "Offer", priceCurrency: "SEK", price: opts.priceRange } } : {}),
});

export const faqSchema = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
});

export const caseStudySchema = (opts: {
  name: string;
  description: string;
  path: string;
  image: string;
  tech: string[];
  liveUrl: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: opts.name,
  headline: opts.name,
  description: opts.description,
  url: `${SITE_URL}${opts.path}`,
  image: `${SITE_URL}${opts.image}`,
  keywords: opts.tech.join(", "),
  about: { "@type": "WebSite", name: opts.name, url: opts.liveUrl },
  creator: {
    "@type": "Person",
    name: "Tommy Fernández",
    url: SITE_URL,
    jobTitle: "Webbutvecklare och webbdesigner",
  },
});
