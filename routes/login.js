const express = require('express')
const router = express.Router()

// hvis logget ind redirect til /biler, ellers /login
router.get('/', async (req, res) => {
    if (req.session.name) {
        try {
            res.redirect('/biler')
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
            res.redirect('/biler')
        } else {
            console.log(req.body.u + ' | ' + process.env.USE + ' | ' + req.body.p + ' | ' + process.env.PAS)
            res.redirect('/')
        }
    } catch (error) {
        res.render('errorMessage', {
            errorMessage: 'Der skete en fejl ved login'
        })
        console.log(error)
    }
})

module.exports = router