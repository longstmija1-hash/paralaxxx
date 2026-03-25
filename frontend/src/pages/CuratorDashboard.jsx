import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

const HwStatusPill = ({ status }) => {
  const map = {
    submitted: { label: '📬 На проверке', cls: 'status-submitted' },
    accepted: { label: '✅ Принято', cls: 'status-accepted' },
    revision: { label: '🔁 Доработка', cls: 'status-revision' },
  }
  const s = map[status] || { label: status, cls: 'status-pending' }
  return <span className={s.cls}>{s.label}</span>
}

export default function CuratorDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [reviewing, setReviewing] = useState(null)
  const [comment, setComment] = useState('')
  const [selectedHw, setSelectedHw] = useState(null)
  const [tab, setTab] = useState('queue') // queue | students

  useEffect(() => {
    axios.get('/api/dashboard/curator')
      .then(r => setData(r.data))
      .catch(() => {
        // Demo data
        setData({
          curator: user,
          students: [
            { id: 1, name: 'Алёша К.', email: 'alesha@test.ru', plan: 'student', lives_count: 2, coin_balance: 145 },
            { id: 2, name: 'Миша В.', email: 'misha@test.ru', plan: 'student', lives_count: 3, coin_balance: 230 },
            { id: 3, name: 'Даша П.', email: 'dasha@test.ru', plan: 'listener', lives_count: 0, coin_balance: 80 },
          ],
          hwQueue: [
            { id: 1, student_name: 'Алёша К.', student_id: 1, lesson_title: 'Функции и аргументы', submitted_at: new Date(Date.now() - 2*60*60*1000), deadline: new Date(Date.now() + 1*24*60*60*1000), github_url: 'https://github.com/alesha/python-hw1', code_snippet: null },
            { id: 2, student_name: 'Миша В.', student_id: 2, lesson_title: 'Циклы for и while', submitted_at: new Date(Date.now() - 5*60*60*1000), deadline: new Date(Date.now() - 12*60*60*1000), github_url: null, code_snippet: 'for i in range(10):\n    print(i)' },
          ],
        })
      })
      .finally(() => setLoading(false))
  }, [])

  const handleReview = async (hwId, action) => {
    setReviewing(hwId)
    try {
      await axios.patch(`/api/homeworks/${hwId}/review`, { action, comment })
      toast.success(action === 'accept' ? '✅ ДЗ принято!' : '🔁 Отправлено на доработку')
      // Remove from queue
      setData(d => ({ ...d, hwQueue: d.hwQueue.filter(h => h.id !== hwId) }))
      setSelectedHw(null)
      setComment('')
    } catch (err) {
      toast.error('Ошибка при проверке')
    } finally {
      setReviewing(null)
    }
  }

  const handleLogout = () => { logout(); navigate('/') }

  if (loading) return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center">
      <div className="text-neon animate-pulse font-mono">Загрузка...</div>
    </div>
  )

  const { students, hwQueue } = data || {}

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Nav */}
      <nav className="bg-dark-800 border-b border-dark-500 px-4 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link to="/" className="font-mono font-black text-neon text-xl">&lt;CS/&gt;</Link>
          <span className="text-gray-600">|</span>
          <span className="text-white font-semibold">Рабочий стол куратора</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500 hidden sm:block">{user?.name}</span>
          <button onClick={handleLogout} className="text-xs text-gray-600 hover:text-red-400 transition-colors border border-dark-500 rounded-lg px-3 py-1.5">
            Выйти
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Учеников', value: students?.length || 0, color: 'text-neon-green' },
            { label: 'На проверке', value: hwQueue?.length || 0, color: hwQueue?.length > 0 ? 'text-yellow-400' : 'text-neon-green' },
            { label: 'Без жизней', value: students?.filter(s => s.lives_count === 0).length || 0, color: 'text-red-400' },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="cyber-card text-center">
              <div className="text-xs text-gray-500 font-mono mb-1 uppercase tracking-wide">{s.label}</div>
              <div className={`text-3xl font-black ${s.color}`}>{s.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 bg-dark-800 rounded-xl p-1 border border-dark-500 mb-6 max-w-xs">
          {[
            { id: 'queue', label: `📬 Очередь (${hwQueue?.length || 0})` },
            { id: 'students', label: `👥 Ученики` },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${tab === t.id ? 'bg-neon-green text-dark-900' : 'text-gray-500 hover:text-white'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* HW Queue */}
        {tab === 'queue' && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Queue list */}
            <div>
              {hwQueue?.length === 0 ? (
                <div className="cyber-card text-center py-12">
                  <div className="text-4xl mb-3">🎉</div>
                  <p className="text-neon-green font-semibold">Очередь пуста!</p>
                  <p className="text-gray-600 text-sm mt-1">Все ДЗ проверены</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {hwQueue?.map((hw) => {
                    const isOverdue = new Date(hw.deadline) < new Date()
                    return (
                      <motion.div key={hw.id}
                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                        onClick={() => setSelectedHw(hw)}
                        className={`cyber-card cursor-pointer border transition-all ${selectedHw?.id === hw.id ? 'border-neon-green/50 glow-green' : 'border-dark-500 hover:border-neon-green/20'}`}>
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div>
                            <div className="font-bold text-white">{hw.student_name}</div>
                            <div className="text-sm text-gray-500">{hw.lesson_title}</div>
                          </div>
                          {isOverdue && <span className="text-xs text-red-400 font-mono">Просрочено</span>}
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-600">
                          <span>Сдано: {new Date(hw.submitted_at).toLocaleDateString('ru-RU', { hour: '2-digit', minute: '2-digit' })}</span>
                          <span>{hw.github_url ? '🔗 GitHub' : '💻 Код'}</span>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Review Panel */}
            {selectedHw && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                className="cyber-card border-neon-green/20 h-fit sticky top-24">
                <h3 className="font-bold text-white mb-1">{selectedHw.student_name}</h3>
                <p className="text-gray-500 text-sm mb-4">{selectedHw.lesson_title}</p>

                {/* Submission */}
                {selectedHw.github_url && (
                  <div className="mb-4">
                    <div className="text-xs text-gray-500 font-mono mb-1">GitHub</div>
                    <a href={selectedHw.github_url} target="_blank" rel="noopener noreferrer"
                      className="text-neon-blue text-sm hover:underline break-all">
                      {selectedHw.github_url}
                    </a>
                  </div>
                )}
                {selectedHw.code_snippet && (
                  <div className="mb-4">
                    <div className="text-xs text-gray-500 font-mono mb-1">Код</div>
                    <pre className="bg-dark-800 border border-dark-500 rounded-xl p-3 text-neon-green text-xs overflow-auto max-h-40 font-mono">
                      {selectedHw.code_snippet}
                    </pre>
                  </div>
                )}

                {/* Comment */}
                <div className="mb-4">
                  <label className="block text-xs text-gray-500 font-mono mb-1">Комментарий</label>
                  <textarea
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    className="cyber-input h-24 resize-none text-sm"
                    placeholder="Отлично! Или: доработай функцию calculate()..."
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleReview(selectedHw.id, 'accept')}
                    disabled={reviewing === selectedHw.id}
                    className="flex-1 py-2 bg-neon-green/20 border border-neon-green/40 text-neon-green rounded-xl text-sm font-semibold hover:bg-neon-green hover:text-dark-900 transition-all disabled:opacity-50">
                    ✅ Принять
                  </button>
                  <button
                    onClick={() => handleReview(selectedHw.id, 'revision')}
                    disabled={reviewing === selectedHw.id}
                    className="flex-1 py-2 bg-orange-500/10 border border-orange-500/30 text-orange-400 rounded-xl text-sm font-semibold hover:bg-orange-500/20 transition-all disabled:opacity-50">
                    🔁 Доработать
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* Students List */}
        {tab === 'students' && (
          <div className="space-y-3">
            {students?.map((student, i) => (
              <motion.div key={student.id}
                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="cyber-card flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-dark-600 border border-dark-400 flex items-center justify-center text-sm font-bold text-white">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{student.name}</div>
                    <div className="text-xs text-gray-500">{student.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center hidden sm:block">
                    <div className="text-xs text-gray-600 mb-1">Жизни</div>
                    <div className="flex gap-1">
                      {[...Array(3)].map((_, i) => (
                        <span key={i} className={`text-lg ${i < student.lives_count ? '' : 'grayscale opacity-30'}`}>
                          {i < student.lives_count ? '❤️' : '🖤'}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-center hidden md:block">
                    <div className="text-xs text-gray-600 mb-1">Коины</div>
                    <div className="text-yellow-400 font-bold">🪙 {student.coin_balance}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-600 mb-1">Тариф</div>
                    <div className={`text-xs font-semibold ${student.plan === 'student' ? 'text-neon-green' : 'text-gray-500'}`}>
                      {student.plan === 'student' ? '⭐ Студент' : '📺 Слушатель'}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
