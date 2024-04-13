from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..models.models import Student
from ..database import get_db
from ..models import models
from ..schemas import schemas
from fastapi.security import OAuth2PasswordBearer
from ..dependencies import verify_token

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@router.get("/students/", response_model=List[schemas.StudentResponse])
def get_all_students(db: Session = Depends(get_db)):
    res = []
    students = db.query(models.User).filter(models.User.role == 'student').all()
    if not students:
        raise HTTPException(status_code=404, detail="No students found")
    for s in students:
        res.append(schemas.StudentResponse(student_id=s.user_id, email=s.email))
    return res


