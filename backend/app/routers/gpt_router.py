from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..models import models
from ..models.models import Base, User, Student
from ..schemas import schemas
from ..dependencies import pwd_context
from ..schemas.schemas import UserCreate, User as UserSchema, Token, UserLogin, GptAnswer, GptRequest
from ..dependencies import get_password_hash, create_access_token, verify_token, get_user, SessionLocal
from ..database import get_db
from ..routers import student_router
from fastapi import APIRouter
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
import openai
from dotenv import load_dotenv
import os
from openai import OpenAI

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
openai.api_key = OPENAI_API_KEY
client = OpenAI()

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@router.post("/ask-gpt/", response_model=schemas.GptAnswer)
async def ask_gpt(request: schemas.GptRequest) -> GptAnswer:
        completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are helpful IELTS assistant"},
            {"role": "user", "content": request.query}
        ]
        )

        answer_message = completion.choices[0].message.content

        return GptAnswer(message=str(answer_message))
