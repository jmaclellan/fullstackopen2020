import React from 'react'

const Person = ({ name, number }) => {
  return (
    <div key={number}>
      {name} {number}
    </div>
  )
}

export default Person
