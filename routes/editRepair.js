const express = require('express')
const router = express.Router()
const Car = require('../model/Car')
const Repair = require('../model/Repair')

router.get('/', async (req, res) => {
    try {
        res.redirect('/reparation')
    } catch {
        console.log("Vi røg i catchdelen fra editRepair")
    }
})

router.get('/:id', async (req, res) => {
    try {
      const repair = await Car.repairs.findById(req.params.id)
      res.render('editRepair', {repair: repair})
    } catch (error) {
      res.render('errorMessage', { errorMessage: 'Repair kunne ikke findes' })
      console.log(error)
    }
  })

  router.post('/edit', async (req, res) => {
    try {
        const repair = await Repair.findById(req.body._id)
        const updates = {
          date: req.body.Date,
          repair: req.body.repair,
          repaired: req.body.repaired
        }
        await repair.changeRepair(repair, updates)
        res.redirect('/reparation')
      } catch (error) {
        console.log("Random text")
      }
  })

  module.exports = router