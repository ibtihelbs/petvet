import Image from "next/image";
import reviewsData from "../data/reviews.json";

type Review = {
  id: string;
  name: string;
  suburb?: string;
  date?: string;
  rating: number;
  quote: string;
  avatar?: string;
};

function Stars({ rating }: { rating: number }) {
  return (
    <div
      aria-label={`${rating} sur 5 étoiles`}
      className="text-terracotta mb-3 text-lg"
    >
      {"★".repeat(rating)}
      {"☆".repeat(5 - rating)}
    </div>
  );
}

function formatDate(date?: string) {
  if (!date) return null;
  try {
    return new Date(date).toLocaleDateString("fr-FR", {
      month: "long",
      year: "numeric",
    });
  } catch {
    return null;
  }
}

export function Testimonials() {
  const reviews: Review[] = reviewsData.reviews;

  if (reviews.length === 0) return null;

  return (
    <section id="testimonials" className="bg-wine/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="uppercase leading-none tracking-tight text-[clamp(30px,8vw,48px)] text-marine mb-4">
            Adorés par les propriétaires d&apos;animaux de tout Hammam-Lif
          </h2>
          <p className="text-ink/70">
            Ils nous ont fait confiance pour leurs compagnons — voici ce
            qu&apos;ils en disent.
          </p>

          {/* Badge Google */}
          <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-white shadow-sm">
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-sm font-semibold text-ink">
              {reviewsData.averageRating} · {reviewsData.totalReviews} avis
              Google
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((t) => (
            <figure
              key={t.id}
              className="rounded-brand bg-white p-6 shadow-sm flex flex-col"
            >
              <blockquote className="text-sm text-ink/80 leading-relaxed mb-6 flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <Stars rating={t.rating} />

              <figcaption className="flex items-center gap-3 pt-4 border-t border-ink/10">
                {t.avatar && (
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={44}
                    height={44}
                    className="rounded-full object-cover shrink-0"
                    unoptimized
                  />
                )}
                <div className="min-w-0">
                  <p className="font-semibold text-sm text-marine truncate">
                    {t.name}
                  </p>
                  {t.suburb && (
                    <p className="text-xs text-ink/50 truncate">{t.suburb}</p>
                  )}
                  {formatDate(t.date) && (
                    <p className="text-xs text-ink/40">{formatDate(t.date)}</p>
                  )}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
