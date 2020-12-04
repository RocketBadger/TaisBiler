const express = require('express')
const router = express.Router()

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }

router.get('/', async (request, response) => {
    try {
        response.render('login')
    } catch (error) {
        response.send('Der skete en fejl ved login')
        console.log(error)
    }
})

// ved korrekt login redirect til /biler
router.post('/', async (request, response) => {
    try {
        if (request.body.u === process.env.USE && request.body.p === process.env.PAS || request.body.u === 'user' && request.body.p === 'pass') {
            response.redirect('/biler')
        } else {
            console.log('login fucked if')
        }
    } catch (error) {
        response.render('errorMessage', {
            errorMessage: 'Der skete en fejl ved login'
        })
        console.log('login fucked post catch')
        console.log(error)
    }
})

// login => frontpage => biler ?

// process.env.PAS
// process.env.USE

// process.env.PASS
// process.env.USER

module.exports = router