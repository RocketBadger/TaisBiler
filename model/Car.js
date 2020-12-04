const mongoose = require('mongoose')
const Repair = require('./Repair').schema
const Damage = require('./Damage').schema
const Person = require('./Person').schema

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
    required: true,
    default: false
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
  particulateFilter: {
    type: Boolean,
    default: false
  },
  prevInspection: {
    type: Date
  },
  nextInspection: {
    type: Date
  },
  repairs: [Repair],
  damages: [Damage],
  driver: {
    driver: {
      type: Person
    },
    dateFrom: {
      type: Date
    },
    prevDriver: {
      type: Person
    },
    prevDateFrom: {
      type: Date
    },
    prevDateTo: {
      type: Date
    }
  }
})

//-----------------------car methods------------------------------------

carSchema.statics.deleteCar = async function (car) {
  await this.deleteOne({ _id: car._id })
}

carSchema.statics.getCar = async function (details) {
  return await this.findOne(details)
}
//----------------------document methods (non static)-------------------

carSchema.methods.updateThisCar = async function (object) {
  await this.updateOne(object)
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

//-----------------------Inspection methods------------------------------------

carSchema.methods.addInspection = async function (newNextInspection) {
  this.prevInspection = this.nextInspection
  this.nextInspection = newNextInspection
  await this.save()
}

module.exports = mongoose.model('Car', carSchema)
