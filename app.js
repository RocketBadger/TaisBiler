// Hvis vi ikke er i produktionsmiljøet, skal der køres med lokale env-variable
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Car = require('./model/Car')

// Starter Mongoose database
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to Mongoose'))

// Gør det muligt at læse kroppen fra HTML
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Sætter PUG som grafisk flade
app.set('view engine', 'pug')

async function addCar() {
  let car = new Car({
    brand: 'BMW',
    model: 'X5',
    licensePlate: 'PI12345',
    engine: 'V5',
    year: 2018,
    retired: true,
    colour: 'black',
    id: 1,
  })
  await car.addRepair({
    date: new Date(1995, 11, 24),
    repair: 'Stor bule og hovprint',
    repaired: true,
  })
  await car.addDamage({
    date: new Date(1995, 11, 24),
    damage: 'Ramt af slæde',
    repaired: false,
  })
}
// addCar()

// De forskellige routes
const rootRouter = require('./routes/frontpage')
app.use('/', rootRouter)
const carsRouter = require('./routes/cars')
app.use('/biler', carsRouter)
const repairsRouter = require('./routes/addRepair')
app.use('/reparation', repairsRouter)
const damagesRouter = require('./routes/addDamage')
app.use('/skader', damagesRouter)
const dummyRouter = require('./routes/dummy') // SKAL SLETTES
app.use('/dummy', dummyRouter) // SKAL SLETTES

// Sætter server online
app.listen(process.env.PORT, console.log('Server running'))