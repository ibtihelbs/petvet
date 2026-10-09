import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { Projects } from "@/components/Projects";
import { Testimonials } from "@/components/Testimonials";
import { Benefits } from "@/components/Benefits";
import { Faqs } from "@/components/Faqs";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import {
  getSiteSettings,
  getServices,
  getProjects,
  getTestimonials,
  getBenefits,
  getProcessSteps,
  getFaqs,
} from "@/sanity/queries";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "";

export default async function HomePage() {
  const [
    settings,
    services,
    projects,
    testimonials,
    benefits,
    processSteps,
    faqs,
  ] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getProjects(),
    getTestimonials(),
    getBenefits(),
    getProcessSteps(),
    getFaqs(),
  ]);

  return (
    <>
      <JsonLd settings={settings} faqs={faqs} siteUrl={SITE_URL} />
      <Header settings={settings} />
      <main>
        <Hero settings={settings} />
        <Services services={services} settings={settings} />
        <Process steps={processSteps} settings={settings} />
        <Projects projects={projects} settings={settings} />
        <Testimonials testimonials={testimonials} settings={settings} />
        <Benefits benefits={benefits} settings={settings} />
        <Faqs faqs={faqs} />
        <Contact settings={settings} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
