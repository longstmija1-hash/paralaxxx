from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from dotenv import load_dotenv

load_dotenv()  # Загружаем .env ДО инициализации приложения

from database import engine, Base
from routers import leads


@asynccontextmanager
async def lifespan(app: FastAPI):
    # При старте сервера — создаём таблицы в базе (если их ещё нет)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield

app = FastAPI(
    title="ПАРАЛЛАКС — Leads API",
    description="Микросервис для сбора и хранения заявок с сайта.",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS — разрешаем запросы с Frontend (localhost:3000 для разработки)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",      # Next.js dev
        "https://parallax.vercel.app",  # Укажи свой продакшн домен при деплое
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Подключаем роутер заявок
app.include_router(leads.router, prefix="/api", tags=["Leads"])


@app.get("/", tags=["Health"])
async def health_check():
    return {"status": "ok", "service": "leads_service"}
