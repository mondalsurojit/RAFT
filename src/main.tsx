import './styles/globals.css'
import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './App'

// vite-react-ssg attaches a client loader to every route that, on hydration,
// fetches a hashed `static-loader-data-manifest-<hash>.json` (plus a per-route
// data file) and calls `.json()` WITHOUT checking the response. Our routes use
// no loaders (nothing calls useLoaderData — the data is always null), but if any
// of those hashed files 404s — e.g. stale HTML or a CDN edge after a redeploy,
// where the host's SPA fallback returns index.html — `.json()` parses HTML and
// throws "Unexpected token '<', "<!DOCTYPE "... is not valid JSON", white-
// screening the page (seen intermittently on deep-route reloads).
//
// Pre-seeding the manifest with {} makes the library skip the fetch entirely (it
// only fetches when this global is unset) and resolve every route's loader to
// null with zero network calls — removing the crash and two redundant requests
// per page load. Client-only; during prerender `window` is undefined.
if (typeof window !== 'undefined') {
  const w = window as unknown as Record<string, unknown>
  if (w.__VITE_REACT_SSG_STATIC_LOADER_MANIFEST__ == null) {
    w.__VITE_REACT_SSG_STATIC_LOADER_MANIFEST__ = {}
  }
}

export const createRoot = ViteReactSSG({ routes })
