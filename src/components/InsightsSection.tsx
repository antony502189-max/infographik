import { motion, useReducedMotion } from 'framer-motion'

import { IconGlyph } from '../lib/icon-map'
import type { InsightCard } from '../types/empathy'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

interface InsightsSectionProps {
  insights: InsightCard[]
}

export function InsightsSection({ insights }: InsightsSectionProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="conclusions" className="mt-16 pb-20 sm:mt-20 sm:pb-24">
      <Reveal>
        <SectionHeading
          eyebrow="Выводы и рекомендации"
          title="Три продуктовых действия, которые снижают напряжение и усиливают ценность Yandex Go"
          description="Финальный блок переводит карту эмпатии в практические рекомендации: что именно нужно менять в интерфейсе и сервисной логике, чтобы пользователь ощущал не мощь экосистемы, а ее человечность."
        />
      </Reveal>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {insights.map((insight, index) => {
          return (
            <Reveal key={insight.id} delay={index * 0.06}>
              <motion.article
                className="panel relative h-full overflow-hidden p-5 sm:p-6"
                whileHover={shouldReduceMotion ? undefined : { y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#ffd400] via-[#1c2745]/35 to-transparent" />
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff3bf] text-ink-950 shadow-[0_12px_24px_rgba(17,24,39,0.08)]">
                  <IconGlyph name={insight.icon} className="h-6 w-6" />
                </div>

                <h3 className="mt-6 text-2xl leading-tight font-extrabold tracking-[-0.04em] text-ink-950">
                  {insight.title}
                </h3>

                <div className="mt-6 space-y-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">
                      Проблема
                    </p>
                    <p className="mt-2 text-sm leading-6 text-ink-800">
                      {insight.problem}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">
                      UX-эффект
                    </p>
                    <p className="mt-2 text-sm leading-6 text-ink-800">
                      {insight.experienceImpact}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">
                      Пользовательская ценность
                    </p>
                    <p className="mt-2 text-sm leading-6 text-ink-800">
                      {insight.value}
                    </p>
                  </div>
                </div>
              </motion.article>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
