import { useState, Suspense, lazy } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
const OrderModal = lazy(() => import('./OrderModal'))
import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa'

// ── Navbar ─────────────────────────────────────────────────────────────────────
const Navbar = ({ openModal }) => {
  const [open, setOpen] = useState(false)
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/80 backdrop-blur-md border-b border-dark-500">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group cursor-pointer">
          <div className="relative flex items-center justify-center w-10 h-10 rounded bg-dark-800 border border-neon-purple/40 overflow-hidden shadow-[0_0_10px_rgba(191,90,242,0.2)] group-hover:shadow-[0_0_20px_rgba(191,90,242,0.6)] group-hover:border-neon-purple transition-all duration-300">
            <div className="absolute inset-0 bg-neon-purple/10 group-hover:bg-neon-purple/20 transition-colors" />
            <span className="relative z-10 text-lg font-mono font-black text-neon-purple drop-shadow-[0_0_5px_rgba(191,90,242,0.8)]">100</span>
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-black text-white text-lg leading-none tracking-wide uppercase transition-colors duration-300">
              С<span className="text-neon-green ml-[1px] mr-[1px] drop-shadow-[0_0_8px_rgba(0,255,135,0.8)]">100</span>ТЫЙ
            </span>
            <span className="text-[9px] text-gray-400 font-mono tracking-[0.3em] uppercase mt-1">
              Уровень
            </span>
          </div>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
          <a href="#courses" className="hover:text-neon-green transition-colors">Курсы</a>
          <a href="#lives" className="hover:text-neon-green transition-colors">Система жизней</a>
          <a href="#teachers" className="hover:text-neon-green transition-colors">Преподаватели</a>
          <a href="#pricing" className="hover:text-neon-green transition-colors">Тарифы</a>
          <a href="#faq" className="hover:text-neon-green transition-colors">FAQ</a>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => openModal({})} className="btn-neon text-sm px-4 py-2">Записаться</button>
        </div>
      </div>
    </nav>
  )
}

// ── Hero Section ───────────────────────────────────────────────────────────────
const HeroSection = ({ openModal }) => (
  <section id="hero" className="relative min-h-[100svh] w-full flex flex-col overflow-hidden pt-40">
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

    <div className="flex-grow flex items-center justify-center relative z-10 w-full py-10">
      <div className="max-w-5xl mx-auto px-4 text-center">
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
          <button onClick={() => openModal({})} className="btn-neon text-lg px-8 py-4 gap-2">
            🚀 Записаться на бесплатный урок
          </button>
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
    </div>

    {/* Scroll indicator */}
    <motion.div
      className="relative z-10 flex flex-col items-center gap-1 text-gray-600 text-xs pb-8 mt-auto shrink-0"
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
                    className="px-3 py-1.5 rounded-md bg-dark-800/80 border border-neon-purple/50"
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
const CoursesSection = ({ openModal }) => (
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
            <button
              onClick={() => openModal({ selectedProgram: c.level })}
              className={`mt-6 btn-neon-outline w-full text-center block text-sm py-2 ${c.featured ? 'border-neon-purple/40 text-neon-purple hover:bg-neon-purple hover:text-white' : ''}`}
            >
              Записаться →
            </button>
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
  { name: 'Данил З.', role: 'Обществознание, История, Английский язык', achievement: 'Выпускник педогогического вуза, с большим опытом работы с детьми', emoji: '‍🎓' },
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
const PricingSection = ({ openModal }) => (
  <section id="pricing" className="py-24 px-4 bg-dark-800/50">
    <div className="max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <h2 className="section-heading">Выбери тариф</h2>
        <p className="section-sub mx-auto">Любые предметы, которые у нас есть - просто нужно начать</p>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-8">
        {/* Listener */}
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="cyber-card flex flex-col">
          <div className="text-gray-500 text-xs font-mono uppercase tracking-widest mb-2">Слушатель</div>
          <div className="text-4xl font-black text-white mb-1">от 1 000 <span className="text-lg text-gray-500">₽/занятие</span></div>
          <p className="text-gray-500 text-sm mb-6">Попробовать и понять, что это круто</p>
          <ul className="space-y-3 mb-8">
            {['✅ 1 живое инд. занятие (60 мин)',
              '✅ Разовый разбор ДЗ',
              '✅ Определение уровня знаний',
              '✅ Оплата по факту — без привязки к расписанию.',
            ].map(f => (
              <li key={f} className={`text-sm ${f.startsWith('❌') ? 'text-gray-600' : 'text-gray-300'}`}>{f}</li>
            ))}
          </ul>
          <button onClick={() => openModal({ selectedTariff: 'listener' })} className="btn-neon-outline w-full text-center block mt-6 sm:mt-auto shrink-0">Выбрать</button>
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
              '✅ 8 инд. уроков + 8 вебинаров — комплексное обучение.',
              '✅ Разбор каждого ДЗ',
              '✅ Хорошая возможность попробовать несколько предметов',
              '✅ Связь с преподавателем 24/7',
              '✅ Еженедельный отчет для родителей',
              <span key="economy">
                ✅ Выгодный тариф с экономией{' '}
                <span className="inline-flex items-center px-1.5 py-0.5 bg-neon-green/10 border border-neon-green/40 rounded text-neon-green font-black drop-shadow-[0_0_8px_rgba(0,255,135,0.8)] relative">
                  <span className="absolute inset-0 bg-neon-green/20 animate-pulse rounded blur-sm"></span>
                  <span className="relative z-10">1400₽</span>
                </span>
              </span>,
            ].map((f, i) => (
              <li key={i} className="text-sm text-gray-300">{f}</li>
            ))}
          </ul>
          <button onClick={() => openModal({ selectedTariff: 'student' })} className="btn-neon w-full text-center block mt-6 sm:mt-auto shrink-0">Записаться сейчас</button>
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
              '✅ Групповой разбор типичных ошибок',
              '✅ Доступ в закрытый чат группы для общения и вопросов.',
              '✅ Общая статистика успеваемости в твоем учебном потоке',
              '✅ Минимальная цена — самый бюджетный час обучения.',
            ].map(f => (
              <li key={f} className={`text-sm ${f.startsWith('❌') ? 'text-gray-600' : 'text-gray-300'}`}>{f}</li>
            ))}
          </ul>
          <button onClick={() => openModal({ selectedTariff: 'webinar' })} className="btn-neon-outline w-full text-center block mt-6 sm:mt-auto shrink-0" style={{ borderColor: 'rgba(191,90,242,0.4)', color: '#bf5af2' }}>Выбрать</button>
        </motion.div>
      </div>
    </div>
  </section>
)

