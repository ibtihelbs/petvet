import Image from "next/image";
import { heroImageFallback } from "@/lib/imageFallback";
import { urlFor } from "@/sanity/image";
import type { SiteSettings } from "@/types/sanity";
import PhoneIcon from "./PhoneIcon";
export function Hero({ settings }: { settings: SiteSettings | null }) {
  const heroUrl =
    urlFor(settings?.heroImage?.asset)?.width(1400).url() || heroImageFallback;
  const phone = settings?.contactPhone;

  return (
    <section id="home" className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          {settings?.heroSubtitle && (
            <p className="text-xs font-semibold capitalize bg-wine  tracking-wide rounded-full p-2 text-terracotta mb-4">
              {settings.heroSubtitle}
            </p>
          )}
          <h1 className="uppercase text-[clamp(36px,6vw,48px)] leading-none tracking-tight text-marine mb-6">
            {settings?.heroTitle ||
              "Quand votre animal a besoin d'aide, chaque minute compte."}
          </h1>
          <p className="text-base leading-relaxed text-ink/80 mb-8 max-w-xl">
            {settings?.heroDescription}
          </p>
          <div className="flex flex-wrap gap-4">
            {/**   <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-brand bg-terracotta px-8 py-4 font-semibold text-marine hover:bg-terracotta-75 transition-colors"
            >
              {settings?.heroPrimaryCtaLabel || "Prendre rendez-vous"}
            </a> */}
            {phone && (
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="inline-flex items-center justify-center rounded-brand border-2 border-marine px-8 py-4 font-semibold text-marine hover:bg-marine hover:text-almond transition-colors"
              >
                {settings?.heroSecondaryCtaLabel || "Appelez-nous"}
              </a>
            )}
          </div>
        </div>

        <div className="relative aspect-[4/3] rounded-brand overflow-hidden">
          <Image
            src={heroUrl}
            alt={
              settings?.heroImage?.alt ||
              "Clinique vétérinaire PET VET à Hammam-Lif"
            }
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
      </div>

      {/* Barre CTA mobile sticky — pattern le plus convertissant sur mobile */}
      {phone && (
        <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-marine flex">
          <a
            href={`tel:${phone.replace(/\s+/g, "")}`}
            className="flex-1 text-center py-3.5 text-almond font-semibold text-sm border-r border-almond/20"
          >
            <PhoneIcon />
            Appeler
          </a>
          {/* <a
            href="#contact"
            className="hidden sm:inline-flex items-center rounded-brand bg-terracotta px-5 py-2.5 text-sm font-semibold text-marine hover:bg-terracotta-75 transition-colors"
          >
            Prendre rendez-vous
          </a>*/}
        </div>
      )}
    </section>
  );
}
