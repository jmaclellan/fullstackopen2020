import React from 'react'

const Person = ({ name, number, handleDeletePerson }) => {
  return (
    <div key={number}>
      {name} {number}
      <button onClick={handleDeletePerson}>Delete</button>
    </div>
  )
}

export default Person
