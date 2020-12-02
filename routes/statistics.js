const bodyParser = require('body-parser')
const express = require('express')
const router = express.Router()
// const Car = require('../model/Car')
const Clothes = require('../model/Clothes')
const Person = require('../model/Person')

router.get('/', async (request, response) => {
    try {
        response.render('statistics/statistics')
    } catch (error) {
        response.render('errorMessage', { errorMessage: 'Statistikker kunne ikke loades' })
        console.log(error)
    }
})

// router.get('/biler', async (request, response) => {
//     try {
//         const cars = await Car.find({})
//         cars.sort((a, b) => a.retired - b.retired)
//         response.render('statistics/statisticsCars', { cars: cars })
//     } catch (error) {
//         response.render('errorMessage', { errorMessage: 'Statistikker kunne ikke loades' })
//         console.log(error)
//     }
// })

// router.get('/biler/:id', async (request, response) => {
//     try {
//         const car = await Car.findById(request.params.id)
//         // SKAL MEDTAGE PERSONER
//         response.render('statistics/statisticsCarsSpecific', { car: car, persons: [] })
//     } catch (error) {
//         response.render('errorMessage', { errorMessage: 'Statistikker kunne ikke loades' })
//         console.log(error)
//     }
// })

router.get('/personer', async (request, response) => {
    try {
        const persons = await Person.find({})
        persons.sort((a, b) => {
            if (a.position && b.position) {
                a.position.toLowerCase() - b.position.toLowerCase()
            }
            if (a.name && b.name) {
                a.name.toLowerCase() - b.name.toLowerCase()
            }
            if (a.birthday && b.birthday) {
                b.birthday - a.birthday
            }
        })
        response.render('statistics/statisticsPersons', { persons: persons })
    } catch (error) {
        response.render('errorMessage', { errorMessage: 'Statistikker kunne ikke loades' })
        console.log(error)
    }
})

router.get('/personer/:id', async (request, response) => {
    try {
        const person = await Person.findById(request.params.id)
        const clothes = await Clothes.getAPersonsClothes(request.params.id)
        response.render('statistics/statisticsPersonsSpecific', { person: person, clothes: clothes })
    } catch (error) {
        response.render('errorMessage', { errorMessage: 'Statistikker kunne ikke loades' })
        console.log(error)
    }
})

router.get('/toj', async (request, response) => {
    try {
        const clothes = await Clothes.find({})
        clothes.sort((a, b) => {
            if (a.brand && b.brand) {
                a.brand.toLowerCase() - b.brand.toLowerCase()
            }
            if (a.name && b.name) {
                a.name.toLowerCase() - b.name.toLowerCase()
            }
            if (a.size && b.size) {
                a.size.toLowerCase() - b.size.toLowerCase()
            }
        })
        response.render('statistics/statisticsClothes', { clothes: clothes })
    } catch (error) {
        response.render('errorMessage', { errorMessage: 'Statistikker kunne ikke loades' })
        console.log(error)
    }
})

router.get('/toj/:id', async (request, response) => {
    try {
        const clothes = await Clothes.findById(request.params.id)
        const persons = await Clothes.getReceiversOfClothes(request.params.id)
        const personsObject = Object.fromEntries(persons)
        response.render('statistics/statisticsClothesSpecific', { clothes: clothes, persons: personsObject })
    } catch (error) {
        response.render('errorMessage', { errorMessage: 'Statistikker kunne ikke loades' })
        console.log(error)
    }
})

module.exports = router