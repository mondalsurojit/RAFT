import { CloudRain, Cpu, Layers, type LucideIcon, Map, Network, Users, Waves } from 'lucide-react'
import { useState } from 'react'

/**
 * UfisDiagram — a self-contained, interactive, theme-matched animated SVG of the
 * Urban Flood Information System data flow. Information sources feed a flood model
 * (with a live "processing" animation) which produces forecasts/maps for end users.
 * Dots flow along each connector; node icons bob gently; hovering a node shows a popup.
 */

const C = { brand: '#43a8fd', brandLite: '#82c8ff', aqua: '#43c0b0', aquaLite: '#7cdac9' }

const INPUTS: { id: string; label: string; sub: string; y: number; icon: LucideIcon; desc: string }[] = [
  { id: 'weather', label: 'Weather', sub: 'rainfall · winds', y: 24, icon: CloudRain, desc: 'Rainfall, winds, temperature and humidity from NWP models and weather radars.' },
  { id: 'spatial', label: 'Spatial', sub: 'DEM · LULC', y: 96, icon: Layers, desc: 'Terrain (DEM), land-use/land-cover, road network and buildings.' },
  { id: 'sewer', label: 'Sewer', sub: 'drainage network', y: 168, icon: Network, desc: 'Storm-drain / sewer network and surface–sewer flow interaction.' },
  { id: 'hydro', label: 'Hydrologic', sub: 'streamflow', y: 240, icon: Waves, desc: 'Streamflow and catchment hydrology observations.' },
]

/** Tooltip anchors in viewBox coordinates (viewBox is 860 × 300). */
const META: Record<string, { cx: number; cy: number; title: string; desc: string }> = {
  ...Object.fromEntries(INPUTS.map((n) => [n.id, { cx: 109, cy: n.y + 23, title: `${n.label} information`, desc: n.desc }])),
  model: { cx: 488, cy: 160, title: 'Flood Model', desc: 'Couples the inputs to simulate and forecast rainfall, flood depth and extent.' },
  maps: { cx: 774, cy: 95, title: 'Forecasts & maps', desc: 'Flood extent, inundation-depth and zonation maps generated from the model.' },
  users: { cx: 774, cy: 225, title: 'End users', desc: 'Disaster-management & traffic teams, local authorities (GHMC, TSDPS) and the public.' },
}

function FlowDot({ path, color, begin, dur = 3 }: { path: string; color: string; begin: string; dur?: number }) {
  return (
    <circle r="4" fill={color} opacity="0.9" filter="url(#ufisGlow)">
      <animateMotion dur={`${dur}s`} begin={begin} repeatCount="indefinite" calcMode="linear">
        <mpath href={`#${path}`} />
      </animateMotion>
    </circle>
  )
}

/** A lucide icon that bobs gently in place. */
function BobIcon({ icon: Icon, x, y, color, delay = 0, size = 22 }: { icon: LucideIcon; x: number; y: number; color: string; delay?: number; size?: number }) {
  return (
    <g>
      <animateTransform
        attributeName="transform"
        type="translate"
        values="0 0; 0 -1.6; 0 0"
        dur="3.2s"
        begin={`${delay}s`}
        repeatCount="indefinite"
        calcMode="spline"
        keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
        keyTimes="0; 0.5; 1"
      />
      <Icon x={x} y={y} width={size} height={size} color={color} strokeWidth={1.8} />
    </g>
  )
}

