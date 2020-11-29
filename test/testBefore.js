// const Person = require('../model/Person')
const Car = require('../model/Car')

const mongoose = require('mongoose')
before((done) => {
  mongoose.connect('mongodb://localhost/tbiler_test12', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  const db = mongoose.connection
  db.on('error', (error) => console.log(error))
  db.once('open', () => {})
  done()
})

// PERSON
// beforeEach((done) => {
//   //   people.drop()
//   done()
// })

// CAR
// beforeEach(async () => {
//   mongoose.connection.collections.cars.drop(async () => {
//     let car = new Car({
//       brand: 'BMW',
//       model: 'X5',
//       licensePlate: 'AA12345',
//       engine: 'V5',
//       year: 2018,
//       particulateFilter: false,
//       retired: true,
//       colour: 'black',
//       nickName: 'One'
//     })
//     let carOther = new Car({
//       brand: 'BMW2',
//       model: 'X52',
//       licensePlate: 'BB56789',
//       engine: 'V52',
//       year: 2022,
//       particulateFilter: true,
//       retired: true,
//       colour: 'black2',
//       nickName: 'Two'
//     })

//     await car.save()
//     await carOther.save()
//   })
// })

// //
// beforeEach((done) => {
//   mongoose.connection.collections.clothes.drop(async () => {
//     done()
//   })
// })
