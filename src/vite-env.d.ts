/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Google Apps Script Web App `/exec` URL for the contact form (empty = mailto fallback). */
  readonly VITE_CONTACT_FORM_ENDPOINT?: string
  /** Google OAuth Web client ID — when set, the contact form requires sign-in. */
  readonly VITE_GOOGLE_CLIENT_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
