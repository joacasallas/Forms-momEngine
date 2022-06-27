import React from 'react'

const Note = ({note}) => {
  return (
    <li className='note'>
      content: {note.content}
      firstName: {note.firstName}
      lastName: {note.lastName}
      email: {note.email}
      organization: {note.userName}
      phoneNumber: {note.userName}
      password: {note.userName}
      id: {note.userName}
    </li>
  )
}

export default Note
