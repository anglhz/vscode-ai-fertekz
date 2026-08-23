import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  // Honeypot field for spam protection
  website?: string;
}

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>();

  useEffect(() => {
    const selectedPackage = sessionStorage.getItem("selectedPackage");
    if (selectedPackage)
      setValue("subject", `Jag är intresserad av ${selectedPackage}`);
  }, [setValue]);

  const onSubmit = async (data: FormData) => {
    // Check honeypot field - if filled, it's likely spam
    if (data.website) {
      console.warn("Honeypot field filled, likely spam");
      return;
    }

    setIsSubmitting(true);

    try {
      // Send notification to ntfy (keep existing functionality)
      //await fetch('https://ntfy.sh/Fertekz-com', {
      //method: 'POST',
      //headers: {
      //'Content-Type': 'text/plain',
      //},
      //body: `Nytt meddelande från ${data.name}\n\nEmail: ${data.email}\nÄmne: ${data.subject}\nSite: ${window.location.host}\n\n${data.message}`,
      //});

      // Send email via Supabase Edge Function
      const response = await supabase.functions.invoke("send-contact-email", {
        body: {
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
          site: window.location.host,
        },
      });

      if (response.error) {
        throw response.error;
      }

      // Send to n8n webhook
      await fetch("https://n8n.fertekz.com/webhook/contact-forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          website: "https://fertekz.com",
          type: "contact_form",
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
          timestamp: new Date().toISOString(),
        }),
      });

      toast.success("Meddelande skickat! Jag återkommer inom 24 timmar.");
      reset();
    } catch (error: unknown) {
      console.error("Contact form error:", error);
      const message = error instanceof Error ? error.message : "";

      // Handle specific error types
      if (message.includes("Too many requests")) {
        toast.error("För många förfrågningar. Försök igen om 15 minuter.");
      } else if (message.includes("Invalid input")) {
        toast.error(
          "Ogiltig inmatning. Kontrollera dina uppgifter och försök igen.",
        );
      } else if (message.includes("Rate limit")) {
        toast.error(
          "För många meddelanden skickade. Vänta en stund innan du försöker igen.",
        );
      } else {
        toast.error("Något gick fel. Försök igen senare.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20" id="contact">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Boka en <span className="gradient-text">gratis genomgång</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Berätta kort om företaget så går vi igenom vilket abonnemang som
            passar. Samtalet är kostnadsfritt och utan förpliktelser.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8 reveal reveal-left">
            <div>
              <h3 className="text-2xl font-bold mb-6">Kontakta mig</h3>
              <p className="text-muted-foreground mb-8">
                Jag svarar vanligtvis inom 24 timmar. Välj det sätt som passar
                dig bäst!
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              <Card className="p-6 gradient-card shadow-card hover:shadow-glow transition-all duration-300 group">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/20 text-primary group-hover:scale-110 transition-transform">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-muted-foreground">tommy@fertekz.com</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 gradient-card shadow-card hover:shadow-glow transition-all duration-300 group">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/20 text-primary group-hover:scale-110 transition-transform">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Telefon</h4>
                    <p className="text-muted-foreground">0734145099</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 gradient-card shadow-card hover:shadow-glow transition-all duration-300 group">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/20 text-primary group-hover:scale-110 transition-transform">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Plats & Serviceområde</h4>
                    <p className="text-muted-foreground">
                      Eskilstuna, Södermanland
                    </p>
                    <p className="text-sm text-muted-foreground/80">
                      Hjälper kunder i hela Sörmland & Mälardalen
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Service Area Info */}
            <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/10">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Serviceområde:</strong> Jag
                hjälper företag och privatpersoner i Eskilstuna, Strängnäs,
                Katrineholm, Nyköping och hela Södermanland/Sörmland med
                professionell webbutveckling och webdesign.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="p-8 gradient-card shadow-hero reveal reveal-right">
            <h3 className="text-2xl font-bold mb-6">Boka genomgång</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Honeypot field - hidden from users, used to detect spam */}
              <input
                {...register("website")}
                type="text"
                className="absolute -left-9999px opacity-0"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="text-sm font-medium mb-2 block"
                  >
                    Namn
                  </label>
                  <Input
                    id="contact-name"
                    {...register("name", {
                      required: "Namn är obligatoriskt",
                      minLength: {
                        value: 2,
                        message: "Namn måste vara minst 2 tecken",
                      },
                      maxLength: {
                        value: 100,
                        message: "Namn får inte vara längre än 100 tecken",
                      },
                    })}
                    placeholder="Ditt namn"
                    className="bg-background/50 border-primary/30 focus:border-primary"
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <p className="text-destructive text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="text-sm font-medium mb-2 block"
                  >
                    Email
                  </label>
                  <Input
                    id="contact-email"
                    {...register("email", {
                      required: "Email är obligatoriskt",
                      maxLength: {
                        value: 254,
                        message: "Email får inte vara längre än 254 tecken",
                      },
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Ogiltig email-adress",
                      },
                    })}
                    type="email"
                    placeholder="din@email.se"
                    className="bg-background/50 border-primary/30 focus:border-primary"
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="text-sm font-medium mb-2 block"
                >
                  Ämne
                </label>
                <Input
                  id="contact-subject"
                  {...register("subject", {
                    required: "Ämne är obligatoriskt",
                    minLength: {
                      value: 3,
                      message: "Ämne måste vara minst 3 tecken",
                    },
                    maxLength: {
                      value: 200,
                      message: "Ämne får inte vara längre än 200 tecken",
                    },
                  })}
                  placeholder="Vilket abonnemang är du intresserad av?"
                  className="bg-background/50 border-primary/30 focus:border-primary"
                  disabled={isSubmitting}
                />
                {errors.subject && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="text-sm font-medium mb-2 block"
                >
                  Meddelande
                </label>
                <Textarea
                  id="contact-message"
                  {...register("message", {
                    required: "Meddelande är obligatoriskt",
                    minLength: {
                      value: 10,
                      message: "Meddelande måste vara minst 10 tecken",
                    },
                    maxLength: {
                      value: 5000,
                      message: "Meddelande får inte vara längre än 5000 tecken",
                    },
                  })}
                  placeholder="Berätta kort om företaget och vad hemsidan behöver göra..."
                  rows={6}
                  className="bg-background/50 border-primary/30 focus:border-primary resize-none"
                  disabled={isSubmitting}
                />
                {errors.message && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full shadow-glow group"
                disabled={isSubmitting}
              >
                <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                {isSubmitting ? "Skickar..." : "Boka gratis genomgång"}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
