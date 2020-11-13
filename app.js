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
db.on('error', error => console.log(error))
db.once('open', () => console.log('Connected to Mongoose'))

const car = new Car ({
    brand: 'BMW',
    model: 'X7',
    licensePlate: 'fe56789',
    retired: false,
    colour: 'White',
    id: 1
})

car.save()
console.log(car)

app.set('view engine', 'pug')

// De forskellige routes
const rootRouter = require('./routes/frontpage')
app.use('/', rootRouter)



// Sætter server online
app.listen(process.env.PORT, console.log('Server running'))