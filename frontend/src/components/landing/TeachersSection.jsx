import SectionShell from './ui/SectionShell'
import UmsCard from './ui/UmsCard'
import MediaPlaceholder from './ui/MediaPlaceholder'
import { TEACHERS } from '../../data/landingContent'

export default function TeachersSection() {
  return (
    <SectionShell id="teachers" variant="white">
      <div className="text-center mb-16">
        <h2 className="section-heading">Преподаватели с опытом и харизмой</h2>
        <p className="section-sub mx-auto">
          Молодые профи, которые объясняют сложные темы простым языком и знают, где ученики теряют
          баллы
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {TEACHERS.map((t) => (
          <UmsCard key={t.name} className="text-center">
            <div className="w-24 h-24 mx-auto mb-4">
              <MediaPlaceholder label="Фото преподавателя" aspect="1/1" circle />
            </div>
            <h3 className="text-lg font-bold text-[#111] mb-1">{t.name}</h3>
            <div className="text-xs font-medium text-ums-muted mb-3">{t.role}</div>
            <p className="text-ums-muted text-sm leading-relaxed">{t.achievement}</p>
          </UmsCard>
        ))}
      </div>
    </SectionShell>
  )
}
