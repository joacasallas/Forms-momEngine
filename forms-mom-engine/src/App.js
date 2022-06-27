import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [foundation, setFoundation] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
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
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: username,
      foundationName: foundation,
      phoneNumber: phoneNumber,
      password: password,
      date: new Date().toISOString(),
      vendor: Math.random() > 0.5,
      id: notes.length + 1,
    }  
    noteService
      .create(newObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setFirstName('')
        setLastName('')
        setEmail('')
        setUsername('')
        setFoundation('')
        setPhoneNumber('')
        setPassword('')
      })
  }

  const toggleProfileOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, vendor: !note.vendor }
  
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.username}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)   
      })
  }

  /*const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }*/

  const handleFirstName = (event) => {
    setFirstName(event.target.value)
  }

  const handleLastName = (event) => {
    setLastName(event.target.value)
  }

  const handleEmail = (event) => {
    setEmail(event.target.value)
  }

  const handleUsername = (event) => {
    setUsername(event.target.value)
  }

  const handleFoundation = (event) => {
    setFoundation(event.target.value)
  }

  const handlePhoneNumber = (event) => {
    setPhoneNumber(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }


  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.vendor)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'vendor' : 'all' }
        </button>
      </div>      
      <ul>
        {notesToShow.map((note, i) => 
          <Note
            key={i}
            note={note} 
            toggleProfile={() => toggleProfileOf(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <br/>
        <input type="text" id="firstName" placeholder="First name"
          value={firstName}
          onChange={handleFirstName}
        />
        <br/>
        <input type="text" id="lastName" placeholder="Last name"
          value={lastName}
          onChange={handleLastName}
        />
        <br/>
        <input type="text" id="email" placeholder="Email"
          value={email}
          onChange={handleEmail}
        />
        <br/>
        <input type="text" id="username" placeholder="Username"
          value={username}
          onChange={handleUsername}
        />
        <br/>
        <input type="text" id="foundation" placeholder="Organization"
          value={foundation}
          onChange={handleFoundation}
        />
        <br/>
        <input type="text" id="phoneNumber" placeholder="Phone Number"
          value={phoneNumber}
          onChange={handlePhoneNumber}
        />
        <br/>
        <input type="text" id="password" placeholder="Password"
          value={password}
          onChange={handlePassword}
        />
        <br/>
        <button type="submit">Create account</button>
      </form>   
    </div>
  )
}

export default App 
