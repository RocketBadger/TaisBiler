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

carSchema.methods.changeColour = async function (colour) {
    this.colour = colour
    await this.save()
}

// carSchema.methods.updateCar = async function (object) {
//     // await Car.findOneAndUpdate({ _id: this._id }, object)
//     let data = await object.json()
//     for (let i = 0; i < data.length; i++) {
//         const element = data[i]

//     }
//     await this.save()
// }

carSchema.statics.updateCar = async function (car, object) {
    await this.findOneAndUpdate({ _id: car._id }, { $set: object })
}

carSchema.methods.setStatus = async function (status) {
    this.retired = status
    await this.save
}

// carSchema.statics.findCar = async function (car) {
//     return await Car.find({ _id: car._id })
// }

module.exports = mongoose.model('Car', carSchema)
