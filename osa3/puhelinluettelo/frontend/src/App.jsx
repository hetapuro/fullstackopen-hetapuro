import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = (props) => {
  return (
    <div>
      Filter shown with <input value={props.show} onChange={props.handleShowChange}/>
    </div>
  )
}

const Form = (props) => {
  return (
    <form onSubmit={props.addPerson}>
        <div>
          Name: <input value={props.newName} onChange={props.handleNameChange}/>
        </div>
        <div>
          Number: <input value={props.newNumber} onChange={props.handleNumberChange}/>
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
    </form>
  )
}

const Persons = ({persons, personDelete}) => {
  return (
    <ul>
      {persons.map(person => 
        <Person key={person.name} person={person} personDelete={personDelete} /> 
      )}
    </ul>
  )
}

const Person = ({person, personDelete}) => {
  return (
    <li>{person.name} {person.number} <button onClick={() => personDelete(person.id, person.name)} type="button">Delete</button></li>
  )
}

const Notification = ({message, type}) => {
  if (message === null) {
    return null
  }

  if (type === "positive"){
  return (
    <div className='notification'>
      {message}
    </div>
  )}
  else if (type === "negative") {
    return (
      <div className='error'>
        {message}
      </div>
    )}
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [show, setShow] = useState('')
  const [message, setMessage] = useState(null)
  const [type, setType] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook. Do you want to replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        const changedPerson = {...person, number: newNumber}

        personService
          .update(changedPerson.id, changedPerson)
          .then(response => {
            setPersons(persons.map(p => p.id !== changedPerson.id ? p : response.data))
            setNewName('')
            setNewNumber('')
            setMessage(`Updated ${newName}`)
            setType("positive")

            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            setMessage(error.response.data.error)
            setType("negative")
    
            setTimeout(() => {
                setMessage(null)
            }, 5000)
          })
      }
    }
    else {
      const person = {
        name: newName,
        number: newNumber
      }

      personService
        .create(person)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          setMessage(`Added ${newName}`)
          setType("positive")

          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setMessage(error.response.data.error)
          setType("negative")
  
          setTimeout(() => {
              setMessage(null)
          }, 5000)
        })
    }
  }

  const personDelete = (id, name) => {
      if (window.confirm(`Delete ${name}?`)) {
      personService
        .deletePerson(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
          setMessage(`Deleted ${name}`)
          setType("negative")

          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setMessage(error.response.data.error)
          setType("negative")
  
          setTimeout(() => {
              setMessage(null)
          }, 5000)
        })
      }
    }

  const handleShowChange = (event) => {
    setShow(event.target.value)
  }

  const handleNameChange = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const personsToShow = show === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(show.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={type} />
      <Filter show={show} handleShowChange={handleShowChange} />
      <h2>Add new</h2>
      <Form addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
          newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={personsToShow} personDelete={personDelete} />
    </div>
  )

}

export default App