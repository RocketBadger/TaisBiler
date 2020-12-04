// Hvis vi ikke er i produktionsmiljøet, skal der køres med lokale env-variable
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Car = require('./model/Car') // SKAL SLETTES
const Repair = require('./model/Repair') // SKAL SLETTES
const Clothes = require('./model/Clothes') // SKAL SLETTES
const Person = require('./model/Person') // SKAL SLETTES

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

// SKAL SLETTES ->
// async function addCar() {
//   let car = new Car({
//     brand: 'BMW',
//     model: 'X5',
//     licensePlate: 'PI12345',
//     engine: 'V5',
//     year: 2018,
//     retired: true,
//     colour: 'black',
//     nickName: 'One'
//   })
//   const repair = new Repair({
//     date: new Date(1995, 11, 24),
//     repair: 'Stor bule og hovprint',
//     repaired: true
//   })
//   await car.addRepair(repair)
//   await car.addDamage({
//     date: new Date(1995, 11, 24),
//     damage: 'Ramt af slæde',
//     repaired: false
//   })
// }
// addCar()

// async function addClothes() {
//   let clothes = new Clothes({
//     name: 'Bukser',
//     size: 'Large',
//     brand: 'Kanvas'
//   })
//   await clothes.save()
// }
// addClothes()

// async function addPersonToClothes() {
//   let person = await Person.find()
//   // console.log(person);
//   let clothes = await Clothes.find()
//   // console.log(clothes);
//   if (clothes !== undefined) {
//     // await clothes.addPerson()
//     // (person, new Date())
//   }
//   // Clothes.allClothes()
//   // clothes.addPerson()
// }
// addPersonToClothes()

// async function clothesFun() {
//   const person = new Person({
//     name: 'Hej'
//   })
//   await person.save()
//   const clothes = new Clothes({
//     name: 'er',
//     size: 'sd',
//     brand: 'er'
//   })
//   await clothes.save()
//   await clothes.addPerson(person, 'to')
//   await clothes.addPerson(person, 'tre')
// }
// clothesFun()

// -> SKAL SLETTES

// De forskellige routes
const rootRouter = require('./routes/frontpage')
app.use('/', rootRouter)

const carsRouter = require('./routes/cars')
app.use('/biler', carsRouter)
const repairsRouter = require('./routes/repair')
app.use('/reparation', repairsRouter)
// const damagesRouter = require('./routes/damage') // FORÆLDET
// app.use('/skader', damagesRouter)  // FORÆLDET
const editRepairRouter = require('./routes/editRepair')
app.use('/redigerReparation', editRepairRouter)
const editDamageRouter = require('./routes/editDamage')
app.use('/redigerSkade', editDamageRouter)
const statisticsRouter = require('./routes/statistics')
app.use('/statistik', statisticsRouter)
const personsRouter = require('./routes/person')
app.use('/person', personsRouter)
const clothesRouter = require('./routes/clothes')
app.use('/clothes', clothesRouter)

const dummyRouter = require('./routes/dummy') // SKAL SLETTES
app.use('/dummy', dummyRouter) // SKAL SLETTES

// Sætter server online
app.listen(process.env.PORT, console.log('Server running'))