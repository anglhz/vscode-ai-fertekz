# Fertekz.com

Webbplats för Fertekz IT, byggd med React, TypeScript, Vite, Tailwind CSS och Supabase.

## Kom igång

Krav: Node.js och npm.

```sh
npm install
npm run dev
```

Utvecklingsservern körs som standard på `http://localhost:8080`.

## Kommandon

- `npm run dev` – starta utvecklingsservern
- `npm run build` – skapa en produktionsbyggnad
- `npm run lint` – kör ESLint
- `npm run preview` – förhandsvisa produktionsbyggnaden

## Struktur

- `src/components` – sidsektioner och återanvändbara UI-komponenter
- `src/content` – innehåll för landningssidor, tjänster och kundcase
- `src/pages` – routes för startsida, autentisering och SEO-admin
- `src/integrations/supabase` – Supabase-klient och genererade typer
- `supabase/functions` – serverfunktioner för kontaktformulär och SEO-rapport
- `supabase/migrations` – databasmigrationer

## Miljövariabler

Frontendens Supabase-anslutning använder variablerna i `.env`. SEO-rapportfunktionen behöver `GSC_ACCESS_TOKEN`; `GSC_API_BASE_URL` kan anges om en annan kompatibel API-bas ska användas.
