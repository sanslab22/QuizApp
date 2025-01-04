from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

URL_DATABSE = 'postgresql://postgres:Aaaa1234!!@localhost:5433/QuizApplication'

engine = create_engine(URL_DATABSE)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
