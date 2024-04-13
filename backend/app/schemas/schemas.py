from typing import Optional
from pydantic import BaseModel, EmailStr, validator
from datetime import date
class UserBase(BaseModel):
    email: str

class UserCreate(UserBase):
    password: str
    role: str

class UserLogin(UserBase):
    password: str

class User(UserBase):
    user_id: Optional[int]
    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: str

class StudentResponse(BaseModel):
    student_id: int
    email: str
    first_name: Optional[str]
    last_name: Optional[str]
    age: Optional[int]
    grade: Optional[str]
    last_test_date: Optional[str]  # Using str for dates in the response is common
    upcoming_test_date: Optional[str]

    class Config:
        orm_mode = True