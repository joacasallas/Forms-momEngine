import React from 'react'

const Note = ({note}) => {
  return (
    <li className='note'>
      firstName: {note.firstName}
      lastName: {note.lastName}
      email: {note.email}
      organization: {note.foundation}
      phoneNumber: {note.username}
      password: {note.password}
      id: {note.id}
    </li>
  )
}

export default Note
