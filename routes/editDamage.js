const express = require('express')
const router = express.Router()
const Car = require('../model/Car')

router.get('/', async (req, res) => {
  try {
    res.redirect('/reparation')
  } catch {
    res.render('errorMessage', { errorMessage: 'Skader kunne ikke loades' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const damageID = req.params.id
    const carID = damageID.split("_")[0]
    const car = await Car.findById(carID)
    const damage = await car.damages.id(damageID)
    res.render('editDamage', { car: car, damage: damage })
  } catch (error) {
    res.render('errorMessage', { errorMessage: 'Skade kunne ikke findes' })
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
    await car.changeDamage(damage, updates)
    res.redirect('/reparation/' + carID)
  } catch (error) {
    res.render('errorMessage', { errorMessage: 'Skade kunne ikke redigeres' })
  }
})

module.exports = router