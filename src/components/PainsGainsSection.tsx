import { motion, useReducedMotion } from 'framer-motion'

import { IconGlyph } from '../lib/icon-map'
import type { PainGainItem, PersonaId } from '../types/empathy'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

interface PainsGainsSectionProps {
  activePersonaId: PersonaId
  pains: PainGainItem[]
  gains: PainGainItem[]
}

function relevanceLabel(item: PainGainItem, activePersonaId: PersonaId) {
  if (item.relevantTo.length === 2) {
    return 'Критично для обоих'
  }

  return item.relevantTo.includes(activePersonaId)
    ? 'Сильнее ощущает активная персона'
    : 'Вторичный эффект для активной персоны'
}

export function PainsGainsSection({
  activePersonaId,
  pains,
  gains,
}: PainsGainsSectionProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="mt-16 sm:mt-20">
      <Reveal>
        <SectionHeading
          eyebrow="Pains & Gains"
          title="Где экосистема ломает ожидание пользователя, а где дает ощутимую ценность"
          description="Боли и выгоды остаются общими для всей карты, но подсветка показывает, какие пункты сильнее резонируют с выбранной персоной в конкретном сценарии."
        />
      </Reveal>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <Reveal>
          <article className="panel overflow-hidden p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="kicker">Боли</p>
                <h3 className="mt-3 text-3xl font-extrabold tracking-[-0.04em] text-ink-950">
                  Что вызывает трение
                </h3>
              </div>
              <span className="inline-flex rounded-full border border-[#f1c857]/50 bg-[#fff4ca] px-4 py-2 text-sm font-semibold text-ink-900">
                Риски UX и доверия
              </span>
            </div>

            <div className="mt-6 space-y-4">
              {pains.map((item, index) => {
                const isRelevant = item.relevantTo.includes(activePersonaId)

                return (
                  <motion.article
                    key={item.id}
                    className={[
                      'rounded-[1.6rem] border p-4 transition sm:p-5',
                      isRelevant
                        ? 'border-[#1c2745]/14 bg-[#fff8db]'
                        : 'border-black/8 bg-white/70',
                    ].join(' ')}
                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.35,
                      delay: shouldReduceMotion ? 0 : index * 0.06,
                    }}
                    >
                      <div className="flex items-start gap-4">
                        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-ink-950 shadow-[0_10px_24px_rgba(17,24,39,0.08)]">
                          <IconGlyph name={item.icon} className="h-5 w-5" />
                        </span>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-lg font-bold text-ink-950">
                            {item.title}
                          </h4>
                          <span className="inline-flex rounded-full border border-black/8 bg-white/75 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-600">
                            {relevanceLabel(item, activePersonaId)}
                          </span>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-ink-800">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.article>
                )
              })}
            </div>
          </article>
        </Reveal>

        <Reveal delay={0.08}>
          <article className="panel overflow-hidden p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="kicker">Выгоды</p>
                <h3 className="mt-3 text-3xl font-extrabold tracking-[-0.04em] text-ink-950">
                  Что удерживает в экосистеме
                </h3>
              </div>
              <span className="inline-flex rounded-full border border-[#b7d0ff]/50 bg-[#eef4ff] px-4 py-2 text-sm font-semibold text-ink-900">
                Пользовательская ценность
              </span>
            </div>

            <div className="mt-6 space-y-4">
              {gains.map((item, index) => {
                const isRelevant = item.relevantTo.includes(activePersonaId)

                return (
                  <motion.article
                    key={item.id}
                    className={[
                      'rounded-[1.6rem] border p-4 transition sm:p-5',
                      isRelevant
                        ? 'border-[#1c2745]/14 bg-[#eef4ff]'
                        : 'border-black/8 bg-white/70',
                    ].join(' ')}
                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.35,
                      delay: shouldReduceMotion ? 0 : index * 0.06,
                    }}
                    >
                      <div className="flex items-start gap-4">
                        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-ink-950 shadow-[0_10px_24px_rgba(17,24,39,0.08)]">
                          <IconGlyph name={item.icon} className="h-5 w-5" />
                        </span>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-lg font-bold text-ink-950">
                            {item.title}
                          </h4>
                          <span className="inline-flex rounded-full border border-black/8 bg-white/75 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-600">
                            {relevanceLabel(item, activePersonaId)}
                          </span>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-ink-800">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.article>
                )
              })}
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
