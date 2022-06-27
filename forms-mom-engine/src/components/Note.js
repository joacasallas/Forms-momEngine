import React from 'react'

const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? 'make not important' : 'make important'

  return (
    <li className='note'>
      First name: {note.firstName}
      Last name: {note.lastName}
      Email: {note.email}
      Organization: {note.userName}
      Phone number: {note.userName}
      Password: {note.userName}
      Id: {note.userName}
      Date: {note.date}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export default Note
