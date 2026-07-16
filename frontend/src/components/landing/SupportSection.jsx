import SectionShell from './ui/SectionShell'
import UmsCard from './ui/UmsCard'
import MediaPlaceholder from './ui/MediaPlaceholder'
import {
  SUPPORT_ROLES,
  SUPPORT_HEADING,
  SUPPORT_SUB,
} from '../../data/landingContent'

export default function SupportSection() {
  return (
    <SectionShell id="support" variant="white">
      <div className="text-center mb-16">
        <h2 className="section-heading">{SUPPORT_HEADING}</h2>
        <p className="section-sub mx-auto">{SUPPORT_SUB}</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SUPPORT_ROLES.map((item) => (
          <UmsCard key={item.role} className="text-center h-full">
            <div className="w-20 h-20 mx-auto mb-4">
              <MediaPlaceholder label="Фото" aspect="1/1" circle />
            </div>
            <h3 className="font-bold text-[#111] mb-2 text-sm">{item.role}</h3>
            <p className="text-ums-muted text-xs leading-relaxed">{item.description}</p>
          </UmsCard>
        ))}
      </div>
    </SectionShell>
  )
}
