const express = require('express')
const router = express.Router()
const fetch = require("node-fetch")
const Car = require('../model/Car')

router.get('frontpage', async (request, response) => {
    try {
        const cars = await Car.find({})
        const carsJSON = JSON.stringify(cars)
        response.send(carsJSON)
    } catch {
        response.status(408).json({ error: error.details })
    }
})

module.exports = router