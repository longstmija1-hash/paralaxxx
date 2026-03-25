import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

// ── Heart Display Component ────────────────────────────────────────────────────
export const HeartDisplay = ({ lives, maxLives = 3 }) => {
  const [animating, setAnimating] = useState(false)
  const [prev, setPrev] = useState(lives)

  useEffect(() => {
    if (lives < prev) {
      setAnimating(true)
      setTimeout(() => setAnimating(false), 700)
    }
    setPrev(lives)
  }, [lives, prev])

  return (
    <div className="flex items-center gap-2">
      {[...Array(maxLives)].map((_, i) => {
        const isAlive = i < lives
        return (
          <motion.div key={i}
            animate={animating && i === lives ? {
              scale: [1, 1.4, 0.7, 1],
              rotate: [0, -10, 10, 0],
              filter: ['brightness(1)', 'brightness(0.3)', 'brightness(1)'],
            } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative"
          >
            <span className={`text-3xl leading-none transition-all duration-300 ${
              isAlive ? 'drop-shadow-[0_0_8px_rgba(255,59,48,0.8)]' : 'grayscale opacity-30'
            } ${animating && i === lives ? 'animate-heart-break' : ''}`}>
              {isAlive ? '❤️' : '🖤'}
            </span>
          </motion.div>
        )
      })}
    </div>
  )
}

// ── Coin Badge ─────────────────────────────────────────────────────────────────
const CoinBadge = ({ balance }) => (
  <div className="flex items-center gap-2 bg-dark-600 border border-yellow-500/30 rounded-xl px-4 py-2"
    style={{ boxShadow: '0 0 15px rgba(255,214,10,0.15)' }}>
    <span className="text-2xl">🪙</span>
    <div>
      <div className="text-xs text-gray-500 font-mono">Коины</div>
      <div className="text-xl font-black text-yellow-400">{balance.toLocaleString()}</div>
    </div>
  </div>
)

// ── Dashboard Navbar ───────────────────────────────────────────────────────────
const DashboardNav = ({ user, onLogout }) => (
  <nav className="bg-dark-800 border-b border-dark-500 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
    <div className="flex items-center gap-4">
      <Link to="/" className="font-mono font-black text-neon text-xl">&lt;CS/&gt;</Link>
      <div className="hidden sm:flex items-center gap-6 text-sm text-gray-500">
        <Link to="/dashboard" className="hover:text-neon-green transition-colors">Дашборд</Link>
        <Link to="/shop" className="hover:text-neon-green transition-colors">🛒 Магазин</Link>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <div className="hidden sm:block text-right">
        <div className="text-sm font-semibold text-white">{user?.name}</div>
        <div className="text-xs text-gray-500 capitalize">{user?.plan === 'student' ? '⭐ Студент' : '📺 Слушатель'}</div>
      </div>
      <button onClick={onLogout}
        className="text-xs text-gray-600 hover:text-red-400 transition-colors border border-dark-500 rounded-lg px-3 py-1.5">
        Выйти
      </button>
    </div>
  </nav>
)

// ── HW Status Pill ─────────────────────────────────────────────────────────────
const HwStatusPill = ({ status }) => {
  const map = {
    pending: { label: 'Ожидает', cls: 'status-pending' },
    submitted: { label: 'Сдано', cls: 'status-submitted' },
    accepted: { label: '✅ Принято', cls: 'status-accepted' },
    revision: { label: '🔁 Доработка', cls: 'status-revision' },
    overdue: { label: '💀 Просрочено', cls: 'status-overdue' },
  }
  const s = map[status] || map.pending
  return <span className={s.cls}>{s.label}</span>
}

// ── Main Dashboard ─────────────────────────────────────────────────────────────
export default function StudentDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/api/dashboard/student')
      .then(r => setData(r.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const handleLogout = () => { logout(); navigate('/') }

  if (loading) return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center">
      <div className="text-neon text-xl animate-pulse font-mono">Загружаем данные...</div>
    </div>
  )

  const gam = data?.gamification || { lives_count: 3, coin_balance: 0 }
  const isBanned = gam.lives_count === 0

  return (
    <div className="min-h-screen bg-dark-900">
      <DashboardNav user={user} onLogout={handleLogout} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Ban Alert */}
        {isBanned && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/40 rounded-xl p-4 mb-6 flex items-start gap-3"
            style={{ boxShadow: '0 0 20px rgba(255,69,58,0.2)' }}>
            <span className="text-2xl">💀</span>
            <div>
              <p className="font-bold text-red-400">Ты исчерпал все жизни!</p>
              <p className="text-gray-400 text-sm">Доступ к сдаче ДЗ и куратору заблокирован. Твой тариф снижен до «Слушателя». Обратись в поддержку.</p>
            </div>
          </motion.div>
        )}

        {/* Header: Lives + Coins */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="cyber-card border-neon-green/20 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h1 className="text-2xl font-black text-white mb-1">
                Привет, {user?.name}! {isBanned ? '💀' : '🎮'}
              </h1>
              <p className="text-gray-500 text-sm">
                {isBanned
                  ? 'Все жизни потеряны. Собирайся.'
                  : `План: ${user?.plan === 'student' ? '⭐ Студент' : '📺 Слушатель'} · Жизни сбросятся ${new Date(gam.reset_at).toLocaleDateString('ru-RU')}`
                }
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div>
                <div className="text-xs text-gray-600 font-mono mb-2 uppercase tracking-widest">Жизни</div>
                <HeartDisplay lives={gam.lives_count} />
              </div>
              <CoinBadge balance={gam.coin_balance} />
            </div>
          </div>
        </motion.div>

        {/* Progress bar (mock based on completed HWs) */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="cyber-card mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-gray-400 font-semibold">Прогресс курса</span>
            <span className="text-sm font-mono text-neon-green">
              {data?.overdueHomeworks?.filter(h => h.status === 'accepted')?.length || 0} / {data?.upcomingLessons?.length || 0} уроков
            </span>
          </div>
          <div className="w-full h-3 bg-dark-600 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: '35%' }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-full rounded-full bg-gradient-to-r from-neon-green to-neon-blue"
              style={{ boxShadow: '0 0 10px rgba(0,255,135,0.5)' }}
            />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Upcoming lessons */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="cyber-card">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span>📅</span> Ближайшие уроки
            </h2>
            {(data?.upcomingLessons?.length === 0) ? (
              <p className="text-gray-600 text-sm">Нет предстоящих уроков</p>
            ) : (
              <div className="space-y-3">
                {(data?.upcomingLessons || []).map((lesson) => (
                  <Link key={lesson.id} to={`/lesson/1/${lesson.id}`}
                    className="block p-3 bg-dark-600 border border-dark-400 hover:border-neon-green/30 rounded-xl transition-all group">
                    <div className="text-sm font-semibold text-white group-hover:text-neon-green transition-colors">{lesson.title}</div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-600">{lesson.course_title}</span>
                      {lesson.hw_deadline && (
                        <span className="text-xs text-gray-600">
                          ДЗ до: {new Date(lesson.hw_deadline).toLocaleDateString('ru-RU')}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </motion.div>

          {/* My Homeworks */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="cyber-card">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span>📝</span> Мои домашки
            </h2>
            {(data?.overdueHomeworks?.length === 0) ? (
              <div className="text-center py-6">
                <div className="text-3xl mb-2">🎉</div>
                <p className="text-neon-green text-sm">Всё сдано! Красавчик.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {(data?.overdueHomeworks || []).map((hw) => (
                  <div key={hw.id} className="p-3 bg-dark-600 border border-dark-400 rounded-xl">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-sm text-white font-medium">{hw.lesson_title}</span>
                      <HwStatusPill status={hw.status} />
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      Дедлайн: {new Date(hw.deadline).toLocaleDateString('ru-RU', { day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Recent Coins */}
        {data?.recentCoins?.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="cyber-card mt-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span>🪙</span> Последние начисления
            </h2>
            <div className="space-y-2">
              {data.recentCoins.map((tx, i) => (
                <div key={i} className="flex items-center justify-between text-sm p-2 rounded-lg bg-dark-600">
                  <span className="text-gray-400">{tx.reason}</span>
                  <span className={`font-bold font-mono ${tx.amount > 0 ? 'text-neon-green' : 'text-red-400'}`}>
                    {tx.amount > 0 ? '+' : ''}{tx.amount} 🪙
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
