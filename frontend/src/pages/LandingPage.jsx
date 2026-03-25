import { useState } from 'react'
import { Link } from 'react-router-dom'
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
          <Link to="/login" className="btn-neon-outline text-sm px-4 py-2 hidden sm:flex">Войти</Link>
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
        <span className="text-white">через</span>{' '}
        <span className="text-neon-purple" style={{ textShadow: '0 0 20px rgba(191,90,242,0.5)' }}>
          создание игр
        </span>{' '}
        <span className="text-white">и</span>{' '}
        <span className="text-neon" style={{ textShadow: '0 0 20px rgba(0,255,135,0.5)' }}>
          программирование
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
        className="text-xl text-gray-400 max-w-2xl mx-auto mb-10"
      >
        Изучаем Python, Web и Game Dev, решая реальные школьные задачи.
        Жёсткая дисциплина, коины, мерч и живые кураторы. Без скуки.
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
          { value: '500+', label: 'учеников' },
          { value: '95%', label: 'досдают ДЗ' },
          { value: '3', label: 'жизни in game' },
          { value: '0', label: 'скучных уроков' },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-3xl font-black text-neon">{s.value}</div>
            <div className="text-sm text-gray-500">{s.label}</div>
          </div>
        ))}
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
              { emoji: '📉', text: 'Плохие оценки по математике и информатике' },
              { emoji: '💸', text: 'Платишь репетиторам — результата ноль' },
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
            <h3 className="text-xl font-bold text-neon">Для тебя</h3>
          </div>
          <ul className="space-y-4">
            {[
              { emoji: '🎮', text: 'Хочу делать свои игры, а не слушать скучные уроки' },
              { emoji: '💰', text: 'Хочу зарабатывать деньги на коде до 18' },
              { emoji: '😤', text: 'Обычные репетиторы — душнилы без шуток' },
              { emoji: '🏆', text: 'Хочу поступить в нормальный IT-вуз' },
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
  { icon: '📺', title: '2 вебинара в неделю', desc: 'Живые уроки с крутыми преподами-разработчиками' },
  { icon: '💻', title: 'Домашнее задание', desc: 'Практика: код на GitHub, симуляции, проекты' },
  { icon: '✅', title: 'Проверка куратором', desc: 'Живой фидбек, аудиокомменты, "принять / доработать"' },
  { icon: '❤️', title: 'Жизни и Коины', desc: 'Вовремя — +монеты. Просрочил — —жизнь. Игра по-настоящему' },
  { icon: '🚀', title: 'Результат', desc: 'Портфолио, знания и крутые оценки в школе' },
]
const HowItWorksSection = () => (
  <section className="py-24 px-4 bg-dark-800/50">
    <div className="max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <h2 className="section-heading">Как проходит обучение</h2>
      </motion.div>
      <div className="flex flex-col md:flex-row gap-0">
        {steps.map((step, i) => (
          <motion.div key={step.title}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="flex-1 relative"
          >
            {i < steps.length - 1 && (
              <div className="hidden md:block absolute top-8 right-0 w-full h-0.5 bg-gradient-to-r from-neon-green/40 to-transparent z-0" />
            )}
            <div className="cyber-card mx-2 relative z-10 text-center">
              <div className="text-4xl mb-3">{step.icon}</div>
              <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-neon-green/20 text-neon-green text-xs font-bold mb-3">
                {i + 1}
              </div>
              <h3 className="font-bold text-white mb-2 text-sm">{step.title}</h3>
              <p className="text-gray-500 text-xs">{step.desc}</p>
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
    level: 'Junior', age: '8–12 лет', color: 'neon-green', emoji: '🟢',
    subjects: ['Scratch + Логика', 'Roblox Studio', 'Базовая математика'],
    desc: 'Создаём первые игры и учимся думать алгоритмами. Школьная программа 3–6 класс.',
  },
  {
    level: 'Middle', age: '13–15 лет', color: 'neon-purple', emoji: '🟣',
    subjects: ['Python + Алгебра', 'Web-дизайн + HTML/CSS', 'Информатика'],
    desc: 'Python, веб и алгебра вместе. Пишем калькулятор квадратных уравнений, строим сайты.',
    featured: true,
  },
  {
    level: 'Senior', age: '16–17 лет', color: 'neon-blue', emoji: '🔵',
    subjects: ['C++ / Python (ОГЭ/ЕГЭ)', 'Подготовка к экзаменам', 'Алгоритмы'],
    desc: 'Готовимся к ЕГЭ по информатике и математике. Олимпиадный уровень.',
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
            Не сдал домашку до дедлайна — сгорает 1 жизнь и ты получаешь пуш в Telegram.
          </p>
          <div className="space-y-4">
            {[
              { icon: '❤️❤️❤️', label: '3 жизни', desc: 'Всё отлично, продолжаешь в тарифе со Студент' },
              { icon: '❤️❤️🖤', label: '2 жизни', desc: 'Пропустил один дедлайн. Собирайся!' },
              { icon: '❤️🖤🖤', label: '1 жизнь', desc: 'Критическая ситуация. Куратор выходит на связь' },
              { icon: '💀💀💀', label: '0 жизней', desc: 'Ты переведён на тариф «Слушатель». Возврата денег нет.' },
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
              <div className="text-red-400">❌ Deadline missed</div>
              <div className="text-yellow-400 mt-1">⚡ Lives: 3 → 2</div>
              <div className="text-gray-500 mt-1">📲 Telegram: отправлен пуш</div>
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
  { name: 'Алексей К.', role: 'Python & ML Lead', achievement: 'Разработчик в Яндексе, ЕГЭ 100 баллов', emoji: '👨‍💻' },
  { name: 'Маша Д.', role: 'Web & Design', achievement: 'МФТИ, разработала 3 продукта в продакшне', emoji: '👩‍🎨' },
  { name: 'Дима Р.', role: 'Game Dev (Unity)', achievement: 'Инди-разработчик, 50k загрузок в Steam', emoji: '🎮' },
]
const TeachersSection = () => (
  <section id="teachers" className="py-24 px-4">
    <div className="max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <h2 className="section-heading">Преподаватели</h2>
        <p className="section-sub mx-auto">Молодые разработчики и студенты топовых вузов. Без скуки и «откройте учебник».</p>
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
    <div className="max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <h2 className="section-heading">Выбери тариф</h2>
        <p className="section-sub mx-auto">Рекуррентная подписка. Отменить можно в любой момент.</p>
      </motion.div>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Listener */}
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="cyber-card">
          <div className="text-gray-500 text-xs font-mono uppercase tracking-widest mb-2">Слушатель</div>
          <div className="text-4xl font-black text-white mb-1">1 900 <span className="text-lg text-gray-500">₽/мес</span></div>
          <p className="text-gray-500 text-sm mb-6">Посмотреть, понять, попробовать</p>
          <ul className="space-y-3 mb-8">
            {['✅ Доступ к вебинарам и записям', '✅ Автопроверка тестов', '❌ Личный куратор', '❌ Ручная проверка кода', '❌ Чат группы', '❌ Система жизней и коинов'].map(f => (
              <li key={f} className={`text-sm ${f.startsWith('❌') ? 'text-gray-600' : 'text-gray-300'}`}>{f}</li>
            ))}
          </ul>
          <a href="mailto:hello@codeschool.ru" className="btn-neon-outline w-full text-center block">Выбрать</a>
        </motion.div>
        {/* Student */}
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="cyber-card border-neon-green/40 relative overflow-hidden"
          style={{ boxShadow: '0 0 30px rgba(0,255,135,0.1)' }}>
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-neon-green to-transparent" />
          <div className="absolute top-3 right-3 px-2 py-0.5 bg-neon-green/20 border border-neon-green/40 rounded text-xs text-neon-green font-semibold">
            ⭐ Рекомендуем
          </div>
          <div className="text-neon-green text-xs font-mono uppercase tracking-widest mb-2">Студент</div>
          <div className="text-4xl font-black text-white mb-1">3 900 <span className="text-lg text-gray-500">₽/мес</span></div>
          <p className="text-gray-400 text-sm mb-6">Полное погружение с эффектом</p>
          <ul className="space-y-3 mb-8">
            {[
              '✅ Вебинары + записи навсегда',
              '✅ Ручная проверка ДЗ кодом',
              '✅ Личный куратор (до 30 чел/группа)',
              '✅ Чат группы и куратора',
              '✅ Система 3-х жизней',
              '✅ Коины и магазин мерча',
            ].map(f => (
              <li key={f} className="text-sm text-gray-300">{f}</li>
            ))}
          </ul>
          <a href="mailto:hello@codeschool.ru" className="btn-neon w-full text-center block">Записаться сейчас</a>
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
