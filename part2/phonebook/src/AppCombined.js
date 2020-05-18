// All components in single file
import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setSearch] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    const compare = persons.map(person => {return person.name === newName})

    if(compare.includes(true)){
      window.alert(`${newName} is already added to phonebook`)
    }else{
      setPersons(persons.concat(newPerson))
    }
    setNewName('')
    setNewNumber('')
    
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setSearch(event.target.value)
    console.log(event.target.value.length)
  }

  const namesToShow = persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>filter shown with: <input value = {newSearch}
                                  onChange = {handleFilter}/>
        </div>
      </form>

      <h2>add a new</h2>
      <form onSubmit = {addPerson}>
        <div>
          name: <input value = {newName}
                  onChange = {handleNameChange}/>
        </div>
        <div>
          number: <input value = {newNumber}
                  onChange = {handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {namesToShow.map(person => <p key = {person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App