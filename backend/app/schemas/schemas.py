from typing import Optional
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
    last_test_date: Optional[str] = None  # Using str for dates in the response is common
    upcoming_test_date: Optional[str] = None

    class Config:
        orm_mode = True

class CalendarBase(BaseModel):
    user_id: int
    date: date
    event_type: str

class CalendarCreate(CalendarBase):
    pass

class CalendarUpdate(CalendarBase):
    details_id: Optional[int]

class CalendarResponse(CalendarBase):
    calendar_id: int
    details_id: Optional[int]
    
    class Config:
        orm_mode = True