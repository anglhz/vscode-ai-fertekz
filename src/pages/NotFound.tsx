import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    const previousTitle = document.title;
    document.title = "Sidan hittades inte (404) | Fertekz IT";

    const robotsMeta = document.createElement("meta");
    robotsMeta.name = "robots";
    robotsMeta.content = "noindex, nofollow";
    document.head.appendChild(robotsMeta);

    const description = document.querySelector('meta[name="description"]');
    const previousDescription = description?.getAttribute("content") ?? null;
    description?.setAttribute(
      "content",
      "Sidan du sökte finns inte. Gå tillbaka till startsidan för Fertekz IT."
    );

    return () => {
      document.title = previousTitle;
      robotsMeta.remove();
      if (description && previousDescription !== null) {
        description.setAttribute("content", previousDescription);
      }
    };
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-4">Sidan hittades inte</p>
        <a href="/" className="text-primary hover:underline">
          Tillbaka till startsidan
        </a>
      </div>
    </div>
  );
};

export default NotFound;
