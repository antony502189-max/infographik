export type EmpathyBlockId =
  | 'audience'
  | 'jobs'
  | 'sees'
  | 'says-does'
  | 'hears'
  | 'thinks-feels'

export interface EmpathyBlock {
  id: EmpathyBlockId
  title: string
  content: string[]
  icon: string
  category: 'observation' | 'internal' | 'outcome'
}

export interface UserPersona {
  name: string
  age: number
  role: string
  location: string
  traits: string[]
}

export type PersonaId = 'anna' | 'alexander'

export interface MetricStat {
  label: string
  value: string
  note: string
}

export interface PainGainItem {
  id: string
  title: string
  description: string
  type: 'pain' | 'gain'
  icon: string
  relevantTo: PersonaId[]
}

export interface InsightCard {
  id: string
  title: string
  problem: string
  experienceImpact: string
  value: string
  icon: string
}

export interface PersonaViewModel extends UserPersona {
  id: PersonaId
  initials: string
  accent: string
  context: string
  values: string[]
  services: string[]
  primaryGoal: string
  quote: string
  focusSummary: string
}

export interface NavigationItem {
  label: string
  href: string
}

export interface PersonaSectorFocus {
  label: string
  note: string
}

export type PersonaEmpathyContent = Record<EmpathyBlockId, string[]>
