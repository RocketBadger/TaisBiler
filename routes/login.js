const express = require('express')
const router = express.Router()

// Hvis logget ind redirect til /kalender, ellers /login
router.get('/', async (req, res) => {
    if (req.session.name) {
        try {
            res.redirect('/kalender')
        } catch (error) {
            res.send('Der skete en fejl ved login')
        }
    } else {
        try {
            res.render('login')
        } catch (error) {
            res.send('Der skete en fejl ved login')
        }
    }
})

// Ved korrekt login redirect til /kalender
router.post('/', async (req, res) => {
    const { u, p } = req.body
    try {
        if (u === process.env.USE && p === process.env.PAS) {
            req.session.name = u;
            res.redirect('/kalender')
        } else {
            console.log(req.body.u + ' | ' + process.env.USE + ' | ' + req.body.p + ' | ' + process.env.PAS)
            res.redirect('/')
        }
    } catch (error) {
        res.render('errorMessage', { errorMessage: 'Der skete en fejl ved login' })
    }
})

module.exports = router