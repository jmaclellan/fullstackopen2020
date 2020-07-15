import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const addName = e => {
    e.preventDefault()
    const newPerson = {
      name: newName,
      key: newName
    }

    if (persons.filter(person => person.name === newPerson.name).length > 0) {
      alert(`{person.name} is already in phonebook`)
    }

    setPersons([...persons, newPerson])
    setNewName('')
  }

  const handleNameChange = e => {
    setNewName(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <div key={person.key}>{person.name}</div>)}
    </div>
  )
}

export default App