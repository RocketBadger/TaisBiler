const express = require('express')
const router = express.Router()

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

router.get('/', async (req, res) => {
    try {
        res.render('login')
    } catch (error) {
        res.send('Der skete en fejl ved login')
        console.log(error)
    }
})

// ved korrekt login redirect til /biler
router.post('/', async (req, res) => {
    try {
        if (req.body.u === process.env.USE && req.body.p === process.env.PAS || req.body.u === 'user' && req.body.p === 'pass') {
            res.redirect('/biler')
        } else {
            console.log('login fucked if')
            console.log(req.body.u + ' | ' + process.env.USE + ' | ' + req.body.p + ' | ' + process.env.PAS)
        }
    } catch (error) {
        res.render('errorMessage', {
            errorMessage: 'Der skete en fejl ved login'
        })
        console.log('login fucked post catch')
        console.log(error)
    }
})

// nuværende, frontpage => login => biler
// forbedret, login => biler

// TEST CONFIG VAR IN PRODUCTION! EVT OM NATTEN!

// process.env.PAS
// process.env.USE

// process.env.PASS
// process.env.USER

module.exports = router