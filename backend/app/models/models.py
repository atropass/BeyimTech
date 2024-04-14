from sqlalchemy import Table, Column, Integer, ForeignKey, Enum, Float, create_engine
from ..database import Base
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Date, ForeignKey, Boolean
from sqlalchemy.orm import relationship, declarative_base, sessionmaker
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

class Parents(Base):
    __tablename__ = 'parents'
    parent_id = Column(Integer, primary_key=True)
    
class ParentStudent(Base):
    __tablename__ = 'parentstudent'
    
    parent_id = Column(Integer, ForeignKey('parents.parent_id'), primary_key=True)
    student_id = Column(Integer, ForeignKey('students.student_id'), primary_key=True)

class TestDetails(Base):
    __tablename__ = 'testdetails'
    test_detail_id = Column(Integer, primary_key=True)
    user_id = Column(Integer)
    test_type = Column(String)
    test_date = Column(Date)
    overall_score = Column(Float)
    listening_score = Column(Float)
    speaking_score = Column(Float)
    writing_score = Column(Float)
    reading_score = Column(Float)



class ListeningDetails(Base):
    __tablename__ = 'listeningtestdetails'
    listening_id = Column(Integer, primary_key=True)
    user_id = Column(Integer)
    test_type = Column(String)
    test_date = Column(Date)
    multiple_choice_score = Column(Integer)
    matching_questions_score = Column(Integer)
    diagram_labelling_score = Column(Integer)
    summary_completion_score = Column(Integer)
    sentence_completion_score = Column(Integer)
    short_answer_score = Column(Integer)
    overall_listening_score = Column(Float)
    
class SpeakingTestDetails(Base):
    __tablename__ = 'speakingtestdetails'
    user_id = Column(Integer)
    speaking_id = Column(Integer, primary_key=True)
    test_type = Column(String, nullable=False)
    test_date = Column(Date, nullable=False)
    fluency_score = Column(Integer)
    coherence_score = Column(Integer)
    lexical_resource_score = Column(Integer)
    grammatical_range_score = Column(Integer)
    accuracy_score = Column(Integer)
    pronunciation_score = Column(Integer)
    overall_speaking_score = Column(Integer)

class WritingTestDetails(Base):
    __tablename__ = 'writingtestdetails'
    user_id = Column(Integer)
    writing_id = Column(Integer, primary_key=True)
    test_type = Column(String, nullable=False)
    test_date = Column(Date, nullable=False)
    task1_achievement_score = Column(Integer)
    task1_coherence_score = Column(Integer)
    task1_lexical_resource_score = Column(Integer)
    task1_grammatical_range_score = Column(Integer)
    task2_response_score = Column(Integer)
    task2_coherence_score = Column(Integer)
    task2_lexical_resource_score = Column(Integer)
    task2_grammatical_range_score = Column(Integer)
    overall_writing_score = Column(Integer)

class ReadingTestDetails(Base):
    __tablename__ = 'readingtestdetails'
    user_id = Column(Integer)
    reading_id = Column(Integer, primary_key=True)
    test_type = Column(String, nullable=False)
    test_date = Column(Date, nullable=False)
    matching_headings_score = Column(Integer)
    multiple_choice_score = Column(Integer)
    short_answer_score = Column(Integer)
    name_matching_score = Column(Integer)
    true_false_not_given_score = Column(Integer)
    yes_no_not_given_score = Column(Integer)
    summary_completion_score = Column(Integer)
    matching_sentence_endings_score = Column(Integer)
    sentence_completion_score = Column(Integer)
    table_completion_score = Column(Integer)
    matching_information_score = Column(Integer)
    diagram_labelling_score = Column(Integer)
    overall_reading_score = Column(Integer)


class LessonDetails(Base):
    __tablename__ = 'lessondetails'
    lesson_detail_id= Column(Integer, primary_key=True)
    user_id= Column(Integer)
    discipline= Column(String)
    attendance= Column(Boolean)
    punctuality= Column(Boolean)
    homework_completed= Column(Boolean)
    participation_score= Column(Integer)
    teacher_comments= Column(String)
    additional_notes= Column(String)

# Setup for example
engine = create_engine('sqlite:///:memory:')
Base.metadata.create_all(engine)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)