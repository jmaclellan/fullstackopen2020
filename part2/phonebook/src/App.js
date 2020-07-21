import React, { useState } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'

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
    // reset form
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = e => {
    setNewName(e.target.value)
  }

  const handleNumberChange = e => {
    setNewNumber(e.target.value)
  }

  const handleFilterChange = e => {
    setFilter(e.target.value)
  }

  // only display people who match filter state
  const display = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <form>
        filter shown with: <input
          value={filter}
          onChange={handleFilterChange}
        />
      </form>
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      {display.map(person =>
        <Person name={person.name} number={person.number} key={person.number} />
      )}
    </div>
  )
}

export default App