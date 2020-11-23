import React from 'react'

const Person = ({ name, number, person, handleDelete }) => {
  console.log(person)
  return (
    <div key={number}>
      {name} {number}
      <button onClick={() => handleDelete(person.id)}>Delete</button>
    </div>
  )
}

export default Person
