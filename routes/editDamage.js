const express = require('express')
const router = express.Router()
const Car = require('../model/Car')
const Damage = require('../model/Damage')


router.get('/', async (req, res) => {
    try {
        res.redirect('/reparation')
    } catch {
        console.log("Vi røg i catchdelen fra editDamage")
    }
})

router.get('/:id', (req, res) => {
    try {
      console.log(req.params.id)
      const damage = Car.damages.findById(req.params.id)
      res.render('editDamage', {damage: damage})
    } catch (error) {
      res.render('errorMessage', { errorMessage: 'Skade kunne ikke findes' })
      console.log(error)
    }
  })

  router.post('/edit', async (req, res) => {
    try {
        const damage = await Damage.findById(req.body._id)
        const updates = {
          date: req.body.Date,
          damage: req.body.damage,
          repaired: req.body.repaired
        }
        await damage.changeRepair(damage, updates)
        res.redirect('/reparation')
      } catch (error) {
        console.log(error)
      }
  })

  module.exports = router

  