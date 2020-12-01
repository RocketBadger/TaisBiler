// const Person = require('../model/Person')
const Car = require('../model/Car')

const mongoose = require('mongoose')
before((done) => {
  mongoose.connect('mongodb://localhost/tbiler_test123', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  const db = mongoose.connection
  db.on('error', (error) => console.log(error))
  db.once('open', () => {})
  done()
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
