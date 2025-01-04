# QuizApp

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Python 3
- PostgreSQL
- Node.js
- IDE of Choice (Intelli.j)

For testing purposes:

- Database: pgAdmin4
- API Endpoints: Postman (port 8080)

Install dependencies:

- Backend:
   - python3 -m venv env
   - pip install fastapi uvicorn sqlalchemy

- Frontend:
   - cd Frontend
   - npm install
   - npm install axios

## Technologies Used:

- Frontend: React, Axios
- Backend: Python, FastAPI
- Database: PostgreSQL

## Execution

1. You can download the Zip file and extract it
2. Open the project in you preferred IDE with the root folder named `QuizApp`
3. Navigate to `backend/database.py`
4. Modify the following based on your the setup of PostgreSQL: make sure schema name on application.properties is same as pgAdmin4
   1. `USERNAME= <your_username>`
   2. `PASSWORD= <your_password>`
   3. `HOSTNAME = <your_hostname>`
   4. `PORT = <your_port_num>`
   5. `SCHEMA_NAME = <your_schema>`
6. Locate the terminal and run the following commands to start the Backend:
   1. Enter `cd backend`
   2. uvicorn main:app --reload
8. Check the build terminal, to see if the FastAPI project is running (API endpoints on localhost:8080, PostgreSQL on port 5433)
9. To start the Frontend, open Terminal on IDE and enter the following:
   1. Enter `pwd` to verify that your path is currently `/QuizApp`
   2. Enter `cd frontend/` - navigates to the React frontend
   3. Enter `npm install` - installs all the necessary dependencies
   4. Check terminal to see all dependencies are installed
   5. Then enter `npm start` - start the localhost:3030 server
10. Once both the frontend and backend are running, the project is up and running successfully.

