const express = require('express')
const router = express.Router()
const Person = require('../model/Person')
const Clothes = require('../model/Clothes')

// start side for alt
router.get('/', async (req, res) => {
  try {
    const persons = await Person.find()
    const clothes = await Clothes.find()
    res.render('clothes', { persons: persons, clothes: clothes })
  } catch (error) {
    res.render('errorMessage', { errorMessage: 'Siden kunne ikke loades' })
    console.log(error)
  }
})
router.get('/:id', async (req, res) => {
  try {
    const persons = await Person.find()
    const clothes = await Clothes.find()
    const cloth = await Clothes.findById(req.params.id)
    res.render('clothes', { persons: persons, clothes: clothes, cloth: cloth })
  } catch (error) {
    res.render('errorMessage', {
      errorMessage: 'Beklædningsgenstanden kunne ikke findes'
    })
    console.log(error)
  }
})

// Til oprettelse uden at have valgt en skabelon"
router.post('/', async (req, res) => {
  if (req.body.btnCreate) {
    try {
      let clothes = new Clothes({
        name: req.body.name,
        size: req.body.size,
        brand: req.body.brand
      })
      await clothes.save()
      res.redirect('/clothes')
    } catch (error) {
      res.render('errorMessage', {
        errorMessage: 'Beklædningsgenstanden kunne ikke oprettes'
      })
      console.log(error)
    }
  } else if (req.body.btnChange) {
    res.render('errorMessage', {
      errorMessage: 'Beklædningsgenstand skal vælges, før der kan ændres'
    })
  } else if (req.body.btnDelete) {
    res.render('errorMessage', {
      errorMessage: 'Beklædningsgenstand skal vælges, før der kan "slettes"'
    })
  }
})

//Opretter en ny beklædningsgenstand, ændrer eller sletter eksisterende
router.post('/clothes', async (req, res) => {
  if (req.body.btnCreate) {
    try {
      let clothes = new Clothes({
        name: req.body.name,
        position: req.body.size,
        birthday: req.body.brand
      })
      await clothes.save()
      res.redirect('/clothes')
    } catch (error) {
      res.render('errorMessage', {
        errorMessage: 'Beklædningsgenstanden kunne ikke oprettes'
      })
      console.log(error)
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
      res.redirect('/clothes')
    } catch (error) {
      res.render('errorMessage', {
        errorMessage: 'Beklædningsgenstanden kunne ikke ændres'
      })
      console.log(error)
    }
  } else if (req.body.btnDelete) {
    try {
      const oldClothes = await Clothes.findById(req.body._id)

      await Clothes.deleteClothes(oldClothes)
      res.redirect('/clothes')
    } catch (error) {
      res.render('errorMessage', {
        errorMessage: 'Beklædningsgenstanden kunne ikke ændres'
      })
      console.log(error)
    }
  }
})
module.exports = router
