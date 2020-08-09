import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [changeMessage, setChangeMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = e => {
    e.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      key: newName
    }

    // prevent user adding name that already exists
    if (persons.filter(person => person.name === personObject.name).length > 0) {
      alert(`${personObject.name} is already in phonebook`)
      setNewName('')
      setNewNumber('')
      return
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons([...persons, returnedPerson])
        // reset form
        setNewName('')
        setNewNumber('')
      })

    // change message
    setChangeMessage(`Added ${personObject.name}`)
    setTimeout(() => {
      setChangeMessage(null)
    }, 5000)
  }

  const handleNameChange = e => {
    setNewName(e.target.value)
  }

  const handleNumberChange = e => {
    setNewNumber(e.target.value)
    // change message
    setChangeMessage(`Changed ${persons.name}'s number`)
    setTimeout(() => {
      setChangeMessage(null)
    }, 5000)
  }

  const handleFilterChange = e => {
    setFilter(e.target.value)
  }

  const handleDeletePerson = number => {
    setPersons(persons.filter(person => person.number !== number))
  }

  // only display people who match filter state
  const display = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={changeMessage} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
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
        <Person
          name={person.name}
          number={person.number}
          key={person.number}
          handleDeletePerson={handleDeletePerson}
        />
      )}
    </div>
  )
}

export default App