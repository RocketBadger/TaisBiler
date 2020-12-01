const express = require('express')
const router = express.Router()
const Car = require('../model/Car')
const Person = require('../model/Person')

// Forsiden redirecter til /biler
router.get('/', async (request, response) => {
  try {
    const cars = await Car.find({})
    // Ikke-skrottede biler går først
    cars.sort((a, b) => a.retired - b.retired)
    response.render('cars', {
      cars: cars
    })
  } catch (error) {
    response.render('errorMessage', {
      errorMessage: 'Biler kunne ikke loades'
    })
    console.log(error)
  }
})

// Viser siden opretBil
router.get('/opretBil', (request, response) => {
  try {
    response.render('createCar')
  } catch (error) {
    response.render('errorMessage', {
      errorMessage: 'Siden kunne ikke loades'
    })
    console.log(error)
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
      particulateFilter: request.body.particulateFilter,
      retired: request.body.retired,
      colour: request.body.colour,
      nickName: request.body.nickName,
      driver: request.body.driver
    })
    await car.save()
    response.redirect('/biler')
  } catch (error) {
    response.render('errorMessage', {
      errorMessage: 'Bil kunne ikke oprettes'
    })
    console.log(error)
  }
})

// Redirecter tilbage til /biler, hvis der ikke er et id
router.get('/redigerBil', (request, response) => {
  try {
    response.redirect('/biler')
  } catch (error) {
    response.render('errorMessage', {
      errorMessage: 'Siden kunne ikke loades'
    })
    console.log(error)
  }
})

// Finder en bil fra ID og klargør redigering
router.get('/redigerBil/:id', async (request, response) => {
  try {
    const car = await Car.findById(request.params.id)
    const people = await Person.find({})
    response.render('editCar', {
      car: car,
      people: people
    })
  } catch (error) {
    response.render('errorMessage', {
      errorMessage: 'Bil kunne ikke findes'
    })
    console.log(error)
  }
})

// Opdaterer en bil fra ID med PUT
router.post('/redigerBil/redigerBil', async (request, response) => {
  try {
    let Driver = undefined
    if (request.body.driver !== 'Ingen') {
      Driver = await Person.findById(request.body.driver)
    }
    const car = await Car.findById(request.body._id)
    const updates = {
      brand: request.body.brand,
      model: request.body.model,
      licensePlate: request.body.licensePlate,
      engine: request.body.engine,
      year: request.body.year,
      particulateFilter: request.body.particulateFilter,
      retired: request.body.retired,
      colour: request.body.colour,
      nickName: request.body.nickName,
      driver: {
        prevDriver: car.driver.driver,
        prevDateFrom: car.driver.dateFrom,
        prevDateTo: new Date().toISOString().split('T')[0],
        driver: Driver,
        dateFrom: new Date().toISOString().split('T')[0]
      }
    }
    await Car.updateCar(car, updates)
    response.redirect('/biler')
  } catch (error) {
    response.render('errorMessage', {
      errorMessage: 'Der skete en fejl under redigering af bilen'
    })
    console.log(error)
  }
})

// Fanger alle forkert stavede versioner af sidens extension
router.get('/:site', (request, response) => {
  response.redirect('/')
})

module.exports = router