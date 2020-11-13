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
        set: c => c.toLowerCase(),
        default: 'white'
    },
    id: {
        type: Number,
        required: true
    }
})

// const Car = mongoose.model('Car', carSchema)
// const schema = carSchema

// schema.method('meow', function () {
//     console.log('meeeeeoooooooooooow');
// })

carSchema.methods.changeColour = async function (colour) {
    this.colour = colour
    await this.save()
    console.log(this)
}

// carSchema.methods.updateCar = async function (object) {
//     await Car.findOneAndUpdate({ _id: this._id }, object)
// }

// carSchema.methods.setStatus = async function (status) {
//     await Car.findOneAndUpdate({ _id: this._id }, { retired: status })
// }

// carSchema.statics.findCar = async function (car) {
//     return await Car.find({ _id: car._id })
// }

module.exports = mongoose.model('Car', carSchema)