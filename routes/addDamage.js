const express = require('express')
const router = express.Router()
const Car = require('../model/Car')

router.get('/', async (request, response) => {
    try {
        response.redirect('/biler')
    } catch (error) {
        //   response.render('cars', { cars: [], errorMessage: 'Biler kunne ikke loades', })
    }
})

router.get('/:id', async (request, response) => {
    try {
        const car = await Car.findById(request.params.id)
        response.render('addDamage', { car: car })
    } catch (error) {
        //   response.render('cars', { cars: [], errorMessage: 'Biler kunne ikke loades', })
    }
})

router.post('/addDamage', async (request, response) => {
    try {
        const car = await Car.findById(request.body._id)
        const damage = {
            date: request.body.date,
            damage: request.body.damage,
            repaired: request.body.repaired
        }
        await car.addDamage(damage)
        response.redirect('addDamage', { car: car })
    } catch (error) {

    }
})

module.exports = router