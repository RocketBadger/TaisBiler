const express = require('express')
const router = express.Router()
const Car = require('../model/Car')

// GET inspection uden id
router.get('/', async (request, response) => {
    try {
        response.redirect('/biler')
    } catch (error) {
        response.render('errorMessage', {
            errorMessage: 'Siden kunne ikke loades'
        })
        console.log(error)
    }
})

// GET inspection med id
router.get('/:id', async (request, response) => {
    try {
        const car = await Car.findById(request.params.id)
        response.render('inspection', {
            car: car
        })
    } catch (error) {
        response.render('errorMessage', {
            errorMessage: 'Bil kunne ikke findes'
        })
        console.log(error)
    }
})

// POST inspection på en bil
router.post('/addInspection', async (request, response) => {
    try {
        const car = await Car.findById(request.body._id)
        // car.inspections.prev = car.inspections.next
        // car.inspections.next = request.body.nextInspection
        // await car.addInspection(request.body.nextInspection)
        // const update = {
        //     nextinspection: request.body.nextinspection
        // }
        // await Car.updateCar(car, update)
        response.redirect('/reparation/' + request.body._id)
    } catch (error) {
        response.render('errorMessage', {
            errorMessage: 'Tilføjelse af syn gik galt'
        })
        console.log(error)
    }
})