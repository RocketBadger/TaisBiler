const mongoose = require('mongoose')
const Repair = require('./Repair').schema
const Damage = require('./Damage').schema

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
    required: false
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
  damages: [Damage]
})

//-----------------------car methods------------------------------------

carSchema.statics.updateCar = async function (car, object) {
  return await this.findOneAndUpdate(
    { _id: car._id },
    { $set: object },
    { new: true }
  )
}

carSchema.statics.deleteCar = async function (car) {
  await this.deleteOne({ _id: car._id })
}

//-----------------------Repair methods---------------------------------

carSchema.methods.addRepair = async function (repair) {
  this.repairs.push(repair)
  await this.save()
  return this.repairs[this.repairs.length - 1]
}

carSchema.methods.changeRepair = async function (actualRepair, repairChange) {
  let repairToChange = await this.repairs.id(actualRepair._id)
  repairToChange.set(repairChange)
  await this.save()
  return this.repairs.id(actualRepair._id)
}

carSchema.methods.deleteRepair = async function (repair) {
  await this.repairs.id(repair._id).remove()
}

//-----------------------Damage methods------------------------------------

carSchema.methods.addDamage = async function (damage) {
  this.damages.push(damage)
  await this.save()
  return this.damages[this.damages.length - 1]
}

carSchema.methods.changeDamage = async function (actualDamage, damageChange) {
  let damageToChange = await this.damages.id(actualDamage._id)
  damageToChange.set(damageChange)
  await this.save()
  return this.damages.id(actualDamage._id)
}
carSchema.methods.deleteDamage = async function (damage) {
  await this.damages.id(damage._id).remove()
}

module.exports = mongoose.model('Car', carSchema)
