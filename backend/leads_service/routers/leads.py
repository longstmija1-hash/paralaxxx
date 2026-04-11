from fastapi import APIRouter, Depends, BackgroundTasks, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from database import get_db
from models import Lead
from schemas import LeadCreate, LeadResponse
from services.telegram import send_telegram_notification

router = APIRouter()

@router.post("/leads", response_model=LeadResponse, status_code=201)
async def create_lead(
    payload: LeadCreate,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db),
):
    # Сохраняем заявку в базу данных
    new_lead = Lead(
        parent_name=payload.parentName,
        child_name=payload.childName,
        child_age=payload.childAge,
        program=payload.program,
        tariff=payload.tariff,
        phone=payload.phone,
        social=payload.social,
    )
    db.add(new_lead)
    await db.commit()
    await db.refresh(new_lead)

    # Уведомление в Telegram — в фоне (не блокирует ответ пользователю)
    background_tasks.add_task(
        send_telegram_notification,
        {
            "parent_name": new_lead.parent_name,
            "child_name": new_lead.child_name,
            "child_age": new_lead.child_age,
            "program": new_lead.program,
            "tariff": new_lead.tariff,
            "phone": new_lead.phone,
            "social": new_lead.social,
        }
    )

    return new_lead
