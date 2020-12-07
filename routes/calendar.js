const express = require('express')
const router = express.Router()
const Car = require('../model/Car')

router.get('/', async (req, res) => {
    try {
        const inspections = await Car.getAllInspections()
        const repairs = await Car.getAllRepairs()
        if ((!Array.isArray(inspections) || inspections.length) && (!Array.isArray(repairs) || repairs.length)) {
            let date = new Date()
            date.setDate(date.getDate() + 7)
            let inspectionAlert = false
            if (inspections[0].nextInspection < date) {
                inspectionAlert = true
            }
            let repairAlert = false
            if (repairs[1].date < date) {
                repairAlert = true
            }
            res.render('calendar', {
                inspections: inspections,
                repairs: repairs,
                inspectionAlert: inspectionAlert,
                repairAlert: repairAlert
            })
        } else {
            res.render('errorMessage', {
                errorMessage: 'Der er ikke oprettet nogle syn/reparationer, kalenderen kan vise'
            })
        }
    } catch (error) {
        res.render('errorMessage', {
            errorMessage: 'Kalender kunne ikke loades'
        })
    }
})

// Fanger alle forsøg på sidens extension
router.get('/:site', (req, res) => {
    res.redirect('/')
})

module.exports = router