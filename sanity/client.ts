import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  // CDN is fine for this marketing site — content doesn't need to be
  // instantly fresh, and it's faster/cheaper. Next.js's own fetch cache
  // (via revalidate tags below) handles freshness on top of this.
  useCdn: true,
})
