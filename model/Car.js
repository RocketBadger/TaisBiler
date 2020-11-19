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
    },
    repairs:
        [{
            date: {
                type: Date
            },
            repair: {
                type: String
            },
            repaired: {
                type: Boolean,
                default: false
            }
        }],
    inspections: {
        prev: {
            type: Date
        },
        next: {
            type: Date
        }
    },
    damages:
        [{
            date: {
                type: Date,
                default: Date.now()
            },
            damage: {
                type: String
            },
            repaired: {
                type: Boolean,
                default: false
            }
        }],
})

carSchema.statics.updateCar = async function (car, object) {
    return await this.findOneAndUpdate({ _id: car._id }, { $set: object }, { new: true })
}

// SKAL SLETTES
carSchema.methods.setStatus = async function (status) {
    this.retired = status
    await this.save()
}

carSchema.methods.addRepair = async function (repair) {
    this.repairs.push(repair)
    console.log('addRepair');
    await this.save()
}

carSchema.methods.addDamage = async function (damage) {
    let damages = this.damages
    damages.push(damage)
    console.log(damages);
    await this.save()
}

module.exports = mongoose.model('Car', carSchema)