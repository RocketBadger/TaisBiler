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

// process.env.PAS
// process.env.USE

// process.env.PASS
// process.env.USER

module.exports = router