import Image from "next/image";
import type { SiteSettings } from "@/types/sanity";

const PHONE = "29 302 496";
const PHONE_CLEAN = "29302496";
const EMAIL = "maherhmimida@gmail.com";
const MAPS_URL = "https://maps.app.goo.gl/NKaqPQvDzThDrmvh8";

const HOURS = [
  { day: "Lundi", hours: "24h/24" },
  { day: "Mardi", hours: "24h/24" },
  { day: "Mercredi", hours: "24h/24" },
  { day: "Jeudi", hours: "24h/24" },
  { day: "Vendredi", hours: "24h/24" },
  { day: "Samedi", hours: "10h00 – 18h30" },
  { day: "Dimanche", hours: "10h00 – 14h00" },
];

export function Contact({ settings }: { settings: SiteSettings | null }) {
  return (
    <section id="contact" className="bg-wine/5">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-12">
          <h2 className="uppercase leading-none tracking-tight text-[clamp(30px,8vw,48px)] text-marine mb-4">
            {settings?.contactHeading || "Parlons de votre animal"}
          </h2>
          <p className="text-ink/70 max-w-2xl mx-auto">
            {settings?.contactIntro ||
              "Une question, une urgence, ou une simple visite ? Contactez-nous à tout moment."}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Téléphone */}
          <a
            href={`tel:+216${PHONE_CLEAN}`}
            className="group rounded-brand bg-white p-8 shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center"
          >
            <div className="w-14 h-14 rounded-full bg-terracotta/10 flex items-center justify-center mb-4 group-hover:bg-terracotta/20 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C96A4B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
              </svg>
            </div>
            <h3 className="font-headline text-lg text-marine mb-1">
              Téléphone
            </h3>
            <p className="text-ink/60 text-sm mb-4">
              Disponible 24h/24 pour les urgences
            </p>
            <p className="font-semibold text-marine text-lg group-hover:text-terracotta transition-colors">
              {PHONE}
            </p>
          </a>

          {/* Email */}
          <a
            href={`mailto:${EMAIL}`}
            className="group rounded-brand bg-white p-8 shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center"
          >
            <div className="w-14 h-14 rounded-full bg-terracotta/10 flex items-center justify-center mb-4 group-hover:bg-terracotta/20 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C96A4B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6l9 -6" />
              </svg>
            </div>
            <h3 className="font-headline text-lg text-marine mb-1">Email</h3>
            <p className="text-ink/60 text-sm mb-4">Réponse sous 24h ouvrées</p>
            <p className="font-semibold text-marine text-sm break-all group-hover:text-terracotta transition-colors">
              {EMAIL}
            </p>
          </a>

          {/* Adresse + Maps */}
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-brand bg-white p-8 shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center"
          >
            <div className="w-14 h-14 rounded-full bg-terracotta/10 flex items-center justify-center mb-4 group-hover:bg-terracotta/20 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C96A4B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 11.5a2.5 2.5 0 1 1 0 -5a2.5 2.5 0 0 1 0 5z" />
                <path d="M12 21.5c-3.5 -3.5 -7 -7 -7 -11a7 7 0 1 1 14 0c0 4 -3.5 7.5 -7 11z" />
              </svg>
            </div>
            <h3 className="font-headline text-lg text-marine mb-1">Adresse</h3>
            <p className="text-ink/60 text-sm mb-4">
              04 Rue Salah Mehdi, Hammam-Lif 2050
            </p>
            <p className="font-semibold text-marine text-sm group-hover:text-terracotta transition-colors">
              Voir sur Google Maps →
            </p>
          </a>
        </div>

        {/* Horaires */}
        <div className="mt-12 rounded-brand bg-marine text-almond p-8 lg:p-10">
          <div className="flex items-center gap-3 mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 3" />
            </svg>
            <h3 className="font-headline text-xl">Horaires d&apos;ouverture</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {HOURS.map((h) => {
              const isAllDay = h.hours === "24h/24";
              return (
                <div
                  key={h.day}
                  className={`rounded-brand p-3 text-center ${
                    isAllDay ? "bg-terracotta/20" : "bg-almond/10"
                  }`}
                >
                  <p className="text-xs uppercase tracking-wide opacity-80 mb-1">
                    {h.day}
                  </p>
                  <p
                    className={`text-sm font-semibold ${
                      isAllDay ? "text-almond" : "text-almond/90"
                    }`}
                  >
                    {h.hours}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex items-center gap-3 text-sm opacity-90">
            <span className="inline-flex items-center gap-2 rounded-full bg-terracotta/30 px-3 py-1">
              <span className="w-2 h-2 rounded-full bg-terracotta animate-pulse" />
              Urgences 24h/24
            </span>
            <span className="hidden sm:inline">
              Appelez le {PHONE} à tout moment
            </span>
          </div>
        </div>

        {/* CTA téléphone mobile */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href={`tel:+216${PHONE_CLEAN}`}
            className="inline-flex items-center gap-2 rounded-brand bg-terracotta px-8 py-4 font-semibold text-almond hover:bg-terracotta/90 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
            </svg>
            Appeler maintenant
          </a>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-brand border-2 border-marine px-8 py-4 font-semibold text-marine hover:bg-marine hover:text-almond transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 11.5a2.5 2.5 0 1 1 0 -5a2.5 2.5 0 0 1 0 5z" />
              <path d="M12 21.5c-3.5 -3.5 -7 -7 -7 -11a7 7 0 1 1 14 0c0 4 -3.5 7.5 -7 11z" />
            </svg>
            Itinéraire
          </a>
        </div>
      </div>
    </section>
  );
}
