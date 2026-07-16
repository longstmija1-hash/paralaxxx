/** Матрица тарифов (Тандем): трек времени → класс → фокус → Стандарт / Про / Премиум
 *
 * Стандарт — один трек (фундамент ИЛИ IT)
 * Про — комплекс школа + IT
 * Премиум — комплекс + наставничество основателей
 */

export const PLAN_TRACKS = [
  {
    id: 'university',
    label: 'Обучение со следующего класса до поступления в вуз',
    shortLabel: 'До вуза',
  },
  {
    id: 'year',
    label: 'Обучение на весь следующий учебный год',
    shortLabel: 'На год',
  },
]

export const GRADES_BY_TRACK = {
  university: [8, 9, 10, 11],
  year: [7, 8, 9, 10, 11],
}

export const FOCUS_OPTIONS = [
  { id: 'focusSchool', label: 'Фундамент', shortLabel: 'Школа' },
  { id: 'focusIt', label: 'IT-трек', shortLabel: 'IT' },
  { id: 'focusComplex', label: 'Школа + IT', shortLabel: 'Комплекс' },
]

const STANDARD_FEATURES = [
  'Один трек на выбор: фундамент или IT',
  'Занятия и материалы по выбранному направлению',
  'Домашние задания с проверкой куратора',
  'Система жизней и наград',
  'Ответы в чате в течение рабочего дня',
  'Ежемесячный отчёт для родителя',
]

const PRO_FEATURES = [
  'Комплекс: школьный фундамент + IT-трек',
  'Всё из тарифа «Стандарт» по обоим направлениям',
  'Приоритетная проверка ДЗ',
  'Согласованная нагрузка без выгорания',
  'Мини-созвон с куратором 1 раз в месяц',
  'Отчёты по школе и IT в одном окне',
]

const PREMIUM_FEATURES = [
  'Всё из тарифа «Про»',
  'Личные консультации с основателями',
  'Наставничество по стратегии на год',
  'Ускоренная проверка работ',
  'Индивидуальные ДЗ под слабые места',
  'Приоритет в расписании и слотах',
]

function tandemPrices(base) {
  const school = {
    current: Math.round(base * 0.72),
    original: Math.round(base * 0.85),
    discount: 15,
  }
  const it = {
    current: Math.round(base * 0.68),
    original: Math.round(base * 0.8),
    discount: 15,
  }
  const complex = {
    current: Math.round(base * 1.05),
    original: Math.round(base * 1.25),
    discount: 16,
  }
  return { school, it, complex }
}

function buildTandemTiers(base) {
  const p = tandemPrices(base)
  return [
    {
      id: 'standard',
      name: 'Стандарт',
      badge: null,
      tagline: 'Одно направление: фундамент или IT. Базовая поддержка без лишнего.',
      prices: {
        focusSchool: p.school,
        focusIt: p.it,
      },
      features: STANDARD_FEATURES,
      includesTier: null,
    },
    {
      id: 'pro',
      name: 'Про',
      badge: 'Популярный',
      tagline: 'Комплекс школа + IT. Закрываете учёбу и навыки на одной платформе.',
      prices: {
        focusComplex: {
          current: p.complex.current + 8200,
          original: p.complex.original + 11000,
          discount: 18,
        },
      },
      features: PRO_FEATURES,
      includesTier: null,
    },
    {
      id: 'premium',
      name: 'Премиум',
      badge: 'С основателями',
      tagline: 'Максимальное погружение и наставничество Николая К. и Данила Ф.',
      prices: {
        focusComplex: {
          current: p.complex.current + 16800,
          original: p.complex.original + 21000,
          discount: 18,
        },
      },
      features: PREMIUM_FEATURES,
      includesTier: 'Про',
    },
  ]
}

const PACKAGE_BY_GRADE = {
  7: {
    items: [
      'Летняя подготовка перед 7 классом',
      'Годовой фундамент 7 класса',
      'Доступ к IT-треку по выбранному тарифу',
    ],
    base: 35120,
  },
  8: {
    items: [
      'Летняя подготовка перед 8 классом',
      'Годовой фундамент 8 класса',
      'Доступ к IT-треку по выбранному тарифу',
    ],
    base: 38000,
  },
  9: {
    items: [
      'Летняя подготовка перед 9 классом',
      'Год с упором на ОГЭ (математика, русский, физика)',
      'IT-проекты без перегруза перед экзаменом',
    ],
    base: 50355,
  },
  10: {
    items: [
      'Летняя подготовка перед 10 классом',
      'Годовой фундамент + старт профиля ЕГЭ',
      'IT-трек: Frontend или системная аналитика',
    ],
    base: 47705,
  },
  11: {
    items: [
      'Летняя подготовка перед 11 классом',
      'Предбанник ЕГЭ по ключевым предметам',
      'IT-портфолио к поступлению',
    ],
    base: 46080,
  },
}

export function getGradeConfig(grade) {
  const pkg = PACKAGE_BY_GRADE[grade]
  if (!pkg) return null

  return {
    grade,
    packageItems: pkg.items,
    subjectOptions: FOCUS_OPTIONS,
    tiers: buildTandemTiers(pkg.base),
  }
}

export const TARIFF_MODAL_MAP = {
  standard: 'standard',
  pro: 'pro',
  premium: 'premium',
}
