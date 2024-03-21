import React from "react";
import { useState } from "react";
import "./styles.css"
import RemoveNote from "./RemoveNote";


const Note = (props) => {

    // checks if note has been expanded
    const [isOpen, setIsOpen] = useState(false)

    function onClick() {
        setIsOpen(!isOpen);
    }

    return (
        <div key={'note'+props.id} className={'note-card'}>
            <div className='note-header'>
                <h1>{props.title}</h1>
                <div className="right-note-header">
                    { isOpen ? <span onClick={onClick}>&#9660;</span> : <span onClick={onClick}>&#9654;</span>}
                    {/* "Remove Note" button */}
                    <RemoveNote id={props.id} handleClick={props.handleClick}/>
                </div>
            </div>
            <div>
                {/* note content */}
               {isOpen && <h2>{props.content}</h2> }
            </div>
        </div>
    )
}

export default Note;