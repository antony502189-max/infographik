import { createElement } from 'react'

import {
  BadgePercent,
  BotMessageSquare,
  Brain,
  CarFront,
  ChartColumnIncreasing,
  CircleAlert,
  Eye,
  Headphones,
  Layers3,
  MapPinned,
  Menu,
  MessageSquareQuote,
  Route,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const iconRegistry: Record<string, LucideIcon> = {
  bot: BotMessageSquare,
  brain: Brain,
  car: CarFront,
  chart: ChartColumnIncreasing,
  eye: Eye,
  headphones: Headphones,
  layers: Layers3,
  loyalty: BadgePercent,
  map: MapPinned,
  menu: Menu,
  messages: MessageSquareQuote,
  price: ChartColumnIncreasing,
  route: Route,
  shield: ShieldCheck,
  smartphone: Smartphone,
  sparkles: Sparkles,
  speed: Zap,
  support: BotMessageSquare,
  users: Users,
}

interface IconGlyphProps {
  name: string
  className?: string
}

export function IconGlyph({ name, className }: IconGlyphProps) {
  return createElement(iconRegistry[name] ?? CircleAlert, {
    className,
    'aria-hidden': true,
  })
}
