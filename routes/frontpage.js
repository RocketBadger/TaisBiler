const express = require('express')
const router = express.Router()

// Forsiden redirecter til /biler
// router.get('/', (req, res) => {
//     try {
//         res.redirect('/login')
//     } catch (error) {
//         res.send('Der skete en fejl: frontpage')
//     }
// })

// router.get('/', (req, res) => {
//     try {
//         res.render('login')
//     } catch (error) {
//         res.send('Der skete en fejl')
//         console.log(error)
//     }
// })

module.exports = router