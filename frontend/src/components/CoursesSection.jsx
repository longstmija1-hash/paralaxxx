'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Check, ChevronRight } from 'lucide-react'
import SectionShell from './landing/ui/SectionShell'
import UmsCard from './landing/ui/UmsCard'
import UmsButton from './landing/ui/UmsButton'
import MediaPlaceholder from './landing/ui/MediaPlaceholder'
import PillToggle from './landing/PillToggle'
import WaveAccent from './landing/ui/WaveAccent'
import { COURSES_SUB } from '../data/landingContent'

const courses = [
  {
    id: 'foundation',
    level: 'Фундамент',
    age: 'школа и ОГЭ / ЕГЭ',
    emoji: '📐',
    tagline: 'Закрываем пробелы и готовим к ОГЭ/ЕГЭ на 85+',
    desc: 'Понятное объяснение сложных тем. Без зубрёжки — через логику и практику.',
    subjects: [
      {
        name: 'Математика',
        icon: '∑',
        hook: 'База и профиль без страха формул',
        detail: 'От пробелов в алгебре до задач второй части. Контрольные, олимпиадный запас, ОГЭ и ЕГЭ.',
        topics: ['База', 'Профиль', 'Пробники'],
        format: 'Занятие 60 мин',
        image: '/images/courses/math.jpg',
        imageAlt: 'Курс математики — прогресс, графики и геометрия на одной платформе',
      },
      {
        name: 'Физика',
        icon: '⚛',
        hook: 'Понимаем явления, а не заучиваем',
        detail: 'Схемы, разборы и задачи в формате школьных контрольных и экзаменов.',
        topics: ['Механика', 'Электричество', 'ОГЭ/ЕГЭ'],
        format: 'Занятие 60 мин',
        image: '/images/courses/physics.jpg',
        imageAlt: 'Курс физики — схемы, механика и прогресс на одной платформе',
      },
      {
        name: 'Русский язык',
        icon: '✍',
        hook: 'Пишем и аргументируем уверенно',
        detail: 'Орфография, сочинения, анализ текста — с обратной связью куратора.',
        topics: ['Грамотность', 'Сочинение', 'ОГЭ/ЕГЭ'],
        format: 'Занятие 60 мин',
        image: '/images/courses/russian.jpg',
        imageAlt: 'Курс русского языка — сочинение, орфография и обратная связь куратора',
      },
    ],
    highlights: ['Оценки без стресса', 'Пробники ФИПИ', 'Поддержка куратора'],
    stat: { label: 'Фокус', value: '3' },
  },
  {
    id: 'it',
    level: 'IT и профессия',
    age: 'от алгоритмики до продукта',
    emoji: '💻',
    tagline: 'От потребителя игр к создателю IT-продуктов',
    desc: 'Хард-скиллы на реальных задачах. Практика, которая остаётся с учеником.',
    subjects: [
      {
        name: 'Scratch',
        icon: '🎮',
        hook: 'Алгоритмика и логика через игры',
        detail: 'Спрайты, циклы, сюжета — первый опыт «я создаю», а не только потребляю.',
        topics: ['Логика', 'Игры', 'Проекты'],
        format: '7–12 лет',
        image: '/images/courses/scratch.jpg',
        imageAlt: 'Курс Scratch — логика, циклы и создание игр',
      },
      {
        name: 'Frontend',
        icon: '🌐',
        hook: 'Свой сайт и интерфейсы',
        detail: 'HTML, CSS, современный фронтенд — деплой и проект в портфолио на GitHub.',
        topics: ['HTML/CSS', 'UI', 'GitHub'],
        format: '12+ лет',
        image: '/images/courses/frontend.jpg',
        imageAlt: 'Курс Frontend — HTML/CSS, UI и портфолио на GitHub',
      },
      {
        name: 'Системная аналитика',
        icon: '🗺',
        hook: 'Проектирование и архитектура',
        detail: 'Учимся описывать системы, требования и логику продукта — навык, который ценят в IT.',
        topics: ['Требования', 'Схемы', 'Продукт'],
        format: '14+ лет',
        image: '/images/courses/sys-analytics.jpg',
        imageAlt: 'Курс системной аналитики — требования, архитектура и схемы продукта',
      },
    ],
    highlights: ['Портфолио на GitHub', 'Реальные проекты', 'Менторство практиков'],
    stat: { label: 'Программ', value: '3' },
  },
]

const CATEGORY_OPTIONS = courses.map((c) => ({ id: c.id, label: c.level }))

