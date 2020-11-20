const express = require('express')
const router = express.Router()
const Car = require('../model/Car')

// GET /reparation uden id
router.get('/', async (request, response) => {
    try {
        response.redirect('/biler')
    } catch (error) {
        response.render('errorMessage', { errorMessage: 'Biler kunne ikke loades', })
    }
})

// GET /reparation med id
router.get('/:id', async (request, response) => {
    try {
        const car = await Car.findById(request.params.id)
        response.render('addRepair', { car: car })
    } catch (error) {
        response.render('errorMessage', { errorMessage: 'Bil kunne ikke findes', })
    }
})

// POST repair på en bil
router.post('/addRepair', async (request, response) => {
    try {
        const car = await Car.findById(request.body._id)
        const repair = {
            date: request.body.date,
            repair: request.body.repair,
            repaired: request.body.repaired
        }
        await car.addRepair(repair)
        response.redirect('/reparation/' + request.body._id)
    } catch (error) {
        response.render('errorMessage', { errorMessage: 'Tilføjelse af reparation gik galt', })
    }
})

module.exports = router