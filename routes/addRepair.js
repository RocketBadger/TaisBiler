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
        response.render('addRepair', { car: car })
    } catch (error) {
        //   response.render('cars', { cars: [], errorMessage: 'Biler kunne ikke loades', })
    }
})

router.post('/addRepair', async (request, response) => {
    try {
        const car = await Car.findById(request.body._id)
        const repair = {
            date: request.body.date,
            repair: request.body.repair,
            repaired: request.body.repaired
        }
        await car.addRepair(repair)
        response.redirect('addRepair', { car: car })
    } catch (error) {

    }
})

module.exports = router