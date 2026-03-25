# 🎮 CodeSchool MVP — Онлайн-школа с Геймификацией

> Cyberpunk-стиль | Система жизней | Коины | React + Express + PostgreSQL

## Стек технологий

| Слой | Технология |
|---|---|
| Frontend | React 18 + Vite + Tailwind CSS |
| Backend | Node.js + Express |
| База данных | PostgreSQL |
| Real-time | Socket.io |
| Аутентификация | JWT + bcrypt |

## Быстрый старт

### 1. Требования
- Node.js >= 18.x → [nodejs.org](https://nodejs.org)
- PostgreSQL >= 14 → [postgresql.org](https://www.postgresql.org/download)

### 2. База данных
```bash
psql -U postgres -c "CREATE DATABASE codeschool;"
psql -U postgres -d codeschool -f database/schema.sql
```

### 3. Backend
```bash
cd backend
npm install
cp .env.example .env   # заполни переменные
npm run dev
# → http://localhost:3001
```

### 4. Frontend
```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

## Структура проекта

```
project/
├── database/
│   └── schema.sql          # PostgreSQL схема (11 таблиц)
├── backend/
│   ├── src/
│   │   ├── routes/         # API эндпоинты
│   │   ├── middleware/     # lifeChecker, softBan, auth
│   │   ├── controllers/    # Бизнес-логика
│   │   ├── services/       # DB-запросы
│   │   └── index.js        # Точка входа
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── components/     # Переиспользуемые компоненты
    │   ├── pages/          # Страницы (Landing, Dashboard, Lesson...)
    │   ├── context/        # AuthContext, SocketContext
    │   ├── hooks/          # useAuth, useGamification
    │   └── main.jsx
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── tailwind.config.js
```

## Роли пользователей

| Роль | Возможности |
|---|---|
| **Студент** | Дашборд с жизнями, уроки, сдача ДЗ, магазин |
| **Родитель** | Отчёты ребёнка, оплата подписки |
| **Куратор** | Проверка ДЗ очередь, комментарии |
| **Админ** | Управление курсами и пользователями |

## API Endpoints

| Метод | Путь | Описание |
|---|---|---|
| POST | /api/auth/register | Регистрация |
| POST | /api/auth/login | Вход (возвращает JWT) |
| GET | /api/dashboard/student | Дашборд студента |
| GET | /api/dashboard/parent/:childId | Дашборд родителя |
| GET | /api/dashboard/curator | Дашборд куратора |
| GET | /api/courses | Список курсов |
| GET | /api/lessons/:id | Урок + ДЗ |
| POST | /api/homeworks/submit | Сдать ДЗ |
| PATCH | /api/homeworks/:id/review | Проверить ДЗ (куратор) |
| GET | /api/gamification/me | Жизни и коины |
| GET | /api/shop/items | Магазин |
| POST | /api/shop/orders | Купить товар |

## Геймификация

- **3 жизни** в месяц. Не сдал ДЗ до дедлайна → -1 жизнь
- **0 жизней** → Soft Ban (переход на тариф "Слушатель")
- **Коины** начисляются за сданные вовремя ДЗ, активность, помощь
- **Сброс жизней** — 1-го числа каждого месяца

## Уведомления (Real-time)

Socket.io события:
- `life_lost` — сгорела жизнь (анимация разбитого сердечка)
- `hw_reviewed` — куратор проверил ДЗ
- `coins_earned` — начислены коины
