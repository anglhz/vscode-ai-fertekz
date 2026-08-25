import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import { landingPages } from "./content/landingPages";
import { servicePages } from "./content/servicePages";
import { caseStudies } from "./content/caseStudies";

const NotFound = lazy(() => import("./pages/NotFound"));
const Auth = lazy(() => import("./pages/Auth"));
const AdminPortal = lazy(() => import("./pages/AdminPortal"));
const AdminSeo = lazy(() => import("./pages/AdminSeo"));
const StartSubscription = lazy(() => import("./pages/StartSubscription"));
const SubscriptionSuccess = lazy(() => import("./pages/SubscriptionSuccess"));
const MaterialForm = lazy(() => import("./pages/MaterialForm"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const DemoSite = lazy(() => import("./pages/DemoSite"));
const LandingPage = lazy(() => import("./components/LandingPage"));
const CaseStudy = lazy(() => import("./components/CaseStudy"));

const App = () => (
  <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen bg-background" aria-label="Laddar sidan" />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route
            path="/webbyra-eskilstuna"
            element={<LandingPage page={landingPages["webbyra-eskilstuna"]} />}
          />
          <Route
            path="/vad-kostar-en-hemsida"
            element={<LandingPage page={landingPages["vad-kostar-en-hemsida"]} />}
          />
          <Route
            path="/hemsida-till-foretag"
            element={<LandingPage page={landingPages["hemsida-till-foretag"]} />}
          />
          <Route
            path="/webbutveckling"
            element={<LandingPage page={servicePages["webbutveckling"]} />}
          />
          <Route path="/webbdesign" element={<LandingPage page={servicePages["webbdesign"]} />} />
          <Route path="/hemsidor" element={<LandingPage page={servicePages["hemsidor"]} />} />
          <Route
            path="/responsiv-webbdesign"
            element={<LandingPage page={servicePages["responsiv-webbdesign"]} />}
          />
          <Route
            path="/tjanster/landningssida"
            element={<LandingPage page={landingPages["landningssida"]} />}
          />
          <Route
            path="/tjanster/foretagswebbplats"
            element={<LandingPage page={landingPages["foretagswebbplats"]} />}
          />
          <Route
            path="/orter/strangnas"
            element={<LandingPage page={landingPages["strangnas"]} />}
          />
          <Route
            path="/orter/katrineholm"
            element={<LandingPage page={landingPages["katrineholm"]} />}
          />
          <Route
            path="/orter/nykoping"
            element={<LandingPage page={landingPages["nykoping"]} />}
          />
          <Route path="/projekt/drogsok" element={<CaseStudy study={caseStudies["drogsok"]} />} />
          <Route
            path="/projekt/intuitive-gaming"
            element={<CaseStudy study={caseStudies["intuitive-gaming"]} />}
          />
          <Route
            path="/projekt/hakuna-potata"
            element={<CaseStudy study={caseStudies["hakuna-potata"]} />}
          />
          <Route path="/projekt/codbase" element={<CaseStudy study={caseStudies["codbase"]} />} />

          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<AdminPortal />} />
          <Route path="/admin/seo" element={<AdminSeo />} />
          <Route path="/starta" element={<StartSubscription />} />
          <Route path="/starta/klart" element={<SubscriptionSuccess />} />
          <Route path="/material" element={<MaterialForm />} />
          <Route path="/projekt" element={<ProjectsPage />} />
          <Route path="/demo/frisorsalong" element={<DemoSite kind="frisorsalong" />} />
          <Route path="/demo/byggforetag" element={<DemoSite kind="byggforetag" />} />
          <Route path="/demo/konsultbolag" element={<DemoSite kind="konsultbolag" />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </BrowserRouter>
  </TooltipProvider>
);

export default App;
