import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Seo from "@/components/seo/Seo";

const SubscriptionSuccess = () => (
  <main className="min-h-screen gradient-hero flex items-center justify-center px-6 py-16">
    <Seo title="Beställningen är klar | Fertekz IT" description="Bekräftelse på startat abonnemang." path="/starta/klart" noindex />
    <Card className="max-w-xl p-10 text-center gradient-card shadow-glow">
      <CheckCircle className="h-16 w-16 text-primary mx-auto mb-6" />
      <h1 className="text-3xl font-bold mb-4">Tack för din beställning!</h1>
      <p className="text-muted-foreground mb-3">Första månaden är betald och en bekräftelse skickas till din e-post.</p>
      <p className="text-muted-foreground mb-8">Nästa steg är att samla in information, färger, texter och bilder till hemsidan. Jag kontaktar dig med materialformuläret.</p>
      <Button asChild><Link to="/">Till startsidan</Link></Button>
    </Card>
  </main>
);

export default SubscriptionSuccess;
