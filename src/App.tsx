import { useState } from 'react'

import { EmpathyMap } from './components/EmpathyMap'
import { Header } from './components/Header'
import { HeroSection } from './components/HeroSection'
import { InsightsSection } from './components/InsightsSection'
import { PainsGainsSection } from './components/PainsGainsSection'
import { PersonaSelector } from './components/PersonaSelector'
import { Reveal } from './components/Reveal'
import { IconGlyph } from './lib/icon-map'
import {
  empathyBlocks,
  experiencePrinciples,
  gainItems,
  insightCards,
  metricStats,
  navigationItems,
  painItems,
  personaFocus,
  personas,
  studyGoals,
} from './data/empathy'
import type { PersonaId } from './types/empathy'

function App() {
  const [activePersonaId, setActivePersonaId] = useState<PersonaId>('anna')
  const [activeBlockId, setActiveBlockId] = useState('jobs')
  const activePersona = personas[activePersonaId]

  return (
    <>
      <Header items={navigationItems} />

      <main className="shell">
        <HeroSection metrics={metricStats} />

        <PersonaSelector
          personas={Object.values(personas)}
          activePersonaId={activePersonaId}
          onSelect={setActivePersonaId}
        />

        <section className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.9fr)] lg:items-start">
          <Reveal>
            <div className="panel overflow-hidden p-5 sm:p-6">
              <p className="kicker">Цели анализа</p>
              <div className="mt-6 grid gap-4">
                {studyGoals.map((goal) => {
                  return (
                    <article
                      key={goal.title}
                      className="rounded-[1.6rem] border border-black/8 bg-white/75 p-4 sm:p-5"
                    >
                      <div className="flex items-start gap-4">
                        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#fff3bf] text-ink-950 shadow-[0_10px_24px_rgba(17,24,39,0.08)]">
                          <IconGlyph name={goal.icon} className="h-5 w-5" />
                        </span>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-3">
                            <h3 className="text-lg font-bold text-ink-950">
                              {goal.title}
                            </h3>
                            <span className="inline-flex rounded-full border border-black/8 bg-[#eef4ff] px-3 py-1 text-xs font-semibold text-ink-800">
                              {goal.value}
                            </span>
                          </div>
                          <p className="mt-3 text-sm leading-6 text-ink-800">
                            {goal.description}
                          </p>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <aside className="panel-muted p-5 sm:p-6">
              <p className="kicker">Дизайн-принципы</p>
              <div className="mt-6 space-y-4">
                {experiencePrinciples.map((principle) => (
                  <article
                    key={principle.title}
                    className="rounded-[1.6rem] border border-black/8 bg-white/75 p-4"
                  >
                    <h3 className="text-lg font-bold text-ink-950">
                      {principle.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-ink-800">
                      {principle.description}
                    </p>
                  </article>
                ))}
              </div>
            </aside>
          </Reveal>
        </section>

        <EmpathyMap
          blocks={empathyBlocks}
          activeBlockId={activeBlockId}
          onBlockChange={setActiveBlockId}
          persona={activePersona}
          focus={personaFocus[activePersonaId]}
        />

        <PainsGainsSection
          activePersonaId={activePersonaId}
          pains={painItems}
          gains={gainItems}
        />

        <InsightsSection insights={insightCards} />
      </main>
    </>
  )
}

export default App
