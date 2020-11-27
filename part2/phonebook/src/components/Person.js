import React from 'react'

const Person = ({ person, handleDelete }) => {
  return (
    <div key={person.number}>
      {person.name} {person.number}
      <button onClick={() => handleDelete(person.id)}>Delete</button>
    </div>
  )
}

export default Person
