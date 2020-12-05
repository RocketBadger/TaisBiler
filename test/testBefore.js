const mongoose = require('mongoose')

before(() => {
  mongoose.connect('mongodb://localhost/tbiler_tests', {
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
