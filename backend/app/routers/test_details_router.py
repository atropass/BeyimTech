from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..schemas import schemas
from ..database import get_db
from ..models import models
from typing import List, Optional
from datetime import date

router = APIRouter()

@router.post("/test-details/", response_model=schemas.TestDetailResponse)
def create_test_detail(test_detail: schemas.TestDetailCreate, db: Session = Depends(get_db)):
    new_test_detail = models.TestDetails(
        user_id=test_detail.user_id,
        test_type=test_detail.test_type,
        test_date=test_detail.test_date,
        overall_score=test_detail.overall_score,
        listening_score=test_detail.listening_score,
        speaking_score=test_detail.speaking_score,
        writing_score=test_detail.writing_score,
        reading_score=test_detail.reading_score
    )
    db.add(new_test_detail)
    db.commit()
    db.refresh(new_test_detail)
    return new_test_detail

@router.get("/test-details/{test_detail_id}", response_model=schemas.TestDetailResponse)
def get_test_detail(test_detail_id: int, db: Session = Depends(get_db)):
    test_detail = db.query(models.TestDetails).filter(models.TestDetails.test_detail_id == test_detail_id).first()
    if test_detail is None:
        raise HTTPException(status_code=404, detail="Test detail not found")
    return test_detail



@router.post("/test-details/listening", response_model=schemas.ListeningTestDetailResponse)
def create_listening(listening_detail: schemas.ListeningTestDetailCreate, db: Session = Depends(get_db)):
    new_listening_detail = models.ListeningDetails(
        user_id=listening_detail.user_id,
        test_type=listening_detail.test_type,
        test_date=listening_detail.test_date,
        multiple_choice_score=listening_detail.multiple_choice_score,
        matching_questions_score=listening_detail.matching_questions_score,
        diagram_labelling_score=listening_detail.diagram_labelling_score,
        summary_completion_score=listening_detail.summary_completion_score,
        sentence_completion_score=listening_detail.sentence_completion_score,
        short_answer_score=listening_detail.short_answer_score,
        overall_listening_score=listening_detail.overall_listening_score
    )
    db.add(new_listening_detail)
    db.commit()
    db.refresh(new_listening_detail)
    
    return new_listening_detail


# @router.get("/test-details/listening/{listening_id}", response_model=schemas.ListeningTestDetailResponse)
# def get_listening(listening_id: int, db: Session = Depends(get_db)):
#     listening_id = db.query(models.ListeningDetails).filter(models.ListeningDetails.listening_id == listening_id).first()
#     if listening_id is None:
#         raise HTTPException(status_code=404, detail="Listening test detail not found")
#     return listening_id

@router.post("/test-details/reading", response_model=schemas.ReadingTestDetailResponse)
def create_reading(reading_detail: schemas.ReadingTestDetailCreate, db: Session = Depends(get_db)):
    new_reading_detail = models.ReadingTestDetails(
        user_id=reading_detail.user_id,
        test_type=reading_detail.test_type,
        test_date=reading_detail.test_date,
        matching_headings_score=reading_detail.matching_headings_score,
        multiple_choice_score=reading_detail.multiple_choice_score,
        short_answer_score=reading_detail.short_answer_score,
        name_matching_score=reading_detail.name_matching_score,
        true_false_not_given_score=reading_detail.true_false_not_given_score,
        yes_no_not_given_score=reading_detail.yes_no_not_given_score,
        summary_completion_score=reading_detail.summary_completion_score,
        matching_sentence_endings_score=reading_detail.matching_sentence_endings_score,
        sentence_completion_score=reading_detail.sentence_completion_score,
        table_completion_score=reading_detail.table_completion_score,
        matching_information_score=reading_detail.matching_information_score,
        diagram_labelling_score=reading_detail.diagram_labelling_score,
        overall_reading_score=reading_detail.overall_reading_score
    )
    db.add(new_reading_detail)
    db.commit()
    db.refresh(new_reading_detail)

    return new_reading_detail

@router.post("/test-details/speaking", response_model=schemas.SpeakingTestDetailResponse)
def create_speaking(speaking_detail: schemas.SpeakingTestDetailCreate, db: Session = Depends(get_db)):
    new_speaking_detail = models.SpeakingTestDetails(
        user_id=speaking_detail.user_id,
        test_type=speaking_detail.test_type,
        test_date=speaking_detail.test_date,
        fluency_score=speaking_detail.fluency_score,
        coherence_score=speaking_detail.coherence_score,
        lexical_resource_score=speaking_detail.lexical_resource_score,
        grammatical_range_score=speaking_detail.grammatical_range_score,
        accuracy_score=speaking_detail.accuracy_score,
        pronunciation_score=speaking_detail.pronunciation_score,
        overall_speaking_score=speaking_detail.overall_speaking_score
    )
    db.add(new_speaking_detail)
    db.commit()
    db.refresh(new_speaking_detail)

    return new_speaking_detail

