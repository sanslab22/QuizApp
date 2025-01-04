import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import FlashcardList from "./components/FlashcardList";

export default function Library() {
    const [flashcards, setFlashcards] = useState([]);

    const [formData, setFormData] = useState({
        question_text: '',
        answer: ''
    })

    const [showForm, setShowForm] = useState(false);

    // handle user input
    const handleFormChange = (e) => {
        const { id, value } = e.target;
        console.log(id, value);
        setFormData((prevState) => ({
            ...prevState,
            [id]: value,
        }))
    }


    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const newQuestion = {
            question_text: formData.question_text,
            choices: [
                {
                    choice_text: formData.answer,
                    is_correct: true // You can modify this based on your form design
                }
            ]
        };

        try {
            // POST request to FastAPI to create a new question and choices
            const response = await axios.post('http://localhost:8000/questions/', newQuestion);
            console.log('Question created:', response.data);

            // Optionally, fetch the latest questions
            fetchQuestions();

            // Reset the form
            setFormData({
                question_text: '',
                answer: ''
            });

            setShowForm(false);

        } catch (error) {
            console.error("Error creating flashcard:", error);
        }
    };

    // Fetch questions from the API
    const fetchQuestions = async () => {
        try {
            const response = await axios.get('http://localhost:8000/questions/');
            setFlashcards(response.data);
        } catch (error) {
            console.error("Error fetching flashcards:", error);
        }
    };

    // Fetch flashcards on mount
    useEffect(() => {
        fetchQuestions();
    }, []);


    return (
        <div>
            <div className='title-spacing'>
                <h1 className='title'> Library </h1>
                <div className='add-button'>
                    <button className="icon-btn add-btn"
                            onClick={ () => setShowForm((prevState) => (!prevState)) }> {/* button from uiverse*/}
                        <div className="add-icon"></div>
                        <div className="btn-txt">Add Flashcard</div>
                    </button>
                </div>
            </div>
            {/* <FlashcardList flashcards={ flashcards } /> */}

            {showForm && (
                <div className='forms-content'>
                    <form onSubmit={handleFormSubmit}>
                        <div className='input-row'>
                            <input
                                type="text"
                                id="question_text"
                                value={formData.question_text}
                                onChange={handleFormChange}
                                placeholder="Enter a term"
                                required
                            />
                        </div>
                        <div className='input-row'>
                            <input
                                type="text"
                                id="answer"
                                value={formData.choice_text}
                                onChange={handleFormChange}
                                placeholder="Enter a definition"
                                required
                            />
                        </div>
                        <div className='title-spacing'>
                            <button className='submit-button' type="submit">Add Flashcard</button>
                            <button
                                type="button"
                                className='cancel-button'
                                onClick={() => setShowForm(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Display the flashcards */}
            <div className='title'>
                {flashcards.length > 0 ? (
                    flashcards.map((flashcard, index) => (
                        <div key={index}>
                            <h3>{flashcard.question_text}</h3>
                            <ul>
                                {flashcard.choices.map((choice, choiceIndex) => (
                                    <li key={choiceIndex}>
                                        {choice.choice_text} - {choice.is_correct ? '✓' : '✗'}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))
                ) : (
                    <p>No flashcards available.</p>
                )}
            </div>
        </div>
    )
}