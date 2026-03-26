import { useState } from 'react'
import { motion } from 'framer-motion'

// ── Navbar ─────────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [open, setOpen] = useState(false)
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/80 backdrop-blur-md border-b border-dark-500">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-mono font-black text-neon">&lt;CS/&gt;</span>
          <span className="font-extrabold text-white text-lg hidden sm:block">CodeSchool</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
          <a href="#courses" className="hover:text-neon-green transition-colors">Курсы</a>
          <a href="#lives" className="hover:text-neon-green transition-colors">Система жизней</a>
          <a href="#teachers" className="hover:text-neon-green transition-colors">Преподы</a>
          <a href="#pricing" className="hover:text-neon-green transition-colors">Тарифы</a>
          <a href="#faq" className="hover:text-neon-green transition-colors">FAQ</a>
        </div>
        <div className="flex items-center gap-3">
          <a href="#hero" className="btn-neon text-sm px-4 py-2">Записаться</a>
        </div>
      </div>
    </nav>
  )
}

// ── Hero Section ───────────────────────────────────────────────────────────────
const HeroSection = () => (
  <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
    {/* Animated grid bg */}
    <div className="absolute inset-0 cyber-bg opacity-60" />
    {/* Radial glow */}
    <div className="absolute inset-0" style={{
      background: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(0,255,135,0.08) 0%, transparent 70%)'
    }} />
    {/* Floating particles */}
    {[...Array(6)].map((_, i) => (
      <motion.div key={i}
        className="absolute rounded-full opacity-20"
        style={{
          width: `${30 + i * 15}px`, height: `${30 + i * 15}px`,
          left: `${10 + i * 15}%`, top: `${20 + (i % 3) * 20}%`,
          background: i % 2 === 0 ? '#00ff87' : '#bf5af2',
          filter: 'blur(20px)',
        }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
      />
    ))}

    <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-neon-green/10 border border-neon-green/30 rounded-full text-sm font-mono text-neon-green mb-6">
          <span className="w-2 h-2 bg-neon-green rounded-full animate-ping" />
          Набор открыт — 15 мест осталось
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
        className="text-5xl sm:text-6xl md:text-7xl font-black leading-tight mb-6"
      >
        <span className="text-white">Прокачаем</span>{' '}
        <span className="gradient-text">оценки в школе</span>{' '}
        <span className="text-white">и</span>{' '}
        <span className="text-white">подготовим к</span>{' '}
        <span className="text-neon-purple" style={{ textShadow: '0 0 20px rgba(191,90,242,0.5)' }}>
          экзаменам
        </span>{' '}

      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
        className="text-xl text-gray-400 max-w-2xl mx-auto mb-10"
      >
        Твои школьные уроки с суперсилой! Применяй знания по физике, химии, математике и другим предметам.
        Прокачивай знания под надзором профи. Школа, в которую хочется возвращаться.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <a href="#pricing" className="btn-neon text-lg px-8 py-4 gap-2">
          🚀 Записаться на бесплатный урок
        </a>
        <a href="#courses" className="btn-neon-outline text-lg px-8 py-4">
          Посмотреть курсы
        </a>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
        className="flex flex-wrap justify-center gap-8 mt-16"
      >
        {[
          { value: '100+', label: 'учеников' },
          { value: '95%', label: 'достигают желаемых результатов' },
          { value: '0', label: 'скучных уроков' },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-3xl font-black text-neon">{s.value}</div>
            <div className="text-sm text-gray-500">{s.label}</div>
          </div>
        ))}
        <div className="text-center">
          <div className="text-3xl font-black text-neon text-neutral-500">3</div>
          <div className="text-sm text-neutral-500 line-through">жизни in game</div>
          <span className="text-sm text-neutral-600 block mt-1">(в разработке)</span>
        </div>
      </motion.div>
    </div>

    {/* Scroll indicator */}
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-600 text-xs"
      animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
    >
      <span>scroll</span>
      <div className="w-0.5 h-6 bg-gradient-to-b from-gray-600 to-transparent" />
    </motion.div>
  </section>
)

