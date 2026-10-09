import type { Benefit, SiteSettings } from "@/types/sanity";

const CARD_STYLES = [
  "bg-marine text-almond",
  "bg-sand text-marine",
  "bg-terracotta text-marine",
];

export function Benefits({
  benefits,
  settings,
}: {
  benefits: Benefit[];
  settings: SiteSettings | null;
}) {
  if (benefits.length === 0) return null;

  return (
    <section
      id="benefits"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24"
    >
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h2 className="uppercase leading-none tracking-tight text-[clamp(30px,8vw,48px)] text-marine mb-4">
          {settings?.benefitsHeading || "Why Perth Homeowners Choose PetVet"}
        </h2>
        {settings?.benefitsIntro && (
          <p className="text-ink/70">{settings.benefitsIntro}</p>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {benefits.map((benefit, i) => (
          <div
            key={benefit._id}
            className={`rounded-brand p-8 ${CARD_STYLES[i % CARD_STYLES.length]}`}
          >
            <h3 className="font-headline text-lg mb-3">{benefit.title}</h3>
            <p className="text-sm opacity-90 leading-relaxed">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
