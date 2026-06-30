import data from '@content/data/contact.json'

/**
 * Contact details.
 *
 * Static fields (emails, address, map query) live in `content/data/contact.json`
 * so maintainers can edit them without touching code. The two integration
 * secrets below are NEVER hard-coded — they come from `.env`:
 *   - VITE_CONTACT_FORM_ENDPOINT — Google Apps Script Web App "/exec" URL that
 *     records the contact form to a Sheet and emails RAFT. Empty → mailto fallback.
 *   - VITE_GOOGLE_CLIENT_ID — optional Google OAuth Web client ID. When set with
 *     the endpoint, sending REQUIRES "Sign in with Google" (anti-spam).
 * See docs/contact-form-apps-script.md.
 */
export const contact = {
  ...data,
  formEndpoint: import.meta.env.VITE_CONTACT_FORM_ENDPOINT ?? '',
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID ?? '',
}