export function UfisDiagram() {
  const [active, setActive] = useState<string | null>(null)
  const hover = (id: string) => ({
    onMouseEnter: () => setActive(id),
    onMouseLeave: () => setActive(null),
    onFocus: () => setActive(id),
    onBlur: () => setActive(null),
    tabIndex: 0,
    className: 'cursor-pointer outline-none',
  })
  const tip = active ? META[active] : null

  return (
    <div className="relative">
      <svg
        viewBox="0 0 860 300"
        className="h-auto w-full"
        role="img"
        aria-label="UFIS data flow: weather, spatial, sewer and hydrologic information feed a flood model that delivers forecasts and maps to end users."
      >
        <defs>
          <filter id="ufisGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="ufisHub" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#1888ec" />
            <stop offset="1" stopColor="#1fa496" />
          </linearGradient>
          <clipPath id="ufisHubClip">
            <rect x="360" y="110" width="256" height="100" rx="18" />
          </clipPath>
        </defs>

        {/* Connector paths + flowing dots */}
        <g fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5">
          {INPUTS.map((n, i) => (
            <path key={i} id={`ufp${i}`} d={`M194,${n.y + 23} C 290,${n.y + 23} 300,160 360,160`} />
          ))}
          <path id="ufpMaps" d="M616,160 C 662,160 668,95 700,95" />
          <path id="ufpUsers" d="M774,130 L774,190" />
        </g>
        {INPUTS.map((_, i) => (
          <FlowDot key={i} path={`ufp${i}`} color={i % 2 ? C.aquaLite : C.brandLite} begin={`${i * 0.6}s`} />
        ))}
        <FlowDot path="ufpMaps" color={C.brandLite} begin="0.3s" dur={2.4} />
        <FlowDot path="ufpUsers" color={C.aquaLite} begin="0.8s" dur={2} />

        {/* Input nodes */}
        {INPUTS.map((n, i) => {
          const tint = i % 2 ? C.aquaLite : C.brandLite
          const on = active === n.id
          return (
            <g key={n.id} {...hover(n.id)}>
              <rect
                x="24"
                y={n.y}
                width="170"
                height="46"
                rx="12"
                fill={on ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.05)'}
                stroke={i % 2 ? C.aqua : C.brand}
                strokeOpacity={on ? 0.9 : 0.5}
              />
              <BobIcon icon={n.icon} x={36} y={n.y + 12} color={tint} delay={i * 0.4} />
              <text x="68" y={n.y + 20} fill="#eef3fb" fontSize="14" fontWeight="600">{n.label}</text>
              <text x="68" y={n.y + 35} fill="rgba(255,255,255,0.5)" fontSize="10.5">{n.sub}</text>
            </g>
          )
        })}

        {/* Flood Model hub — bigger, with a live data-processing animation */}
        <g {...hover('model')}>
          <rect x="360" y="110" width="256" height="100" rx="18" fill="url(#ufisHub)" opacity={active === 'model' ? 0.28 : 0.18} />
          <rect x="360" y="110" width="256" height="100" rx="18" fill="none" stroke={C.brand} strokeOpacity="0.85" />

          {/* scanning sweep */}
          <g clipPath="url(#ufisHubClip)">
            <rect x="360" y="110" width="38" height="100" fill="url(#ufisHub)" opacity="0.25">
              <animate attributeName="x" values="360;578;360" dur="3.6s" repeatCount="indefinite" calcMode="linear" />
            </rect>
          </g>

          <BobIcon icon={Cpu} x={476} y={124} color="#ffffff" size={26} />
          <text x="488" y="172" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="700">Flood Model</text>

          {/* processing equalizer bars */}
          <g>
            {[0, 1, 2, 3, 4].map((b) => {
              const x = 452 + b * 16
              return (
                <rect key={b} x={x} y={184} width="8" height="10" rx="2" fill={b % 2 ? C.aquaLite : C.brandLite}>
                  <animate
                    attributeName="height"
                    values="6;18;9;16;6"
                    dur="1.4s"
                    begin={`${b * 0.18}s`}
                    repeatCount="indefinite"
                    calcMode="spline"
                    keyTimes="0;0.25;0.5;0.75;1"
                    keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"
                  />
                  <animate
                    attributeName="y"
                    values="196;184;193;186;196"
                    dur="1.4s"
                    begin={`${b * 0.18}s`}
                    repeatCount="indefinite"
                    calcMode="spline"
                    keyTimes="0;0.25;0.5;0.75;1"
                    keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"
                  />
                </rect>
              )
            })}
          </g>
        </g>

        {/* Output: forecasts & maps */}
        <g {...hover('maps')}>
          <rect x="700" y="60" width="148" height="70" rx="14" fill={active === 'maps' ? 'rgba(24,136,236,0.2)' : 'rgba(24,136,236,0.12)'} stroke={C.brand} strokeOpacity="0.6" />
          <BobIcon icon={Map} x={763} y={72} color={C.brandLite} delay={0.5} />
          <text x="774" y="112" textAnchor="middle" fill="#eef3fb" fontSize="12.5" fontWeight="600">Forecasts &amp; maps</text>
        </g>

        {/* End users */}
        <g {...hover('users')}>
          <rect x="700" y="190" width="148" height="70" rx="14" fill={active === 'users' ? 'rgba(31,164,150,0.2)' : 'rgba(31,164,150,0.12)'} stroke={C.aqua} strokeOpacity="0.6" />
          <BobIcon icon={Users} x={763} y={200} color={C.aquaLite} delay={1} />
          <text x="774" y="240" textAnchor="middle" fill="#eef3fb" fontSize="12.5" fontWeight="600">End users</text>
          <text x="774" y="253" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9.5">agencies · public</text>
        </g>
      </svg>

      {/* Hover popup */}
      {tip && (
        <div
          className="pointer-events-none absolute z-10 w-52 -translate-x-1/2 -translate-y-[calc(100%+12px)] rounded-xl border border-white/15 bg-ink-900/95 p-3 text-left shadow-card-hover backdrop-blur"
          style={{ left: `${(tip.cx / 860) * 100}%`, top: `${(tip.cy / 300) * 100}%` }}
        >
          <p className="text-xs font-semibold text-white">{tip.title}</p>
          <p className="mt-1 text-2xs leading-relaxed text-ink-300">{tip.desc}</p>
        </div>
      )}
    </div>
  )
}
