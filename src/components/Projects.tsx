import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ExternalLink } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "DrogSök.se",
      description: "Hemsida för bland annat polisanställda för att hitta specifika läkemedel.",
      image: "/project-images/drogsok.webp",
      imageAlt: "DrogSök.se startsida – sökverktyg för läkemedel",
      tech: ["React", "TypeScript", "Node.js", "MySQL"],
      github: "#",
      live: "https://drogsok.se",
      caseUrl: "/projekt/drogsok",
      featured: true
    },
    {
      title: "Intuitive - Gaming",
      description: "Gaming hemsida med fokus på server hosting.",
      image: "/project-images/intuitive-gaming.webp",
      imageAlt: "Intuitive Gaming hemsida – server hosting för gamers",
      tech: ["Next.js", "TypeScript", "Supabase"],
      github: "#",
      live: "https://intuitive-gaming.com",
      caseUrl: "/projekt/intuitive-gaming"
    },
    {
      title: "Hakuna Potata",
      description: "Snabbmatskedja baserat i USA med inriktning bakpotatis.",
      image: "/project-images/hakuna-potata.webp",
      imageAlt: "Hakuna Potata webbplats – bakpotatis snabbmatskedja",
      tech: ["React Native", "Express", "MongoDB", "IoT"],
      github: "#",
      live: "https://hakunapotata.com",
      caseUrl: "/projekt/hakuna-potata"
    },
    {
      title: "CoDBase",
      description: "Gaming community för Call of Duty med tävlingar, LAN och event.",
      image: "/project-images/codbase-logo.svg",
      imageAlt: "CoDBase logotyp – gaming community för Call of Duty",
      tech: ["Node.js", "JavaScript", "HTML", "CSS"],
      github: "#",
      live: "https://codbase.eu",
      caseUrl: "/projekt/codbase",
      contain: true
    },
  ];



  return (
    <section className="py-20" id="projects">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Fler <span className="gradient-text">projekt</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Några webbplatser och digitala lösningar jag har byggt för olika verksamheter.
          </p>
        </div>

        {/* Featured Project */}
        <div className="mb-16">
          {projects
            .filter(project => project.featured)
            .map((project, index) => (
              <Card
                key={project.title}
                className="overflow-hidden gradient-card shadow-hero group reveal reveal-scale"
              >
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.imageAlt}
                      width={1200}
                      height={675}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-80 lg:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/30 transition-colors" />
                  </div>


                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="inline-block mb-4">
                      <Badge variant="secondary" className="bg-primary/20 text-primary">
                        Utvalt Projekt
                      </Badge>
                    </div>
                    <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
                    <p className="text-muted-foreground text-lg mb-6">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tech.map(tech => (
                        <Badge key={tech} variant="outline" className="border-primary/30">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <Button asChild size="lg" className="shadow-glow">
                        <Link to={project.caseUrl}>
                          Läs hela caset
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button asChild size="lg" variant="outline" className="border-primary/30">
                        <a href={project.live} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Se Live
                        </a>
                      </Button>
                    </div>

                  </div>
                </div>
              </Card>
            ))}
        </div>

        {/* Other Projects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects
            .filter(project => !project.featured)
            .map((project, index) => (
              <Card
                key={project.title}
                className="group overflow-hidden gradient-card shadow-card hover:shadow-glow transition-all duration-300 reveal"
                style={{transitionDelay: `${index * 0.12}s`}}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    width={800}
                    height={450}
                    loading="lazy"
                    decoding="async"
                    className={`w-full h-48 group-hover:scale-105 transition-transform duration-300 ${
                      "contain" in project && project.contain
                        ? "object-contain bg-section-bg p-8"
                        : "object-cover"
                    }`}
                  />

                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/30 transition-colors" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    <Link to={project.caseUrl} className="hover:text-primary transition-colors">
                      {project.title}
                    </Link>
                  </h3>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tech.slice(0, 3).map(tech => (
                      <Badge key={tech} variant="outline" className="text-xs border-primary/30">
                        {tech}
                      </Badge>
                    ))}
                    {project.tech.length > 3 && (
                      <Badge variant="outline" className="text-xs border-primary/30">
                        +{project.tech.length - 3}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button asChild size="sm" variant="secondary">
                      <Link to={project.caseUrl}>Läs caset</Link>
                    </Button>
                    <Button asChild size="sm" variant="ghost">
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Besök ${project.title} live-webbplats`}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>

                </div>
              </Card>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
