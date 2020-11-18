const express = require('express')
const router = express.Router()
const Car = require('../model/Car')

// Forsiden redirecter til /biler
router.get('/', async (request, response) => {
  try {
    const cars = await Car.find({})
    response.render('dummy', { cars: cars })
  } catch (error) {
    response.render('dummy', { cars: [], errorMessage: 'Biler kunne ikke loades', })
  }
})

module.exports = router