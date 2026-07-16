import { CheckCircle2, Target, Users, TrendingUp, BookOpen, Headphones } from 'lucide-react'
import SectionShell from './ui/SectionShell'
import { WHY_START_NOW } from '../../data/landingContent'

const STAT_ICONS = [Users, TrendingUp, BookOpen, Headphones]

export default function WhyStartNowSection() {
  const stats = [
    { value: '100+', label: 'учеников уже с нами' },
    { value: '95%', label: 'достигают цели' },
    { value: '15+', label: 'программ обучения' },
    { value: '24/7', label: 'поддержка куратора' },
  ]

  return (
    <SectionShell variant="white">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-ums-tint border border-[#dce3ff] rounded-full text-ums-accent text-xs font-medium mb-4">
            <Target className="w-3.5 h-3.5" aria-hidden />
            Почему важно начать сейчас
          </div>
          <h2 className="section-heading">{WHY_START_NOW.headline}</h2>
          <p className="text-ums-muted leading-relaxed mb-6">{WHY_START_NOW.body}</p>
          <ul className="space-y-3">
            {WHY_START_NOW.highlights.map((item) => (
              <li key={item} className="flex items-start gap-3 text-ums-muted">
                <CheckCircle2 className="w-5 h-5 text-ums-accent shrink-0 mt-0.5" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stats.map((stat, i) => {
            const Icon = STAT_ICONS[i]
            return (
              <div key={stat.label} className="ums-stat-row flex-col sm:flex-row items-start sm:items-center">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#111]">{stat.value}</div>
                  <div className="text-xs text-ums-muted mt-1">{stat.label}</div>
                </div>
                <div className="ums-icon-chip w-10 h-10 sm:ml-auto">
                  <Icon className="w-5 h-5 text-ums-accent" aria-hidden />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </SectionShell>
  )
}
