import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

import { IconGlyph } from '../lib/icon-map'
import type {
  EmpathyBlock,
  PersonaSectorFocus,
  PersonaViewModel,
} from '../types/empathy'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

interface EmpathyMapProps {
  blocks: EmpathyBlock[]
  activeBlockId: string
  onBlockChange: (blockId: string) => void
  persona: PersonaViewModel
  focus: Record<string, PersonaSectorFocus>
}

const desktopGridPosition: Record<string, string> = {
  audience: 'lg:col-start-1 lg:row-start-1',
  jobs: 'lg:col-start-2 lg:row-start-1',
  sees: 'lg:col-start-3 lg:row-start-1',
  'says-does': 'lg:col-start-1 lg:row-start-2',
  hears: 'lg:col-start-3 lg:row-start-2',
  'thinks-feels': 'lg:col-start-1 lg:col-span-3 lg:row-start-3',
}

const categoryTone: Record<EmpathyBlock['category'], string> = {
  observation: 'border-black/8 bg-white/90',
  internal: 'border-[#f1c857]/50 bg-[#fff5d1]',
  outcome: 'border-[#9cc4ff]/60 bg-[#eef4ff]',
}

interface SectorCardProps {
  block: EmpathyBlock
  isActive: boolean
  onSelect: (blockId: string) => void
  focusItem: PersonaSectorFocus
  personaId: string
  desktop?: boolean
}

