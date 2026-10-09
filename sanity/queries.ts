import { sanityClient } from './client'
import type {
  SiteSettings,
  Service,
  Project,
  Testimonial,
  Benefit,
  ProcessStep,
  Faq,
} from '@/types/sanity'

// Shared fragment for the reusable imageWithAlt object
const imageFragment = `{ asset, alt }`

/**
 * Wraps a Sanity fetch so a network hiccup or misconfigured project ID
 * degrades gracefully (empty/null data + a console warning) instead of
 * crashing page rendering or the build. Components already handle
 * empty/missing data by falling back to local placeholder content.
 */
async function safeFetch<T>(query: string, fallback: T, tag: string): Promise<T> {
  try {
    return await sanityClient.fetch<T>(query, {}, { next: { revalidate: 60, tags: [tag] } })
  } catch (err) {
    console.warn(`[sanity] Failed to fetch "${tag}", using fallback. Reason:`, err instanceof Error ? err.message : err)
    return fallback
  }
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return safeFetch<SiteSettings | null>(
    `*[_type == "siteSettings"][0]{
      heroTitle,
      heroSubtitle,
      heroDescription,
      heroImage ${imageFragment},
      heroPrimaryCtaLabel,
      heroSecondaryCtaLabel,
      businessName,
      businessDescription,
      logo ${imageFragment},
      priceRange,
      geo,
      openingHours,
      serviceAreas,
      contactPhone,
      contactEmail,
      address,
      socialLinks,
      servicesHeading,
      servicesIntro,
      processHeading,
      processIntro,
      processCtaLabel,
      processCtaLink,
      projectsHeading,
      projectsIntro,
      projectCardViewLabel,
      projectCardQuoteLabel,
      testimonialsHeading,
      testimonialsIntro,
      benefitsHeading,
      benefitsIntro,
      contactHeading,
      contactIntro,
      contactSubmitLabel,
      seo
    }`,
    null,
    'siteSettings'
  )
}

export async function getServices(): Promise<Service[]> {
  return safeFetch<Service[]>(
    `*[_type == "service"] | order(order asc){
      _id, title, slug, image ${imageFragment}, description, order
    }`,
    [],
    'service'
  )
}

export async function getProjects(): Promise<Project[]> {
  return safeFetch<Project[]>(
    `*[_type == "project"] | order(completedDate desc){
      _id, title, slug, suburb,
      beforeImage ${imageFragment},
      afterImage ${imageFragment},
      beforeDescription, afterDescription, featured, completedDate
    }`,
    [],
    'project'
  )
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return safeFetch<Testimonial[]>(
    `*[_type == "testimonial"] | order(date desc){
      _id, name, suburb, quote, rating, avatar ${imageFragment}, date
    }`,
    [],
    'testimonial'
  )
}

export async function getBenefits(): Promise<Benefit[]> {
  return safeFetch<Benefit[]>(
    `*[_type == "benefit"] | order(order asc){
      _id, title, description, order
    }`,
    [],
    'benefit'
  )
}

export async function getProcessSteps(): Promise<ProcessStep[]> {
  return safeFetch<ProcessStep[]>(
    `*[_type == "processStep"] | order(stepNumber asc){
      _id, stepNumber, title, description
    }`,
    [],
    'processStep'
  )
}

export async function getFaqs(): Promise<Faq[]> {
  return safeFetch<Faq[]>(
    `*[_type == "faq"] | order(order asc){
      _id, question, answer, category, order
    }`,
    [],
    'faq'
  )
}
