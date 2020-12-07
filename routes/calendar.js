const express = require('express')
const router = express.Router()
const Car = require('../model/Car')

router.get('/', async (req, res) => {
    try {
        const inspections = await Car.getAllInspections()
        const repairs = await Car.getAllRepairs()

        let date = new Date()
        date.setDate(date.getDate() + 7)
        let inspectionAlert = false
        if (inspections[0].nextInspection < date) {
            inspectionAlert = true
        }
        let repairAlert = false
        console.log(date);
        console.log(repairs[0].date);
        console.log(repairs);
        if (repairs[0].date < date) {
            repairAlert = true
        }
        console.log(repairAlert);

        res.render('calendar', {
            inspections: inspections, repairs: repairs, inspectionAlert: inspectionAlert, repairAlert: repairAlert
        })
    } catch (error) {
        res.render('errorMessage', { errorMessage: 'Kalender kunne ikke loades' })
    }
})

// Fanger alle forsøg på sidens extension
router.get('/:site', (req, res) => {
    res.redirect('/')
})

module.exports = router