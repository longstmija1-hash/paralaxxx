'use client'

import { useState, useCallback, useRef, useEffect } from 'react'

const ACCENT = {
  'neon-green': {
    text: 'text-neon-green',
    muted: 'text-neon-green/70',
    border: 'border-neon-green/40',
    borderSoft: 'border-neon-green/20',
    bg: 'bg-neon-green/10',
    glow: 'glow-green',
    gradient: 'from-neon-green/20 via-transparent to-transparent',
    btn: 'border-neon-green/40 text-neon-green hover:bg-neon-green hover:text-dark-900',
    dot: 'bg-neon-green',
    burst: '#00ff87',
    chip: 'bg-neon-green/15 border-neon-green/30 text-neon-green',
  },
  'neon-purple': {
    text: 'text-neon-purple',
    muted: 'text-neon-purple/70',
    border: 'border-neon-purple/40',
    borderSoft: 'border-neon-purple/20',
    bg: 'bg-neon-purple/10',
    glow: 'glow-purple',
    gradient: 'from-neon-purple/20 via-transparent to-transparent',
    btn: 'border-neon-purple/40 text-neon-purple hover:bg-neon-purple hover:text-white',
    dot: 'bg-neon-purple',
    burst: '#bf5af2',
    chip: 'bg-neon-purple/15 border-neon-purple/30 text-neon-purple',
  },
  'neon-blue': {
    text: 'text-neon-blue',
    muted: 'text-neon-blue/70',
    border: 'border-neon-blue/40',
    borderSoft: 'border-neon-blue/20',
    bg: 'bg-neon-blue/10',
    glow: 'glow-blue',
    gradient: 'from-neon-blue/20 via-transparent to-transparent',
    btn: 'border-neon-blue/40 text-neon-blue hover:bg-neon-blue hover:text-white',
    dot: 'bg-neon-blue',
    burst: '#0a84ff',
    chip: 'bg-neon-blue/15 border-neon-blue/30 text-neon-blue',
  },
}

