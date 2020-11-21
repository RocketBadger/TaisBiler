const mongoose = require('mongoose')
const Repair = require('./Repair').schema

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
    set: (lp) => (lp = lp.toUpperCase().replace(/ /g, '')),
    validate: {
      validator: (lp) => {
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
    set: (c) => c.toLowerCase(),
    default: 'white'
  },
  nickName: {
    type: String,
    required: true
  },
  repairs: [Repair],
  inspections: {
    prev: {
      type: Date
    },
    next: {
      type: Date
    }
  },
  damages: [
    {
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
    }
  ]
})

carSchema.statics.updateCar = async function (car, object) {
  return await this.findOneAndUpdate(
    { _id: car._id },
    { $set: object },
    { new: true }
  )
}

// SKAL SLETTES
carSchema.methods.setStatus = async function (status) {
  this.retired = status
  await this.save()
}

carSchema.methods.addRepair = async function (repair) {
  this.repairs.push(repair)
  await this.save()
  return this.repairs[this.repairs.length - 1]
}

carSchema.methods.getRepair = async (repairId) => {
  return await this.repairs.id(repairId)
}

carSchema.methods.changeRepair = async function (actualRepair, repairChange) {
  let repairToChange = await this.repairs.id(actualRepair._id)
  repairToChange.repair = repairChange.repair
  repairToChange.repaired = repairChange.repaired
  await this.save()
  return this.repairs.id(repairToChange._id)
}

carSchema.methods.addDamage = async function (damage) {
  let damages = this.damages
  damages.push(damage)
  console.log(damages)
  await this.save()
}

module.exports = mongoose.model('Car', carSchema)
