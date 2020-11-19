const express = require('express')
const router = express.Router()
const Car = require('../model/Car')

router.get('/', async (request, response) => {
    try {
        const car = await Car.findOne({ licensePlate: 'PI12345' })
        response.render('addRepair', { car: car })
    } catch (error) {
        //   response.render('cars', { cars: [], errorMessage: 'Biler kunne ikke loades', })
    }
})

module.exports = router