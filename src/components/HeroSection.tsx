import { ArrowRight, Sparkles } from 'lucide-react'

import { heroContext, serviceOrbit } from '../data/empathy'
import type { MetricStat } from '../types/empathy'
import { Reveal } from './Reveal'

interface HeroSectionProps {
  metrics: MetricStat[]
}

export function HeroSection({ metrics }: HeroSectionProps) {
  return (
    <section id="preparation" className="pt-6 sm:pt-10">
      <div className="panel relative overflow-hidden px-5 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-12">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1c2745]/30 to-transparent" />
        <div className="absolute -top-24 right-[-2rem] h-56 w-56 rounded-full bg-[#ffd400]/45 blur-3xl sm:h-72 sm:w-72" />
        <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-[#dbe6ff] blur-3xl" />

        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.9fr)] lg:items-start">
          <Reveal>
            <div>
              <p className="kicker">Стратегический анализ 2024–2025</p>
              <h1 className="mt-5 max-w-4xl text-4xl leading-[1.02] font-extrabold tracking-[-0.05em] text-ink-950 sm:text-5xl lg:text-7xl">
                Карта эмпатии
                <span className="block text-[#1c2745]">экосистемы Yandex Go</span>
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-700 lg:text-xl">
                Исследование пользовательского опыта в условиях цифровой
                трансформации и перехода к модели супераппа. Фокус — понять, где
                скорость экосистемы усиливает ценность, а где перегруженность
                интерфейса ломает доверие пользователя.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#map"
                  className="inline-flex items-center gap-2 rounded-full bg-[#1c2745] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#16203a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c2745]"
                >
                  Перейти к карте
                  <ArrowRight className="h-4 w-4" />
                </a>
                <span className="inline-flex items-center rounded-full border border-black/8 bg-white/70 px-4 py-3 text-sm font-medium text-ink-700">
                  Чистый mobile-first интерфейс с минимальной когнитивной
                  нагрузкой
                </span>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {serviceOrbit.map((service) => (
                  <span
                    key={service}
                    className="inline-flex items-center rounded-full border border-black/8 bg-[#fff6cf] px-3 py-2 text-sm font-medium text-ink-800"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {metrics.map((metric) => (
                  <article
                    key={metric.label}
                    className="metric-card flex min-h-[220px] flex-col"
                  >
                    <p className="max-w-[14ch] text-[0.8125rem] leading-6 font-semibold uppercase tracking-[0.18em] text-ink-500">
                      {metric.label}
                    </p>
                    <p className="mt-4 text-4xl font-extrabold tracking-[-0.04em] text-ink-950">
                      {metric.value}
                    </p>
                    <p className="mt-auto pt-5 text-sm leading-6 text-ink-700">
                      {metric.note}
                    </p>
                  </article>
                ))}
              </div>

              <article className="panel-muted relative overflow-hidden p-5">
                <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-[#ffd400]/40 blur-2xl" />
                <div className="relative">
                  <div className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-ink-700">
                    <Sparkles className="h-4 w-4" />
                    Контекст исследования
                  </div>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-ink-700">
                    {heroContext.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#ffd400]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