const courses = [
  {
    level: 'Школа',
    age: '1–11 класс',
    color: 'neon-green',
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
    level: 'Экзамены',
    age: '9 и 11 класс',
    color: 'neon-purple',
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
    level: 'IT-Навыки',
    age: 'любой возраст',
    color: 'neon-blue',
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

const ORIGIN = ['origin-left', 'origin-center', 'origin-right']
const BURST_PARTICLES = 16
const HINT_STORAGE_KEY = 'parallax-courses-hint-v1'
const HINT_TOTAL_MS = 5000
const HINT_STAGGER_MS = 200

function SubjectCard({ subject, accent, stagger, className = '', large = false }) {
  const a = ACCENT[accent]
  return (
    <div
      className={[
        'courses-stagger courses-subject-card group/sub flex flex-col min-h-0 rounded-xl border border-dark-500 bg-dark-800/80 transition-colors duration-300 hover:border-opacity-80',
        large ? 'gap-3 p-5 md:p-4' : 'gap-2 md:gap-1.5 p-4 md:p-3',
        className,
      ].join(' ')}
      style={{ '--stagger': stagger }}
    >
      <div className="flex items-start justify-between gap-2">
        <span className={`${large ? 'text-4xl md:text-3xl' : 'text-3xl md:text-2xl'} leading-none`}>{subject.icon}</span>
        <span className={`shrink-0 font-mono ${large ? 'text-[11px] px-2.5 py-1' : 'text-[10px] px-2 py-0.5'} rounded-full border ${a.chip}`}>
          {subject.format}
        </span>
      </div>
      <h4 className={`font-bold text-white leading-tight ${large ? 'text-lg md:text-base' : 'text-base md:text-sm'}`}>
        {subject.name}
      </h4>
      <p className={`${a.muted} font-medium leading-snug ${large ? 'text-sm md:text-sm' : 'text-sm md:text-xs'}`}>
        {subject.hook}
      </p>
      <p
        className={`text-gray-400 leading-relaxed ${
          large ? 'text-sm md:text-xs line-clamp-4 md:line-clamp-3 flex-1' : 'text-sm md:text-[11px] md:line-clamp-2'
        }`}
      >
        {subject.detail}
      </p>
      <div className={`flex flex-wrap mt-auto ${large ? 'gap-2 pt-2' : 'gap-1.5 pt-1'}`}>
        {subject.topics.map((t) => (
          <span
            key={t}
            className={`${large ? 'text-[11px] px-2.5 py-1' : 'text-[10px] px-2 py-0.5'} rounded-md border ${a.chip} opacity-90`}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

function CourseBurst({ color, originIndex }) {
  const originClass =
    originIndex === 0 ? 'courses-burst--left' : originIndex === 2 ? 'courses-burst--right' : 'courses-burst--center'

  return (
    <div
      className={`courses-burst hidden md:block pointer-events-none absolute inset-0 z-[5] ${originClass}`}
      style={{ '--burst-color': color }}
      aria-hidden
    >
      <span className="courses-flash-ring" />
      <span className="courses-flash-core" />
      {Array.from({ length: BURST_PARTICLES }, (_, p) => (
        <span key={p} className="courses-particle" style={{ '--i': p }} />
      ))}
      {Array.from({ length: 6 }, (_, p) => (
        <span key={`s-${p}`} className="courses-spark" style={{ '--i': p }} />
      ))}
    </div>
  )
}

const canHoverExpand = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (min-width: 768px)').matches

function CourseGlassHint({ index, accent, visible }) {
  const a = ACCENT[accent]
  if (!visible) return null

  return (
    <div
      className="courses-glass-hint absolute inset-0 z-30 flex items-center justify-center rounded-xl pointer-events-none"
      style={{ '--hint-i': index }}
      aria-hidden
    >
      <div className={`courses-glass-hint-panel border ${a.borderSoft}`}>
        <span className={`courses-glass-hint-icon ${a.text}`} aria-hidden>
          <span className="courses-glass-hint-pulse">◎</span>
        </span>
        <span className="courses-glass-hint-label text-white font-semibold text-sm">
          <span className="md:hidden">Нажмите</span>
          <span className="hidden md:inline">Наведите</span>
        </span>
        <span className={`courses-glass-hint-sub text-[10px] font-mono ${a.muted}`}>
          чтобы открыть
        </span>
      </div>
    </div>
  )
}

export default function CoursesSection({ openModal }) {
  const [active, setActive] = useState(null)
  const [showScrollHint, setShowScrollHint] = useState(false)
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const cardRefs = useRef([])
  const hintTimerRef = useRef(null)

  const dismissScrollHint = useCallback(() => {
    setShowScrollHint(false)
    if (hintTimerRef.current) {
      clearTimeout(hintTimerRef.current)
      hintTimerRef.current = null
    }
  }, [])

  const handleEnter = useCallback((i) => {
    dismissScrollHint()
    if (canHoverExpand()) setActive(i)
  }, [dismissScrollHint])

  const handleLeave = useCallback(() => {
    if (canHoverExpand()) setActive(null)
  }, [])

  const handleToggle = useCallback((i) => {
    dismissScrollHint()
    setActive((prev) => (prev === i ? null : i))
  }, [dismissScrollHint])

  const handleClose = useCallback((e) => {
    e.stopPropagation()
    setActive(null)
  }, [])

  useEffect(() => {
    if (active === null) return
    const el = cardRefs.current[active]
    if (!el) return
    const t = requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    })
    return () => cancelAnimationFrame(t)
  }, [active])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (sessionStorage.getItem(HINT_STORAGE_KEY)) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        sessionStorage.setItem(HINT_STORAGE_KEY, '1')
        setShowScrollHint(true)
        hintTimerRef.current = setTimeout(
          () => setShowScrollHint(false),
          HINT_TOTAL_MS + (courses.length - 1) * HINT_STAGGER_MS,
        )
      },
      { threshold: 0.32, rootMargin: '-40px 0px' },
    )

    observer.observe(section)
    return () => {
      observer.disconnect()
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current)
    }
  }, [])

  return (
    <section id="courses" ref={sectionRef} className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-heading">Наши направления</h2>
          <p className="section-sub mx-auto">
            <span className="hidden md:inline">Наведите на карточку — она раскроется на всю ширину. </span>
          </p>
        </div>

        <div
          ref={trackRef}
          className={`courses-track relative flex flex-col md:flex-row md:h-[28rem] ${active !== null ? 'max-md:gap-0 gap-0' : 'gap-4 md:gap-6'}`}
          onMouseLeave={handleLeave}
        >
          {courses.map((c, i) => {
            const a = ACCENT[c.color]
            const isActive = active === i
            const isCollapsed = active !== null && !isActive
            const isIdle = active === null

            return (
              <article
                key={c.level}
                ref={(el) => { cardRefs.current[i] = el }}
                onMouseEnter={() => handleEnter(i)}
                onClick={() => handleToggle(i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleToggle(i)
                  }
                }}
                onFocus={() => handleEnter(i)}
                tabIndex={0}
                role="button"
                aria-expanded={isActive}
                aria-label={`${c.level}: ${isActive ? 'свернуть' : 'раскрыть'}`}
                className={[
                  'courses-card group relative outline-none',
                  ORIGIN[i],
                  isActive && 'courses-card--active z-20 max-md:max-h-[min(88svh,44rem)] md:h-full',
                  isCollapsed && 'max-md:hidden courses-card--hidden',
                  isIdle && 'courses-card--idle',
                  isActive && 'md:h-full',
                  c.featured && isIdle && `${a.borderSoft}`,
                ].filter(Boolean).join(' ')}
                style={{
                  flex: isActive ? '1 1 100%' : isCollapsed ? '0 0 0%' : '1 1 0%',
                  minWidth: isCollapsed ? 0 : undefined,
                  '--burst-color': a.burst,
                }}
              >
                <div
                  className={[
                    'cyber-card courses-card-inner relative h-full overflow-hidden',
                    isActive && `courses-card-inner--expanded ${a.glow}`,
                    c.featured && isActive && 'border-neon-purple/50',
                    c.featured && isIdle && 'border-neon-purple/40 glow-purple',
                  ].filter(Boolean).join(' ')}
                >
                  {isActive && <CourseBurst color={a.burst} originIndex={i} />}

                  <div
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${a.gradient} opacity-0 transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'group-hover:opacity-50'}`}
                  />
                  <div className="courses-scanline hidden md:block pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700" />

                  {c.featured && isIdle && (
                    <div
                      className={`absolute top-5 right-5 md:top-6 md:right-6 z-20 px-2 py-0.5 ${a.bg} border ${a.border} rounded text-xs ${a.text} font-semibold`}
                    >
                      Топ выбор
                    </div>
                  )}

                  {showScrollHint && isIdle && (
                    <CourseGlassHint index={i} accent={c.color} visible />
                  )}

                  {/* compact */}
                  <div
                    className={`courses-compact courses-pad relative z-10 flex flex-col h-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isActive
                        ? 'max-md:hidden md:opacity-0 md:scale-[0.97] md:absolute md:inset-0 md:pointer-events-none'
                        : 'opacity-100 scale-100'
                    }`}
                  >
                    <div className="text-4xl mb-4 transition-transform duration-700 group-hover:scale-110">{c.emoji}</div>
                    <div className={`text-xs font-mono ${a.text} uppercase tracking-widest mb-1`}>{c.age}</div>
                    <h3 className="text-xl font-black text-white mb-3">{c.level}</h3>
                    <p className="text-gray-400 text-sm mb-4 flex-grow leading-relaxed">{c.desc}</p>
                    <ul className="space-y-2 mb-4">
                      {c.subjects.map((s) => (
                        <li key={s.name} className="flex items-center gap-2 text-sm text-gray-300">
                          <span className={a.text}>▸</span>
                          <span>{s.icon}</span> {s.name}
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        openModal({ selectedProgram: c.level })
                      }}
                      className={`mt-auto btn-neon-outline w-full text-center text-sm py-2.5 ${c.featured ? a.btn : ''}`}
                    >
                      Записаться →
                    </button>
                  </div>

                  {/* expanded */}
                  <div
                    className={`courses-expanded courses-pad z-10 flex flex-col md:flex-row gap-4 md:gap-6 min-h-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isActive
                        ? 'max-md:relative max-md:opacity-100 max-md:translate-y-0 max-md:overflow-y-auto max-md:h-full'
                        : 'max-md:hidden'
                    } md:absolute md:inset-0 ${
                      isActive
                        ? 'md:opacity-100 md:translate-y-0 md:overflow-hidden'
                        : 'md:opacity-0 md:translate-y-4 md:pointer-events-none'
                    }`}
                  >
                    {/* mobile header */}
                    <div className="courses-stagger md:hidden flex items-start justify-between gap-3 shrink-0" style={{ '--stagger': 0 }}>
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-3xl leading-none shrink-0">{c.emoji}</span>
                        <div className="min-w-0">
                          <div className={`text-[10px] font-mono ${a.text} uppercase tracking-widest`}>{c.age}</div>
                          <h3 className="text-lg font-black text-white leading-tight">{c.level}</h3>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleClose}
                        className="shrink-0 w-9 h-9 flex items-center justify-center rounded-lg border border-dark-500 text-gray-400 hover:text-white hover:border-gray-500 text-lg leading-none"
                        aria-label="Свернуть"
                      >
                        ✕
                      </button>
                    </div>

                    <p className={`courses-stagger md:hidden text-xs ${a.muted} font-mono leading-snug shrink-0`} style={{ '--stagger': 1 }}>
                      {c.tagline}
                    </p>
                    <p className="courses-stagger md:hidden text-gray-400 text-sm leading-relaxed shrink-0" style={{ '--stagger': 2 }}>
                      {c.desc}
                    </p>

                    <div className="courses-expanded-col hidden md:flex flex-shrink-0 md:w-[15rem] flex-col min-h-0 overflow-y-auto overscroll-contain">
                      <div className="courses-stagger text-4xl md:text-4xl mb-3 leading-none" style={{ '--stagger': 0 }}>
                        {c.emoji}
                      </div>
                      <div className={`courses-stagger text-xs font-mono ${a.text} uppercase tracking-widest mb-1`} style={{ '--stagger': 1 }}>
                        {c.age}
                      </div>
                      <h3 className="courses-stagger text-xl md:text-2xl font-black text-white mb-1.5" style={{ '--stagger': 2 }}>
                        {c.level}
                      </h3>
                      <p className="courses-stagger text-gray-400 text-xs leading-relaxed mb-3 break-words" style={{ '--stagger': 3 }}>
                        <span className={`block font-mono ${a.muted} mb-1.5`}>{c.tagline}</span>
                        {c.desc}
                      </p>
                      <div
                        className={`courses-stagger inline-flex items-baseline gap-2 px-3 py-2 rounded-lg border ${a.borderSoft} ${a.bg} mb-4 md:mb-0`}
                        style={{ '--stagger': 4 }}
                      >
                        <span className="text-gray-500 text-[10px] uppercase tracking-wider">{c.stat.label}</span>
                        <span className={`text-xl font-black leading-none ${a.text}`}>{c.stat.value}</span>
                      </div>
                      <ul className="courses-stagger hidden md:flex flex-col gap-1.5 mt-auto shrink-0" style={{ '--stagger': 5 }}>
                        {c.highlights.map((h) => (
                          <li key={h} className={`flex items-center gap-2 text-xs text-gray-400`}>
                            <span className={a.text}>✓</span> {h}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col gap-3 md:gap-3 min-h-0 overflow-hidden">
                      <p className={`courses-stagger hidden md:block text-xs font-mono uppercase tracking-wider ${a.text}`} style={{ '--stagger': 2 }}>
                        Направления
                      </p>
                      <p className={`courses-stagger md:hidden text-xs font-mono uppercase tracking-wider ${a.text} shrink-0`} style={{ '--stagger': 2 }}>
                        Листайте предметы →
                      </p>
                      <div className="courses-subjects-scroll flex-1 min-h-[16.5rem] md:min-h-[12.5rem]">
                        {c.subjects.map((s, si) => (
                          <SubjectCard
                            key={s.name}
                            subject={s}
                            accent={c.color}
                            stagger={3 + si}
                            large
                            className="courses-subject-card--slide"
                          />
                        ))}
                      </div>

                      <ul className="courses-stagger flex flex-wrap gap-1.5 md:hidden shrink-0" style={{ '--stagger': 7 }}>
                        {c.highlights.map((h) => (
                          <li
                            key={h}
                            className={`flex items-center gap-1.5 text-xs text-gray-300 px-3 py-1.5 rounded-full border ${a.borderSoft} ${a.bg}`}
                          >
                            <span className={a.text}>✓</span> {h}
                          </li>
                        ))}
                      </ul>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          openModal({ selectedProgram: c.level })
                        }}
                        className={`courses-stagger btn-neon-outline w-full text-center text-sm py-2.5 px-5 shrink-0 ${c.featured ? a.btn : ''}`}
                        style={{ '--stagger': 9 }}
                      >
                        Записаться →
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <p className="text-center text-gray-600 text-xs font-mono mt-6 md:hidden">
          Нажмите на направление · свайп по предметам
        </p>
      </div>
    </section>
  )
}
