const express = require('express')
const router = express.Router()
const Car = require('../model/Car')

router.get('/', async (req, res) => {
  try {
    res.redirect('/reparation')
  } catch {
    res.render('errorMessage', { errorMessage: 'Reparationer kunne ikke loades' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const repairID = req.params.id
    const carID = repairID.split("_")[0]
    const car = await Car.findById(carID)
    let repair = await car.repairs.id(repairID)
    res.render('editRepair', { car: car, repair: repair })
  } catch (error) {
    res.render('errorMessage', { errorMessage: 'Repair kunne ikke findes' })
  }
})

router.post('/redigerReparation', async (req, res) => {
  try {
    const repairID = req.body._id
    const carID = repairID.split("_")[0]
    const car = await Car.findById(carID)
    const updates = {
      date: req.body.date,
      repair: req.body.repair,
      repaired: req.body.repaired
    }
    let repair = car.repairs.id(repairID)
    await car.changeRepair(repair, updates)
    res.redirect('/reparation/' + carID)
  } catch (error) {
    res.render('errorMessage', { errorMessage: 'Skader kunne ikke loades' })
  }
})

module.exports = router