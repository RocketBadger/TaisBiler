const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    licensePlate: {
        type: String,
        // Fjerner mellemrum fra nummerplade
        set: lp => lp.replace(' ', ''),
        validate: {
            validator: (lp) => {
                // Tester, om korrekt nummerplade
                return /^\w{2}\d{5}$/.test(lp)
            },
            message: 'Not a correct license plate'
        },
        required: true
    },
    retired: {
        type: Boolean,
        required: true
    },
    colour: {
        type: String,
        default: 'white'
    },
    id: {
        type: Number,
        required: true
    }
})

const Car = mongoose.model('Car', carSchema)

function createCar(brand, model, licensePlate, retired, colour, id) {
    return Car({
        brand: brand,
        model: model,
        licensePlate: licensePlate,
        retired: retired,
        colour: colour,
        id: id
    })
}

function updateCar(object) {
    Car.update(this, { $set: object })
}

function setStatus(boolean) {

}

// module.exports = mongoose.model('Car', carSchema)
module.exports = { createCar, updateCar, setStatus }