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

// SLET
// setTimeout(() => {
//     const { createCar, updateCar, findCar } = require('./model/Car')
//     let car = createCar('BMW', 'X3', 'TT55333', false, 'red', 1)
//     console.log(car);
//     // updateCar(car, { colour: 'blue' })
//     // console.log(car.colour);
//     // console.log(car);

//     console.log(findCar(car));
// }, 3000);

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
// END SLET

// Sætter server online
app.listen(process.env.PORT, console.log('Server running'))