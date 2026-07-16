export const EMPTY_FORM = {
  parentName: '',
  childName: '',
  childAge: '',
  program: '',
  phone: '',
  email: '',
  social: '',
  consent: false,
}

export function formatPhone(raw) {
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

/** Simple name / phone / email form (Umschool-style) for all variants */
export function validateLeadForm(form) {
  const errs = {}

  if (!form.parentName.trim()) errs.parentName = 'Обязательное поле'
  const digits = form.phone.replace(/\D/g, '')
  if (digits.length < 11) errs.phone = 'Введите полный номер'
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errs.email = 'Введите корректный email'
  }
  if (!form.consent) errs.consent = 'Необходимо согласие'

  return errs
}

export function buildLeadPayload(form, { tariffLabel, variant = 'modal' } = {}) {
  const name = form.parentName.trim()
  const program =
    form.program ||
    (variant === 'inline' ? 'Бесплатная консультация' : 'Заявка на обучение')

  return {
    parentName: name,
    childName: form.childName.trim() || name,
    childAge: form.childAge ? Number(form.childAge) : 12,
    program,
    tariff: tariffLabel || null,
    phone: form.phone,
    social: form.email.trim() || form.social.trim() || null,
  }
}
