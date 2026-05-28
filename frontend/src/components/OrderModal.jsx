import { useState, useEffect, useCallback } from 'react'

import { toast } from 'react-hot-toast'

const PROGRAMS = [
  {
    group: 'Школьные предметы',
    options: ['Математика', 'Русский язык', 'Физика', 'Химия', 'Биология'],
  },
  {
    group: 'Экзамены',
    options: ['ОГЭ Информатика', 'ЕГЭ Информатика', 'ЕГЭ Математика'],
  },
  {
    group: 'IT-Навыки',
    options: ['Scratch', 'Roblox', 'Python', 'Web-разработка'],
  },
]

const TARIFF_LABELS = {
  listener: 'Слушатель',
  student: 'Студент',
  webinar: 'Вебинары',
}

const EMPTY_FORM = {
  parentName: '',
  childName: '',
  childAge: '',
  program: '',
  phone: '',
  social: '',
}

function formatPhone(raw) {
  let digits = raw.replace(/\D/g, '')
  if (digits.startsWith('8')) digits = '7' + digits.slice(1)
  if (!digits.startsWith('7')) digits = '7' + digits
  digits = digits.slice(0, 11)

  let out = '+7'
  if (digits.length > 1) out += ' (' + digits.slice(1, 4)
  if (digits.length >= 4) out += ') ' + digits.slice(4, 7)
  if (digits.length >= 7) out += '-' + digits.slice(7, 9)
  if (digits.length >= 9) out += '-' + digits.slice(9, 11)
  return out
}

