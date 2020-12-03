const express = require('express')
const router = express.Router()

// Forsiden redirecter til /biler
router.get('/', (request, response) => {
    try {
        response.redirect('/login')
    } catch (error) {
        response.send('Der skete en fejl')
        console.log(error)
    }
})

// router.get('/', (request, response) => {
//     try {
//         response.render('login')
//     } catch (error) {
//         response.send('Der skete en fejl')
//         console.log(error)
//     }
// })

module.exports = router