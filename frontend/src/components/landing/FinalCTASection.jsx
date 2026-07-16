import LeadForm from './LeadForm'
import SectionShell from './ui/SectionShell'
import UmsCard from './ui/UmsCard'
import MediaPlaceholder from './ui/MediaPlaceholder'

export default function FinalCTASection() {
  return (
    <SectionShell id="lead-form" variant="tint">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="section-heading">Оставь заявку на бесплатную консультацию</h2>
          <p className="text-ums-muted leading-relaxed mb-6">
            Расскажем об условиях обучения, подберём программу и ответим на все вопросы. Без
            обязательств — просто познакомимся.
          </p>
          <ul className="space-y-3 text-ums-muted text-sm mb-8">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-ums-accent" />
              Уроки в удобное время
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-ums-accent" />
              Полный доступ ко всем материалам
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-ums-accent" />
              Поддержка куратора
            </li>
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
