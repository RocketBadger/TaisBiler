// Hvis vi ikke er i produktionsmiljøet, skal der køres med lokale env-variable
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

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

// De forskellige routes
const rootRouter = require('./routes/frontpage')
app.use('/', rootRouter)

const loginRouter = require('./routes/login')
app.use('/login', loginRouter)

const carsRouter = require('./routes/cars')
app.use('/biler', carsRouter)
const repairsRouter = require('./routes/repair')
app.use('/reparation', repairsRouter)
const editRepairRouter = require('./routes/editRepair')
app.use('/redigerReparation', editRepairRouter)
const editDamageRouter = require('./routes/editDamage')
app.use('/redigerSkade', editDamageRouter)
const statisticsRouter = require('./routes/statistics')
app.use('/statistik', statisticsRouter)
const personsRouter = require('./routes/person')
app.use('/person', personsRouter)
const clothesRouter = require('./routes/clothes')
app.use('/toj', clothesRouter)

// Sætter server online
app.listen(process.env.PORT, console.log('Server running'))