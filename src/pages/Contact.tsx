import { AlertCircle, CheckCircle2, Mail, MapPin, Navigation, Send, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { GoogleSignIn, type GoogleProfile } from '@/components/fx/GoogleSignIn'
import { LeafletMap } from '@/components/fx/LeafletMap'
import { Seo } from '@/components/layout/Seo'
import { PageHeader } from '@/components/sections/PageHeader'
import { Button } from '@/components/ui/Button'
import { IconBadge } from '@/components/ui/IconBadge'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SmartLink } from '@/components/ui/SmartLink'
import { contact, lead } from '@/content'
import { breadcrumbLd } from '@/lib/seo'

const inputClass =
  'w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm text-ink-900 shadow-soft transition-colors placeholder:text-ink-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30'

const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.mapQuery)}`

/** IIT Hyderabad (Kandi campus) — used for the map marker. */
const IITH = { lat: 17.5919, lng: 78.1226 }

const endpointReady = Boolean(contact.formEndpoint)
const signinReady = Boolean(contact.googleClientId)
/** Endpoint + client ID → sending requires a verified Google sign-in. */
const verifiedMode = endpointReady && signinReady
/** Endpoint only → anyone can send (anonymous POST). */
const anonymousMode = endpointReady && !signinReady

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', org: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')
  const [auth, setAuth] = useState<{ idToken: string; profile: GoogleProfile } | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    // no-cors: Apps Script records to the Sheet and emails RAFT. The response is
    // opaque, so we confirm optimistically — the Sheet + email are the source of truth.
    async function post(payload: Record<string, unknown>) {
      setStatus('sending')
      try {
        await fetch(contact.formEndpoint, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({ ...payload, source: 'raft-website' }),
        })
        setStatus('sent')
        setForm({ name: '', email: '', org: '', message: '' })
      } catch {
        setStatus('error')
      }
    }

    if (verifiedMode) {
      if (!auth) return // Send is gated behind sign-in; nothing to do.
      await post({ idToken: auth.idToken, org: form.org, message: form.message })
      return
    }

    if (anonymousMode) {
      await post({ name: form.name, email: form.email, org: form.org, message: form.message })
      return
    }

    // Fallback (endpoint not configured yet): open the visitor's mail client.
    const subject = `RAFT enquiry from ${form.name || 'website visitor'}`
    const body = `Name: ${form.name}\nEmail: ${form.email}\nOrganisation: ${form.org}\n\n${form.message}`
    window.location.href = `mailto:${contact.lead}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const set =
    (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [k]: e.target.value }))
      if (status === 'sent' || status === 'error') setStatus('idle')
    }

  return (
    <>
      <Seo
        title="Contact"
        description="Get in touch with RAFT, IIT Hyderabad — for research collaborations, partnerships, student opportunities and media."
        path="/contact"
        jsonLd={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />
      <PageHeader
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
        kicker="Contact"
        title="Let’s talk"
        description="Whether it’s research, partnership, a student opportunity or media — we’d love to hear from you."
      />

      <Section>
        <div className="grid gap-5 lg:grid-cols-2 lg:items-stretch">
          {/* Email + map (with the address as a glass overlay) */}
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-ink-200/70 bg-white p-5 shadow-soft">
              <div className="flex items-center gap-3">
                <IconBadge icon={Mail} tone="brand" size="sm" />
                <p className="text-sm font-semibold text-ink-900">Email us</p>
              </div>
              <div className="mt-3 space-y-1.5 text-sm">
                <p className="flex flex-wrap items-center gap-x-2">
                  <SmartLink to={`mailto:${lead.email}`} className="font-medium text-brand-700 hover:text-brand-800">
                    {lead.email}
                  </SmartLink>
                  <span className="text-xs text-ink-400">Group lead</span>
                </p>
                <p className="flex flex-wrap items-center gap-x-2">
                  <SmartLink to={`mailto:${contact.snapflood}`} className="font-medium text-brand-700 hover:text-brand-800">
                    {contact.snapflood}
                  </SmartLink>
                  <span className="text-xs text-ink-400">SnapFlood</span>
                </p>
              </div>
            </div>

            {/* Map with floating address card */}
            <div className="relative min-h-[340px] flex-1 overflow-hidden rounded-2xl border border-ink-200/70 shadow-soft">
              <LeafletMap
                lat={IITH.lat}
                lng={IITH.lng}
                zoom={14}
                showAttribution={false}
                label="RAFT · IIT Hyderabad, Kandi campus"
                className="absolute inset-0 h-full w-full"
              />
              <div className="absolute inset-x-3 bottom-3 z-[1000]">
                <div className="flex flex-col gap-2.5 rounded-xl border border-white/70 bg-white/85 p-3.5 shadow-card backdrop-blur-md sm:flex-row sm:items-center sm:gap-3">
                  <div className="flex min-w-0 items-start gap-3 sm:items-center">
                    <IconBadge icon={MapPin} tone="aqua" size="sm" />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-ink-900">RAFT · IIT Hyderabad</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-ink-600">
                        {contact.address.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                  <SmartLink
                    to={mapUrl}
                    className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-brand-700 hover:text-brand-800 sm:ml-auto"
                  >
                    <Navigation className="h-3 w-3" />
                    Open in Google Maps
                  </SmartLink>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <Reveal className="h-full">
            <form
              onSubmit={handleSubmit}
              className="flex h-full flex-col rounded-2xl border border-ink-200/70 bg-white p-6 shadow-card"
            >
              <h2 className="text-lg font-bold text-ink-900">Send a message</h2>
              <p className="mt-1 text-sm text-ink-500">We’ll get back to you as soon as we can.</p>

              {/* Name + email — only when sign-in isn't configured (mailto fallback). */}
              {!verifiedMode && (
                <div className="mt-5 grid gap-3.5 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium text-ink-700">Name</span>
                    <input className={inputClass} value={form.name} onChange={set('name')} placeholder="Your name" required />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium text-ink-700">Email</span>
                    <input className={inputClass} type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" required />
                  </label>
                </div>
              )}

              <label className="mt-3.5 block">
                <span className="mb-1.5 block text-sm font-medium text-ink-700">Organisation</span>
                <input className={inputClass} value={form.org} onChange={set('org')} placeholder="Institution / company (optional)" />
              </label>
              <label className="mt-3.5 flex flex-1 flex-col">
                <span className="mb-1.5 block text-sm font-medium text-ink-700">Message</span>
                <textarea
                  className={`${inputClass} min-h-[130px] flex-1 resize-y`}
                  value={form.message}
                  onChange={set('message')}
                  placeholder="How can we help?"
                  required
                />
              </label>

              {/* Verified sign-in (required) vs. mailto fallback */}
              {verifiedMode && !auth ? (
                <div className="mt-5 rounded-xl border border-ink-200/70 bg-ink-50/70 p-4">
                  <p className="flex items-center gap-2 text-sm font-medium text-ink-800">
                    <ShieldCheck className="h-4 w-4 text-brand-600" />
                    Sign in with Google to send
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-ink-500">
                    A quick sign-in keeps this form spam-free and lets us verify who’s reaching out. We only receive your
                    name and email.
                  </p>
                  <GoogleSignIn
                    clientId={contact.googleClientId}
                    onSignIn={(idToken, profile) => {
                      setAuth({ idToken, profile })
                      if (status === 'error') setStatus('idle')
                    }}
                    className="mt-3 min-h-[44px] [color-scheme:light]"
                  />
                </div>
              ) : (
                <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                  {verifiedMode && auth && (
                    <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-aqua-200 bg-aqua-50 px-3 py-1.5 text-xs font-medium text-aqua-800">
                      <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">
                        Verified as {auth.profile.name || auth.profile.email}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setAuth(null)
                          setStatus('idle')
                        }}
                        className="font-semibold text-aqua-700 underline-offset-2 hover:underline"
                      >
                        Not you?
                      </button>
                    </span>
                  )}
                  <Button type="submit" disabled={status === 'sending'}>
                    <Send className="h-4 w-4" />
                    {status === 'sending' ? 'Sending…' : 'Send message'}
                  </Button>
                  {status === 'sent' && (
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-aqua-700">
                      <CheckCircle2 className="h-4 w-4" />
                      Thanks — your message has been sent.
                    </span>
                  )}
                  {status === 'error' && (
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-signal-700">
                      <AlertCircle className="h-4 w-4" />
                      Couldn’t send — please email us directly.
                    </span>
                  )}
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