// ── Problems Section ───────────────────────────────────────────────────────────
const ProblemsSection = () => (
  <section className="py-24 px-4">
    <div className="max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <h2 className="section-heading">Узнаёшь себя?</h2>
        <p className="section-sub mx-auto">Мы решаем реальные боли — и детей, и родителей</p>
      </motion.div>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Parents */}
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="cyber-card cyber-card-purple border-neon-purple/20">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">👨‍👩‍👧</span>
            <h3 className="text-xl font-bold text-neon-purple">Для родителей</h3>
          </div>
          <ul className="space-y-4">
            {[
              { emoji: '📱', text: 'Ребёнок постоянно в телефоне и TikTok' },
              { emoji: '😴', text: 'На учёбу нет никакой мотивации' },
              { emoji: '📉', text: 'Плохие оценки по предметам' },
              { emoji: '💸', text: 'Платите репетиторам — результата ноль' },
            ].map((item) => (
              <li key={item.text} className="flex items-start gap-3 text-gray-300">
                <span className="text-xl mt-0.5">{item.emoji}</span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </motion.div>
        {/* Kids */}
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="cyber-card border-neon-green/20">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h3 className="text-xl font-bold text-neon">Для ученика</h3>
          </div>
          <ul className="space-y-4">
            {[
              { emoji: '🎮', text: 'Учись играя, а не засыпая' },
              { emoji: '💰', text: 'Будь самым умным в классе (без зубрежки)' },
              { emoji: '😤', text: 'Преподы, которые тебя понимают' },
              { emoji: '🏆', text: 'Уверенный шаг в крутое будущее' },
            ].map((item) => (
              <li key={item.text} className="flex items-start gap-3 text-gray-300">
                <span className="text-xl mt-0.5">{item.emoji}</span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  </section>
)

// ── How It Works ───────────────────────────────────────────────────────────────
const steps = [
  { icon: '📺', title: 'Личные консультации и вебинары', desc: 'Живые занятия с крутыми преподами' },
  { icon: '💻', title: 'Домашнее задание', desc: 'Практика по пройденному материалу' },
  { icon: '✅', title: 'Проверка куратором', desc: 'Живой фидбек, аудиокомменты, "принять / доработать"' },
  { icon: '❤️', title: 'Жизни и Коины', desc: 'Вовремя — плюс монеты. Просрочил — минус жизнь. Игра по-настоящему', locked: true },
  { icon: '🚀', title: 'Результат', desc: 'Портфолио, знания и крутые оценки в школе' },
]
const HowItWorksSection = () => (
  <section className="py-24 px-4 bg-dark-800/50">
    <div className="max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <h2 className="section-heading">Как проходит обучение</h2>
      </motion.div>
      <div className="flex flex-col md:flex-row items-stretch gap-4">
        {steps.map((step, i) => (
          <motion.div key={step.title}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="flex-1 relative"
          >
            {i < steps.length - 1 && (
              <div
                className="hidden md:block absolute z-0 overflow-hidden"
                style={{ top: '68px', left: '50%', width: '100%', height: '2px' }}
              >
                {/* Glow base line */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'rgba(0,255,135,0.2)',
                    boxShadow: '0 0 8px rgba(0,255,135,0.5), 0 0 2px rgba(0,255,135,0.8)',
                  }}
                />
                {/* Animated energy spark */}
                <motion.div
                  className="absolute top-0 h-full w-20"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, #00ff87 45%, #0a84ff 55%, transparent 100%)',
                    filter: 'blur(1px)',
                  }}
                  animate={{ x: ['-80px', '200%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', repeatDelay: 0.4, delay: i * 0.3 }}
                />
              </div>
            )}
            <div className="cyber-card mx-2 relative z-10 text-center overflow-hidden h-full flex flex-col justify-start">
              {/* Locked overlay */}
              {step.locked && (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div
                    className="animate-pulse px-3 py-1.5 rounded-md bg-dark-800/80 border border-neon-purple/50"
                    style={{ boxShadow: '0 0 10px rgba(191,90,242,0.3)' }}
                  >
                    <span className="text-[10px] tracking-widest font-mono text-neon-purple uppercase">
                      В разработке
                    </span>
                  </div>
                </div>
              )}
              {/* Card content */}
              <div className={step.locked ? 'opacity-40 grayscale' : ''}>
                <div className="text-4xl mb-3">{step.icon}</div>
                <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-neon-green/20 text-neon-green text-xs font-bold mb-3">
                  {i + 1}
                </div>
                <h3 className="font-bold text-white mb-2 text-sm">{step.title}</h3>
                <p className="text-gray-500 text-xs">{step.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

// ── Courses Section ────────────────────────────────────────────────────────────
const courses = [
  {
    level: 'Школа',
    age: '1–11 класс',
    color: 'neon-green',
    emoji: '🏫',
    subjects: ['Естественные науки', 'Гуманитарные науки', 'Точные науки'],
    desc: 'Устраняем пробелы, подтягиваем оценки и разбираемся со сложной домашкой. Вся школьная программа в одном месте.',
  },
  {
    level: 'Экзамены',
    age: '9 и 11 класс',
    color: 'neon-purple',
    emoji: '🔥',
    subjects: ['Подготовка к ОГЭ', 'Подготовка к ЕГЭ', 'Интенсив-практикум'],
    desc: 'Целенаправленная подготовка на 90+ баллов. Разбор ловушек экзамена и психологическая подготовка.',
    featured: true, // Выделяем этот блок как самый приоритетный
  },
  {
    level: 'IT-Навыки',
    age: 'любой возраст',
    color: 'neon-blue',
    emoji: '💻',
    subjects: ['Scratch', 'Python / C++', 'Web-разработка'],
    desc: 'От создания первых игр до серьезных IT-проектов. Развиваем алгоритмическое мышление и создаем крутое портфолио.',
  },
]
const CoursesSection = () => (
  <section id="courses" className="py-24 px-4">
    <div className="max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <h2 className="section-heading">Наши направления</h2>
        <p className="section-sub mx-auto">Выбираем по возрасту и уровню. Начни с бесплатного урока.</p>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-6">
        {courses.map((c, i) => (
          <motion.div key={c.level}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.15 }}
            className={`cyber-card relative overflow-hidden ${c.featured ? 'border-neon-purple/40 glow-purple' : ''}`}
          >
            {c.featured && (
              <div className="absolute top-3 right-3 px-2 py-0.5 bg-neon-purple/20 border border-neon-purple/40 rounded text-xs text-neon-purple font-semibold">
                Топ выбор
              </div>
            )}
            <div className="text-4xl mb-4">{c.emoji}</div>
            <div className={`text-xs font-mono text-${c.color} uppercase tracking-widest mb-1`}>{c.age}</div>
            <h3 className="text-xl font-black text-white mb-3">{c.level}</h3>
            <p className="text-gray-400 text-sm mb-4">{c.desc}</p>
            <ul className="space-y-2">
              {c.subjects.map((s) => (
                <li key={s} className="flex items-center gap-2 text-sm text-gray-300">
                  <span className={`text-${c.color}`}>▸</span> {s}
                </li>
              ))}
            </ul>
            <a href="#pricing" className={`mt-6 btn-neon-outline w-full text-center block text-sm py-2 ${c.featured ? 'border-neon-purple/40 text-neon-purple hover:bg-neon-purple hover:text-white' : ''}`}>
              Записаться →
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

// ── Lives System Section ───────────────────────────────────────────────────────
const LivesSystemSection = () => (
  <section id="lives" className="py-24 px-4 bg-dark-800/50 relative overflow-hidden">
    <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(255,69,58,0.07) 0%, transparent 65%)' }} />
    <div className="max-w-5xl mx-auto relative z-10">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-xs font-semibold mb-4">
            ⚠️ ВАЖНО: ЭТО НЕ ШУТКА
          </div>
          <h2 className="section-heading">Система 3-х жизней</h2>
          <p className="text-gray-400 mb-6">
            Каждый месяц ты получаешь <span className="text-white font-semibold">3 жизни</span>.
            Не сдал домашку до дедлайна — сгорает 1 жизнь и ты получаешь пуш в мессенджер.
          </p>
          <div className="space-y-4">
            {[
              { icon: '❤️❤️❤️', label: '3 жизни', desc: 'Всё отлично. Ты получаешь монеты за домашку X2' },
              { icon: '❤️❤️🖤', label: '2 жизни', desc: 'Пропустил один дедлайн. Собирайся! Бонусов нет :(' },
              { icon: '❤️🖤🖤', label: '1 жизнь', desc: 'Критическая ситуация.' },
              { icon: '💀💀💀', label: '0 жизней', desc: 'Упсс... Ты потерял монеты' },
            ].map((row) => (
              <div key={row.label} className="flex items-start gap-4 p-3 rounded-lg bg-dark-700 border border-dark-500">
                <span className="text-2xl">{row.icon}</span>
                <div>
                  <div className="font-semibold text-white text-sm">{row.label}</div>
                  <div className="text-gray-500 text-xs">{row.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="text-center">
          <div className="inline-block p-8 bg-dark-700 border border-red-500/20 rounded-2xl"
            style={{ boxShadow: '0 0 40px rgba(255,69,58,0.15)' }}>
            <div className="text-8xl mb-4">💔</div>
            <div className="font-mono text-red-400 text-sm mb-2">СИСТЕМА ПРЕДУПРЕЖДАЕТ</div>
            <div className="bg-dark-800 rounded-xl p-4 text-left font-mono text-xs text-gray-400 border border-dark-500">
              <div className="text-red-400">❌ Домашнее задание не сдано</div>
              <div className="text-yellow-400 mt-1">⚡ Жизни: 3 → 2</div>
              <div className="text-gray-500 mt-1">📲 Мессенджер: отправлен пуш</div>
              <div className="text-neon-green mt-1">💡 "Осталось 2 жизни. Соберись!"</div>
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-6">
            Это <span className="text-white">невероятно мотивирует</span> детей и радует родителей.
            Ребёнок наконец-то делает всё сам.
          </p>
        </motion.div>
      </div>
    </div>
  </section>
)

// ── Teachers Section ───────────────────────────────────────────────────────────
const teachers = [
  { name: 'Николай К.', role: 'Школьные науки', achievement: 'Призер международных и победитель всероссийских олимпиад', emoji: '🎒' },
  { name: 'Земан Д.', role: 'Обществознание, История, Инастранные языки', achievement: 'Выпускник педогогического вуза, с большим опытом работы с детьми', emoji: '‍🎓' },
  { name: 'Данил Ф.', role: 'Системный аналитик, Веб-дизайнер', achievement: 'Разработка веб-приложений и системного анализа для крупных компаний. Опыт в it >5 лет', emoji: '👨‍💻' },
]
const TeachersSection = () => (
  <section id="teachers" className="py-24 px-4">
    <div className="max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <h2 className="section-heading">Преподаватели</h2>
        <p className="section-sub mx-auto">Тебя будут учить молодые профи, которые горят своим делом. Мы превращаем скучные параграфы в понятные лайфхаки. С нами ты не заметишь, как пролетит занятие. ВПЕРЕД ЗА ЗНАНИЯМИ!</p>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-6">
        {teachers.map((t, i) => (
          <motion.div key={t.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="cyber-card text-center">
            <div className="text-6xl mb-4">{t.emoji}</div>
            <h3 className="text-lg font-bold text-white mb-1">{t.name}</h3>
            <div className="text-xs font-mono text-neon-green mb-3">{t.role}</div>
            <p className="text-gray-500 text-sm">{t.achievement}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

// ── Pricing Section ────────────────────────────────────────────────────────────
const PricingSection = () => (
  <section id="pricing" className="py-24 px-4 bg-dark-800/50">
    <div className="max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <h2 className="section-heading">Выбери тариф</h2>
        <p className="section-sub mx-auto">Рекуррентная подписка. Отменить можно в любой момент.</p>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-8">
        {/* Listener */}
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="cyber-card flex flex-col">
          <div className="text-gray-500 text-xs font-mono uppercase tracking-widest mb-2">Слушатель</div>
          <div className="text-4xl font-black text-white mb-1">от 1 000 <span className="text-lg text-gray-500">₽/занятие</span></div>
          <p className="text-gray-500 text-sm mb-6">Попробовать и понять, что это круто</p>
          <ul className="space-y-3 mb-8">
            {['✅ 1 индивидуальное занятие (60 мин).',
              '✅ Проверка и разбор домашнего задания.',
              '✅ Общий чат техподдержки по вопросам платформы.',
              '✅ Диагностика знаний на первом уроке.',
              '✅ Оплата без обязательств за каждое занятие отдельно.',
              '..............'].map(f => (
                <li key={f} className={`text-sm ${f.startsWith('❌') ? 'text-gray-600' : 'text-gray-300'}`}>{f}</li>
              ))}
          </ul>
          <a href="mailto:hello@codeschool.ru" className="btn-neon-outline w-full text-center block mt-auto">Выбрать</a>
        </motion.div>
        {/* Student */}
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="cyber-card border-neon-green/40 relative overflow-hidden flex flex-col"
          style={{ boxShadow: '0 0 30px rgba(0,255,135,0.1)' }}>
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-neon-green to-transparent" />
          <div className="absolute top-3 right-3 px-2 py-0.5 bg-neon-green/20 border border-neon-green/40 rounded text-xs text-neon-green font-semibold">
            ⭐ Рекомендуем
          </div>
          <div className="text-neon-green text-xs font-mono uppercase tracking-widest mb-2">Студент</div>
          <div className="text-4xl font-black text-white mb-1">9 000 <span className="text-lg text-gray-500">₽/мес</span></div>
          <p className="text-gray-400 text-sm mb-6">Полное погружение с эффектом</p>
          <ul className="space-y-3 mb-8">
            {[
              '✅ 8 занятий + 8 вебинаров',
              '✅ Полный доступ ко всем видинарам',
              '✅ Глубокий разбор каждого ДЗ с советами',
              '✅ Преподаватель на связи постоянно.',
              '✅ Еженедельный отчет о прогрессе ученика',
              '✅ Выгода 1400₽',
            ].map(f => (
              <li key={f} className="text-sm text-gray-300">{f}</li>
            ))}
          </ul>
          <a href="mailto:hello@codeschool.ru" className="btn-neon w-full text-center block mt-auto">Записаться сейчас</a>
        </motion.div>
        {/* Webinars */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="cyber-card border-neon-purple/40 relative overflow-hidden flex flex-col"
          style={{ boxShadow: '0 0 30px rgba(191,90,242,0.1)' }}>
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-neon-purple to-transparent" />
          <div className="text-neon-purple text-xs font-mono uppercase tracking-widest mb-2">Вебинары</div>
          <div className="text-4xl font-black text-white mb-1">от 2 400 <span className="text-lg text-gray-500">₽/мес</span></div>
          <p className="text-gray-400 text-sm mb-6">Групповое обучение в потоке</p>
          <ul className="space-y-3 mb-8">
            {[
              '✅ 8 живых групповых вебинаров по расписанию.',
              '✅ Доступ к материалам',
              '✅ Групповой разбор типичных ошибок',
              '✅ Доступ в закрытый чат группы для общения и вопросов.',
              '✅ Общая статистика успеваемости в твоем учебном потоке',
              '✅ Минимальная цена за час качественного обучения.',
            ].map(f => (
              <li key={f} className={`text-sm ${f.startsWith('❌') ? 'text-gray-600' : 'text-gray-300'}`}>{f}</li>
            ))}
          </ul>
          <a href="mailto:hello@codeschool.ru" className="btn-neon-outline w-full text-center block mt-auto" style={{ borderColor: 'rgba(191,90,242,0.4)', color: '#bf5af2' }}>Выбрать</a>
        </motion.div>
      </div>
    </div>
  </section>
)

// ── FAQ Section ────────────────────────────────────────────────────────────────
const faqs = [
  { q: 'Какой возраст подходит?', a: 'У нас три потока: 8–12, 13–15 и 16–17 лет. Каждый со своей программой и темпом.' },
  { q: 'Что если пропустить вебинар?', a: 'Все вебинары записываются. Но дедлайн по ДЗ не передвигается — жизни горят у всех.' },
  { q: 'Нужен ли свой компьютер?', a: 'Да, нужен ноутбук или ПК. Планшет/телефон не подойдут для написания кода.' },
  { q: 'Можно ли вернуть деньги?', a: 'Если потерял все 3 жизни и переведён на «Слушатель» — возврата нет. За первые 3 дня возврат возможен.' },
  { q: 'Как происходит проверка ДЗ?', a: 'Ты загружаешь ссылку на GitHub или код. Куратор проверяет в течение 24 часов и оставляет фидбек — текстом или аудио.' },
]
const FAQSection = () => {
  const [open, setOpen] = useState(null)
  return (
    <section id="faq" className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="section-heading">Частые вопросы</h2>
        </motion.div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <motion.div key={f.q} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left p-4 bg-dark-700 border border-dark-500 hover:border-neon-green/30 rounded-xl transition-all duration-200 flex items-start justify-between gap-4"
              >
                <span className="font-semibold text-white">{f.q}</span>
                <span className={`text-neon-green text-xl transition-transform duration-200 ${open === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              {open === i && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                  className="px-4 py-3 text-gray-400 text-sm border-x border-b border-dark-500 rounded-b-xl bg-dark-800">
                  {f.a}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Footer ─────────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="border-t border-dark-500 py-12 px-4">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl font-mono font-black text-neon">&lt;CS/&gt;</span>
          <span className="font-extrabold text-white">CodeSchool</span>
        </div>
        <p className="text-gray-600 text-sm">© 2025 CodeSchool. Все права защищены.</p>
      </div>
      <div className="flex gap-6 text-sm text-gray-500">
        <a href="#" className="hover:text-neon-green transition-colors">Политика конфиденциальности</a>
        <a href="#" className="hover:text-neon-green transition-colors">Оферта</a>
        <a href="mailto:hello@codeschool.ru" className="hover:text-neon-green transition-colors">Контакты</a>
      </div>
    </div>
  </footer>
)

// ── Main Export ────────────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      <HeroSection />
      <ProblemsSection />
      <HowItWorksSection />
      <CoursesSection />
      <LivesSystemSection />
      <TeachersSection />
      <PricingSection />
      <FAQSection />
      <Footer />
    </div>
  )
}
