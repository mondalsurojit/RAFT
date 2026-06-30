import { useEffect, useRef } from 'react'

const GSI_SRC = 'https://accounts.google.com/gsi/client'

export interface GoogleProfile {
  email: string
  name: string
  picture?: string
}

interface GoogleSignInProps {
  clientId: string
  /** Called with the signed ID token (JWT) and decoded profile after sign-in. */
  onSignIn: (idToken: string, profile: GoogleProfile) => void
  className?: string
}

/** Minimal shape of the bits of Google Identity Services we use. */
interface GsiId {
  initialize(config: { client_id: string; callback: (res: { credential: string }) => void }): void
  renderButton(parent: HTMLElement, options: Record<string, unknown>): void
}

function getGsi(): GsiId | undefined {
  return (window as unknown as { google?: { accounts?: { id?: GsiId } } }).google?.accounts?.id
}

/**
 * Decode a JWT payload (no verification — the Apps Script backend verifies the
 * token with Google). Used only to display "signed in as …" in the UI.
 */
function decodeJwt(token: string): GoogleProfile | null {
  try {
    const part = token.split('.')[1]
    const base64 = part.replace(/-/g, '+').replace(/_/g, '/')
    const binary = atob(base64)
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0))
    const json = JSON.parse(new TextDecoder().decode(bytes)) as {
      email?: string
      name?: string
      picture?: string
    }
    return { email: json.email ?? '', name: json.name ?? '', picture: json.picture }
  } catch {
    return null
  }
}

/**
 * "Sign in with Google" button (Google Identity Services). The GSI script is
 * loaded dynamically so the component is safe to prerender — server-side it
 * renders an empty <div> and the real button mounts on the client.
 */
export function GoogleSignIn({ clientId, onSignIn, className }: GoogleSignInProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  // Keep the latest callback without re-running the effect.
  const onSignInRef = useRef(onSignIn)
  onSignInRef.current = onSignIn

  useEffect(() => {
    let cancelled = false

    function render() {
      const id = getGsi()
      const el = containerRef.current
      if (!id || !el || cancelled) return
      id.initialize({
        client_id: clientId,
        callback: (res) => {
          const profile = decodeJwt(res.credential)
          if (profile) onSignInRef.current(res.credential, profile)
        },
      })
      id.renderButton(el, {
        type: 'standard',
        theme: 'outline',
        size: 'large',
        text: 'signin_with',
        shape: 'pill',
        logo_alignment: 'left',
      })
    }

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${GSI_SRC}"]`)
    if (existing) {
      if (getGsi()) render()
      else existing.addEventListener('load', render)
    } else {
      const script = document.createElement('script')
      script.src = GSI_SRC
      script.async = true
      script.defer = true
      script.addEventListener('load', render)
      document.head.appendChild(script)
    }

    return () => {
      cancelled = true
    }
  }, [clientId])

  return <div ref={containerRef} className={className} />
}
