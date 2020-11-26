const express = require('express')
const router = express.Router()

router.get('/', async (request, response) => {
    try {
        response.render('statistics')
    } catch (error) {
        response.render('errorMessage', { errorMessage: 'Statistikker kunne ikke loades' })
        console.log(error)
    }
})

router.get('/biler', async (request, response) => {
    try {
        response.render('statisticsCars')
    } catch (error) {
        response.render('errorMessage', { errorMessage: 'Statistikker kunne ikke loades' })
        console.log(error)
    }
})

router.get('/personer', async (request, response) => {
    try {
        response.render('statisticsPersons')
    } catch (error) {
        response.render('errorMessage', { errorMessage: 'Statistikker kunne ikke loades' })
        console.log(error)
    }
})

router.get('/toj', async (request, response) => {
    try {
        response.render('statisticsClothes')
    } catch (error) {
        response.render('errorMessage', { errorMessage: 'Statistikker kunne ikke loades' })
        console.log(error)
    }
})

module.exports = router