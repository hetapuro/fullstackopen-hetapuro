// require('dotenv').config()
// const { request, response } = require('express')
const express = require('express')
const morgan = require('morgan')
morgan.token('body', req => {
    return JSON.stringify(req.body)
  })
const app = express()
const logger = morgan(':method :url :status :res[content-length] - :response-time ms :body')
const cors = require('cors')
// const Person = require('./models/person')
// const person = require('./models/person')

app.use(express.json())
// app.use(express.static('build'))
app.use(logger)
app.use(cors())


let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: "1"
      },
      {
        name: "Dan Abramov",
        number: "987654321",
        id: "3"
      },
      {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: "4"
      }
]

app.get('/info', (request, response) => {
    const date = new Date()
    const count = persons.length
    
    response.send(`<p>Phonebook has info for ${count} people</p> <p>${date}</p>`)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    console.log(person)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => Number(n.id)))
      : 0
    return String(maxId + 1)
  }

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({ 
            error: 'content missing' 
          })
    }
    if (persons.some(person => person.name === body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }
    
    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat(person)
    
    response.json(person)
})

// const errorHandler = (error, request, response, next) => {
//     console.error(error.message)
    
//     if (error.name === 'CastError') {
//         return response.status(400).send({ error: 'malformatted id' })
//     }
//     else if (error.name === 'ValidationError') {
//         return response.status(400).json({ error: error.message })
//       }
    
//     next(error)
// }

// app.use(errorHandler)

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
    
app.use(unknownEndpoint)

const PORT = process.env.PORT ||3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})