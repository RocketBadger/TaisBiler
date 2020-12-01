const express = require('express')
const router = express.Router()
const Person = require('../model/Person')
const Clothes = require('../model/Clothes')

// start side for alt
router.get('/', async (req, res) => {
  try {
    const persons = await Person.find()
    const clothes = await Clothes.find()
    res.render('clothes', { persons: persons, clothes: clothes })
  } catch (error) {
    res.render('errorMessage', { errorMessage: 'Siden kunne ikke loades' })
    console.log(error)
  }
})

module.exports = router
