import LeadForm from './LeadForm'
import SectionShell from './ui/SectionShell'
import UmsCard from './ui/UmsCard'
import MediaPlaceholder from './ui/MediaPlaceholder'
import { FINAL_CTA } from '../../data/landingContent'

export default function FinalCTASection() {
  return (
    <SectionShell id="lead-form" variant="tint">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="section-heading">{FINAL_CTA.heading}</h2>
          <p className="text-ums-muted leading-relaxed mb-6">{FINAL_CTA.body}</p>
          <ul className="space-y-3 text-ums-muted text-sm mb-8">
            {FINAL_CTA.bullets.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-ums-accent" />
                {item}
              </li>
            ))}
          </ul>
          <div className="hidden lg:block">
            <MediaPlaceholder label="Фото учеников" aspect="4/3" />
          </div>
        </div>

        <UmsCard padding="lg" hover={false}>
          <LeadForm variant="inline" id="final-lead-form" />
        </UmsCard>
      </div>
    </SectionShell>
  )
}
