import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { sanityClient } from './client'

const builder = imageUrlBuilder(sanityClient)

/**
 * Builds a Sanity CDN image URL. Returns null if no image asset is
 * present (e.g. content seeded from NDJSON without images yet) so
 * callers can fall back to a local placeholder image.
 */
export function urlFor(source?: SanityImageSource | null) {
  if (!source) return null
  return builder.image(source)
}
