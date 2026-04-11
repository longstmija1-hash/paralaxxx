from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class LeadCreate(BaseModel):
    parentName: str = Field(..., min_length=2, max_length=100)
    childName: str = Field(..., min_length=2, max_length=100)
    childAge: int = Field(..., ge=5, le=25)
    program: str = Field(..., min_length=2, max_length=150)
    tariff: Optional[str] = None
    phone: str = Field(..., min_length=10, max_length=25)
    social: Optional[str] = None

class LeadResponse(BaseModel):
    id: int
    parent_name: str
    child_name: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
