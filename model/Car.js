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

// const Car = mongoose.model('Car', carSchema)

// carSchema.methods.changeColour = function (colour) {
//     this.colour = colour
//   };

// carSchema.methods.createCar = async function (brand, model, licensePlate, retired, colour, id) {
//     let car = Car({
//         brand: brand,
//         model: model,
//         licensePlate: licensePlate,
//         retired: retired,
//         colour: colour,
//         id: id
//     })
//     return await car.save()
//     // return car
// }

// async function updateCar(car, object) {
//     // let data = JSON.stringify(object)
//     await Car.findOneAndUpdate(car, { colour: 'orange' })
//     car.save()
// }

// function setStatus(car, boolean) {

// }

// async function findCar(car) {
//     // return 3
//     return await Car.find({})
// }

module.exports = mongoose.model('Car', carSchema);
// module.exports = { createCar, updateCar, setStatus, findCar }