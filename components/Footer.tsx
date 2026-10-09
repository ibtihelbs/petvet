import type { SiteSettings } from "@/types/sanity";

const SERVICE_LINKS = [
  "Landscape Design",
  "Garden Landscaping",
  "Garden Makeovers",
  "Paving & Outdoor Areas",
  "Retaining Walls",
];

const USEFUL_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Our Services", href: "#services" },
  { label: "Our Projects", href: "#projects" },
  { label: "Why Choose Us", href: "#benefits" },
  { label: "Contact Us", href: "#contact" },
  { label: "FAQs", href: "#faqs" },
];

export function Footer({ settings }: { settings: SiteSettings | null }) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-marine text-almond">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <h3 className="font-headline text-lg mb-4">
            {settings?.businessName || "PetVet"}
          </h3>
          {settings?.contactPhone && (
            <p className="text-sm opacity-80 mb-1">{settings.contactPhone}</p>
          )}
          {settings?.contactEmail && (
            <p className="text-sm opacity-80 mb-1">{settings.contactEmail}</p>
          )}
          {settings?.openingHours?.map((h) => (
            <p key={h} className="text-sm opacity-80">
              {h}
            </p>
          ))}
        </div>

        <div>
          <h3 className="font-headline text-lg mb-4">Services</h3>
          <ul className="space-y-2">
            {SERVICE_LINKS.map((s) => (
              <li key={s} className="text-sm opacity-80">
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-headline text-lg mb-4">Useful Links</h3>
          <ul className="space-y-2">
            {USEFUL_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm opacity-80 hover:opacity-100 hover:text-terracotta transition"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-headline text-lg mb-4">Service Areas</h3>
          <ul className="space-y-2">
            {settings?.serviceAreas?.map((area) => (
              <li key={area} className="text-sm opacity-80">
                {area}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-almond/10 py-6 text-center text-xs opacity-60">
        © {year} {settings?.businessName || "PetVet"}. All rights reserved.
      </div>
    </footer>
  );
}
