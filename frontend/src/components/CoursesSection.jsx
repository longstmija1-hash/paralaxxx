'use client'

import { useState } from 'react'
import { Check, ChevronRight } from 'lucide-react'
import SectionShell from './landing/ui/SectionShell'
import UmsCard from './landing/ui/UmsCard'
import UmsButton from './landing/ui/UmsButton'
import MediaPlaceholder from './landing/ui/MediaPlaceholder'
import PillToggle from './landing/PillToggle'

const courses = [
  {
    id: 'school',
    level: 'Школа',
    age: '1–11 класс',
    emoji: '🏫',
    tagline: 'Вся школьная программа в одном месте',
    desc: 'Устраняем пробелы, подтягиваем оценки и разбираемся со сложной домашкой',
    subjects: [
      {
        name: 'Естественные науки',
        icon: '🧬',
        hook: 'Понимаем природу, а не заучиваем',
        detail: 'Лабораторные разборы, схемы и тесты в формате школьных контрольных.',
        topics: ['Биология', 'Химия', 'Физика'],
        format: 'Занятие 60 мин',
      },
      {
        name: 'Гуманитарные науки',
        icon: '📚',
        hook: 'Пишем, аргументируем, запоминаем',
        detail: 'Эссе, анализ текстов, даты и понятия — с шпаргалками от куратора.',
        topics: ['Русский', 'История', 'Обществознание'],
        format: 'Занятие 60 мин',
      },
      {
        name: 'Точные науки',
        icon: '📐',
        hook: 'Считаем уверенно с нуля',
        detail: 'От арифметики до 100 баллов: контрольные, олимпиады, подготовка к ЕГЭ и ОГЭ.',
        topics: ['Математика', 'Информатика', 'Геометрия'],
        format: 'Занятие 60 мин',
      },
    ],
    highlights: ['Маршрут по пробелам', 'Разбор ДЗ live', 'Отчёты родителям'],
    stat: { label: 'Предметов', value: '15+' },
  },
  {
    id: 'exams',
    level: 'Экзамены',
    age: '9 и 11 класс',
    emoji: '🔥',
    tagline: 'Целенаправленно на 90+ баллов',
    desc: 'Ловушки ФИПИ, пробники и психологическая подготовка — знаем, где теряют баллы.',
    subjects: [
      {
        name: 'Подготовка к ОГЭ',
        icon: '📝',
        hook: 'Закрываем все части за год',
        detail: 'Типовые задания, тайминг, разбор каждой ошибки в личном чате.',
        topics: ['Математика', 'Русский', 'Обществознание'],
        format: 'Интенсив 9 кл',
      },
      {
        name: 'Подготовка к ЕГЭ',
        icon: '🎯',
        hook: 'Вторая часть — наша стихия',
        detail: 'Эссе, устная, профильные предметы: тренируем по критериям экспертов.',
        topics: ['Профиль', 'Устная', 'Эссе'],
        format: '3× / нед',
      },
      {
        name: 'Интенсив-практикум',
        icon: '⚡',
        hook: 'Спринт перед экзаменом',
        detail: '2–3 занятия в неделю: только пробники, слабые темы и финальный разгон.',
        topics: ['Пробники', 'Стресс', 'Тайминг'],
        format: 'Март–Июнь',
      },
    ],
    highlights: ['Пробники ФИПИ', 'Разбор с куратором', 'План до экзамена'],
    stat: { label: 'Средний балл', value: '85+' },
    featured: true,
  },
  {
    id: 'it',
    level: 'IT-Навыки',
    age: 'любой возраст',
    emoji: '💻',
    tagline: 'От первых игр до серьёзных проектов',
    desc: 'Собираем портфолио, которое реально показывают на олимпиадах и в вузе.',
    subjects: [
      {
        name: 'Scratch',
        icon: '🎮',
        hook: 'Первые игры за 2 недели',
        detail: 'Анимация, логика, сторителлинг — дети видят результат сразу.',
        topics: ['Спрайты', 'Циклы', 'Игры'],
        format: 'Для 7–11 лет',
      },
      {
        name: 'Python / C++',
        icon: '🐍',
        hook: 'Алгоритмы без скуки',
        detail: 'ООП, задачи уровня Codeforces, подготовка к олимпиадам и ЕГЭ по информатике.',
        topics: ['Алгоритмы', 'ООП', 'Олимпиады'],
        format: '12+ лет',
      },
      {
        name: 'Web-разработка',
        icon: '🌐',
        hook: 'Свой сайт в портфолио',
        detail: 'HTML, CSS, React — деплой на GitHub Pages, первый фриланс-проект.',
        topics: ['React', 'UI/UX', 'Deploy'],
        format: 'Проект 6 нед',
      },
    ],
    highlights: ['GitHub-портфолио', 'Хакатоны', 'Менторы из IT'],
    stat: { label: 'Проектов', value: '50+' },
  },
]

