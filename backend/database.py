from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

USERNAME = 'postgres'
PASSWORD = 'Aaaa1234!!'
HOSTNAME = 'localhost'
PORT = '5433'
SCHEMA_NAME =  'QuizApplication'

URL_DATABSE = f'postgresql://{USERNAME}:{PASSWORD}@{HOSTNAME}:{PORT}/{SCHEMA_NAME}'

engine = create_engine(URL_DATABSE)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
