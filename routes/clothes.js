const express = require('express')
const router = express.Router()
const Person = require('../model/Person')
const Clothes = require('../model/Clothes')

// Startside for alt
router.get('/', async (req, res) => {
  try {
    const persons = await Person.find()
    const clothes = await Clothes.find()
    res.render('clothes', { persons: persons, clothes: clothes })
  } catch (error) {
    res.render('errorMessage', { errorMessage: 'Siden kunne ikke loades' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const persons = await Person.find()
    const clothes = await Clothes.find()
    const cloth = await Clothes.findById(req.params.id)
    res.render('clothes', { persons: persons, clothes: clothes, cloth: cloth })
  } catch (error) {
    res.render('errorMessage', { errorMessage: 'Beklædningsgenstanden kunne ikke findes' })
  }
})

// Til oprettelse uden at have valgt en skabelon
router.post('/', async (req, res) => {
  if (req.body.btnCreate) {
    try {
      const clothes = new Clothes({
        name: req.body.name,
        size: req.body.size,
        brand: req.body.brand
      })
      await clothes.save()
      res.redirect('/toj')
    } catch (error) {
      res.render('errorMessage', { errorMessage: 'Beklædningsgenstanden kunne ikke oprettes' })
    }
  } else if (req.body.btnChange) {
    res.render('errorMessage', { errorMessage: 'Beklædningsgenstand skal vælges, før der kan ændres' })
  } else if (req.body.btnDelete) {
    res.render('errorMessage', { errorMessage: 'Beklædningsgenstand skal vælges, før der kan slettes' })
  }
})

// Opretter en ny beklædningsgenstand, ændrer eller sletter eksisterende
router.post('/toj', async (req, res) => {
  if (req.body.btnCreate) {
    try {
      const clothes = new Clothes({
        name: req.body.name,
        position: req.body.size,
        birthday: req.body.brand
      })
      await clothes.save()
      res.redirect('/toj')
    } catch (error) {
      res.render('errorMessage', { errorMessage: 'Tøjet kunne ikke oprettes' })
    }
  } else if (req.body.btnChange) {
    try {
      const oldClothes = await Clothes.findById(req.body._id)
      const updates = {
        name: req.body.name,
        size: req.body.size,
        brand: req.body.brand
      }
      await Clothes.updateClothes(oldClothes, updates)
      res.redirect('/toj')
    } catch (error) {
      res.render('errorMessage', { errorMessage: 'Tøjet kunne ikke ændres' })
    }
  } else if (req.body.btnDelete) {
    try {
      const oldClothes = await Clothes.findById(req.body._id)
      await Clothes.deleteClothes(oldClothes)
      res.redirect('/toj')
    } catch (error) {
      res.render('errorMessage', { errorMessage: 'Tøjet kunne ikke ændres' })
    }
  }
})

router.post('/addPersonToClothes', async (req, res) => {
  try {
    Clothes.addPerson(req.body.cloth_id, req.body.person_id, new Date())
    res.redirect('/toj')
  } catch (error) {
    res.render('errorMessage', { errorMessage: 'Tøjet kunne ikke oprettes' })
  }
})

module.exports = router