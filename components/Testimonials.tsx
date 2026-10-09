import Image from "next/image";
import { testimonialAvatarFallback } from "@/lib/imageFallback";
import { urlFor } from "@/sanity/image";
import type { Testimonial, SiteSettings } from "@/types/sanity";

function Stars({ rating }: { rating: number }) {
  return (
    <div
      aria-label={`${rating} out of 5 stars`}
      className="text-terracotta mb-3"
    >
      {"★".repeat(rating)}
      {"☆".repeat(5 - rating)}
    </div>
  );
}

export function Testimonials({
  testimonials,
  settings,
}: {
  testimonials: Testimonial[];
  settings: SiteSettings | null;
}) {
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="bg-wine/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="uppercase leading-none tracking-tight text-[clamp(30px,8vw,48px)] text-marine mb-4">
            {settings?.testimonialsHeading || "What Our Clients Say"}
          </h2>
          {settings?.testimonialsIntro && (
            <p className="text-ink/70">{settings.testimonialsIntro}</p>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => {
            const avatarUrl =
              urlFor(t.avatar?.asset)?.width(80).height(80).url() ||
              testimonialAvatarFallback[t.name] ||
              null;

            return (
              <figure
                key={t._id}
                className="rounded-brand bg-white p-6 shadow-sm"
              >
                <Stars rating={t.rating} />
                <blockquote className="text-sm text-ink/80 leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  {avatarUrl && (
                    <Image
                      src={avatarUrl}
                      alt={t.avatar?.alt || t.name}
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-semibold text-sm text-marine">
                      {t.name}
                    </p>
                    {t.suburb && (
                      <p className="text-xs text-ink/50">{t.suburb}</p>
                    )}
                  </div>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
