import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

const HwStatusPill = ({ status }) => {
  const map = {
    pending: { label: 'Ожидает сдачи', cls: 'status-pending' },
    submitted: { label: 'На проверке', cls: 'status-submitted' },
    accepted: { label: '✅ Принято!', cls: 'status-accepted' },
    revision: { label: '🔁 Доработка', cls: 'status-revision' },
    overdue: { label: '💀 Просрочено', cls: 'status-overdue' },
  }
  const s = map[status] || map.pending
  return <span className={s.cls}>{s.label}</span>
}

export default function LessonPage() {
  const { courseId, lessonId } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({ githubUrl: '', codeSnippet: '' })
  const [activeTab, setActiveTab] = useState('video') // video | hw | notes

  const fetchLesson = () => {
    axios.get(`/api/courses/${courseId}/lessons/${lessonId}`)
      .then(r => setData(r.data))
      .catch(() => toast.error('Не удалось загрузить урок'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchLesson() }, [courseId, lessonId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.githubUrl && !form.codeSnippet) {
      toast.error('Добавь ссылку на GitHub или код')
      return
    }
    setSubmitting(true)
    try {
      const { data: res } = await axios.post('/api/homeworks/submit', {
        lessonId: parseInt(lessonId),
        githubUrl: form.githubUrl || undefined,
        codeSnippet: form.codeSnippet || undefined,
      })
      toast.success(`ДЗ сдано! +${res.coinsEarned} 🪙`)
      fetchLesson()
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || 'Ошибка сдачи ДЗ'
      toast.error(msg)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center">
      <div className="text-neon animate-pulse font-mono">Загрузка урока...</div>
    </div>
  )

  const { lesson, homework } = data || {}
  const isBanned = user?.plan === 'listener' && homework?.status === 'overdue'
  const isAccepted = homework?.status === 'accepted'
  const isSubmitted = homework?.status === 'submitted'

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Header */}
      <div className="bg-dark-800 border-b border-dark-500 px-4 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="text-gray-500 hover:text-neon-green transition-colors text-sm">
            ← Назад
          </button>
          <div className="flex-1 min-w-0">
            <div className="text-xs text-gray-600 font-mono mb-0.5">Урок {lesson?.order_num}</div>
            <h1 className="text-white font-bold truncate">{lesson?.title}</h1>
          </div>
          {homework && <HwStatusPill status={homework.status} />}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Main: Video + Tabs */}
          <div className="lg:col-span-2 space-y-4">

            {/* Video Player */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="w-full bg-dark-800 border border-dark-500 rounded-2xl overflow-hidden"
              style={{ boxShadow: '0 0 30px rgba(0,0,0,0.5)' }}>
              {lesson?.video_url ? (
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    src={lesson.video_url}
                    className="absolute inset-0 w-full h-full"
                    allowFullScreen
                    frameBorder="0"
                    allow="autoplay; fullscreen"
                    title={lesson.title}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 text-gray-600">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🎬</div>
                    <p className="text-sm">Видео скоро будет доступно</p>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Tabs */}
            <div className="flex gap-2 bg-dark-800 rounded-xl p-1 border border-dark-500">
              {[
                { id: 'video', label: '⏱ Тайм-коды' },
                { id: 'notes', label: '📄 Конспект' },
                { id: 'hw', label: '💻 ДЗ' },
              ].map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                    activeTab === tab.id ? 'bg-neon-green text-dark-900' : 'text-gray-500 hover:text-white'
                  }`}>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="cyber-card">
              {/* Timecodes */}
              {activeTab === 'video' && (
                <div>
                  <h3 className="font-bold text-white mb-4">Тайм-коды</h3>
                  {lesson?.timecodes?.length > 0 ? (
                    <div className="space-y-2">
                      {lesson.timecodes.map((tc, i) => (
                        <div key={i} className="flex items-center gap-4 p-2 hover:bg-dark-600 rounded-lg cursor-pointer group">
                          <span className="font-mono text-neon-green text-sm min-w-[50px]">{tc.time}</span>
                          <span className="text-gray-400 text-sm group-hover:text-white transition-colors">{tc.label}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-600 text-sm">
                      <div className="space-y-2">
                        {[['00:00', 'Введение'], ['05:30', 'Теория'], ['15:00', 'Практика'], ['30:00', 'Разбор задачи']].map(([t, l]) => (
                          <div key={t} className="flex items-center gap-4 p-2 hover:bg-dark-600 rounded-lg cursor-pointer group">
                            <span className="font-mono text-neon-green text-sm min-w-[50px]">{t}</span>
                            <span className="text-gray-500 text-sm group-hover:text-gray-300 transition-colors">{l}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Notes / PDF */}
              {activeTab === 'notes' && (
                <div>
                  <h3 className="font-bold text-white mb-4">Конспект урока</h3>
                  {lesson?.pdf_url ? (
                    <a href={lesson.pdf_url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 btn-neon-outline text-sm">
                      📄 Скачать PDF
                    </a>
                  ) : (
                    <p className="text-gray-500 text-sm">Конспект добавляется после урока</p>
                  )}
                  {lesson?.description && (
                    <p className="text-gray-400 text-sm mt-4 leading-relaxed">{lesson.description}</p>
                  )}
                </div>
              )}

              {/* HW Submission */}
              {activeTab === 'hw' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-white">Домашнее задание</h3>
                    {homework?.deadline && (
                      <span className="text-xs font-mono text-gray-500">
                        Дедлайн: {new Date(homework.deadline).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    )}
                  </div>

                  {isAccepted ? (
                    <div className="text-center py-6">
                      <div className="text-4xl mb-2">🎉</div>
                      <p className="text-neon-green font-semibold">ДЗ принято куратором!</p>
                      {homework?.curator_comment && (
                        <div className="mt-3 p-3 bg-dark-600 rounded-xl text-gray-400 text-sm italic">
                          "{homework.curator_comment}"
                        </div>
                      )}
                    </div>
                  ) : isSubmitted ? (
                    <div className="text-center py-4">
                      <div className="text-3xl mb-2">⏳</div>
                      <p className="text-blue-400 font-semibold">ДЗ на проверке у куратора</p>
                      <p className="text-gray-500 text-sm mt-1">Обычно проверяем в течение 24 часов</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {homework?.status === 'revision' && homework?.curator_comment && (
                        <div className="p-3 bg-orange-500/10 border border-orange-500/30 rounded-xl text-sm text-orange-300">
                          <strong>Комментарий куратора:</strong> {homework.curator_comment}
                        </div>
                      )}
                      <div>
                        <label className="block text-xs text-gray-500 mb-1 font-mono">Ссылка на GitHub</label>
                        <input
                          type="url"
                          value={form.githubUrl}
                          onChange={e => setForm(f => ({ ...f, githubUrl: e.target.value }))}
                          className="cyber-input"
                          placeholder="https://github.com/username/repo"
                        />
                      </div>
                      <div className="text-center text-gray-600 text-xs">или</div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1 font-mono">Вставь код прямо здесь</label>
                        <textarea
                          value={form.codeSnippet}
                          onChange={e => setForm(f => ({ ...f, codeSnippet: e.target.value }))}
                          className="cyber-input h-32 resize-none font-mono text-xs"
                          placeholder="# Вставь свой код сюда&#10;def solution():&#10;    pass"
                        />
                      </div>
                      <button type="submit" disabled={submitting}
                        className="btn-neon w-full disabled:opacity-50 disabled:cursor-not-allowed">
                        {submitting ? 'Отправляю...' : '🚀 Сдать ДЗ'}
                      </button>
                      <p className="text-xs text-gray-600 text-center">
                        За своевременную сдачу — +10 🪙 коинов
                      </p>
                    </form>
                  )}
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Lesson info */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              className="cyber-card">
              <h3 className="font-bold text-white mb-3">О уроке</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Статус ДЗ</span>
                  <HwStatusPill status={homework?.status || 'pending'} />
                </div>
                {homework?.submitted_at && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Сдано</span>
                    <span className="text-gray-400 text-xs">{new Date(homework.submitted_at).toLocaleDateString('ru-RU')}</span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Quick nav */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
              className="cyber-card">
              <h3 className="font-bold text-white mb-3">Навигация</h3>
              <div className="space-y-2">
                <Link to="/dashboard" className="flex items-center gap-2 text-gray-500 hover:text-neon-green text-sm transition-colors p-2 rounded-lg hover:bg-dark-600">
                  🏠 Дашборд
                </Link>
                <Link to="/shop" className="flex items-center gap-2 text-gray-500 hover:text-neon-green text-sm transition-colors p-2 rounded-lg hover:bg-dark-600">
                  🛒 Магазин коинов
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
