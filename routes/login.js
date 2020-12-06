const express = require('express')
const router = express.Router()
const session = require('express-session')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// hvis logget ind redirect til /biler, ellers /login
router.get('/', async (req, res) => {
    const name = req.session.name
    if (name) {
        try {
            res.redirect('biler')
        } catch (error) {
            res.send('Der skete en fejl ved login. req.session.name true')
            console.log(error)
        }
    } else {
        try {
            res.render('login')
        } catch (error) {
            res.send('Der skete en fejl ved login. req.session.name false')
            console.log(error)
        }
    }
})

// ved korrekt login redirect til /biler
router.post('/', async (req, res) => {
    const {u, p} = req.body
    try {
        if (u === process.env.USE && p === process.env.PAS) {
            req.session.name = u;
            // res.send({
            //     ok: true
            // });
            res.redirect('/biler')
        } else {
            // res.send({
            //     ok: false
            // })
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
// TESTET USE + PAS config var, fungerer i req/res + frontpage forbipasseret commit

module.exports = router