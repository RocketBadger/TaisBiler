const express = require('express')
const router = express.Router()
const Car = require('../model/Car')
const Damage = require('../model/Damage')


router.get('/', async (req, res) => {
    try {
        res.redirect('/reparation')
    } catch {
        console.log("Vi røg i catchdelen fra editDamage")
    }
})

router.get('/:id', async (req, res) => {
  try {
      const damageID = req.params.id
      const carID = damageID.split("_")[0]
      const car = await Car.findById(carID)
      let damage = await car.damages.id(damageID)
      res.render('editDamage', {car: car, damage: damage})
  } catch (error) {
      res.render('errorMessage', { errorMessage: 'Damage kunne ikke findes' })
      console.log(error)
  }
})

  router.post('/redigerSkade', async (req, res) => {
    try {
      const damageID = req.body._id
      const carID = damageID.split("_")[0]
      const car = await Car.findById(carID)
      const updates = {
        date: req.body.date,
        damage: req.body.damage,
        repaired: req.body.repaired
      }
      let damage = car.damages.id(damageID)
      const test = await car.changeDamage(damage, updates)
      res.redirect('/reparation/' + carID)
    } catch (error) {
      console.log("Random text")
    }
})

  module.exports = router

  