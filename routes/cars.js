const express = require('express')
const router = express.Router()
const Car = require('../model/Car')

// Forsiden redirecter til /biler
router.get('/', async (request, response) => {
    try {
        const cars = await Car.find({})
        response.render('cars', { cars: cars })
    } catch (error) {
        response.render('cars', { cars: [], errorMessage: 'Biler kunne ikke loades' })
    }
})

router.get('/opretBil', (request, response) => {
    try {
        response.render('createCar')
    } catch (error) {

    }
})

// Opretter en ny bil med POST
router.post('/opretBil', async (request, response) => {
    try {
        let car = new Car({
            brand: request.body.brand,
            model: request.body.model,
            licensePlate: request.body.licensePlate,
            retired: false,
            colour: request.body.colour,
            id: request.body.id
        })
        await car.save()
        response.redirect('/biler')
    } catch (error) {
        console.log(error)
    }
})

// router.get('/redigerBil', (request, response) => {
//     try {
//         // response.render('editCar')
//     } catch (error) {

//     }
// })

// router.put('/redigerBil', async (request, response) => {
//     try {

//     } catch (error) {

//     }
// })

// Finder en bil fra ID og klargør redigering
router.get('/redigerBil/:id', async (request, response) => {
    try {
        const car = await Car.findById(request.params.id)
        response.render('editCar', { car: car })
    } catch (error) {

    }
})

// Opdaterer en bil fra ID med PUT
router.put('/redigerBil/:id', async (request, response) => {
    try {
        const car = await Car.findById(request.params.id)
        car.brand = request.body.brand
        car[model] = request.body.model // ændrer ellers i selve modellen, måske
        car.licensePlate = request.body.licensePlate
        car.retired = false
        car.colour = request.body.colour
        car.id = request.body.id
        car.save()
        response.redirect('/biler')
    } catch (error) {

    }
})

// Fanger alle forkert stavede versioner af sidens extension
router.get('/:site', (request, response) => {
    response.redirect('/')
})

module.exports = router