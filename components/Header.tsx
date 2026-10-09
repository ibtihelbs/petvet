"use client";

import { useState } from "react";
import Image from "next/image";
import { logoFallback } from "@/lib/imageFallback";
import { urlFor } from "@/sanity/image";
import { trackCallClick } from "@/lib/gtag";
import type { SiteSettings } from "@/types/sanity";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#projects" },
  { label: "Why Choose Us", href: "#benefits" },
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
            alt={settings?.logo?.alt || "PetVet logo"}
            width={44}
            height={44}
            className="rounded-full"
          />
          <span className="font-headline text-lg tracking-wide text-marine hidden sm:block">
            PetVet
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
              className="hidden  sm:inline-flex items-center gap-2 text-sm font-semibold text-marine hover:text-terracotta transition-colors"
              aria-label={`Call PetVet at ${phone}`}
            >
              <Image
                src="/images/phone.png"
                alt="Phone"
                width={20}
                height={20}
              />
              {phone}
            </a>
          )}
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center rounded-brand bg-terracotta px-5 py-2.5 text-sm font-semibold text-marine hover:bg-terracotta-75 transition-colors"
          >
            Get A Free Quote
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 -mr-2 text-ink"
            aria-expanded={open}
            aria-label="Toggle menu"
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
              📞 Call {phone}
            </a>
          )}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center rounded-brand bg-terracotta px-5 py-2.5 text-sm font-semibold text-marine"
          >
            Get A Free Quote
          </a>
        </nav>
      )}
    </header>
  );
}
