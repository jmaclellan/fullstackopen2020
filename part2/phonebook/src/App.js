import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '123-456-7890' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = e => {
    e.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
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

  const handleNumberChange = e => {
    setNewNumber(e.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      {/* <div>filter shown with <input value={} onChange={} /></div> */}
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>
        <div key={person.key}>
          {person.name} {person.number}
        </div>
      )}
    </div>
  )
}

export default App