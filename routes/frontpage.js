const express = require('express')
const router = express.Router()

// Forsiden redirecter til /biler
router.get('/', (req, res) => {
    try {
        response.redirect('/login')
    } catch (error) {
        res.send('Der skete en fejl')
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