@router.post("/test-details/writing", response_model=schemas.WritingTestDetailResponse)
def create_writing(writing_detail: schemas.WritingTestDetailCreate, db: Session = Depends(get_db)):
    new_writing_detail = models.WritingTestDetails(
        user_id=writing_detail.user_id,
        test_type=writing_detail.test_type,
        test_date=writing_detail.test_date,
        task1_achievement_score=writing_detail.task1_achievement_score,
        task1_coherence_score=writing_detail.task1_coherence_score,
        task1_lexical_resource_score=writing_detail.task1_lexical_resource_score,
        task1_grammatical_range_score=writing_detail.task1_grammatical_range_score,
        task2_response_score=writing_detail.task2_response_score,
        task2_coherence_score=writing_detail.task2_coherence_score,
        task2_lexical_resource_score=writing_detail.task2_lexical_resource_score,
        task2_grammatical_range_score=writing_detail.task2_grammatical_range_score,
        overall_writing_score=writing_detail.overall_writing_score
    )
    db.add(new_writing_detail)
    db.commit()
    db.refresh(new_writing_detail)

    return new_writing_detail

@router.get("/get-testdetails-by-dates", response_model=List[schemas.TestDetailResponse])
def get_testdetails_by_dates(user_id: int, date_from: date, date_to: date, db: Session = Depends(get_db)):
    # Querying each detail category
    testdetails = db.query(models.TestDetails).filter(
        models.TestDetails.user_id == user_id,
        models.TestDetails.test_date.between(date_from, date_to)
    ).all()

    # Handling the case where no tests are found
    if not testdetails:
        raise HTTPException(status_code=404, detail="No overall test details test details found in the specified date range")
    # Constructing the combined response
    return testdetails

@router.get("/get-listening-by-dates", response_model=List[schemas.ListeningTestDetailResponse])
def get_listenings_by_dates(user_id: int, date_from: date, date_to: date, db: Session = Depends(get_db)):
    # Querying each detail category
    listening_details = db.query(models.ListeningDetails).filter(
        models.ListeningDetails.user_id == user_id,
        models.ListeningDetails.test_date.between(date_from, date_to)
    ).all()

    # Handling the case where no tests are found
    if not listening_details:
        raise HTTPException(status_code=404, detail="No listenings test details found in the specified date range")
    # Constructing the combined response
    return listening_details

@router.get("/get-speaking-by-dates", response_model=List[schemas.SpeakingTestDetailResponse])
def get_speakings_by_dates(user_id: int, date_from: date, date_to: date, db: Session = Depends(get_db)):
    # Querying speaking test details within the given date range
    speaking_details = db.query(models.SpeakingTestDetails).filter(
        models.SpeakingTestDetails.user_id == user_id,
        models.SpeakingTestDetails.test_date.between(date_from, date_to)
    ).all()

    # Handling the case where no tests are found
    if not speaking_details:
        raise HTTPException(status_code=404, detail="No speaking test details found in the specified date range")

    # Returning the fetched test details
    return speaking_details

@router.get("/get-writing-by-dates", response_model=List[schemas.WritingTestDetailResponse])
def get_writings_by_dates(user_id: int, date_from: date, date_to: date, db: Session = Depends(get_db)):
    # Querying writing test details within the given date range
    writing_details = db.query(models.WritingTestDetails).filter(
        models.WritingTestDetails.user_id == user_id,
        models.WritingTestDetails.test_date.between(date_from, date_to)
    ).all()

    # Handling the case where no tests are found
    if not writing_details:
        raise HTTPException(status_code=404, detail="No writing test details found in the specified date range")

    # Returning the fetched test details
    return writing_details

@router.get("/get-reading-by-dates", response_model=List[schemas.ReadingTestDetailResponse])
def get_readings_by_dates(user_id: int, date_from: date, date_to: date, db: Session = Depends(get_db)):
    # Querying reading test details within the given date range
    reading_details = db.query(models.ReadingTestDetails).filter(
        models.ReadingTestDetails.user_id == user_id,
        models.ReadingTestDetails.test_date.between(date_from, date_to)
    ).all()

    # Handling the case where no tests are found
    if not reading_details:
        raise HTTPException(status_code=404, detail="No reading test details found in the specified date range")

    # Returning the fetched test details
    return reading_details
