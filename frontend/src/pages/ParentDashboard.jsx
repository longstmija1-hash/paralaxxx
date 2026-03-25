import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { HeartDisplay } from './StudentDashboard'

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

export default function ParentDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [childId] = useState(1) // In real app: show child selector if multiple children

  useEffect(() => {
    axios.get(`/api/dashboard/parent/${childId}`)
      .then(r => setData(r.data))
      .catch(() => {
        // Demo data
        setData({
          child: { id: 1, name: 'Алёша', email: 'alesha@test.ru', plan: 'student' },
          gamification: { lives_count: 2, coin_balance: 145, reset_at: new Date(Date.now() + 7 * 24*60*60*1000) },
          homeworkReport: [
            { lesson_title: 'Введение в Python', course_title: 'Middle: Python + Алгебра', status: 'accepted', deadline: new Date(Date.now() - 2*24*60*60*1000), submitted_at: new Date(Date.now() - 3*24*60*60*1000), curator_comment: 'Отличная работа!', lives_count: 2 },
            { lesson_title: 'Функции и циклы', course_title: 'Middle: Python + Алгебра', status: 'overdue', deadline: new Date(Date.now() - 1*24*60*60*1000), submitted_at: null, curator_comment: null, lives_count: 2 },
            { lesson_title: 'Списки и словари', course_title: 'Middle: Python + Алгебра', status: 'pending', deadline: new Date(Date.now() + 3*24*60*60*1000), submitted_at: null, curator_comment: null, lives_count: 2 },
          ],
          subscription: { plan: 'student', status: 'active', expires_at: new Date(Date.now() + 20*24*60*60*1000), price_rub: 390000 },
        })
      })
      .finally(() => setLoading(false))
  }, [childId])

  const handleLogout = () => { logout(); navigate('/') }

  if (loading) return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center">
      <div className="text-neon animate-pulse font-mono">Загрузка...</div>
    </div>
  )

  const { child, gamification: gam, homeworkReport, subscription } = data || {}
  const totalHw = homeworkReport?.length || 0
  const acceptedHw = homeworkReport?.filter(h => h.status === 'accepted').length || 0
  const overdueHw = homeworkReport?.filter(h => h.status === 'overdue').length || 0

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Nav */}
      <nav className="bg-dark-800 border-b border-dark-500 px-4 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link to="/" className="font-mono font-black text-neon text-xl">&lt;CS/&gt;</Link>
          <span className="text-gray-600">|</span>
          <span className="text-white font-semibold">Кабинет родителя</span>
        </div>
        <button onClick={handleLogout} className="text-xs text-gray-600 hover:text-red-400 transition-colors border border-dark-500 rounded-lg px-3 py-1.5">
          Выйти
        </button>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-black text-white mb-6">
            Отчёт по ученику: <span className="text-neon">{child?.name}</span>
          </h1>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Жизни', value: null, lives: gam?.lives_count },
            { label: 'Коины', value: `🪙 ${gam?.coin_balance || 0}`, color: 'text-yellow-400' },
            { label: 'Сдано ДЗ', value: `${acceptedHw}/${totalHw}`, color: 'text-neon-green' },
            { label: 'Просрочено', value: overdueHw, color: overdueHw > 0 ? 'text-red-400' : 'text-neon-green' },
          ].map((card, i) => (
            <motion.div key={card.label}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="cyber-card text-center">
              <div className="text-xs text-gray-500 font-mono uppercase tracking-wide mb-2">{card.label}</div>
              {card.lives !== undefined ? (
                <div className="flex justify-center">
                  <HeartDisplay lives={card.lives} />
                </div>
              ) : (
                <div className={`text-2xl font-black ${card.color || 'text-white'}`}>{card.value}</div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Subscription Card */}
        {subscription && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="cyber-card mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-sm font-bold text-white mb-1">
                Подписка: {subscription.plan === 'student' ? '⭐ Студент' : '📺 Слушатель'}
              </div>
              <div className="text-xs text-gray-500">
                Действует до: {new Date(subscription.expires_at).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
                {' · '}
                {(subscription.price_rub / 100).toLocaleString('ru-RU')} ₽/мес
              </div>
            </div>
            <button className="btn-neon text-sm px-4 py-2 whitespace-nowrap">
              💳 Продлить подписку
            </button>
          </motion.div>
        )}

        {/* Homework Report Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="cyber-card overflow-x-auto">
          <h2 className="text-lg font-bold text-white mb-4">📋 Отчёт по домашним заданиям</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 border-b border-dark-500 text-xs uppercase tracking-wide font-mono">
                <th className="text-left py-3 pr-4">Тема урока</th>
                <th className="text-left py-3 pr-4 hidden sm:table-cell">Курс</th>
                <th className="text-left py-3 pr-4">Статус ДЗ</th>
                <th className="text-left py-3 pr-4 hidden md:table-cell">Дедлайн</th>
                <th className="text-left py-3 pr-4 hidden lg:table-cell">Комментарий куратора</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-500">
              {(homeworkReport || []).map((hw, i) => (
                <tr key={i} className="hover:bg-dark-600/50 transition-colors">
                  <td className="py-3 pr-4 font-medium text-white">{hw.lesson_title}</td>
                  <td className="py-3 pr-4 text-gray-500 hidden sm:table-cell text-xs">{hw.course_title}</td>
                  <td className="py-3 pr-4"><HwStatusPill status={hw.status} /></td>
                  <td className="py-3 pr-4 text-gray-500 hidden md:table-cell text-xs">
                    {new Date(hw.deadline).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
                    {hw.status === 'overdue' && <span className="text-red-400 ml-1">⚠️</span>}
                  </td>
                  <td className="py-3 pr-4 text-gray-500 hidden lg:table-cell text-xs italic">
                    {hw.curator_comment || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  )
}
