const express = require('express')
const router = express.Router()

// Forsiden redirecter til /biler
router.get('/', (req, res) => {
    try {
        res.redirect('/biler')
    } catch (error) {
        res.send('Der skete en fejl')
    }
})

module.exports = router