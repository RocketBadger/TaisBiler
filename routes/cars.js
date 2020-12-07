const express = require('express')
const router = express.Router()
const Car = require('../model/Car')
const Person = require('../model/Person')

// Forsiden redirecter til /biler
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find({})
    // Ikke-skrottede biler sorteres først
    cars.sort((a, b) => a.retired - b.retired)
    res.render('cars', { cars: cars })
  } catch (error) {
    res.render('errorMessage', { errorMessage: 'Biler kunne ikke loades' })
  }
})

// Viser siden opretBil
router.get('/opretBil', (req, res) => {
  try {
    res.render('createCar')
  } catch (error) {
    res.render('errorMessage', { errorMessage: 'Siden kunne ikke loades' })
  }
})

// Opretter en ny bil med POST
router.post('/opretBil', async (req, res) => {
  try {
    let Driver = undefined
    if (req.body.driver !== 'Ingen') {
      Driver = await Person.findById(req.body.driver)
    }
    const car = new Car({
      brand: req.body.brand,
      model: req.body.model,
      licensePlate: req.body.licensePlate,
      engine: req.body.engine,
      year: req.body.year,
      particulateFilter: req.body.particulateFilter,
      retired: req.body.retired,
      colour: req.body.colour,
      nickName: req.body.nickName,
      driver: {
        driver: Driver,
        dateFrom: new Date()
      }
    })
    await car.save()
    res.redirect('/biler')
  } catch (error) {
    res.render('errorMessage', { errorMessage: 'Bil kunne ikke oprettes' })
  }
})

// Redirecter tilbage til /biler, hvis der ikke er et id
router.get('/redigerBil', (req, res) => {
  try {
    res.redirect('/biler')
  } catch (error) {
    res.render('errorMessage', { errorMessage: 'Siden kunne ikke loades' })
  }
})

// Finder en bil fra ID og klargør redigering
router.get('/redigerBil/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id)
    const people = await Person.find({})
    res.render('editCar', { car: car, people: people })
  } catch (error) {
    res.render('errorMessage', { errorMessage: 'Bil kunne ikke findes' })
  }
})

// Opdaterer en bil fra ID med PUT
router.post('/redigerBil/redigerBil', async (req, res) => {
  try {
    let Driver = undefined
    if (req.body.driver !== 'Ingen') {
      Driver = await Person.findById(req.body.driver)
    }
    const car = await Car.findById(req.body._id)
    const updates = {
      brand: req.body.brand,
      model: req.body.model,
      licensePlate: req.body.licensePlate,
      engine: req.body.engine,
      year: req.body.year,
      particulateFilter: req.body.particulateFilter,
      retired: req.body.retired,
      colour: req.body.colour,
      nickName: req.body.nickName,
      driver: {
        prevDriver: car.driver.driver,
        prevDateFrom: car.driver.dateFrom,
        prevDateTo: new Date(),
        driver: Driver,
        dateFrom: new Date()
      }
    }
    await car.updateThisCar(updates)
    res.redirect('/biler')
  } catch (error) {
    res.render('errorMessage', {
      errorMessage: 'Der skete en fejl under redigering af bilen'
    })
  }
})

// Fanger alle forkert stavede versioner af sidens extension
router.get('/:site', (req, res) => {
  res.redirect('/')
})

module.exports = router