// ── FAQ Section ────────────────────────────────────────────────────────────────
const faqs = [
  { q: 'Какой возраст подходит?', a: 'Наши программы рассчитаны на детей и подростков, и взрослых от 8 до 25 лет, разделенные по уровням сложности.' },
  { q: 'Что если пропустить вебинар?', a: 'Будет возможность перенести занятие, если оно индивидуальное. Если групповое, то будет запись вебинара. В тарифе "Студент" - работает более гибкая система переносов.' },
  { q: 'Нужен ли свой компьютер?', a: 'Да, потребуется ноутбук или ПК. Для младших групп достаточно среднего устройства.' },
  { q: 'Можно ли вернуть деньги?', a: 'Да, мы возвращаем деньги в течение первых двух недель (14 дней), если формат вам не подойдет. Минусуется только цена уже пройденных занятий с учетом дейсвтующей скидки' },
  { q: 'Как происходит проверка ДЗ?', a: 'Проверяем работу вручную, после чего, на следующем занятии исправляем ошибки и делаем так, чтобы вы поняли тему лучше. ' },
]

const AccordionItem = ({ faq, isOpen, onClick }) => (
  <motion.div
    layout="position"
    className="bg-dark-900/40 border border-dark-700 hover:border-neon-purple/50 rounded-xl mb-4 overflow-hidden transition-colors duration-300"
    initial={false}
  >
    <button
      onClick={onClick}
      className="w-full text-left p-4 flex items-center justify-between gap-4 select-none"
    >
      <span className="font-semibold text-white text-base leading-relaxed">{faq.q}</span>
      <motion.span
        className="text-neon-green text-2xl font-light transform origin-center flex-shrink-0"
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        +
      </motion.span>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className="px-4 pb-4 pt-0 text-gray-400 text-sm leading-relaxed border-t border-dark-700/50 mt-1">
            {faq.a}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
)

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null)
  return (
    <section id="faq" className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="section-heading">Частые вопросы</h2>
        </motion.div>
        <div>
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Privacy Modal ──────────────────────────────────────────────────────────────
const PrivacyModal = ({ onClose }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-dark-900/80 backdrop-blur-sm" onClick={onClose}>
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      onClick={(e) => e.stopPropagation()}
      className="relative w-full max-w-2xl bg-dark-900 border border-neon-purple rounded-2xl shadow-[0_0_30px_rgba(191,90,242,0.2)] flex flex-col"
    >
      <div className="p-6 border-b border-neon-purple/20">
        <h2 className="text-2xl font-black text-white">Политика конфиденциальности</h2>
      </div>
      <div className="p-6 overflow-y-auto max-h-[60vh] text-gray-400 text-sm space-y-4 font-mono custom-scrollbar">
        <p>Настоящая Политика конфиденциальности описывает, как мы собираем, используем и защищаем вашу информацию...</p>
        <p>1. Сбор информации<br/>Мы собираем информацию при регистрации на сайте, оформлении заявки и использовании функционала платформы.</p>
        <p>2. Использование информации<br/>Личный данные используются исключительно для связи по поводу занятий, улучшения платформы и персонализации процесса обучения.</p>
        <p>3. Защита личных данных<br/>Ваши данные надежно защищены. Мы не передаем их третьим лицам без вашего согласия (за исключением случаев, предусмотренных законом).</p>
        <p>4. Согласие<br/>Пользуясь нашим сайтом, вы автоматически соглашаетесь с нашей политикой конфиденциальности.</p>
      </div>
      <div className="p-6 border-t border-neon-purple/20 flex justify-end">
        <button onClick={onClose} className="btn-neon px-6 py-2">Закрыть</button>
      </div>
    </motion.div>
  </div>
)

// ── Footer ─────────────────────────────────────────────────────────────────────
const Footer = () => {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false)
  return (
    <>
      <footer className="border-t border-dark-500 py-12 px-4 bg-dark-900/50">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
      {/* Left Zone: Logo & Copyright */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left">
        <div className="flex items-center gap-3 group mb-4">
          <div className="relative flex items-center justify-center w-10 h-10 rounded bg-dark-800 border border-neon-purple/40 overflow-hidden shadow-[0_0_10px_rgba(191,90,242,0.2)] group-hover:shadow-[0_0_20px_rgba(191,90,242,0.6)] group-hover:border-neon-purple transition-all duration-300">
            <div className="absolute inset-0 bg-neon-purple/10 group-hover:bg-neon-purple/20 transition-colors" />
            <span className="relative z-10 text-lg font-mono font-black text-neon-purple drop-shadow-[0_0_5px_rgba(191,90,242,0.8)]">100</span>
          </div>
          <div className="flex flex-col justify-center items-start">
            <span className="font-black text-white text-lg leading-none tracking-wide uppercase transition-colors duration-300">
              С<span className="text-neon-green ml-[1px] mr-[1px] drop-shadow-[0_0_8px_rgba(0,255,135,0.8)]">100</span>ТЫЙ
            </span>
            <span className="text-[9px] text-gray-400 font-mono tracking-[0.3em] uppercase mt-1">
              Уровень
            </span>
          </div>
        </div>
        <p className="text-gray-600 text-sm">© 2026 С100ТЫЙ УРОВЕНЬ. Все права защищены.</p>
      </div>

      {/* Right Zone: Contacts & Links */}
      <div className="flex flex-col items-center md:items-end gap-5">
        {/* Contacts (Phone + Socials) */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <a
            href="tel:+79058043110"
            className="font-mono text-neon-green text-xl hover:text-white transition-colors drop-shadow-[0_0_5px_rgba(0,255,135,0.4)]"
          >
            +7 (905) 804-31-10
          </a>
          <div className="flex items-center gap-5 text-2xl">
            <a
              href="https://t.me/BNp0D0KTpAnnA"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 transition-all duration-300 hover:text-neon-purple hover:drop-shadow-[0_0_8px_rgba(191,90,242,0.8)] hover:scale-110"
              aria-label="Telegram"
            >
              <FaTelegramPlane />
            </a>
            <a
              href="https://max.ru/u/f9LHodD0cOJH9YLhQHH7ahys0fzwdOZZfVcPexgH8nLQBtS8XZ0L9GN6yuI"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 font-black text-xl tracking-widest transition-all duration-300 hover:text-neon-purple hover:drop-shadow-[0_0_8px_rgba(191,90,242,0.8)] hover:scale-110"
              aria-label="WhatsApp"
            >
              MAX
            </a>
          </div>
        </div>

        {/* Legal Links (Privacy, Offer) */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
          <a href="#" rel="nofollow" onClick={(e) => { e.preventDefault(); setIsPrivacyOpen(true); }} className="hover:text-neon-green transition-colors cursor-pointer">Политика конфиденциальности</a>
          {/* <a href="#" className="hover:text-neon-green transition-colors">Оферта</a> */}
        </div>
      </div>
    </div>
  </footer>
      <AnimatePresence>
        {isPrivacyOpen && <PrivacyModal onClose={() => setIsPrivacyOpen(false)} />}
      </AnimatePresence>
    </>
  )
}

// ── Main Export ────────────────────────────────────────────────────────────────
export default function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalData, setModalData] = useState({})

  const openModal = (data = {}) => {
    setModalData(data)
    setModalOpen(true)
  }
  const closeModal = () => setModalOpen(false)

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar openModal={openModal} />
      <HeroSection openModal={openModal} />
      <ProblemsSection />
      <HowItWorksSection />
      <CoursesSection openModal={openModal} />
      <LivesSystemSection />
      <TeachersSection />
      <PricingSection openModal={openModal} />
      <FAQSection />
      <Footer />
      <Suspense fallback={null}>
        <OrderModal isOpen={modalOpen} onClose={closeModal} initialData={modalData} />
      </Suspense>
    </div>
  )
}