function SubjectCardDesktop({ subject }) {
  return (
    <UmsCard padding="sm" className="h-full flex flex-col">
      {subject.image ? (
        <div className="relative mb-4 aspect-video overflow-hidden rounded-[20px] border border-[#dce3ff] bg-ums-tint">
          <Image
            src={subject.image}
            alt={subject.imageAlt || subject.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 50vw, 280px"
          />
        </div>
      ) : (
        <MediaPlaceholder label="Иллюстрация" aspect="16/9" className="mb-4" rounded="20px" />
      )}
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-2xl leading-none" aria-hidden>
          {subject.icon}
        </span>
        <span className="shrink-0 text-[10px] px-2 py-0.5 rounded-full border border-ums-border bg-[#fafafa] text-ums-muted">
          {subject.format}
        </span>
      </div>
      <h4 className="font-bold text-[#111] leading-tight mb-1">{subject.name}</h4>
      <p className="text-sm text-[#111] font-medium mb-2">{subject.hook}</p>
      <p className="text-sm text-ums-muted leading-relaxed mb-3 flex-1">{subject.detail}</p>
      <div className="flex flex-wrap gap-1.5">
        {subject.topics.map((t) => (
          <span
            key={t}
            className="text-[10px] px-2 py-0.5 rounded-md border border-ums-border bg-[#fafafa] text-ums-muted"
          >
            {t}
          </span>
        ))}
      </div>
    </UmsCard>
  )
}

function SubjectRowMobile({ subject, open, onToggle }) {
  return (
    <div className="rounded-2xl border border-ums-border bg-white overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center gap-3 p-3 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ums-accent focus-visible:ring-inset active:bg-[#fafafa]"
        aria-expanded={open}
      >
        {subject.image ? (
          <div className="relative h-12 w-[4.5rem] shrink-0 overflow-hidden rounded-xl border border-[#dce3ff] bg-ums-tint">
            <Image
              src={subject.image}
              alt=""
              fill
              className="object-cover"
              sizes="72px"
            />
          </div>
        ) : (
          <span className="w-11 h-11 rounded-xl bg-ums-tint flex items-center justify-center text-lg shrink-0" aria-hidden>
            {subject.icon}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <div className="font-bold text-[#111] text-sm leading-tight">{subject.name}</div>
          <div className="text-xs text-ums-muted mt-0.5 line-clamp-1">{subject.hook}</div>
        </div>
        <ChevronRight
          className={`w-4 h-4 text-ums-muted shrink-0 transition-transform duration-200 ${open ? 'rotate-90' : ''}`}
          aria-hidden
        />
      </button>
      {open && (
        <div className="px-3 pb-3.5 pt-0 border-t border-ums-border/60">
          {subject.image && (
            <div className="relative mt-3 aspect-[16/9] overflow-hidden rounded-xl border border-[#dce3ff]">
              <Image
                src={subject.image}
                alt={subject.imageAlt || subject.name}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
          )}
          <p className="text-sm text-ums-muted leading-relaxed pt-3 mb-3">{subject.detail}</p>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {subject.topics.map((t) => (
              <span
                key={t}
                className="text-[10px] px-2 py-0.5 rounded-md border border-ums-border bg-[#fafafa] text-ums-muted"
              >
                {t}
              </span>
            ))}
          </div>
          <p className="text-[11px] text-ums-muted">{subject.format}</p>
        </div>
      )}
    </div>
  )
}

export default function CoursesSection({ openModal }) {
  const [activeId, setActiveId] = useState('foundation')
  const [openSubject, setOpenSubject] = useState(null)
  const active = courses.find((c) => c.id === activeId) ?? courses[0]

  const handleCategory = (id) => {
    setActiveId(id)
    setOpenSubject(null)
  }

  return (
    <SectionShell id="courses" variant="white">
      <div className="text-center mb-6 sm:mb-10">
        <h2 className="section-heading">
          Выберите один трек или соберите <WaveAccent variant="double">комплексную программу</WaveAccent>
        </h2>
        <p className="section-sub mx-auto text-base sm:text-lg">{COURSES_SUB}</p>
      </div>

      <div className="max-w-xl mx-auto mb-6 sm:mb-10">
        <PillToggle options={CATEGORY_OPTIONS} value={activeId} onChange={handleCategory} />
      </div>

      <UmsCard padding="sm" className="mb-8 sm:!p-8" hover={false}>
        <div className="flex items-start justify-between gap-3 mb-4 sm:mb-8">
          <div className="min-w-0">
            <div className="flex items-center gap-2.5 sm:gap-3 mb-1.5 sm:mb-2">
              <span className="text-2xl sm:text-3xl" aria-hidden>
                {active.emoji}
              </span>
              <div className="min-w-0">
                <div className="text-[10px] sm:text-xs text-ums-muted uppercase tracking-wide">{active.age}</div>
                <h3 className="text-xl sm:text-2xl font-black text-[#111]">{active.level}</h3>
              </div>
            </div>
            <p className="text-sm font-medium text-[#111] mb-1">{active.tagline}</p>
            <p className="text-sm text-ums-muted max-w-xl hidden sm:block">{active.desc}</p>
          </div>
          <div className="ums-stat-row shrink-0 !py-2 !px-3 sm:!py-3 sm:!px-4">
            <div>
              <div className="text-[10px] sm:text-xs text-ums-muted uppercase">{active.stat.label}</div>
              <div className="text-xl sm:text-2xl font-black text-[#111]">{active.stat.value}</div>
            </div>
          </div>
        </div>

        <ul className="flex gap-2 mb-4 sm:mb-8 overflow-x-auto scrollbar-none -mx-1 px-1 pb-1">
          {active.highlights.map((h) => (
            <li
              key={h}
              className="flex items-center gap-1.5 text-xs text-ums-muted px-3 py-1.5 rounded-full border border-ums-border bg-[#fafafa] whitespace-nowrap shrink-0"
            >
              <Check className="w-3.5 h-3.5 text-[#111]" aria-hidden />
              {h}
            </li>
          ))}
        </ul>

        <div className="sm:hidden space-y-2 mb-5">
          {active.subjects.map((s) => (
            <SubjectRowMobile
              key={s.name}
              subject={s}
              open={openSubject === s.name}
              onToggle={() => setOpenSubject((prev) => (prev === s.name ? null : s.name))}
            />
          ))}
        </div>

        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {active.subjects.map((s) => (
            <SubjectCardDesktop key={s.name} subject={s} />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <UmsButton onClick={() => openModal({ selectedProgram: active.level })} className="w-full sm:w-auto">
            Записаться на «{active.level}»
          </UmsButton>
          <UmsButton
            variant="secondary"
            onClick={() => openModal({ selectedProgram: 'Комплекс: фундамент + IT' })}
            className="w-full sm:w-auto"
          >
            Собрать комплекс школа + IT
          </UmsButton>
        </div>
      </UmsCard>
    </SectionShell>
  )
}
