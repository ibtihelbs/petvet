import { ContactForm } from "./ContactForm";
import type { SiteSettings } from "@/types/sanity";

export function Contact({ settings }: { settings: SiteSettings | null }) {
  return (
    <section id="contact" className="bg-wine/5">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-10">
          <h2 className="uppercase leading-none tracking-tight text-[clamp(30px,8vw,48px)] text-marine mb-4">
            {settings?.contactHeading ||
              "Let's Talk About Your Landscaping Project"}
          </h2>
          {settings?.contactIntro && (
            <p className="text-ink/70">{settings.contactIntro}</p>
          )}
        </div>
        <ContactForm settings={settings} />
      </div>
    </section>
  );
}
