/** Матрица тарифов: трек → класс → тарифы */

export const PLAN_TRACKS = [
  {
    id: 'university',
    label: 'Обучение со следующего класса до поступления в вуз под ключ',
    shortLabel: 'До вуза',
  },
  {
    id: 'year',
    label: 'Обучение на весь следующий год под ключ',
    shortLabel: 'На год',
  },
]

export const GRADES_BY_TRACK = {
  university: [8, 9, 10, 11],
  year: [7, 8, 9, 10, 11],
}

const MIDDLE_FEATURES = {
  standard: [
    'Прохождение школьной программы по выбранным предметам',
    'Вебинары с разбором тем',
    'Конспекты и дополнительные материалы',
    'Домашние задания после занятий',
    'Куратор и чат поддержки',
    'Тренажёр для закрепления тем',
    'Ежемесячная статистика для родителя',
  ],
  proExtra: [
    'Помощь с домашними заданиями',
    'Шпаргалки по ключевым темам',
    'Мини-тесты после тем',
    'Индивидуальный созвон с куратором (1 раз в месяц)',
    'Групповые консультации с преподавателями',
  ],
  premiumExtra: [
    'Контрольные и проверочные работы',
    'Индивидуальные ДЗ от куратора',
    '2 индивидуальных созвона с куратором в месяц',
    'Ускоренная проверка работ',
  ],
}

const EXAM_FEATURES = {
  standard: [
    'Все необходимые учебные материалы и занятия',
    'Диагностика знаний на старте',
    'Индивидуальная траектория обучения',
    'Ответы на вопросы в течение 5 минут',
    'Домашние задания — до 48 часов',
    'Пробные экзамены — до 72 часов',
  ],
  proExtra: [
    'Личное сопровождение',
    'Помощь со школьными домашними заданиями',
    'Несколько ИДЗ от куратора в месяц',
    'Индивидуальные зачёты — 30 мин/мес по предмету',
    'Куратор-предметник с проверкой ДЗ',
  ],
  premiumExtra: [
    'Личный куратор по нужному предмету',
    'Безлимитные ИДЗ от куратора',
    'Индивидуальные уроки — 60 мин/мес по предмету',
    'Домашние задания — до 24 часов',
    'Пробные экзамены — до 48 часов',
  ],
}

function middlePrices(base) {
  return {
    subjects14: {
      current: Math.round(base * 0.7),
      original: Math.round(base * 0.82),
      discount: 15,
    },
    subjects5: {
      current: Math.round(base * 0.85),
      original: Math.round(base),
      discount: 15,
    },
  }
}

function examPrices(base) {
  return {
    subjects1: {
      current: Math.round(base * 0.9),
      original: Math.round(base),
      discount: 10,
    },
    subjects4: {
      current: Math.round(base * 2.2),
      original: Math.round(base * 4.4),
      discount: 50,
    },
  }
}

function buildMiddleTiers(base) {
  const prices = middlePrices(base)
  return [
    {
      id: 'standard',
      name: 'Стандарт',
      badge: null,
      tagline: 'База для стабильной учёбы и понимания тем',
      prices,
      features: MIDDLE_FEATURES.standard,
      includesTier: null,
    },
    {
      id: 'pro',
      name: 'Про',
      badge: 'Популярный',
      tagline: 'Контроль прогресса и усиленная практика',
      prices: {
        subjects14: {
          current: prices.subjects14.current + 7600,
          original: prices.subjects14.original + 8900,
          discount: 15,
        },
        subjects5: {
          current: prices.subjects5.current + 9600,
          original: prices.subjects5.original + 11200,
          discount: 15,
        },
      },
      features: MIDDLE_FEATURES.proExtra,
      includesTier: 'Стандарт',
    },
    {
      id: 'premium',
      name: 'Премиум',
      badge: 'Выгодный',
      tagline: 'Максимум внимания и персонализации',
      prices: {
        subjects14: {
          current: prices.subjects14.current + 14500,
          original: prices.subjects14.original + 17000,
          discount: 15,
        },
        subjects5: {
          current: prices.subjects5.current + 18600,
          original: prices.subjects5.original + 21900,
          discount: 15,
        },
      },
      features: MIDDLE_FEATURES.premiumExtra,
      includesTier: 'Про',
    },
  ]
}

function buildExamTiers(base) {
  const prices = examPrices(base)
  return [
    {
      id: 'standard',
      name: 'Стандарт',
      badge: null,
      tagline: 'Базовая поддержка на курсе',
      prices,
      features: EXAM_FEATURES.standard,
      includesTier: null,
    },
    {
      id: 'pro',
      name: 'Про',
      badge: 'Популярный',
      tagline: 'Больше поддержки и персональной работы',
      prices: {
        subjects1: {
          current: prices.subjects1.current + 10500,
          original: prices.subjects1.original + 11700,
          discount: 10,
        },
        subjects4: {
          current: prices.subjects4.current + 33000,
          original: prices.subjects4.original + 62000,
          discount: 47,
        },
      },
      features: EXAM_FEATURES.proExtra,
      includesTier: 'Стандарт',
    },
    {
      id: 'premium',
      name: 'Премиум',
      badge: 'Выгодный',
      tagline: 'Максимальная поддержка и контроль за подготовкой',
      prices: {
        subjects1: {
          current: prices.subjects1.current + 27500,
          original: prices.subjects1.original + 30600,
          discount: 10,
        },
        subjects4: {
          current: prices.subjects4.current + 35000,
          original: prices.subjects4.original + 83000,
          discount: 58,
        },
      },
      features: EXAM_FEATURES.premiumExtra,
      includesTier: 'Про',
    },
  ]
}

const PACKAGE_BY_GRADE = {
  7: {
    mode: 'middle',
    items: [
      'Летняя подготовка перед 7 классом',
      'Годовой курс 7 класса',
      'Курс подготовки к ВПР',
    ],
    base: 35120,
  },
  8: {
    mode: 'middle',
    items: [
      'Летняя подготовка перед 8 классом',
      'Годовой курс 8 класса',
      'Курс подготовки к ВПР',
    ],
    base: 38000,
  },
  9: {
    mode: 'exam',
    items: [
      'Летняя подготовка перед 9 классом',
      'Годовой курс 9 класса',
      'Предбанник перед ОГЭ',
    ],
    base: 50355,
  },
  10: {
    mode: 'exam',
    items: [
      'Летняя подготовка перед 10 классом',
      'Годовой курс 10 класса',
    ],
    base: 47705,
  },
  11: {
    mode: 'exam',
    items: [
      'Летняя подготовка перед 11 классом',
      'Годовой курс 11 класса',
      'Предбанник перед ЕГЭ',
    ],
    base: 46080,
  },
}

export function getGradeConfig(grade) {
  const pkg = PACKAGE_BY_GRADE[grade]
  if (!pkg) return null

  const isMiddle = pkg.mode === 'middle'
  return {
    grade,
    mode: pkg.mode,
    packageItems: pkg.items,
    subjectOptions: isMiddle
      ? [
          { id: 'subjects14', label: '1–4 предмета' },
          { id: 'subjects5', label: '5 предметов' },
        ]
      : [
          { id: 'subjects1', label: '1 предмет' },
          { id: 'subjects4', label: '4 предмета' },
        ],
    tiers: isMiddle ? buildMiddleTiers(pkg.base) : buildExamTiers(pkg.base),
  }
}

export const TARIFF_MODAL_MAP = {
  standard: 'student',
  pro: 'student',
  premium: 'student',
}
