const express = require('express')
const { prependOnceListener } = require('../model/Person')
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
router.get('/:id', async (req, res) => {
  try {
    const person = await Person.findById(req.params.id)
    const persons = await Person.find({})
    res.render('person', { person: person, persons: persons })
  } catch (error) {
    res.render('errorMessage', {
      errorMessage: 'Person kunne ikke findes'
    })
    console.log(error)
  }
})
// Undgår at flere klik på person uden rettelser, sender en videre
router.get('/person/:id', async (req, res) => {
  try {
    res.redirect('/person/' + req.params.id)
  } catch (error) {
    res.render('errorMessage', {
      errorMessage: 'Person kunne ikke findes'
    })
    console.log(error)
  }
})
// Undgår at flere klik på person uden rettelser, sender en videre
router.get('/person/person', async (req, res) => {
  try {
    res.redirect('/person')
  } catch (error) {
    res.render('errorMessage', {
      errorMessage: 'Fejl prøv senere'
    })
    console.log(error)
  }
})

//Opretter en ny person, ændrer eller "sletter eksisterende"
router.post('/person', async (req, res) => {
  if (req.body.btnCreate) {
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
  } else if (req.body.btnChange) {
    try {
      const oldPerson = await Person.findById(req.body._id)
      const updates = {
        name: req.body.name,
        position: req.body.position,
        birthday: req.body.birthday
      }
      await Person.updatePerson(oldPerson, updates)
      res.redirect('/person')
    } catch (error) {
      res.render('errorMessage', {
        errorMessage: 'Person kunne ikke ændres'
      })
      console.log(error)
    }
  } else if (req.body.btnNullify) {
    try {
      const oldPerson = await Person.findById(req.body._id)
      const updates = {
        name: null,
        position: null,
        birthday: null
      }
      await Person.updatePerson(oldPerson, updates)
      res.redirect('/person')
    } catch (error) {
      res.render('errorMessage', {
        errorMessage: 'Person kunne ikke ændres'
      })
      console.log(error)
    }
  }
})
// Undgår at flere klik på person uden rettelser, sender en videre
router.post('/', async (req, res) => {
  if (req.body.btnCreate) {
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
  } else if (req.body.btnChange) {
    try {
      const oldPerson = await Person.findById(req.body._id)
      const updates = {
        name: req.body.name,
        position: req.body.position,
        birthday: req.body.birthday
      }
      await Person.updatePerson(oldPerson, updates)
      res.redirect('/person')
    } catch (error) {
      res.render('errorMessage', {
        errorMessage: 'Person kunne ikke ændres'
      })
      console.log(error)
    }
  } else if (req.body.btnNullify) {
    try {
      const oldPerson = await Person.findById(req.body._id)
      const updates = {
        name: null,
        position: null,
        birthday: null
      }
      await Person.updatePerson(oldPerson, updates)
      res.redirect('/person')
    } catch (error) {
      res.render('errorMessage', {
        errorMessage: 'Person kunne ikke ændres'
      })
      console.log(error)
    }
  }
})
module.exports = router
