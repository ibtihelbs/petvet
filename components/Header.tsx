"use client";

import { useState } from "react";
import Image from "next/image";
import { logoFallback } from "@/lib/imageFallback";
import { urlFor } from "@/sanity/image";
import { trackCallClick } from "@/lib/gtag";
import type { SiteSettings } from "@/types/sanity";
import PhoneIcon from "./PhoneIcon";
const NAV_LINKS = [
  { label: "Accueil", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Notre clinique", href: "#benefits" },
  { label: "Contact", href: "#contact" },
];

export function Header({ settings }: { settings: SiteSettings | null }) {
  const [open, setOpen] = useState(false);
  const logoUrl =
    urlFor(settings?.logo?.asset)?.width(120).url() || logoFallback;
  const phone = settings?.contactPhone;

  return (
    <header className="sticky top-0 z-50 bg-almond/95 backdrop-blur border-b border-ink/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        <a href="#home" className="flex items-center gap-2 shrink-0">
          <Image
            src={logoUrl}
            alt={settings?.logo?.alt || "Logo PET VET"}
            width={44}
            height={44}
            className="rounded-full"
          />
          <span className="font-headline text-lg tracking-wide text-marine hidden sm:block">
            PET VET
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium uppercase tracking-wide text-ink hover:text-terracotta transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {phone && (
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              onClick={trackCallClick}
              className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-marine hover:text-terracotta transition-colors"
              aria-label={`Appeler PET VET au ${phone}`}
            >
              <PhoneIcon />
              {phone}
            </a>
          )}
          {/* <a
            href="#contact"
            className="hidden sm:inline-flex items-center rounded-brand bg-terracotta px-5 py-2.5 text-sm font-semibold text-marine hover:bg-terracotta-75 transition-colors"
          >
            Prendre rendez-vous
          </a>*/}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 -mr-2 text-ink"
            aria-expanded={open}
            aria-label="Ouvrir le menu"
          >
            <span className="sr-only">Menu</span>
            <div className="w-6 h-0.5 bg-ink mb-1.5" />
            <div className="w-6 h-0.5 bg-ink mb-1.5" />
            <div className="w-6 h-0.5 bg-ink" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-ink/10 bg-almond px-4 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium uppercase tracking-wide text-ink"
            >
              {link.label}
            </a>
          ))}
          {phone && (
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              onClick={trackCallClick}
              className="text-sm font-semibold text-marine"
            >
              <PhoneIcon />
              Appeler le {phone}
            </a>
          )}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center rounded-brand bg-terracotta px-5 py-2.5 text-sm font-semibold text-marine"
          >
            Prendre rendez-vous
          </a>
        </nav>
      )}
    </header>
  );
}
