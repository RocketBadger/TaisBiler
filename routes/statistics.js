const bodyParser = require('body-parser')
const express = require('express')
const router = express.Router()
const Clothes = require('../model/Clothes')
const Person = require('../model/Person')

router.get('/', async (req, res) => {
    try {
        res.render('statistics/statistics')
    } catch (error) {
        res.render('errorMessage', { errorMessage: 'Statistikker kunne ikke loades' })
    }
})

router.get('/personer', async (req, res) => {
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
        res.render('statistics/statisticsPersons', { persons: persons })
    } catch (error) {
        res.render('errorMessage', { errorMessage: 'Statistikker kunne ikke loades' })
    }
})

router.get('/personer/:id', async (req, res) => {
    try {
        const person = await Person.findById(req.params.id)
        const clothes = await Clothes.getAPersonsClothes(req.params.id)
        res.render('statistics/statisticsPersonsSpecific', { person: person, clothes: clothes })
    } catch (error) {
        res.render('errorMessage', { errorMessage: 'Statistikker kunne ikke loades' })
    }
})

router.get('/toj', async (req, res) => {
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
        res.render('statistics/statisticsClothes', { clothes: clothes })
    } catch (error) {
        res.render('errorMessage', { errorMessage: 'Statistikker kunne ikke loades' })
    }
})

router.get('/toj/:id', async (req, res) => {
    try {
        const clothes = await Clothes.findById(req.params.id)
        const persons = await Clothes.getReceiversOfClothes(req.params.id)
        const personsObject = Object.fromEntries(persons)
        res.render('statistics/statisticsClothesSpecific', { clothes: clothes, persons: personsObject })
    } catch (error) {
        res.render('errorMessage', { errorMessage: 'Statistikker kunne ikke loades' })
    }
})

module.exports = router