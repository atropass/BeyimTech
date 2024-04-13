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

@router.post("/teacher/students", response_model=schemas.StudentResponse)
def add_student_to_teacher(student_id: int, db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    student = db.query(models.Student).filter(models.Student.student_id == student_id).first()

    if not student:
        raise HTTPException(status_code=404, detail="This mf doesnt exist")
    
    payload = verify_token(token, credentials_exception=HTTPException(status_code=status.HTTP_401_UNAUTHORIZED))
    teacher_id = payload.get("user_id")

    db_student = models.StudentTeacher(student_id=student_id, teacher_id=teacher_id)
    db.add(db_student)
    db.commit()

    return db_student



@router.get("/teacher/students", response_model=List[schemas.StudentResponse])
def get_students_by_teacher(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    res = []
    payload = verify_token(token, credentials_exception=HTTPException(status_code=status.HTTP_401_UNAUTHORIZED))
    students = db.query(models.StudentTeacher).filter(models.StudentTeacher.teacher_id == payload.get("user_id")).all()
    if not students:
        raise HTTPException(status_code=404, detail="No students found")
    for s in students:
        email = db.query(models.User).filter(models.User.user_id == s.student_id).first().email
        res.append(schemas.StudentResponse(student_id=s.student_id, email=email))
    return res