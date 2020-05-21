import React, { useState, useEffect } from 'react'

import contactService from './services/contacts'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notifcation from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setSearch] = useState('')
  const [ notificationMsg, setNotificationMsg ] = useState('') 

  useEffect(()=> {
    contactService.getAll()
    .then(response => {
      setPersons(response)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    const compare = persons.map(person => {return person.name === newName})

    if(compare.includes(true)){
      // window.alert(`${newName} is already added to phonebook`)
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const original = persons.find(p => p.name === newName)
        newPerson.id = original.id
        console.log('original', newPerson, original.id)
        contactService
          .update(original.id, newPerson).then(returnedPerson => {
            console.log(returnedPerson)
            setNotificationMsg(`Updated ${original.name} in the phonebook`)
            setPersons(persons.map(person => person.id !== original.id ? person : newPerson))
          }).catch(error => {
            alert(
              `the person '${original.name}' was already deleted from server`
            )
            console.log('error', error)
            setPersons(persons.filter(n => n.id !== original.id))
          })
      }
    }else{
      console.log('create')
      contactService
        .create(newPerson)
        .then(response => {
        setNotificationMsg(`Added ${newName} to the phonebook`)
        setPersons(persons.concat(response))
        })
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

  const deletePerson = (event, person) => {
    event.preventDefault()
    if(window.confirm(`Delete ${person.name}?`)){
      contactService
      .del(person)
      .then(returnedContact => {
        setNotificationMsg(`Deleted ${person.name} from the phonebook`)
        setPersons(persons.filter(p => p.id !== person.id))
      })
    }
    
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notifcation notificationMsg = {notificationMsg} setNotificationMsg = {setNotificationMsg} />
      <Filter newSearch = {newSearch} handleFilter = {handleFilter}/>

      <h3>Add a new</h3>

      <PersonForm 
        newName = {newName}
        newNumber = {newNumber}
        handleNameChange = {handleNameChange}
        handleNumberChange = {handleNumberChange}
        addPerson = {addPerson}
      />

      <h3>Numbers</h3>

      <Persons  namesToShow = {namesToShow} handleDelete = {deletePerson}/>
    </div>
  )
}

export default App