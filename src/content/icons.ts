import {
  Activity,
  Apple,
  Banknote,
  Beaker,
  Bell,
  BrainCircuit,
  Building2,
  Camera,
  CloudRain,
  Database,
  Droplets,
  FileText,
  Gauge,
  Globe,
  GraduationCap,
  HandHeart,
  Handshake,
  IdCard,
  Landmark,
  Leaf,
  Library,
  Link,
  type LucideIcon,
  Map,
  MapPin,
  Microscope,
  Network,
  Radar,
  Rocket,
  Satellite,
  Share2,
  Smartphone,
  Target,
  User,
  Waves,
} from 'lucide-react'

/**
 * Icon registry.
 *
 * Content lives in `content/data/*.json`, so icons are referenced there by NAME
 * (a string such as `"Camera"`). This map resolves those names back to their
 * Lucide components at load time. To use a new icon in the content JSON, import
 * it here and add it to the map below — that's the only code change required.
 */
export const iconMap = {
  Activity,
  Apple,
  Banknote,
  Beaker,
  Bell,
  BrainCircuit,
  Building2,
  Camera,
  CloudRain,
  Database,
  Droplets,
  FileText,
  Gauge,
  Globe,
  GraduationCap,
  HandHeart,
  Handshake,
  IdCard,
  Landmark,
  Leaf,
  Library,
  Link,
  Map,
  MapPin,
  Microscope,
  Network,
  Radar,
  Rocket,
  Satellite,
  Share2,
  Smartphone,
  Target,
  User,
  Waves,
} satisfies Record<string, LucideIcon>

export type IconName = keyof typeof iconMap

/**
 * Resolve an icon name (from content JSON) to its Lucide component.
 * Falls back to a neutral icon if the name is unknown, so a content typo never
 * breaks the build — it just renders a generic glyph.
 */
export function icon(name: string): LucideIcon {
  return (iconMap as Record<string, LucideIcon>)[name] ?? Activity
}
