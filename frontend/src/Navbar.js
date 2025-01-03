import React from 'react'
import { Link, useMatch, useResolvedPath} from "react-router-dom"

export default function Navbar() {
    return <nav className='nav'>
        <Link to="/" className='site-title'>QuizApp</Link>
        <ul>
            <CustomLink to="/myFlashcards"> My Flashcards </CustomLink>
            <CustomLink to="/library"> Library </CustomLink>
        </ul>
    </nav>
}

// https://www.youtube.com/watch?v=SLfhMt5OUPI&ab_channel=WebDevSimplified
function CustomLink( {to, children, ...props}) {
    // const path = window.location.pathname

    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end:true})
    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}> {children} </Link>
        </li>
    )
}
