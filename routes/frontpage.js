const express = require('express')
const router = express.Router()
const Car = require('../model/Car')

// Henter /Cars
router.get('/', async (request, response) => {
    try {
        const cars = await Car.find({})
        response.render('cars', { cars: cars })
    } catch {
        response.render('cars', { cars: [], errorMessage: 'Cars could not be loaded'})
    }
})

// Fanger alle forkert stavede versioner af sidens extension
router.get('/:site', (request, response) => {
    response.redirect('/')
})

module.exports = router