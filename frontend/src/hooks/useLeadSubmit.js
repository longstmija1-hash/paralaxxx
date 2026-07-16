'use client'

import { useState, useCallback } from 'react'
import { toast } from 'react-hot-toast'
import { validateLeadForm, buildLeadPayload } from '../lib/leadFormUtils'

const TOAST_SUCCESS = {
  style: { border: '1px solid #059669', color: '#059669', background: '#ffffff' },
  icon: null,
}

const TOAST_ERROR = {
  style: { border: '1px solid #ef4444', color: '#ef4444', background: '#ffffff' },
  icon: null,
}

export function useLeadSubmit({ variant = 'modal', tariffLabel, onSuccess } = {}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  const submit = useCallback(
    async (form) => {
      const errs = validateLeadForm(form)
      if (Object.keys(errs).length) {
        setErrors(errs)
        return false
      }

      setErrors({})
      setIsSubmitting(true)

      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
        const payload = buildLeadPayload(form, { tariffLabel, variant })

        const response = await fetch(`${apiUrl}/api/leads`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })

        if (!response.ok) {
          const err = await response.json().catch(() => ({}))
          throw new Error(err?.detail || `Server error: ${response.status}`)
        }

        toast.success('Заявка отправлена! Мы свяжемся с вами в ближайшее время.', TOAST_SUCCESS)
        onSuccess?.()
        return true
      } catch (error) {
        console.error(error)
        toast.error('Не удалось отправить заявку. Попробуйте позже.', TOAST_ERROR)
        return false
      } finally {
        setIsSubmitting(false)
      }
    },
    [variant, tariffLabel, onSuccess],
  )

  const clearErrors = useCallback(() => setErrors({}), [])

  return { submit, isSubmitting, errors, setErrors, clearErrors }
}