function SectorCard({
  block,
  isActive,
  onSelect,
  focusItem,
  personaId,
  desktop = false,
}: SectorCardProps) {
  const shouldReduceMotion = useReducedMotion()
  const detailsId = `${personaId}-${block.id}-details`
  const preview = block.content.slice(0, 2)

  return (
    <motion.button
      type="button"
      aria-expanded={isActive}
      aria-controls={detailsId}
      onClick={() => onSelect(block.id)}
      className={[
        'panel-muted relative w-full overflow-hidden text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c2745]',
        'p-4 sm:p-5',
        categoryTone[block.category],
        isActive
          ? 'ring-1 ring-[#1c2745]/15 shadow-[0_18px_40px_rgba(17,24,39,0.12)]'
          : 'hover:-translate-y-0.5 hover:border-black/12',
      ].join(' ')}
      whileHover={
        shouldReduceMotion || isActive ? undefined : { y: desktop ? -4 : -2 }
      }
      transition={{ duration: 0.2 }}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#ffd400] via-[#ffe788] to-transparent" />

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/80 text-ink-950 shadow-[0_10px_24px_rgba(17,24,39,0.08)]">
            <IconGlyph name={block.icon} className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
              Сектор
            </p>
            <h3 className="mt-2 text-lg leading-tight font-bold text-ink-950">
              {block.title}
            </h3>
          </div>
        </div>
        <span className="inline-flex rounded-full border border-black/8 bg-white/75 px-3 py-1 text-xs font-semibold text-ink-600">
          {isActive ? 'Активен' : 'Открыть'}
        </span>
      </div>

      <div className="mt-4 rounded-[1.25rem] border border-black/8 bg-white/75 p-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-500">
          {focusItem.label}
        </p>
        <p className="mt-2 text-sm leading-6 text-ink-800">{focusItem.note}</p>
      </div>

      <div className="mt-4 space-y-3 text-sm leading-6 text-ink-800">
        {preview.map((item) => (
          <div key={item} className="flex gap-3">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#ffd400]" />
            <span>{item}</span>
          </div>
        ))}
      </div>

      <AnimatePresence initial={false}>
        {isActive ? (
          <motion.div
            id={detailsId}
            initial={
              shouldReduceMotion ? { opacity: 1 } : { height: 0, opacity: 0 }
            }
            animate={
              shouldReduceMotion
                ? { opacity: 1 }
                : { height: 'auto', opacity: 1, marginTop: 16 }
            }
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { height: 0, opacity: 0, marginTop: 0 }
            }
            transition={{
              duration: shouldReduceMotion ? 0 : 0.28,
              ease: 'easeOut',
            }}
            className="overflow-hidden"
          >
            <div className="rounded-[1.5rem] border border-dashed border-black/10 bg-white/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">
                Детализация сектора
              </p>
              <div className="mt-3 space-y-3 text-sm leading-6 text-ink-800">
                {block.content.map((item) => (
                  <div key={item} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#1c2745]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.button>
  )
}

export function EmpathyMap({
  blocks,
  activeBlockId,
  onBlockChange,
  persona,
  focus,
}: EmpathyMapProps) {
  return (
    <section id="map" className="mt-16 sm:mt-20">
      <Reveal>
        <SectionHeading
          eyebrow="Карта эмпатии"
          title="Главная схема: что видит, слышит и переживает пользователь"
          description="Карта собрана как интерактивная диаграмма. На десктопе это почти схема с центральным хабом и секторами вокруг, на мобильном — последовательный аккордеон без потери логики."
        />
      </Reveal>

      <div className="mt-8 panel overflow-hidden px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <div className="flex flex-col gap-4 rounded-[1.6rem] border border-black/8 bg-[#fffaf0] p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">
              Активная линза анализа
            </p>
            <h3 className="mt-2 text-2xl font-extrabold tracking-[-0.04em] text-ink-950">
              {persona.name}
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-700">
              {persona.quote}
            </p>
          </div>
          <div className="inline-flex items-center rounded-full border border-black/8 bg-white/75 px-4 py-3 text-sm font-medium text-ink-700">
            Один активный сектор = один читаемый инсайт
          </div>
        </div>

        <div className="mt-6 space-y-4 lg:hidden">
          <CentralPersonaCard persona={persona} />
          {blocks.map((block) => (
            <SectorCard
              key={block.id}
              block={block}
              isActive={activeBlockId === block.id}
              onSelect={onBlockChange}
              focusItem={focus[block.id]}
              personaId={persona.id}
            />
          ))}
        </div>

        <div className="relative hidden min-h-[70rem] gap-5 lg:grid lg:grid-cols-3 lg:grid-rows-[minmax(240px,1fr)_minmax(300px,1.15fr)_minmax(240px,auto)]">
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 1200 1080"
            preserveAspectRatio="none"
          >
            <rect
              x="18"
              y="18"
              width="1164"
              height="1044"
              rx="40"
              className="map-outline"
            />
            <line x1="600" y1="430" x2="220" y2="180" className="map-line" />
            <line x1="600" y1="430" x2="600" y2="150" className="map-line" />
            <line x1="600" y1="430" x2="980" y2="180" className="map-line" />
            <line x1="600" y1="430" x2="210" y2="520" className="map-line" />
            <line x1="600" y1="430" x2="990" y2="520" className="map-line" />
            <line x1="600" y1="430" x2="600" y2="880" className="map-line" />
            <circle cx="600" cy="430" r="76" className="map-core-ring" />
          </svg>

          {blocks.map((block) => (
            <div key={block.id} className={desktopGridPosition[block.id]}>
              <SectorCard
                block={block}
                isActive={activeBlockId === block.id}
                onSelect={onBlockChange}
                focusItem={focus[block.id]}
                personaId={persona.id}
                desktop
              />
            </div>
          ))}

          <div className="lg:col-start-2 lg:row-start-2 lg:self-center">
            <CentralPersonaCard persona={persona} desktop />
          </div>
        </div>
      </div>
    </section>
  )
}

interface CentralPersonaCardProps {
  persona: PersonaViewModel
  desktop?: boolean
}

function CentralPersonaCard({
  persona,
  desktop = false,
}: CentralPersonaCardProps) {
  return (
    <motion.article
      layout
      className={[
        'panel relative overflow-hidden border-black/12 bg-[#fbfcff]/95 p-5 text-left sm:p-6',
        desktop ? 'lg:min-h-[320px]' : '',
      ].join(' ')}
      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
    >
      <div
        className={`absolute inset-x-0 top-0 h-36 bg-gradient-to-r ${persona.accent} opacity-70`}
      />
      <div className="relative">
        <p className="kicker">Центральный хаб</p>
        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-3xl font-extrabold tracking-[-0.04em] text-ink-950">
              {persona.name}
            </h3>
            <p className="mt-2 text-sm font-medium text-ink-700">
              {persona.role} • {persona.age} лет • {persona.location}
            </p>
          </div>

          <div className="inline-flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-[1.75rem] border border-white/90 bg-white/90 px-4 text-base font-black uppercase tracking-[0.18em] text-ink-950 shadow-[0_18px_35px_rgba(17,24,39,0.12)]">
            {persona.initials}
          </div>
        </div>

        <div className="mt-6 rounded-[1.6rem] border border-black/8 bg-white/80 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">
            Ключевая цель
          </p>
          <p className="mt-3 text-sm leading-6 text-ink-800">
            {persona.primaryGoal}
          </p>
        </div>

        <p className="mt-5 text-sm leading-6 text-ink-700">{persona.context}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {persona.services.map((service) => (
            <span
              key={service}
              className="inline-flex rounded-full border border-black/8 bg-[#fff3bf] px-3 py-1.5 text-xs font-semibold text-ink-800"
            >
              {service}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  )
}
