from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from .models import models
from .models.models import Base, User, Student
from .schemas import schemas
from .dependencies import pwd_context
from .schemas.schemas import UserCreate, User as UserSchema, Token, UserLogin
from .dependencies import get_password_hash, create_access_token, get_current_user, SessionLocal
from .database import get_db
from .routers import student_router, register_router, test_details_router
from .routers import student_router, register_router, teacher_router, gpt_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(student_router.router)
app.include_router(register_router.router)
app.include_router(test_details_router.router)
app.include_router(teacher_router.router)
app.include_router(gpt_router.router)
