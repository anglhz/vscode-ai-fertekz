import { FormEvent, useState } from "react";
import { ArrowRight, CreditCard, Loader2, MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type PackageChoice = { id: string; name: string };

const SubscriptionDecisionDialog = ({ selected, onClose }: { selected: PackageChoice | null; onClose: () => void }) => {
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", question: "" });

  const close = () => {
    if (submitting) return;
    setShowForm(false);
    setForm({ name: "", email: "", phone: "", question: "" });
    onClose();
  };

  const continueToPayment = () => {
    if (selected) window.location.assign(`/starta?paket=${selected.id}`);
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!selected) return;
    setSubmitting(true);

    const { error } = await supabase.functions.invoke("send-contact-email", {
      body: {
        name: form.name.trim(),
        email: form.email.trim(),
        subject: `Vill veta mer om Fertekz ${selected.name}`,
        message: `Valt abonnemang: Fertekz ${selected.name}\nTelefon: ${form.phone.trim()}\n\nFråga:\n${form.question.trim()}`,
        site: window.location.host,
      },
    });

    setSubmitting(false);
    if (error) {
      toast.error("Förfrågan kunde inte skickas. Försök igen eller kontakta mig via e-post.");
      return;
    }

    toast.success("Tack! Jag kontaktar dig inom 24 timmar.");
    close();
  };

  return (
    <Dialog open={selected !== null} onOpenChange={(open) => !open && close()}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{showForm ? "Vad vill du veta mer om?" : `Hur vill du gå vidare med Fertekz ${selected?.name ?? ""}?`}</DialogTitle>
          <DialogDescription>{showForm ? "Lämna dina uppgifter så kontaktar jag dig och svarar på dina frågor." : "Du kan prata med mig först eller gå direkt vidare till den säkra betalningen hos Stripe."}</DialogDescription>
        </DialogHeader>

        {!showForm ? (
          <div className="grid sm:grid-cols-2 gap-4 pt-3">
            <button type="button" onClick={() => setShowForm(true)} className="rounded-xl border border-border p-5 text-left hover:border-primary hover:bg-primary/5 transition-colors">
              <MessageCircle className="h-7 w-7 text-primary mb-4" />
              <strong className="block mb-2">Jag vill bli kontaktad</strong>
              <span className="text-sm text-muted-foreground">Ställ frågor och få hjälp att välja rätt innan du bestämmer dig.</span>
            </button>
            <button type="button" onClick={continueToPayment} className="rounded-xl border border-primary bg-primary/10 p-5 text-left hover:bg-primary/15 transition-colors">
              <CreditCard className="h-7 w-7 text-primary mb-4" />
              <strong className="block mb-2">Fortsätt till betalning</strong>
              <span className="text-sm text-muted-foreground">Starta abonnemanget genom säker månadsbetalning hos Stripe.</span>
              <ArrowRight className="h-4 w-4 text-primary mt-4" />
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4 pt-3">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2"><Label htmlFor="package-contact-name">Namn</Label><Input id="package-contact-name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} minLength={2} maxLength={100} required disabled={submitting} /></div>
              <div className="space-y-2"><Label htmlFor="package-contact-email">E-post</Label><Input id="package-contact-email" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} maxLength={254} required disabled={submitting} /></div>
            </div>
            <div className="space-y-2"><Label htmlFor="package-contact-phone">Telefonnummer</Label><Input id="package-contact-phone" type="tel" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} maxLength={40} required disabled={submitting} /></div>
            <div className="space-y-2"><Label htmlFor="package-contact-question">Vad vill du veta mer om?</Label><Textarea id="package-contact-question" value={form.question} onChange={(event) => setForm({ ...form, question: event.target.value })} placeholder="Exempel: Vad ingår, hur lång är leveranstiden eller vilket paket passar oss?" minLength={10} maxLength={3000} rows={5} required disabled={submitting} /></div>
            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-between pt-2">
              <Button type="button" variant="ghost" onClick={() => setShowForm(false)} disabled={submitting}>Tillbaka</Button>
              <Button type="submit" disabled={submitting}>{submitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Send className="h-4 w-4 mr-2" />}{submitting ? "Skickar…" : "Be mig kontakta dig"}</Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionDecisionDialog;
