// const Person = require('../model/Person')
const Car = require('../model/Car')

const mongoose = require('mongoose')
before(() => {
  mongoose.connect('mongodb://localhost/tbiler_testing', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  const db = mongoose.connection
  db.on('error', (error) => console.log(error))
  db.once('open', () => {})
})
after(() => {
  mongoose.connection.close()
})
// PERSON
// beforeEach((done) => {
//   //   people.drop()
//   done()
// })

// CLOTHES
// beforeEach((done) => {
//   mongoose.connection.collections.clothes.drop(async () => {
//     done()
//   })
// })
