const express = require('express')
const router = express.Router()
const Car = require('../model/Car')

// GET /skader uden id
router.get('/', async (request, response) => {
  try {
    response.redirect('/biler')
  } catch (error) {
    response.render('errorMessage', { errorMessage: 'Biler kunne ikke loades' })
  }
})

// GET /skader med id
router.get('/:id', async (request, response) => {
  try {
    const car = await Car.findById(request.params.id)
    response.render('addDamage', { car: car })
  } catch (error) {
    response.render('errorMessage', { errorMessage: 'Bil kunne ikke findes' })
  }
})

// POST damage på en bil
router.post('/addDamage', async (request, response) => {
  try {
    const car = await Car.findById(request.body._id)
    const damage = {
      date: request.body.date,
      damage: request.body.damage,
      repaired: request.body.repaired
    }
    await car.addDamage(damage)
    response.redirect('/skader/' + request.body._id)
  } catch (error) {
    response.render('errorMessage', {
      errorMessage: 'Tilføjelse af skade gik galt'
    })
  }
})

module.exports = router
