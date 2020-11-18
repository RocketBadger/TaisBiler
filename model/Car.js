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
        set: lp => lp = lp.toUpperCase().replace(/ /g, ''),
        validate: {
            validator: (lp) => {
                console.log(lp);
                // Tester, om korrekt nummerplade
                return /^\w{2}\d{5}$/.test(lp)
            },
            message: 'Not a correct license plate'
        },
        required: true
    },
    engine: {
        type: String,
        required: true
    },
    year: {
        type: Number,
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

carSchema.statics.updateCar = async function (car, object) {
    return await this.findOneAndUpdate({ _id: car._id }, { $set: object }, { new: true })
}

carSchema.methods.setStatus = async function (status) {
    this.retired = status
    await this.save
}

module.exports = mongoose.model('Car', carSchema)