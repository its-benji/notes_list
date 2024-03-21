import './App.css';
import Note from './components/Note';
import CreateNote from './components/CreateNote'
import React from 'react';
import { useEffect, useState } from 'react';

function App() {
  const [items, setItems] = useState([]) // notes from .csv file
  const [noteData, setNoteData] = useState({id: '', title: '', description: ''}) // holds data from created note

// gets data from backend
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:${process.env.REACT_APP_API_PORT}/notes`, {
          method: 'GET'
        })

        if(!response.ok) {
          throw new Error('Failure: could not fetch data')
        }
        const data = await response.json();
        setItems(data) // updates our note list
      } catch(error) {
        console.error('Error Fetching Data:', error.message)
      }
    }
    fetchData();
  }, [])

  // updates noteData for created note
  function handleChange(e) {
    const {name, value} = e.target;

    // NOTE: if expecting large data sets or other methods of note insertion, I'd develop something a bit more robust
    let setID = 1; // if no items initializes at 1
    if(items.length) {
      setID = (+items[items.length-1].id + 1) // sets ID to value of latest ID + 1 
    }
    setNoteData(prevState => ({
      ...prevState, [name]: value, id: setID
  }))
}

  async function handleSubmit(e) {
    e.preventDefault();
    if(noteData.title) {
        const response = await fetch(`http://localhost:${process.env.REACT_APP_API_PORT}/notes`, {
        method: 'POST',
        headers: { 'content-type': 'application/json'},
        body: JSON.stringify(noteData)
      })

      const data = await response.json();
      setNoteData({id: '', title: '', description: ''})
      setItems(data)
    }
    else {
      alert('Must have title!') // alerts user if they try to create note without title
    }
  }

  
  // handles when an item is removed
  async function handleDelete(e){

    e.preventDefault();
    console.log(e.target)
    console.log(e.target.id, 'target id')
    const response = await fetch(`http://localhost:${process.env.REACT_APP_API_PORT}/notes/${e.target.id}`, {
        method: 'DELETE'
    })

    const data = await response.json();
    console.log('DATA:', data)
    setItems(data)

  }


  return (
    <div className='container'>
      <CreateNote handleSubmit={handleSubmit} handleChange={handleChange} noteData={noteData}/>
      {/* Mapping out all notes */}
      {items.map((note, index)=>{
        return (
          <div>
            <Note 
            key={index}
            id={note.id} 
            title={note.title} 
            content={note.content} 
            handleClick={handleDelete}/>
          </div>
        );
      })}
    </div>
  );
}

export default App;
