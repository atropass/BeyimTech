from sqlalchemy import Table, Column, Integer, ForeignKey, Enum
from ..database import Base
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Date, ForeignKey

student_teacher = Table('student_teacher', Base.metadata,
    Column('student_id', Integer, ForeignKey('students.student_id')),
    Column('teacher_id', Integer, ForeignKey('teachers.teacher_id'))
)

class User(Base):
    __tablename__ = 'users'
    user_id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    role = Column(String)

class Student(Base):
    __tablename__ = 'students'
    student_id = Column(Integer, ForeignKey('users.user_id'), primary_key=True)
    age = Column(Integer, nullable=False)
    grade = Column(String)
    last_test_date = Column(Date)
    upcoming_test_date = Column(Date)
    # Relationship to model the Student-Teacher
    teachers = relationship('Teacher', secondary='studentteacher', back_populates='students')

class Teacher(Base):
    __tablename__ = 'teachers'
    teacher_id = Column(Integer, ForeignKey('users.user_id'), primary_key=True)
    department = Column(String)
    students = relationship('Student', secondary=student_teacher, back_populates='teachers')

class Calendar(Base):
    __tablename__ = 'calendar'
    calendar_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.user_id'))
    date = Column(Date, nullable=False)
    event_type = Column(Enum('test', 'lesson'), nullable=False)
    details_id = Column(Integer, nullable=True)
    user = relationship('User', back_populates='calendar_entries')

class UserProfile(Base):
    __tablename__ = 'userprofile'

    profile_id = Column(Integer,primary_key=True)
    user_id = Column(Integer, ForeignKey('users.user_id'))
    first_name = Column(String(255), nullable=True)  # Assuming nullable for optional fields
    last_name = Column(String(255), nullable=True)
    phone_number = Column(String(20), nullable=True)


class StudentTeacher(Base):
    __tablename__ = 'studentteacher'
    
    student_id = Column(Integer, ForeignKey('students.student_id'), primary_key=True)
    teacher_id = Column(Integer, ForeignKey('teachers.teacher_id'), primary_key=True)

class ParentStudent(Base):
    __tablename__ = 'parentstudent'
    
    parent_id = Column(Integer, ForeignKey('parents.parent_id'), primary_key=True)
    student_id = Column(Integer, ForeignKey('students.student_id'), primary_key=True)

User.calendar_entries = relationship('Calendar', order_by=Calendar.calendar_id, back_populates='user')