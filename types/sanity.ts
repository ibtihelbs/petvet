import type { SanityImageSource } from "@sanity/image-url";

export interface ImageWithAlt {
  asset?: SanityImageSource;
  alt?: string;
}

export interface Slug {
  current: string;
}

export interface Seo {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: ImageWithAlt;
  twitterCard?: "summary" | "summary_large_image";
  canonicalUrl?: string;
}

export interface SocialLink {
  platform?: "instagram" | "facebook" | "tiktok" | "linkedin" | "pinterest";
  url?: string;
}

export interface SiteSettings {
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  heroImage?: ImageWithAlt;
  heroPrimaryCtaLabel?: string;
  heroSecondaryCtaLabel?: string;

  businessName?: string;
  businessDescription?: string;
  logo?: ImageWithAlt;
  priceRange?: string;
  geo?: { lat: number; lng: number };
  openingHours?: string[];
  serviceAreas?: string[];

  contactPhone?: string;
  contactEmail?: string;
  address?: string;
  socialLinks?: SocialLink[];

  servicesHeading?: string;
  servicesIntro?: string;
  processHeading?: string;
  processIntro?: string;
  processCtaLabel?: string;
  processCtaLink?: string;
  projectsHeading?: string;
  projectsIntro?: string;
  projectCardViewLabel?: string;
  projectCardQuoteLabel?: string;
  testimonialsHeading?: string;
  testimonialsIntro?: string;
  benefitsHeading?: string;
  benefitsIntro?: string;
  contactHeading?: string;
  contactIntro?: string;
  contactSubmitLabel?: string;

  seo?: Seo;
}

export interface Service {
  _id: string;
  title: string;
  slug: Slug;
  image?: ImageWithAlt;
  description: string;
  order?: number;
}

export interface Project {
  _id: string;
  title: string;
  slug: Slug;
  suburb: string;
  beforeImage?: ImageWithAlt;
  afterImage?: ImageWithAlt;
  beforeDescription: string;
  afterDescription: string;
  featured?: boolean;
  completedDate?: string;
}

export interface Testimonial {
  _id: string;
  name: string;
  suburb?: string;
  quote: string;
  rating: number;
  avatar?: ImageWithAlt;
  date?: string;
}

export interface Benefit {
  _id: string;
  title: string;
  description: string;
  order?: number;
}

export interface ProcessStep {
  _id: string;
  stepNumber: number;
  title: string;
  description: string;
}

export interface PortableTextBlock {
  _type: "block";
  style?: string;
  children: { _type: "span"; text: string }[];
}

export interface Faq {
  _id: string;
  question: string;
  answer: PortableTextBlock[];
  category?: "pricing" | "process" | "services" | "general";
  order?: number;
}
