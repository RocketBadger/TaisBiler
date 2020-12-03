const express = require('express')
const router = express.Router()

router.get('/', async (request, response) => {
    try {
        response.render('login')
    } catch (error) {
        response.send('Der skete en fejl ved login')
        console.log(error)
    }
})

// ved korrekt login redirect til /biler

module.exports = router