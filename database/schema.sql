-- ============================================================
-- MVP Online School with Gamification — PostgreSQL Schema
-- ============================================================

-- USERS & ROLES
CREATE TYPE user_role AS ENUM ('student', 'parent', 'curator', 'admin');
CREATE TYPE user_plan AS ENUM ('listener', 'student');

CREATE TABLE users (
    id            SERIAL PRIMARY KEY,
    name          VARCHAR(100) NOT NULL,
    email         VARCHAR(150) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role          user_role    NOT NULL DEFAULT 'student',
    plan          user_plan    NOT NULL DEFAULT 'listener',
    avatar_url    TEXT,
    telegram_id   VARCHAR(50),
    created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Links parents to their children (students)
CREATE TABLE parent_child (
    id         SERIAL PRIMARY KEY,
    parent_id  INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    child_id   INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(parent_id, child_id)
);

-- Curators assigned to groups of students
CREATE TABLE curator_students (
    id          SERIAL PRIMARY KEY,
    curator_id  INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    student_id  INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(curator_id, student_id)
);

-- COURSES & LESSONS
CREATE TYPE course_direction AS ENUM ('junior', 'middle', 'senior');

CREATE TABLE courses (
    id          SERIAL PRIMARY KEY,
    title       VARCHAR(200) NOT NULL,
    direction   course_direction NOT NULL,
    description TEXT,
    cover_url   TEXT,
    is_active   BOOLEAN NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE lessons (
    id          SERIAL PRIMARY KEY,
    course_id   INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title       VARCHAR(200) NOT NULL,
    video_url   TEXT,
    pdf_url     TEXT,
    timecodes   JSONB,          -- [{ "time": "00:12", "label": "Введение" }, ...]
    description TEXT,
    order_num   INTEGER NOT NULL DEFAULT 0,
    deadline_days INTEGER NOT NULL DEFAULT 7,  -- HW due N days after lesson
    published_at  TIMESTAMPTZ,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ENROLLMENTS
CREATE TABLE enrollments (
    id          SERIAL PRIMARY KEY,
    student_id  INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id   INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    enrolled_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(student_id, course_id)
);

-- HOMEWORKS
CREATE TYPE hw_status AS ENUM ('pending', 'submitted', 'accepted', 'revision', 'overdue');

CREATE TABLE homeworks (
    id                 SERIAL PRIMARY KEY,
    lesson_id          INTEGER NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    student_id         INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    github_url         TEXT,
    file_path          TEXT,
    code_snippet       TEXT,
    status             hw_status NOT NULL DEFAULT 'pending',
    deadline           TIMESTAMPTZ NOT NULL,
    submitted_at       TIMESTAMPTZ,
    reviewed_at        TIMESTAMPTZ,
    reviewer_id        INTEGER REFERENCES users(id),
    curator_comment    TEXT,
    audio_comment_url  TEXT,
    life_deducted      BOOLEAN NOT NULL DEFAULT FALSE,
    created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(lesson_id, student_id)
);

-- GAMIFICATION
CREATE TABLE gamification (
    id            SERIAL PRIMARY KEY,
    user_id       INTEGER NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    lives_count   INTEGER NOT NULL DEFAULT 3 CHECK (lives_count >= 0 AND lives_count <= 3),
    coin_balance  INTEGER NOT NULL DEFAULT 0 CHECK (coin_balance >= 0),
    reset_at      TIMESTAMPTZ NOT NULL DEFAULT (DATE_TRUNC('month', NOW()) + INTERVAL '1 month'),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE coin_transactions (
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    amount      INTEGER NOT NULL,             -- positive = earn, negative = spend
    reason      VARCHAR(200) NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- SUBSCRIPTIONS
CREATE TYPE sub_status AS ENUM ('active', 'paused', 'cancelled', 'expired');

CREATE TABLE subscriptions (
    id                     SERIAL PRIMARY KEY,
    user_id                INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    plan                   user_plan NOT NULL,
    status                 sub_status NOT NULL DEFAULT 'active',
    price_rub              INTEGER NOT NULL,  -- in kopecks (1900 RUB = 190000)
    started_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at             TIMESTAMPTZ,
    stripe_subscription_id VARCHAR(200),
    stripe_customer_id     VARCHAR(200),
    created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- SHOP
CREATE TABLE shop_items (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(200) NOT NULL,
    description TEXT,
    image_url   TEXT,
    coin_price  INTEGER NOT NULL,
    stock       INTEGER NOT NULL DEFAULT -1,  -- -1 = unlimited
    is_active   BOOLEAN NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TYPE order_status AS ENUM ('pending', 'processing', 'shipped', 'delivered', 'cancelled');

CREATE TABLE shop_orders (
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    item_id     INTEGER NOT NULL REFERENCES shop_items(id),
    quantity    INTEGER NOT NULL DEFAULT 1,
    total_coins INTEGER NOT NULL,
    status      order_status NOT NULL DEFAULT 'pending',
    address     TEXT,
    ordered_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX idx_homeworks_student_id ON homeworks(student_id);
CREATE INDEX idx_homeworks_lesson_id ON homeworks(lesson_id);
CREATE INDEX idx_homeworks_status ON homeworks(status);
CREATE INDEX idx_homeworks_deadline ON homeworks(deadline);
CREATE INDEX idx_coin_transactions_user_id ON coin_transactions(user_id);
CREATE INDEX idx_lessons_course_id ON lessons(course_id);
CREATE INDEX idx_enrollments_student_id ON enrollments(student_id);

-- ============================================================
-- SEED: Default admin user
-- ============================================================
INSERT INTO users (name, email, password_hash, role, plan)
VALUES ('Admin', 'admin@codeschool.ru', '$2b$10$placeholder_hash', 'admin', 'student');
