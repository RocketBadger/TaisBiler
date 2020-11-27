const express = require('express')
const router = express.Router()
const Person = require('../model/Person')

// Siden med personer
router.get('/', async (req, res) => {
  try {
    const persons = await Person.find({})
    res.render('person', { persons: persons })
  } catch (error) {
    res.render('errorMessage', { errorMessage: 'Siden kunne ikke loades' })
    console.log(error)
  }
})

//Opretter en ny person
router.post('/', async (req, res) => {
  try {
    let person = new Person({
      name: req.body.name,
      position: req.body.position,
      birthday: req.body.birthday
    })
    await person.save()
    res.redirect('/person')
  } catch (error) {
    res.render('errorMessage', {
      errorMessage: 'Person kunne ikke oprettes'
    })
    console.log(error)
  }
})

router.get('/person/:id', async (req, res) => {
  try {
    const person = await Person.findById(req.params.id)
    res.render('/person', { person: person })
  } catch (error) {
    res.render('errorMessage', {
      errorMessage: 'Person kunne ikke findes'
    })
    console.log(error)
  }
})

//Ændrer en person, og "sletter"/overskriver
router.post('/person', async (req, res) => {
  const personOld = await Person.findById(req.params.id)
  try {
    let personNew = new Person({
      name: request.body.name,
      position: request.body.position,
      birthday: request.body.birthday
    })
    Person.updatePerson(personOld, personNew)
    res.redirect('/person')
  } catch (error) {
    res.render('errorMessage', {
      errorMessage: 'Person kunne ikke ændres'
    })
    console.log(error)
  }
})

module.exports = router
