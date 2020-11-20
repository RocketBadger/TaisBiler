const express = require('express')
const router = express.Router()
const Car = require('../model/Car')

// Forsiden redirecter til /biler
router.get('/', async (request, response) => {
  try {
    const cars = await Car.find({})
    response.render('cars', { cars: cars })
  } catch (error) {
    response.render('errorMessage', { errorMessage: 'Biler kunne ikke loades', })
  }
})

// Viser siden opretBil
router.get('/opretBil', (request, response) => {
  try {
    response.render('createCar')
  } catch (error) {
    response.render('errorMessage', { errorMessage: 'Siden kunne ikke loades', })
  }
})

// Opretter en ny bil med POST
router.post('/opretBil', async (request, response) => {
  try {
    let car = new Car({
      brand: request.body.brand,
      model: request.body.model,
      licensePlate: request.body.licensePlate,
      engine: request.body.engine,
      year: request.body.year,
      retired: request.body.retired,
      colour: request.body.colour,
      id: request.body.id,
    })
    await car.save()
    response.redirect('/biler')
  } catch (error) {
    response.render('errorMessage', { errorMessage: 'Bil kunne ikke oprettes', })
  }
})

// Redirecter tilbage til /biler, hvis der ikke er et id
router.get('/redigerBil', (request, response) => {
  try {
    response.redirect('/biler')
  } catch (error) {
    response.render('errorMessage', { errorMessage: 'Siden kunne ikke loades', })
  }
})

// Finder en bil fra ID og klargør redigering
router.get('/redigerBil/:id', async (request, response) => {
  try {
    const car = await Car.findById(request.params.id)
    response.render('editCar', { car: car })
  } catch (error) {
    response.render('errorMessage', { errorMessage: 'Bil kunne ikke findes', })
  }
})

// Opdaterer en bil fra ID med PUT
router.post('/redigerBil/redigerBil', async (request, response) => {
  try {
    const car = await Car.findById(request.body._id)
    const updates = {
      brand: request.body.brand,
      model: request.body.model,
      licensePlate: request.body.licensePlate,
      engine: request.body.engine,
      year: request.body.year,
      retired: request.body.retired,
      colour: request.body.colour,
      id: request.body.id
    }
    await Car.updateCar(car, updates)
    response.redirect('/biler')
  } catch (error) {
    response.render('errorMessage', { errorMessage: 'Der skete en fejl under redigering af bilen', })
  }
})

// Fanger alle forkert stavede versioner af sidens extension
router.get('/:site', (request, response) => {
  response.redirect('/')
})

module.exports = router