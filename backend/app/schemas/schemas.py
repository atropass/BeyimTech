from typing import Optional, List
from pydantic import BaseModel, EmailStr, validator
from datetime import date
class UserBase(BaseModel):
    email: str

class UserCreate(UserBase):
    password: str
    role: str
    first_name: str
    last_name: str
    phone_number: Optional[str] = None
    student_age: Optional[int]= 99
    student_grade: Optional[int] = 7
    student_last_test_date: Optional[date]
    student_upcoming_test_date: Optional[date]

class UserLogin(UserBase):
    password: str

class User(UserBase):
    user_id: Optional[int]
    class Config:
        orm_mode = True

class UserResponse(UserBase):
    role: str
    first_name: str
    last_name: str
    phone_number: Optional[str] = None

class GptRequest(BaseModel):
    query: str
class GptAnswer(BaseModel):
    message: str

class Token(BaseModel):
    access_token: str
    token_type: str
    user_id: int

class TokenData(BaseModel):
    username: str

class StudentResponse(BaseModel):
    student_id: int
    email: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    age: Optional[int] = None
    grade: Optional[str] = None
    last_test_date: Optional[date] = None  # Using str for dates in the response is common
    upcoming_test_date: Optional[date] = None

    class Config:
        orm_mode = True

class TestDetailCreate(BaseModel):
    user_id: int
    test_type: str = "IELTS"
    test_date: date
    overall_score: Optional[float]
    listening_score: Optional[float]
    speaking_score: Optional[float]
    writing_score: Optional[float]
    reading_score: Optional[float]
    

class TestDetailResponse(BaseModel):
    user_id: int
    test_type: str
    test_date: date
    overall_score: Optional[float]
    listening_score: Optional[float]
    speaking_score: Optional[float]
    writing_score: Optional[float]
    reading_score: Optional[float]

    class Config:
        orm_mode = True


class TestDetailByDatesRequest(BaseModel):
    user_id: int
    date_from: date
    date_to: date

class ListeningTestDetailCreate(BaseModel):
    user_id: int
    test_type: str = "IELTS"
    test_date: date
    multiple_choice_score: Optional[int]
    matching_questions_score: Optional[int]
    diagram_labelling_score: Optional[int]
    summary_completion_score: Optional[int]
    sentence_completion_score: Optional[int]
    short_answer_score: Optional[int]
    overall_listening_score: Optional[float]

class ListeningTestDetailResponse(BaseModel):
    listening_id: int
    test_type: str
    test_date: date
    multiple_choice_score: Optional[int]
    matching_questions_score: Optional[int]
    diagram_labelling_score: Optional[int]
    summary_completion_score: Optional[int]
    sentence_completion_score: Optional[int]
    short_answer_score: Optional[int]
    overall_listening_score: Optional[float]

    class Config:
        orm_mode = True


class ReadingTestDetailCreate(BaseModel):
    user_id: int
    test_type: str = "IELTS"
    test_date: date
    matching_headings_score: Optional[int]
    multiple_choice_score: Optional[int]
    short_answer_score: Optional[int]
    name_matching_score: Optional[int]
    true_false_not_given_score: Optional[int]
    yes_no_not_given_score: Optional[int]
    summary_completion_score: Optional[int]
    matching_sentence_endings_score: Optional[int]
    sentence_completion_score: Optional[int]
    table_completion_score: Optional[int]
    matching_information_score: Optional[int]
    diagram_labelling_score: Optional[int]
    overall_reading_score: Optional[float]

class ReadingTestDetailResponse(BaseModel):
    user_id: int
    test_type: str
    test_date: date
    matching_headings_score: Optional[int]
    multiple_choice_score: Optional[int]
    short_answer_score: Optional[int]
    name_matching_score: Optional[int]
    true_false_not_given_score: Optional[int]
    yes_no_not_given_score: Optional[int]
    summary_completion_score: Optional[int]
    matching_sentence_endings_score: Optional[int]
    sentence_completion_score: Optional[int]
    table_completion_score: Optional[int]
    matching_information_score: Optional[int]
    diagram_labelling_score: Optional[int]
    overall_reading_score: Optional[float]

    class Config:
        orm_mode = True\


class SpeakingTestDetailCreate(BaseModel):
    user_id: int
    test_type: str = "IELTS"
    test_date: date
    fluency_score: Optional[float]
    coherence_score: Optional[float]
    lexical_resource_score: Optional[float]
    grammatical_range_score: Optional[float]
    accuracy_score: Optional[float]
    pronunciation_score: Optional[float]
    overall_speaking_score: Optional[float]

class SpeakingTestDetailResponse(BaseModel):
    user_id: int
    test_type: str
    test_date: date
    fluency_score: Optional[float]
    coherence_score: Optional[float]
    lexical_resource_score: Optional[float]
    grammatical_range_score: Optional[float]
    accuracy_score: Optional[float]
    pronunciation_score: Optional[float]
    overall_speaking_score: Optional[float]

    class Config:
        orm_mode = True


class WritingTestDetailCreate(BaseModel):
    user_id: int
    test_type: str = "IELTS"
    test_date: date
    task1_achievement_score: Optional[float]
    task1_coherence_score: Optional[float]
    task1_lexical_resource_score: Optional[float]
    task1_grammatical_range_score: Optional[float]
    task2_response_score: Optional[float]
    task2_coherence_score: Optional[float]
    task2_lexical_resource_score: Optional[float]
    task2_grammatical_range_score: Optional[float]
    overall_writing_score: Optional[float]

class WritingTestDetailResponse(BaseModel):
    user_id: int
    test_type: str
    test_date: date
    task1_achievement_score: Optional[float]
    task1_coherence_score: Optional[float]
    task1_lexical_resource_score: Optional[float]
    task1_grammatical_range_score: Optional[float]
    task2_response_score: Optional[float]
    task2_coherence_score: Optional[float]
    task2_lexical_resource_score: Optional[float]
    task2_grammatical_range_score: Optional[float]
    overall_writing_score: Optional[float]

    class Config:
        orm_mode = True

class CombinedTestDetailResponse(BaseModel):
    listening_details: List[ListeningTestDetailResponse]
    speaking_details: List[SpeakingTestDetailResponse]
    writing_details: List[WritingTestDetailResponse]
    reading_details: List[ReadingTestDetailResponse]