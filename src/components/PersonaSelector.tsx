import { motion, useReducedMotion } from 'framer-motion'

import type { PersonaId, PersonaViewModel } from '../types/empathy'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

interface PersonaSelectorProps {
  personas: PersonaViewModel[]
  activePersonaId: PersonaId
  onSelect: (personaId: PersonaId) => void
}

export function PersonaSelector({
  personas,
  activePersonaId,
  onSelect,
}: PersonaSelectorProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="goals" className="mt-16 sm:mt-20">
      <Reveal>
        <SectionHeading
          eyebrow="Персоны и продуктовые цели"
          title="Две фокусные аудитории внутри одного супераппа"
          description="Анна и Александр помогают увидеть, как один и тот же продукт переживается по-разному: через скорость, визуальную ясность, накопленную выгоду и контроль над городским ритмом."
        />
      </Reveal>

      <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.9fr)] lg:items-start">
        <Reveal>
          <div className="grid gap-5 lg:grid-cols-2">
            {personas.map((persona, index) => {
              const isActive = persona.id === activePersonaId

              return (
                <motion.button
                  key={persona.id}
                  type="button"
                  onClick={() => onSelect(persona.id)}
                  className={[
                    'panel text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c2745]',
                    'relative overflow-hidden p-5 sm:p-6',
                    isActive
                      ? 'border-[#1c2745]/20 ring-1 ring-[#1c2745]/15'
                      : 'hover:border-black/12 hover:bg-white',
                  ].join(' ')}
                  whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                >
                  <div
                    className={`absolute inset-x-0 top-0 h-28 bg-gradient-to-r ${persona.accent} opacity-80`}
                  />
                  <div className="relative">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-700">
                          Персона {persona.id === 'anna' ? '№1' : '№2'}
                        </p>
                        <h3 className="mt-3 text-3xl font-extrabold tracking-[-0.04em] text-ink-950">
                          {persona.name}
                        </h3>
                        <p className="mt-2 text-sm font-medium text-ink-700">
                          {persona.age} лет • {persona.role} • {persona.location}
                        </p>
                      </div>

                      <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/80 bg-white/80 text-sm font-black uppercase tracking-[0.18em] text-ink-950 shadow-[0_14px_30px_rgba(17,24,39,0.08)]">
                        {persona.initials}
                      </div>
                    </div>

                    <p className="mt-6 text-sm leading-6 text-ink-800">
                      {persona.context}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {persona.values.map((value) => (
                        <span
                          key={value}
                          className="inline-flex rounded-full border border-black/8 bg-white/75 px-3 py-1.5 text-xs font-semibold text-ink-700"
                        >
                          {value}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 rounded-[1.5rem] border border-black/8 bg-white/70 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">
                        Главная цель
                      </p>
                      <p className="mt-2 text-sm leading-6 text-ink-800">
                        {persona.primaryGoal}
                      </p>
                    </div>

                    <p className="mt-5 text-sm leading-6 text-ink-700">
                      <span className="font-semibold text-ink-950">Фокус:</span>{' '}
                      {persona.focusSummary}
                    </p>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <aside className="panel-muted p-5 sm:p-6">
            <p className="kicker">Рамка проектирования</p>
            <div className="mt-5 space-y-4">
              <article className="rounded-[1.5rem] border border-black/8 bg-white/75 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">
                  Что проектируем
                </p>
                <p className="mt-3 text-sm leading-6 text-ink-800">
                  Лендинг-аналитику, где карта эмпатии работает как инструмент
                  продукта: помогает быстро считать пользовательский контекст,
                  боли, выгоды и рекомендации для развития Yandex Go.
                </p>
              </article>
              <article className="rounded-[1.5rem] border border-black/8 bg-white/75 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">
                  Как выглядит успех
                </p>
                <p className="mt-3 text-sm leading-6 text-ink-800">
                  Пользователь сайта за 1–2 минуты понимает: для кого строится
                  экосистема, где она создает перегруз, и какие продуктовые
                  изменения имеют наибольший эффект.
                </p>
              </article>
              <article className="rounded-[1.5rem] border border-black/8 bg-[#fff3bf] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">
                  Активная персона
                </p>
                <p className="mt-3 text-sm leading-6 text-ink-800">
                  Выбор карточки меняет центральный хаб карты, приоритетные боли
                  и акценты в секторах, сохраняя общий аналитический слой
                  исследования.
                </p>
              </article>
            </div>
          </aside>
        </Reveal>
      </div>
    </section>
  )
}
