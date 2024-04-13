from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..models.models import Student
from ..database import get_db
from ..models import models
from ..schemas import schemas

router = APIRouter()

@router.get("/students/", response_model=List[schemas.StudentResponse])
def get_students(db: Session = Depends(get_db)):
    res = []
    students = db.query(models.User).filter(models.User.role == 'student').all()
    if not students:
        raise HTTPException(status_code=404, detail="No students found")
    for s in students:
        res.append(schemas.StudentResponse(student_id=s.user_id, email=s.email))
    return res