export default function OrderModal({ isOpen, onClose, initialData = {} }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Prefill program/tariff when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsSubmitting(false)
      setErrors({})
      setForm({
        ...EMPTY_FORM,
        program: initialData.selectedProgram || '',
      })
    }
  }, [isOpen, initialData.selectedProgram])

  // Close on Escape
  const handleKey = useCallback(
    (e) => { if (e.key === 'Escape') onClose() },
    [onClose],
  )
  useEffect(() => {
    if (isOpen) window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, handleKey])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const set = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const handlePhone = (e) => {
    const formatted = formatPhone(e.target.value)
    setForm((f) => ({ ...f, phone: formatted }))
  }

  const validate = () => {
    const errs = {}
    if (!form.parentName.trim()) errs.parentName = 'Обязательное поле'
    if (!form.childName.trim()) errs.childName = 'Обязательное поле'
    if (!form.childAge || isNaN(form.childAge) || +form.childAge < 5 || +form.childAge > 25)
      errs.childAge = 'Введите возраст (5–25)'
    if (!form.program) errs.program = 'Выберите программу'
    const digits = form.phone.replace(/\D/g, '')
    if (digits.length < 11) errs.phone = 'Введите полный номер'
    return errs
  }

  const tariffLabel = initialData.selectedTariff
    ? TARIFF_LABELS[initialData.selectedTariff] ?? initialData.selectedTariff
    : null

  const sendToBackend = async (formData) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

    const response = await fetch(`${apiUrl}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        parentName: formData.parentName,
        childName: formData.childName,
        childAge: Number(formData.childAge),
        program: formData.program,
        tariff: formData.tariff || null,
        phone: formData.phone,
        social: formData.social || null,
      }),
    })

    if (!response.ok) {
      const err = await response.json().catch(() => ({}))
      throw new Error(err?.detail || `Server error: ${response.status}`)
    }

    return response.json()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setIsSubmitting(true)
    try {
      await sendToBackend({ ...form, tariff: tariffLabel })
      toast.success('SYSTEM: DATA TRANSMITTED SUCCESSFULLY.', {
        style: { border: '1px solid #00ff87', color: '#00ff87', background: '#050508' },
        icon: null
      })
      onClose()
    } catch (error) {
      console.error(error)
      toast.error('ERROR: DATA UPLINK FAILED.', {
        style: { border: '1px solid #ff453a', color: '#ff453a', background: '#050508' },
        icon: null
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {isOpen && (
        <div
          key="overlay"
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal window */}
          <div
            key="window"
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-dark-900 border-2 border-neon-purple z-10"
            style={{ boxShadow: '0 0 40px rgba(191,90,242,0.4), 0 0 80px rgba(191,90,242,0.15)' }}
          >
            {/* Top accent line */}
            <div className="h-px bg-gradient-to-r from-transparent via-neon-purple to-transparent" />

            <div className="p-6 sm:p-8">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg border border-dark-500 text-gray-500 hover:text-white hover:border-neon-purple/50 transition-all duration-200"
                aria-label="Закрыть"
              >
                ✕
              </button>

              <div
                key="form"
              >
                {/* Header */}
                <div className="mb-6">
                  <h2 className="text-2xl font-black text-white">
                    Записаться на обучение
                  </h2>
                  {tariffLabel && (
                    <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-purple/10 border border-neon-purple/30 text-neon-purple text-xs font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-neon-purple" />
                      Тариф: {tariffLabel}
                    </div>
                  )}
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {/* Parent Name */}
                  <Field label="ФИО родителя" error={errors.parentName} required>
                    <input
                      id="parentName"
                      type="text"
                      placeholder="Иванова Мария Ивановна"
                      className={`cyber-input ${errors.parentName ? 'border-red-500/60' : ''}`}
                      value={form.parentName}
                      onChange={set('parentName')}
                      autoComplete="name"
                    />
                  </Field>

                  {/* Child Name */}
                  <Field label="ФИО ребёнка" error={errors.childName} required>
                    <input
                      id="childName"
                      type="text"
                      placeholder="Иванов Алексей"
                      className={`cyber-input ${errors.childName ? 'border-red-500/60' : ''}`}
                      value={form.childName}
                      onChange={set('childName')}
                    />
                  </Field>

                  {/* Age */}
                  <Field label="Возраст ребёнка" error={errors.childAge} required>
                    <input
                      id="childAge"
                      type="number"
                      placeholder="14"
                      min={5}
                      max={25}
                      className={`cyber-input ${errors.childAge ? 'border-red-500/60' : ''}`}
                      value={form.childAge}
                      onChange={set('childAge')}
                    />
                  </Field>

                  {/* Program */}
                  <Field label="Желаемая программа" error={errors.program} required>
                    <select
                      id="program"
                      className={`cyber-input appearance-none cursor-pointer ${errors.program ? 'border-red-500/60' : ''}`}
                      value={form.program}
                      onChange={set('program')}
                      style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2300ff87' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
                    >
                      <option value="" disabled>Выберите программу...</option>
                      {PROGRAMS.map((g) => (
                        <optgroup key={g.group} label={g.group}>
                          {g.options.map((o) => (
                            <option key={o} value={o}>{o}</option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </Field>

                  {/* Phone */}
                  <Field label="Номер телефона" error={errors.phone} required>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      className={`cyber-input ${errors.phone ? 'border-red-500/60' : ''}`}
                      value={form.phone}
                      onChange={handlePhone}
                      inputMode="tel"
                    />
                  </Field>

                  {/* Social */}
                  <Field label="Соц. сеть / мессенджер" hint="Необязательно">
                    <input
                      id="social"
                      type="text"
                      placeholder="@username или ссылка на профиль"
                      className="cyber-input"
                      value={form.social}
                      onChange={set('social')}
                    />
                  </Field>

                  {/* Submit */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`btn-neon w-full py-4 text-base font-bold tracking-wide ${isSubmitting ? 'opacity-70 pointer-events-none' : ''}`}
                    >
                      {isSubmitting ? '📡 CONNECTING TO SERVER....' : '🚀 Отправить заявку'}
                    </button>
                    <p className="text-center text-gray-600 text-xs mt-3">
                      Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

/* ── Helper: Form Field wrapper ────────────────────────────── */
function Field({ label, error, hint, required, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-mono text-gray-400 uppercase tracking-widest flex items-center gap-2">
        {label}
        {required && <span className="text-neon-purple">*</span>}
        {hint && <span className="text-gray-600 normal-case tracking-normal">{hint}</span>}
      </label>
      {children}
      {error && (
        <span className="text-red-400 text-xs font-mono">⚠ {error}</span>
      )}
    </div>
  )
}
