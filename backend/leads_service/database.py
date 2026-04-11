from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import declarative_base

# Пока используем SQLite для быстрого старта (асинхронно).
# Когда будете переходить на PostgreSQL, замените строку на:
# SQLALCHEMY_DATABASE_URL = "postgresql+asyncpg://user:password@localhost/dbname"
SQLALCHEMY_DATABASE_URL = "sqlite+aiosqlite:///./leads.db"

engine = create_async_engine(
    SQLALCHEMY_DATABASE_URL, 
    connect_args={"check_same_thread": False} # нужно только для SQLite
)

SessionLocal = async_sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
    class_=AsyncSession
)

Base = declarative_base()

# Зависимость для эндпоинтов (один запрос - одна сессия БД)
async def get_db():
    async with SessionLocal() as session:
        yield session
