import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import Seo from "@/components/seo/Seo";

const ProjectsPage = () => {
  useEffect(() => {
    document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
  }, []);

  return (
    <div className="min-h-screen pt-16">
      <Seo title="Projekt och kundcase | Fertekz IT" description="Se webbprojekt och kundcase utvecklade av Fertekz IT." path="/projekt" />
      <Navigation />
      <Projects />
      <Footer />
    </div>
  );
};

export default ProjectsPage;
