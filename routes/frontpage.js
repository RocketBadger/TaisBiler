const express = require('express')
const router = express.Router()

// Forsiden redirecter til /biler
router.get('/', (request, response) => {
    response.redirect('/biler')
})

module.exports = router