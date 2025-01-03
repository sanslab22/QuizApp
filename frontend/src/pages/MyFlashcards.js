import React, { useState, useEffect } from "react";
import Flashcard from "../components/Flashcard";
import "./styles.css"

export default function MyFlashcards() {
    const [flashcards, setFlashcards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0); // Track the current flashcard index
    const [loading, setLoading] = useState(true); // To handle loading state

    useEffect(() => {
        // Fetch flashcards from the API
        const fetchFlashcards = async () => {
          try {
            const response = await fetch("http://127.0.0.1:8000/questions/");
            const data = await response.json();
            console.log(data)
            // Transform the data to match the expected format
            const formattedFlashcards = data.map((question) => ({
              id: question.id,
              question: question.question_text,
              answer: question.choices?.find((choice) => choice.is_correct)?.choice_text || 'No correct answer',
              options: question.choices?.map((choice) => choice.choice_text) || [],
            }));
            setFlashcards(formattedFlashcards);
            setLoading(false);
          } catch (error) {
            console.error("Error fetching flashcards:", error);
            setLoading(false);
          }
        };
    
        fetchFlashcards();
      }, []);

    // Function to go to the next flashcard
    const goToNextCard = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length); // Loop back to the first card after the last one
    };

    // Function to go to the previous flashcard
    const goToPreviousCard = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length
        ); // Loop back to the last card when moving backward from the first card
    };

    if (loading) {
        return <div>Loading flashcards...</div>; // Loading state
      }

    return (
        <div className="myFlashcards-padding">
        {flashcards.length > 0 ? (
            <>
            <Flashcard flashcard={flashcards[currentIndex]} /> {/* Show current flashcard */}
            <div className="navigation-buttons">
                <button onClick={goToPreviousCard}>{"<"}</button> {/* Previous button */}
                <button onClick={goToNextCard}>{">"}</button> {/* Next button */}
            </div>
            </>
        ) : (
            <div>No flashcards available.</div>
        )}
        </div>
  );
}

// const SAMPLE_FLASHCARDS = [
//     {
//         id: 1,
//         question: "What is 2+2?",
//         answer: "4",
//         options: ["2", "3", "4", "5"],
//     },
//     {
//         id: 2,
//         question: "Q2",
//         answer: "Ans",
//         options: ["A1", "A2", "A3", "A4"],
//     },
//     // You can add more flashcards here if you want
// ];
