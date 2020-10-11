import React from 'react'

const Person = ({ name, number, person, handleDeletePerson }) => {
  console.log(person)
  return (
    <div key={number}>
      {name} {number}
      <button onClick={(id, key) => handleDeletePerson(id, key)}>Delete</button>
    </div>
  )
}

export default Person
