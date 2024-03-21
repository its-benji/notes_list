import React from "react";
import { useState } from "react";
import "./styles.css"

const CreateNote = (props) => {
    const [formOpen, setFormOpen] = useState(false) // determines if "note creation" is open

    function onClick() {
        setFormOpen(!formOpen);
    }

    return(
        <div className="note-maker">
            {/* 'add note' button */}
            <button 
            className="addButton"
            onClick={onClick}> 
                {formOpen ? 'Close' : '+ New Note'}
            </button>
            {formOpen && <form method="POST" onSubmit={props.handleSubmit}>
            <ul>
                {/* title input box */}
                <div>
                    <input 
                    type="text" 
                    name="title" 
                    placeholder="Title"
                    value={props.noteData.title}
                    onChange={props.handleChange}/>
                </div>
                {/* description input box */}
                <div>
                    <input 
                    type='text'
                    name="description" 
                    placeholder="Add Description"
                    value={props.noteData.description}
                    onChange={props.handleChange}/>
                </div>
                {/* submit button */}
                <div>
                    <input 
                    className="addButton"
                    id='submit'
                    type="submit" 
                    name="Submit" 
                    value="Add Note"/>
                </div>
            </ul>
            </form>}
        </div>
    )
}

export default CreateNote