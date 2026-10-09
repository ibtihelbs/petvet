import Image from "next/image";
import { serviceImageFallback } from "@/lib/imageFallback";
import { urlFor } from "@/sanity/image";
import type { Service, SiteSettings } from "@/types/sanity";

export function Services({
  services,
  settings,
}: {
  services: Service[];
  settings: SiteSettings | null;
}) {
  if (services.length === 0) return null;

  return (
    <section
      id="services"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24"
    >
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h2 className="uppercase leading-none tracking-tight text-[clamp(30px,8vw,48px)] text-marine mb-4">
          {settings?.servicesHeading ||
            "Complete Landscaping Services in Perth"}
        </h2>
        {settings?.servicesIntro && (
          <p className="text-ink/70">{settings.servicesIntro}</p>
        )}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {services.map((service) => {
          const imgUrl =
            urlFor(service.image?.asset)?.width(500).height(500).url() ||
            serviceImageFallback[service.slug?.current] ||
            null;

          return (
            <div
              key={service._id}
              className="rounded-brand bg-white overflow-hidden shadow-sm"
            >
              {imgUrl && (
                <div className="relative aspect-square">
                  <Image
                    src={imgUrl}
                    alt={service.image?.alt || service.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 20vw, 50vw"
                  />
                </div>
              )}
              <div className="p-5">
                <h3 className="font-headline text-lg text-marine mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-ink/70">{service.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
