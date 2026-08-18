import { Helmet } from "react-helmet-async";

export const SITE_URL = "https://fertekz.com";

interface SeoProps {
  title: string;
  description: string;
  path: string;
  jsonLd?: Record<string, unknown>[];
  noindex?: boolean;
  image?: string;
  type?: "website" | "article";
}

const Seo = ({ title, description, path, jsonLd = [], noindex = false, image = "/og-image.jpg", type = "website" }: SeoProps) => {
  const url = `${SITE_URL}${path}`;
  const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Fertekz IT" />
      <meta property="og:locale" content="sv_SE" />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={title} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      {jsonLd.map((schema, index) => (
        <script type="application/ld+json" key={index}>
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default Seo;
