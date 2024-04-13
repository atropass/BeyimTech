from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..models import models
from ..models.models import Base, User, Student
from ..schemas import schemas
from ..dependencies import pwd_context
from ..schemas.schemas import UserCreate, User as UserSchema, Token, UserLogin
from ..dependencies import get_password_hash, create_access_token, get_current_user, SessionLocal
from ..database import get_db
from ..routers import student_router
from fastapi import APIRouter

router = APIRouter()

@router.post("/register/", response_model=schemas.User)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    print("Received user data:", user)  # Debug print to see what is received
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    if user.email is None or user.password is None or user.role is None:
        raise HTTPException(status_code=400, detail="Missing user data")
    
    password_hash = get_password_hash(user.password)
    db_user = models.User(email=user.email, password_hash=password_hash, role=user.role)
    db.add(db_user)
    db.commit()

    if user.role == "student":
        # Add to Students table
        db_student = models.Student(
            student_id=db_user.user_id,
            age=99  # Default age as per your requirement
        )
        db.add(db_student)
    elif user.role == "teacher":
        # Add to Teachers table
        db_teacher = models.Teacher(
            teacher_id=db_user.user_id,
            department="Default Department"  # Default department or fetched from another part of the request
        )
        db.add(db_teacher)
    elif user.role == "parent":
        # Add to Parents table
        db_parent = models.Parent(
            parent_id=db_user.user_id
        )
        db.add(db_parent)

    db.commit()

    return db_user


@router.post("/login", response_model=Token)
def login_for_access_token(form_data: UserLogin, db: Session = Depends(lambda: SessionLocal())):
    user = db.query(User).filter(User.email == form_data.email).first()
    if not user or not pwd_context.verify(form_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}