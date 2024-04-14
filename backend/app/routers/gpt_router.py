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
from datetime import date
import json
from decimal import Decimal
load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
openai.api_key = OPENAI_API_KEY
client = OpenAI()

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

prompt1_ielts = '''
    You are a digital teaching assistant programmed to help students improve their IELTS scores. 
    A student has just completed their IELTS exam and received their results. 
    Your task is to analyze the scores in each of the four sections: Listening, 
    Reading, Writing, and Speaking. Provide a detailed analysis of their performance, 
    highlighting areas where they performed well and areas where improvement is needed. 
    Based on the results, offer specific tips and advice on how they can improve their skills in each section. 
    Include suggestions for practice exercises, useful resources, and strategies for test-taking. 
    Remember to encourage the student, emphasizing their strengths and the potential for improvement with targeted effort.
    RETURN TEXT IN A STRING FORMAT, WITHOUT LATEX CODE
'''

prompt2_roadmap = '''
    As a digital teaching assistant, you are tasked with helping a student enhance their overall English language proficiency. 
    The student is intermediate level and aspires to achieve fluency. Create a comprehensive roadmap for their English learning journey.
    Start by assessing their current skills in key areas: vocabulary, grammar, listening, speaking, reading, and writing.
    For each area, outline specific, measurable goals that the student should aim for over the next six months. 
    Recommend targeted activities to help achieve these goals, such as daily vocabulary exercises, weekly grammar workshops, 
    listening practice through podcasts, interactive speaking clubs, reading English literature, and writing essays 
    or journal entries. Additionally, suggest useful online resources, apps, and books. Conclude with general tips 
    on maintaining motivation and consistency in their studies.
    RETURN TEXT IN A STRING FORMAT, WITHOUT LATEX CODE
'''



@router.get("/test-format", response_model=schemas.GptAnswer)
def test_format(user_id: int, date_from: date, date_to: date, db: Session = Depends(get_db)):
     # Querying each detail category
    listening_details, speaking_details, writing_details, reading_details = get_all_records(user_id, date_from, date_to, db)
    formatted_data = format_for_analysis(listening_details, speaking_details, writing_details, reading_details)
    return GptAnswer(message=formatted_data)

     
@router.get("/ask-gpt-analysis", response_model=schemas.GptAnswer)
async def ask_gpt_analysis(user_id: int, date_from: date, date_to: date, db: Session = Depends(get_db)):
    listening_details, speaking_details, writing_details, reading_details = get_all_records(user_id, date_from, date_to, db)

    formatted_data = format_for_analysis(listening_details, speaking_details, writing_details, reading_details)

    response = ask_gpt(prompt1_ielts, formatted_data)

    return GptAnswer(message=response)

@router.get("/ask-gpt-roadmap", response_model=schemas.GptAnswer)
async def ask_gpt_roadmap(user_id: int, date_from: date, date_to: date, db: Session = Depends(get_db)):
    listening_details, speaking_details, writing_details, reading_details = get_all_records(user_id, date_from, date_to, db)

    formatted_data = format_for_analysis(listening_details, speaking_details, writing_details, reading_details)

    response = ask_gpt(prompt2_roadmap, formatted_data)

    return GptAnswer(message=response)



def ask_gpt(prompt, query) -> GptAnswer:
        completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": prompt},
            {"role": "user", "content": query}
        ],
        max_tokens=250
        )

        answer_message = completion.choices[0].message.content

        return answer_message

def get_all_records(user_id: int, date_from: date, date_to: date, db: Session = Depends(get_db)):
     # Querying each detail category
    listening_details = db.query(models.ListeningDetails).filter(
        models.ListeningDetails.user_id == user_id,
        models.ListeningDetails.test_date.between(date_from, date_to)
    ).all()

    speaking_details = db.query(models.SpeakingTestDetails).filter(
        models.SpeakingTestDetails.user_id == user_id,
        models.SpeakingTestDetails.test_date.between(date_from, date_to)
    ).all()

    writing_details = db.query(models.WritingTestDetails).filter(
        models.WritingTestDetails.user_id == user_id,
        models.WritingTestDetails.test_date.between(date_from, date_to)
    ).all()

    reading_details = db.query(models.ReadingTestDetails).filter(
        models.ReadingTestDetails.user_id == user_id,
        models.ReadingTestDetails.test_date.between(date_from, date_to)
    ).all()
    
    return listening_details, speaking_details, writing_details, reading_details

def format_for_analysis(*args):
    """
    Helper function to format the test details into a human-readable string for analysis.
    Converts dates to string format and handles conversion of Decimal objects to string to avoid precision loss.
    """
    result_str = ""
    for arg in args:
        for detail in arg:
            table_name = detail.__tablename__
            result_str += f"\n{table_name.upper()} DETAILS:\n"
            for column in detail.__table__.columns:
                value = getattr(detail, column.name)
                if isinstance(value, date):
                    formatted_value = value.isoformat()  # Converts date to "YYYY-MM-DD"
                elif isinstance(value, Decimal):
                    formatted_value = str(value)  # Converts Decimal to string
                else:
                    formatted_value = str(value)
                result_str += f"{column.name}: {formatted_value}\n"
            result_str += "\n"
    return result_str