const express = require('express')
const router = express.Router()

// Forsiden redirecter til /biler
router.get('/', (request, response) => {
    try {
        response.redirect('/biler')
    } catch (error) {
        response.send('Der skete en fejl')
        console.log(error)
    }
})

module.exports = router