const CATEGORY_OPTIONS = courses.map((c) => ({ id: c.id, label: c.level }))

function SubjectCardDesktop({ subject }) {
  return (
    <UmsCard padding="sm" className="h-full flex flex-col">
      <MediaPlaceholder label="Иллюстрация предмета" aspect="16/9" className="mb-4" rounded="20px" />
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-2xl leading-none">{subject.icon}</span>
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
        className="w-full flex items-center gap-3 p-3.5 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ums-accent focus-visible:ring-inset"
        aria-expanded={open}
      >
        <span className="w-10 h-10 rounded-xl bg-ums-tint flex items-center justify-center text-xl shrink-0" aria-hidden>
          {subject.icon}
        </span>
        <div className="min-w-0 flex-1">
          <div className="font-bold text-[#111] text-sm leading-tight">{subject.name}</div>
          <div className="text-xs text-ums-muted mt-0.5 truncate">{subject.hook}</div>
        </div>
        <ChevronRight
          className={`w-4 h-4 text-ums-muted shrink-0 transition-transform duration-200 ${open ? 'rotate-90' : ''}`}
          aria-hidden
        />
      </button>
      {open && (
        <div className="px-3.5 pb-3.5 pt-0 border-t border-ums-border/60">
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
  const [activeId, setActiveId] = useState('school')
  const [openSubject, setOpenSubject] = useState(null)
  const active = courses.find((c) => c.id === activeId) ?? courses[0]

  const handleCategory = (id) => {
    setActiveId(id)
    setOpenSubject(null)
  }

  return (
    <SectionShell id="courses" variant="white">
      <div className="text-center mb-6 sm:mb-10">
        <h2 className="section-heading">Наши направления</h2>
        <p className="section-sub mx-auto text-base sm:text-lg">
          Школа, экзамены и IT — выбери направление и посмотри программы
        </p>
      </div>

      <div className="max-w-xl mx-auto mb-6 sm:mb-10">
        <PillToggle options={CATEGORY_OPTIONS} value={activeId} onChange={handleCategory} />
      </div>

      <UmsCard padding="sm" className="mb-8 sm:!p-8" hover={false}>
        <div className="flex items-start justify-between gap-3 mb-4 sm:mb-8">
          <div className="min-w-0">
            <div className="flex items-center gap-2.5 sm:gap-3 mb-1.5 sm:mb-2">
              <span className="text-2xl sm:text-3xl">{active.emoji}</span>
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

        {/* Mobile: compact accordion rows */}
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

        {/* Desktop / tablet: card grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {active.subjects.map((s) => (
            <SubjectCardDesktop key={s.name} subject={s} />
          ))}
        </div>

        <UmsButton onClick={() => openModal({ selectedProgram: active.level })} className="w-full sm:w-auto">
          Записаться на {active.level.toLowerCase()}
        </UmsButton>
      </UmsCard>
    </SectionShell>
  )
}
