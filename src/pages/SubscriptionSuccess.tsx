import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Seo from "@/components/seo/Seo";

const SubscriptionSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const materialUrl = sessionId ? `/material?session_id=${encodeURIComponent(sessionId)}` : null;

  return (
  <main className="min-h-screen gradient-hero flex items-center justify-center px-6 py-16">
    <Seo title="Beställningen är klar | Fertekz IT" description="Bekräftelse på startat abonnemang." path="/starta/klart" noindex />
    <Card className="max-w-xl p-10 text-center gradient-card shadow-glow">
      <CheckCircle className="h-16 w-16 text-primary mx-auto mb-6" />
      <h1 className="text-3xl font-bold mb-4">Tack för din beställning!</h1>
      <p className="text-muted-foreground mb-3">Första månaden är betald och en bekräftelse skickas till din e-post.</p>
      <p className="text-muted-foreground mb-8">Nästa steg är att samla in information, färger, texter och bilder till hemsidan. Fyll gärna i materialformuläret direkt.</p>
      <div className="flex flex-col sm:flex-row justify-center gap-3">
        {materialUrl ? (
          <Button asChild><Link to={materialUrl}>Fyll i materialformuläret</Link></Button>
        ) : (
          <Button asChild><Link to="/#contact">Kontakta mig för din materiallänk</Link></Button>
        )}
        <Button asChild variant="outline"><Link to="/">Till startsidan</Link></Button>
      </div>
    </Card>
  </main>
  );
};

export default SubscriptionSuccess;
