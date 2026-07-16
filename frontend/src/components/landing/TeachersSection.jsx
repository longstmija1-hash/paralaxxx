'use client'

import SectionShell from './ui/SectionShell'
import RevealOnScroll from './ui/RevealOnScroll'
import WaveAccent from './ui/WaveAccent'
import {
  TEACHERS,
  TEACHERS_EYEBROW,
  TEACHERS_SUB,
} from '../../data/landingContent'

export default function TeachersSection() {
  return (
    <SectionShell id="teachers" variant="white" className="overflow-hidden">
      <RevealOnScroll>
        <div className="relative mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <div
            className="pointer-events-none absolute -left-8 top-2 hidden h-24 w-24 rotate-12 rounded-2xl border border-dashed border-ums-accent/25 sm:block"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -right-6 bottom-0 hidden h-16 w-16 -rotate-6 rounded-full border border-ums-coral/25 sm:block"
            aria-hidden="true"
          />

          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-ums-accent">
            {TEACHERS_EYEBROW}
          </p>
          <h2 className="section-heading">
            Учитесь у <WaveAccent variant="double">профи</WaveAccent>, а не у случайных студентов
          </h2>
          <p className="section-sub mx-auto">{TEACHERS_SUB}</p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="teacher-ribbon teacher-ribbon--accent">Два основателя</span>
            <span className="teacher-ribbon teacher-ribbon--coral">Два трека</span>
            <span className="teacher-ribbon teacher-ribbon--ink">Одна школа</span>
          </div>
        </div>

        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2 md:gap-7">
          {TEACHERS.map((t, i) => (
              <article
                key={t.name}
                className="teacher-card group relative overflow-hidden rounded-[22px] sm:rounded-[28px] border border-[#dce3ff] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-colors duration-200 hover:border-ums-accent/40"
              >
              <div
                className={`absolute inset-x-0 top-0 h-1.5 ${
                  i === 0
                    ? 'bg-gradient-to-r from-ums-accent via-[#9aa8f9] to-ums-tint'
                    : 'bg-gradient-to-r from-ums-coral via-[#ff8f82] to-[#ffe8e4]'
                }`}
                aria-hidden="true"
              />

              <div
                className="pointer-events-none absolute -right-8 top-10 h-28 w-40 rotate-[-18deg] opacity-[0.07]"
                aria-hidden="true"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(-45deg, #111 0 2px, transparent 2px 10px)',
                }}
              />

              <div className="relative z-[1] p-5 sm:p-7">
                <div className="mb-4 sm:mb-5 flex items-start gap-3 sm:gap-4">
                  <div className="relative shrink-0">
                    <div
                      className={`flex h-16 w-16 sm:h-[5.5rem] sm:w-[5.5rem] items-center justify-center rounded-full border-2 font-display text-lg sm:text-xl font-bold tracking-wide ${
                        i === 0
                          ? 'border-ums-accent/30 bg-ums-tint text-ums-accent'
                          : 'border-ums-coral/30 bg-[#fff1ef] text-ums-coral'
                      }`}
                    >
                      {t.initials}
                    </div>
                    <span
                      className={`absolute -bottom-1 -right-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm ${
                        i === 0 ? 'bg-ums-accent' : 'bg-ums-coral'
                      }`}
                    >
                      {t.badge}
                    </span>
                  </div>

                  <div className="min-w-0 pt-1 text-left">
                    <div
                      className={`mb-2 inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${
                        i === 0
                          ? 'bg-ums-tint text-ums-accent'
                          : 'bg-[#fff1ef] text-ums-coral'
                      }`}
                    >
                      {t.track}
                    </div>
                    <h3 className="font-display text-xl font-bold tracking-tight text-[#111]">
                      {t.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-ums-muted">{t.role}</p>
                  </div>
                </div>

                <div
                  className={`mb-4 -mx-1 inline-flex max-w-full items-center gap-2 rounded-r-full border-y border-r px-3 py-1.5 text-left text-[11px] font-bold uppercase tracking-wide ${
                    i === 0
                      ? 'border-ums-accent/20 bg-ums-tint/80 text-ums-accent'
                      : 'border-ums-coral/20 bg-[#fff1ef] text-ums-coral'
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                      i === 0 ? 'bg-ums-accent' : 'bg-ums-coral'
                    }`}
                    aria-hidden="true"
                  />
                  <span className="truncate">{t.ribbon}</span>
                </div>

                <p className="mb-5 text-left text-sm leading-relaxed text-ums-muted">
                  {t.achievement}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {t.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-ums-border bg-[#fafafa] px-2 py-0.5 text-[10px] font-medium text-ums-muted transition-colors duration-200 group-hover:border-[#dce3ff] group-hover:bg-ums-tint/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </RevealOnScroll>
    </SectionShell>
  )
}
