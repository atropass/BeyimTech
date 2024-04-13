from sqlalchemy import Table, Column, Integer, ForeignKey
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
    teachers = relationship('Teacher', secondary='student_teacher', back_populates='students')

class Teacher(Base):
    __tablename__ = 'teachers'
    teacher_id = Column(Integer, ForeignKey('users.user_id'), primary_key=True)
    department = Column(String)
    students = relationship('Student', secondary=student_teacher, back_populates='teachers')