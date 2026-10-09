export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

type GtagEvent = {
  action: string
  category: string
  label?: string
  value?: number
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

/** Fires a GA4 event. Safe to call even if GA hasn't loaded (e.g. dev, or
 *  a visitor with an ad/tracker blocker) — it just no-ops. */
export function trackEvent({ action, category, label, value }: GtagEvent) {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  })
}

/** Call this on successful quote/contact form submission — the one event
 *  the whole site is built around, per the "qualified leads" brief. */
export function trackLeadSubmitted(serviceType?: string) {
  trackEvent({
    action: 'generate_lead',
    category: 'contact_form',
    label: serviceType || 'unspecified',
  })
}

/** Call this on a click-to-call link. */
export function trackCallClick() {
  trackEvent({ action: 'call_click', category: 'contact' })
}
