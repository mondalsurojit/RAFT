import { useEffect, useRef } from 'react'
import { cn } from '@/lib/cn'
import 'leaflet/dist/leaflet.css'

interface LeafletMapProps {
  lat: number
  lng: number
  zoom?: number
  /** Accessible label for the map region. */
  label?: string
  /** Show Leaflet/OSM attribution control (default true). */
  showAttribution?: boolean
  className?: string
}

/**
 * Lightweight OpenStreetMap via Leaflet. Leaflet is dynamically imported inside the
 * effect, so the module is safe to prerender (the <div> renders empty server-side and
 * the map mounts on the client). A circle marker is used to avoid Leaflet's default
 * marker-icon asset issues under bundlers.
 */
export function LeafletMap({ lat, lng, zoom = 15, label, showAttribution = true, className }: LeafletMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  // Holds the Leaflet map instance for cleanup.
  const mapRef = useRef<{ remove: () => void } | null>(null)

  useEffect(() => {
    let cancelled = false
    import('leaflet').then((mod) => {
      const L = (mod as { default?: typeof import('leaflet') }).default ?? mod
      if (cancelled || !containerRef.current || mapRef.current) return

      const map = L.map(containerRef.current, {
        center: [lat, lng],
        zoom,
        scrollWheelZoom: false,
        attributionControl: showAttribution,
      })
      mapRef.current = map

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map)

      L.circleMarker([lat, lng], {
        radius: 9,
        color: '#ffffff',
        weight: 3,
        fillColor: '#1888ec',
        fillOpacity: 1,
      }).addTo(map)

      // The container may size after layout (flex/grid) — recompute once painted.
      requestAnimationFrame(() => mapRef.current && map.invalidateSize())
    })

    return () => {
      cancelled = true
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [lat, lng, zoom, showAttribution])

  return <div ref={containerRef} role="img" aria-label={label ?? 'Map'} className={cn('h-full w-full bg-ink-100', className)} />
}
