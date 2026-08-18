import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ExampleSites from "@/components/ExampleSites";
import Process from "@/components/Process";
// import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Seo from "@/components/seo/Seo";


const Index = () => {
  useEffect(() => {
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Scroll-triggered reveal animations
    const observerCallback = (entries: IntersectionObserverEntry[], obs: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.15,
      rootMargin: '0px 0px -80px 0px'
    });

    document.querySelectorAll('.reveal').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Seo
        title="Hemsida till fast månadspris | Fertekz IT"
        description="Modern företagshemsida från 299 kr/mån utan startavgift. Hosting, SSL, support och löpande ändringar ingår. Fertekz IT i Eskilstuna."
        path="/"
      />
      <Navigation />

      
      {/* Add id to hero section for navigation */}
      <div id="home">
        <Hero />
      </div>
      
      <About />
      <ExampleSites />
      <Process />
      {/* <Testimonials /> */}
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
