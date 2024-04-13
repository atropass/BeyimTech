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
    students = db.query(models.User, models.UserProfile, models.Student).join(
        models.UserProfile, models.UserProfile.user_id == models.User.user_id
        ).join(
            models.Student, models.Student.student_id == models.User.user_id
        ).filter(models.User.role == 'student').all()
    print(students)
    if not students:
        raise HTTPException(status_code=404, detail="No students found")
    for s in students:
        res.append(schemas.StudentResponse(
            student_id=s.User.user_id,
            email=s.User.email,
            first_name=s.UserProfile.first_name,
            last_name=s.UserProfile.last_name,
            age=s.Student.age,
            grade=s.Student.grade,
            last_test_date=s.Student.last_test_date,
            upcoming_test_date=s.Student.upcoming_test_date
            ))
    return res


