from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from database import Base

class Lead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)
    parent_name = Column(String, nullable=False)
    child_name = Column(String, nullable=False)
    child_age = Column(Integer, nullable=False)
    program = Column(String, nullable=False)
    tariff = Column(String, nullable=True) # Слушатель/Студент (может быть None)
    phone = Column(String, nullable=False)
    social = Column(String, nullable=True)
    
    status = Column(String, default="new") # status: new, in_progress, closed
    created_at = Column(DateTime, default=datetime.utcnow)
