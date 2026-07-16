import {
  BookOpen,
  ClipboardCheck,
  FileQuestion,
  LineChart,
  PlayCircle,
  Sparkles,
  Check,
} from 'lucide-react'
import SectionShell from './ui/SectionShell'
import UmsCard from './ui/UmsCard'
import { PLATFORM_FEATURES } from '../../data/landingContent'

const ICONS = [BookOpen, Sparkles, ClipboardCheck, FileQuestion, PlayCircle, LineChart]

export default function PlatformFeaturesSection() {
  return (
    <SectionShell id="how" variant="tint">
      <div className="text-center mb-16">
        <h2 className="section-heading">Всё, что нужно для подготовки, на одной платформе</h2>
        <p className="section-sub mx-auto">
          Теория, практика, пробники и прогресс — без хаоса и лишних покупок
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PLATFORM_FEATURES.map((feature, i) => {
          const Icon = ICONS[i]
          return (
            <UmsCard key={feature.title} className="h-full">
              <div className="ums-icon-chip mb-4">
                <Icon className="w-5 h-5 text-ums-accent" aria-hidden />
              </div>
              <h3 className="font-bold text-[#111] mb-2">{feature.title}</h3>
              <p className="text-ums-muted text-sm leading-relaxed flex items-start gap-2">
                <Check className="w-4 h-4 text-ums-accent shrink-0 mt-0.5" aria-hidden />
                <span>{feature.description}</span>
              </p>
            </UmsCard>
          )
        })}
      </div>
    </SectionShell>
  )
}
