import { motion, useReducedMotion } from 'framer-motion'

import { IconGlyph } from '../lib/icon-map'
import type { NavigationItem } from '../types/empathy'

interface HeaderProps {
  items: NavigationItem[]
}

export function Header({ items }: HeaderProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.header
      className="sticky top-0 z-50 border-b border-black/5 bg-[rgba(251,247,239,0.88)] backdrop-blur-xl"
      initial={{ y: shouldReduceMotion ? 0 : -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4 }}
    >
      <div className="shell flex items-center justify-between gap-4 py-4">
        <a
          href="#preparation"
          className="inline-flex items-center gap-3 rounded-full border border-black/8 bg-white/80 px-3 py-2 text-sm font-semibold text-ink-950 shadow-[0_8px_30px_rgba(16,24,40,0.08)]"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#ffd400] text-xs font-black uppercase tracking-[0.16em]">
            Go
          </span>
          <span className="hidden sm:inline">Yandex Go Empathy Map</span>
          <span className="sm:hidden">Empathy Map</span>
        </a>

        <nav
          aria-label="Навигация по разделам"
          className="hidden items-center gap-2 rounded-full border border-black/8 bg-white/60 p-1 md:flex"
        >
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-ink-700 transition hover:bg-[#fff1b0] hover:text-ink-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c2745]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-white/70 px-3 py-2 text-sm font-medium text-ink-700 md:hidden">
          <IconGlyph name="menu" className="h-4 w-4" />
          Секции
        </div>
      </div>
    </motion.header>
  )
}
