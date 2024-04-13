from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..schemas import schemas
from ..database import get_db
from ..models import models
from datetime import date

router = APIRouter()

def create_calendar_entry(db: Session, calendar: schemas.CalendarCreate):
    db_calendar = models.Calendar(**calendar.dict())
    db.add(db_calendar)
    db.commit()
    db.refresh(db_calendar)
    return db_calendar

def get_calendar_entries(db: Session, user_id: int):
    return db.query(models.Calendar).filter(models.Calendar.user_id == user_id).all()


@router.post("/calendar/", response_model=schemas.CalendarResponse)
def add_calendar_entry(calendar: schemas.CalendarCreate, db: Session = Depends(get_db)):
    return create_calendar_entry(db, calendar)

@router.get("/calendar/{user_id}", response_model=List[schemas.CalendarResponse])
def read_calendar_entries(user_id: int, db: Session = Depends(get_db)):
    entries = get_calendar_entries(db, user_id)
    if not entries:
        raise HTTPException(status_code=404, detail="No calendar entries found")
    return entries

@router.put("/calendar/{calendar_id}", response_model=schemas.CalendarResponse)
def update_calendar_entry(calendar_id: int, calendar: schemas.CalendarUpdate, db: Session = Depends(get_db)):
    db_calendar = db.query(models.Calendar).filter(models.Calendar.calendar_id == calendar_id).first()
    if not db_calendar:
        raise HTTPException(status_code=404, detail="Calendar entry not found")
    for var, value in vars(calendar).items():
        setattr(db_calendar, var, value) if value is not None else None
    db.commit()
    return db_calendar

@router.get("/calendar/by-date/", response_model=List[schemas.CalendarResponse])
def read_calendar_entries_by_date(user_id: int, entry_date: date, db: Session = Depends(get_db)):
    calendar_entries = db.query(models.Calendar).filter(
        models.Calendar.user_id == user_id,
        models.Calendar.date == entry_date
    ).all()
    if not calendar_entries:
        raise HTTPException(status_code=404, detail="No calendar entries found on this date for the user")
    return calendar_entries
