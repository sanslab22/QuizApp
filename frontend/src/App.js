import React from "react";
// import Flashcard from "./components/Flashcard";
// import FlashcardList from "./components/FlashcardList";
import "./app.css"
import Navbar from "./Navbar";
import MyFlashcards from "./pages/MyFlashcards";
import Library from "./pages/Library";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom"

function App() {
  // const[flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS)
  
  /*
  // easier to handle Routing using react-router-dom
  let component
  switch (window.location.pathname) {
    case "/":
      component: <Home />
      break
    case "/flashcards":
      component: <MyFlashcards />
      break
    case "/library":
      component: <Library />
      break
  }
  */

  

 

  // useEffect(() => {
  //   axios
  //     .get('http://127.0.0.1:8000/questions/1')
  //     .then(res => {
  //       console.log(res.data)
  //     })
  // }, [])
  return (
    // <h1> Hello World! </h1>
    <>
      <Navbar />
      {/* <div className="container">{component}</div> */}
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/myFlashcards" element={<MyFlashcards />} />
          <Route path="/library" element={<Library />} />
        </Routes>
      </div>
      {/* <FlashcardList flashcards={ flashcards } /> */}
    </>
    
  );
}

/*
const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    question: 'What is 2+2?',
    answer: '4',
    options: [
      '2',
      '3',
      '4',
      '5'
    ]
  },
  {
    id: 2,
    question: 'Q2',
    answer: 'Ans',
    options: [
      'A1',
      'A2',
      'A3',
      'A4'
    ]
  }

]
*/
export default App;
