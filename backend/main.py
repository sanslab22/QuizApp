from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Annotated
import models
from database import engine, SessionLocal
from sqlalchemy.orm import Session
from fastapi import Request

app = FastAPI()

# Add CORS middleware to allow cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (you can change this in production)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

models.Base.metadata.create_all(bind=engine)

# pydantic model for data validation purpose
class ChoiceBase(BaseModel):
    choice_text: str
    is_correct: bool

class QuestionBase(BaseModel):
    question_text: str
    choices: List[ChoiceBase]

    class Config:
        orm_mode = True  # This allows FastAPI to convert SQLAlchemy models to Pydantic models

    
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
    
db_dependency = Annotated[Session, Depends(get_db)]

@app.get("/questions/{question_id}")
async def read_question(question_id:int, db:db_dependency):
    result = db.query(models.Questions).filter(models.Questions.id==question_id).first()
    if not result:
        raise HTTPException(status_code=404, detail='Question was not found')
    return result
    
@app.get("/choices/{question_id}")
async def read_choices(question_id:int, db:db_dependency):
    result = db.query(models.Choices).filter(models.Choices.question_id == question_id).all()
    if not result:
        raise HTTPException(status_code=404, detail='Choices was not found')
    return result

@app.post("/questions/")
async def create_questions(question: QuestionBase, db: db_dependency):


    db_question = models.Questions(question_text=question.question_text)
    db.add(db_question)
    db.commit()
    db.refresh(db_question)
    for choice in question.choices:
        db_choice = models.Choices(choice_text=choice.choice_text, is_correct = choice.is_correct, question_id = db_question.id)
        db.add(db_choice)
    db.commit()

@app.get("/questions/", response_model=List[QuestionBase])
async def read_questions(db: db_dependency):
    # Query all questions and join with choices
    result = db.query(models.Questions).all()  # Get all questions

    if not result:
        raise HTTPException(status_code=404, detail="No questions found")

    # For each question, fetch its choices
    questions_with_choices = []
    for question in result:
        # Get all choices for each question
        choices = db.query(models.Choices).filter(models.Choices.question_id == question.id).all() # choice_text and is_correct
        
        # Create the response object
        question_data = QuestionBase(
            question_text=question.question_text,
            choices=[ChoiceBase(choice_text=choice.choice_text, is_correct=choice.is_correct) for choice in choices]
        )
        
        questions_with_choices.append(question_data)

    return questions_with_choices

