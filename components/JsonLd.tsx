import type { SiteSettings, Faq } from "@/types/sanity";

function toPlainText(faq: Faq): string {
  return (
    faq.answer
      ?.map((block) => block.children?.map((c) => c.text).join(""))
      .join(" ") ?? ""
  );
}

/**
 * Renders LocalBusiness + FAQPage JSON-LD, driven entirely by
 * siteSettings and faq content from Sanity — this is what backs the
 * "schema markup for landscapers Perth" requirement from the brief.
 */
export function JsonLd({
  settings,
  faqs,
  siteUrl,
}: {
  settings: SiteSettings | null;
  faqs: Faq[];
  siteUrl: string;
}) {
  if (!settings) return null;
  console.log(settings);
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: settings.businessName || "PetVet Landscaping & Maintenance",
    description: settings.businessDescription,
    url: siteUrl,
    telephone: settings.contactPhone,
    email: settings.contactEmail,
    address: settings.address
      ? {
          "@type": "PostalAddress",
          streetAddress: settings.address,
          addressRegion: "WA",
          addressCountry: "AU",
        }
      : undefined,
    geo: settings.geo
      ? {
          "@type": "GeoCoordinates",
          latitude: settings.geo.lat,
          longitude: settings.geo.lng,
        }
      : undefined,
    priceRange: settings.priceRange,
    openingHoursSpecification: settings.openingHours,
    areaServed: settings.serviceAreas,
    sameAs: settings.socialLinks?.map((l) => l.url).filter(Boolean),
  };

  const faqPage =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: toPlainText(f),
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      {faqPage && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
        />
      )}
    </>
  );
}
