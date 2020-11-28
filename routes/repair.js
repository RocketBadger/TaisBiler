const express = require('express')
const router = express.Router()
const Car = require('../model/Car')
const Repair = require('../model/Repair')
const Damage = require('../model/Damage')

// GET /reparation uden id
router.get('/', async (request, response) => {
  try {
    response.redirect('/biler')
  } catch (error) {
    response.render('errorMessage', { errorMessage: 'Biler kunne ikke loades' })
    console.log(error)
  }
})

// GET /reparation med id
router.get('/:id', async (request, response) => {
  try {
    const car = await Car.findById(request.params.id)
    response.render('repairsAndDamages', { car: car })
  } catch (error) {
    response.render('errorMessage', { errorMessage: 'Bil kunne ikke findes' })
    console.log(error)
  }
})

// POST repair på en bil
router.post('/addRepair', async (request, response) => {
  try {
    const car = await Car.findById(request.body._id)
    const repair = new Repair({
      date: request.body.date,
      repair: request.body.repair,
      repaired: request.body.repaired
    })
    await car.addRepair(repair)
    response.redirect('/reparation/' + request.body._id)
  } catch (error) {
    response.render('errorMessage', {
      errorMessage: 'Tilføjelse af reparation gik galt'
    })
    console.log(error)
  }
})

// GET /skader uden id
router.get('/', async (request, response) => {
  try {
    response.redirect('/biler')
  } catch (error) {
    response.render('errorMessage', { errorMessage: 'Biler kunne ikke loades' })
    console.log(error)
  }
})

// GET /skader med id
router.get('/:id', async (request, response) => {
  try {
    const car = await Car.findById(request.params.id)
    response.render('addDamage', { car: car })
  } catch (error) {
    response.render('errorMessage', { errorMessage: 'Bil kunne ikke findes' })
    console.log(error)
  }
})

// POST damage på en bil
router.post('/addDamage', async (request, response) => {
  try {
    const car = await Car.findById(request.body._id)
    const damage = new Damage({
      date: request.body.date,
      damage: request.body.damage,
      repaired: request.body.repaired
    })
    await car.addDamage(damage)
    response.redirect('/reparation/' + request.body._id)
  } catch (error) {
    response.render('errorMessage', {
      errorMessage: 'Tilføjelse af skade gik galt'
    })
    console.log(error)
  }
})


//TODO --------------------------------------------

// router.get('/redigerSkade', (request, response) => {
//   try {
//     response.redirect('/reparation')
//   } catch (error) {
//     response.render('errorMessage', { errorMessage: 'Siden kunne ikke loades' })
//     console.log(error)
//   }
// })

// router.get('/redigerSkade/:id', (request, response) => {
//   try {
//     console.log(request.params.id)
//     const damage = car.damages.findById(request.params.id)
//     response.render('editDamage', { damage: damage })
//   } catch (error) {
//     response.render('errorMessage', { errorMessage: 'Skade kunne ikke findes' })
//     console.log(error)
//   }
// })

// router.post('redigerSkade/redigerSkade', async (request, response) => {
//   try {
//     const damage = await Damage.findById(request.body._id)
//     const updates = {
//       date: request.body.Date,
//       damage: request.body.damage,
//       repaired: request.body.repaired
//     }
//     await damage.changeRepair(damage, updates)
//     response.redirect('/reparation')
//   } catch (error) {
//     response.render('errorMessage', {
//       errorMessage: 'Der skete en fejl under redigeringen af skaden'
//     })
//     console.log(error)
//   }
// })

// GET inspection uden id
router.get('/', async (request, response) => {
  try {
      response.redirect('/biler')
  } catch (error) {
      response.render('errorMessage', {
          errorMessage: 'Siden kunne ikke loades'
      })
      console.log(error)
  }
})

// GET inspection med id
router.get('/:id', async (request, response) => {
  try {
      const car = await Car.findById(request.params.id)
      response.render('inspection', {
          car: car
      })
  } catch (error) {
      response.render('errorMessage', {
          errorMessage: 'Bil kunne ikke findes'
      })
      console.log(error)
  }
})

// POST inspection på en bil
router.post('/addInspection', async (request, response) => {
  try {
      const car = await Car.findById(request.body._id)
      car.prevInspection = car.nextInspection
      car.nextInspection = request.body.nextInspection
      car.save()
      response.redirect('/reparation/' + request.body._id)
  } catch (error) {
      response.render('errorMessage', {
          errorMessage: 'Tilføjelse af syn gik galt'
      })
      console.log(error)
  }
})

module.exports = router