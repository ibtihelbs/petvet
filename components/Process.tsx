import type { ProcessStep, SiteSettings } from "@/types/sanity";

export function Process({
  steps,
  settings,
}: {
  steps: ProcessStep[];
  settings: SiteSettings | null;
}) {
  if (steps.length === 0) return null;

  return (
    <section id="process" className="bg-wine/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="uppercase leading-none tracking-tight text-[clamp(30px,8vw,48px)] text-marine mb-4">
            {settings?.processHeading || "From Initial Concept to Handover"}
          </h2>
          {settings?.processIntro && (
            <p className="text-ink/70">{settings.processIntro}</p>
          )}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step._id}>
              <span className="font-headline text-4xl text-terracotta block mb-3">
                {String(step.stepNumber).padStart(2, "0")}
              </span>
              <h3 className="font-headline text-lg text-marine mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-ink/70 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {settings?.processCtaLabel && (
          <div className="text-center mt-12">
            <a
              href={settings.processCtaLink || "#contact"}
              className="inline-flex items-center gap-2 font-semibold text-marine hover:text-terracotta transition-colors"
            >
              {settings.processCtaLabel} →
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
