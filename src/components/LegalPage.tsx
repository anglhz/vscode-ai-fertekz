import type { ReactNode } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/seo/Seo";

type LegalPageProps = {
  title: string;
  description: string;
  path: string;
  children: ReactNode;
};

const LegalPage = ({ title, description, path, children }: LegalPageProps) => (
  <div className="min-h-screen bg-background">
    <Seo title={`${title} | Fertekz IT`} description={description} path={path} />
    <Navigation />
    <main className="gradient-hero px-6 pb-20 pt-32">
      <article className="mx-auto max-w-4xl rounded-2xl border border-primary/20 bg-card/70 p-6 shadow-hero backdrop-blur sm:p-10">
        <p className="mb-3 text-sm font-semibold text-primary">Juridisk information</p>
        <h1 className="mb-3 text-4xl font-bold sm:text-5xl">{title}</h1>
        <p className="mb-10 text-sm text-muted-foreground">Senast uppdaterad: 27 augusti 2026</p>
        <div className="space-y-9 text-muted-foreground [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h3]:mb-2 [&_h3]:font-semibold [&_h3]:text-foreground [&_li]:mb-2 [&_p]:leading-7 [&_ul]:list-disc [&_ul]:pl-6">
          {children}
        </div>
      </article>
    </main>
    <Footer />
  </div>
);

export default LegalPage;
