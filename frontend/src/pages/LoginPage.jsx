import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const [tab, setTab] = useState('login') // 'login' | 'register'
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' })
  const [loading, setLoading] = useState(false)
  const { login, register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      let user
      if (tab === 'login') {
        user = await login(form.email, form.password)
      } else {
        user = await register(form.name, form.email, form.password, form.role)
      }
      toast.success(`Добро пожаловать, ${user.name}! 🎮`)
      const redirects = { student: '/dashboard', parent: '/parent', curator: '/curator', admin: '/dashboard' }
      navigate(redirects[user.role] || '/')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Ошибка авторизации')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-900 cyber-bg flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,255,135,0.06) 0%, transparent 70%)' }} />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <span className="text-3xl font-mono font-black text-neon">&lt;CS/&gt;</span>
            <span className="font-extrabold text-white text-xl">CodeSchool</span>
          </Link>
          <p className="text-gray-500 text-sm mt-2">Войди в игру 🎮</p>
        </div>

        <div className="cyber-card border-neon-green/20" style={{ boxShadow: '0 0 30px rgba(0,255,135,0.08)' }}>
          {/* Tabs */}
          <div className="flex bg-dark-800 rounded-xl p-1 mb-6">
            {['login', 'register'].map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${tab === t ? 'bg-neon-green text-dark-900' : 'text-gray-500 hover:text-white'}`}>
                {t === 'login' ? 'Войти' : 'Регистрация'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === 'register' && (
              <div>
                <label className="block text-xs text-gray-500 mb-1 font-mono">Имя</label>
                <input name="name" value={form.name} onChange={handleChange}
                  className="cyber-input" placeholder="Алексей Иванов" required />
              </div>
            )}
            <div>
              <label className="block text-xs text-gray-500 mb-1 font-mono">Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange}
                className="cyber-input" placeholder="alex@email.com" required />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1 font-mono">Пароль</label>
              <input name="password" type="password" value={form.password} onChange={handleChange}
                className="cyber-input" placeholder="••••••••" required />
            </div>
            {tab === 'register' && (
              <div>
                <label className="block text-xs text-gray-500 mb-1 font-mono">Роль</label>
                <select name="role" value={form.role} onChange={handleChange}
                  className="cyber-input">
                  <option value="student">Ученик</option>
                  <option value="parent">Родитель</option>
                  <option value="curator">Куратор</option>
                </select>
              </div>
            )}
            <button type="submit" disabled={loading}
              className="btn-neon w-full mt-2 disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'Загрузка...' : tab === 'login' ? 'Войти →' : 'Создать аккаунт →'}
            </button>
          </form>
        </div>

        <div className="text-center mt-4">
          <Link to="/" className="text-gray-600 text-sm hover:text-neon-green transition-colors">
            ← Вернуться на главную
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
