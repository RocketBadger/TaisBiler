const express = require('express')
const router = express.Router()
const Car = require('../model/Car')
const Repair = require('../model/Repair')
const Damage = require('../model/Damage')

// GET /reparation uden id
router.get('/', async (req, res) => {
  try {
    res.redirect('/biler')
  } catch (error) {
    res.render('errorMessage', { errorMessage: 'Biler kunne ikke loades' })
    console.log(error)
  }
})

// GET /reparation med id
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id)
    res.render('repairsAndDamages', { car: car })
  } catch (error) {
    res.render('errorMessage', { errorMessage: 'Bil kunne ikke findes' })
    console.log(error)
  }
})

// POST repair på en bil
router.post('/addRepair', async (req, res) => {
  try {
    const carID = req.body._id
    const car = await Car.findById(carID)
    const repairLength = car.repairs.length
    const repair = new Repair({
      date: req.body.date,
      repair: req.body.repair,
      repaired: req.body.repaired,
      _id: carID + "_" + (1000 + repairLength)
    })
    await car.addRepair(repair)
    res.redirect('/reparation/' + req.body._id)
  } catch (error) {
    res.render('errorMessage', {
      errorMessage: 'Tilføjelse af reparation gik galt'
    })
    console.log(error)
  }
})

// GET /skader uden id
router.get('/', async (req, res) => {
  try {
    res.redirect('/biler')
  } catch (error) {
    res.render('errorMessage', { errorMessage: 'Biler kunne ikke loades' })
    console.log(error)
  }
})

// GET /skader med id
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id)
    res.render('addDamage', { car: car })
  } catch (error) {
    res.render('errorMessage', { errorMessage: 'Bil kunne ikke findes' })
    console.log(error)
  }
})

// POST damage på en bil
router.post('/addDamage', async (req, res) => {
  try {
    const carID = req.body._id
    const car = await Car.findById(carID)
    const damageLength = car.damages.length
    const damage = new Damage({
      date: req.body.date,
      damage: req.body.damage,
      repaired: req.body.repaired,
      _id: carID + "_" + damageLength
    })
    await car.addDamage(damage)
    res.redirect('/reparation/' + req.body._id)
  } catch (error) {
    res.render('errorMessage', {
      errorMessage: 'Tilføjelse af skade gik galt'
    })
    console.log(error)
  }
})

// GET inspection uden id
router.get('/', async (req, res) => {
  try {
    res.redirect('/biler')
  } catch (error) {
    res.render('errorMessage', {
      errorMessage: 'Siden kunne ikke loades'
    })
    console.log(error)
  }
})

// GET inspection med id
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id)
    res.render('inspection', {
      car: car
    })
  } catch (error) {
    res.render('errorMessage', {
      errorMessage: 'Bil kunne ikke findes'
    })
    console.log(error)
  }
})

// POST inspection på en bil
router.post('/addInspection', async (req, res) => {
  try {
    const car = await Car.findById(req.body._id)
    car.addInspection(req.body.nextInspection)
    res.redirect('/reparation/' + req.body._id)
  } catch (error) {
    res.render('errorMessage', {
      errorMessage: 'Tilføjelse af syn gik galt'
    })
    console.log(error)
  }
})

module.exports = router