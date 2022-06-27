import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([]) 
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const newObject = {
      content: newNote,
      firstName: newNote,
      lastName: newNote,
      email: newNote,
      userName: newNote,
      foundationName: newNote,
      phoneNumber: newNote,
      password: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: notes.length + 1,
    }  
    noteService
      .create(newObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)   
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>      
      <ul>
        {notesToShow.map((note, i) => 
          <Note
            key={i}
            note={note} 
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input type="text" id="firstName" placeholder="First name"
          value={newNote}
          onChange={handleNoteChange}
        />
        <br/>
        <input type="text" id="lastName" placeholder="Last name"
          value={newNote}
          onChange={handleNoteChange}
        />
        <br/>
        <input type="text" id="email" placeholder="Email"
          value={newNote}
          onChange={handleNoteChange}
        />
        <br/>
        <input type="text" id="userName" placeholder="Username"
          value={newNote}
          onChange={handleNoteChange}
        />
        <br/>
        <input type="text" id="foundationName" placeholder="Organization"
          value={newNote}
          onChange={handleNoteChange}
        />
        <br/>
        <input type="text" id="phoneNumber" placeholder="Phone Number"
          value={newNote}
          onChange={handleNoteChange}
        />
        <br/>
        <input type="text" id="password" placeholder="Password"
          value={newNote}
          onChange={handleNoteChange}
        />
        <br/>
        <button type="submit">Create account</button>
      </form>   
    </div>
  )
}

export default App 
