import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = e => {
    e.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
      key: newName
    }

    // prevent user adding name that already exists
    if (persons.filter(person => person.name === newPerson.name).length > 0) {
      alert(`${newPerson.name} is already in phonebook`)
      setNewName('')
      setNewNumber('')
      return
    }

    setPersons([...persons, newPerson])
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = e => {
    setNewName(e.target.value)
  }

  const handleNumberChange = e => {
    setNewNumber(e.target.value)
  }

  const display = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <form>
        filter shown with: <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </form>
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
      {display.map(person =>
        <div key={person.number}>
          {person.name} {person.number}
        </div>
      )}
    </div>
  )
}

export default App