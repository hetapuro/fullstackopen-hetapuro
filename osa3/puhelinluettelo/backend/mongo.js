const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Give password as argument')
    process.exit(1)
  }

const password = process.argv[2]
const url = `mongodb+srv://firstuser:${password}@cluster0.ap86z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (!process.argv[3]) {
     Person.find({})
        .then(persons => {
            console.log('Phonebook:')
            persons.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            })
            mongoose.connection.close()
        })
}
else {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })
    person.save()
        .then(() => {
            console.log(`Added ${process.argv[3]} ${process.argv[4]} to phonebook`)
            mongoose.connection.close()
        })
}