/**
 * Your current Sanity content (seeded via NDJSON) doesn't have images
 * attached yet — only text. Rather than break the layout, these maps
 * provide local placeholder images (copied from the original site)
 * keyed by slug/id, matched automatically by each component.
 *
 * WHAT TO DO ONCE REAL PHOTOS ARE IN SANITY
 * ------------------------------------------------------------
 * Nothing — components already check for a Sanity image first and only
 * fall back to these local files when one is missing. Once you upload
 * real images to the matching documents in the Studio, they'll take
 * over automatically and these fallbacks stop being used.
 *
 * THE ONE THING WORTH FLAGGING
 * ------------------------------------------------------------
 * The three project fallbacks below use the SAME single photo for both
 * beforeImage and afterImage, because that's all that exists in the
 * original assets — there's no true "before" shot for any of the three
 * transformations yet. This was flagged earlier as the highest-impact
 * fix before launch: get real before/after photo pairs for at least
 * these three projects and upload them in the Studio.
 */

export const serviceImageFallback: Record<string, string> = {
  'landscape-design': '/images/services/landscape-design.jpg',
  'garden-landscaping': '/images/services/garden-landscaping.jpg',
  'paving-outdoor-areas': '/images/services/paving-outdoor-areas.jpg',
  'retaining-walls': '/images/services/retaining-walls.jpg',
  'garden-makeovers': '/images/services/garden-makeovers.jpg',
}

export const projectImageFallback: Record<string, string> = {
  'modern-backyard-transformation': '/images/projects/modern-backyard-transformation.jpg',
  'contemporary-garden-design': '/images/projects/contemporary-garden-design.jpg',
  'complete-outdoor-transformation': '/images/projects/complete-outdoor-transformation.jpg',
}

export const testimonialAvatarFallback: Record<string, string> = {
  'Emma M.': '/images/users/user-3.png',
  'David T.': '/images/users/user-2.png',
  'Tito R.': '/images/users/user-1.png',
}

export const heroImageFallback = '/images/brand/hero.avif'
export const logoFallback = '/images/brand/logo.png'
