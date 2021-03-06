const mongoose = require('mongoose')
const Person = require('../model/Person')

const clothesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    size: {
      type: String,
      required: true
    },
    brand: {
      type: String,
      required: true
    },
    handedOut: {
      type: Map,
      of: Array,
      default: new Map()
    }
  },
  { minimize: false }
)

clothesSchema.statics.updateClothes = async function (clothes, change) {
  return await this.findOneAndUpdate(
    { _id: clothes._id },
    { $set: change },
    { new: true }
  )
}

clothesSchema.statics.deleteClothes = async function (clothes) {
  await this.deleteOne({
    _id: clothes._id
  })
}

clothesSchema.statics.addPerson = async function (clothes_id, person_id, date) {
  let clothesFound = await this.findById(clothes_id)
  if (clothesFound.handedOut.has(person_id)) {
    let dateArray = clothesFound.handedOut.get(person_id)
    dateArray.push(date)
    let newHandedOut = clothesFound.handedOut
    newHandedOut.set(person_id, dateArray)
    await this.findOneAndUpdate({ _id: clothes_id }, { $set: { 'handedOut': newHandedOut } })
  } else {
    let dateArray = new Array()
    dateArray.push(date)
    let newHandedOut = clothesFound.handedOut
    newHandedOut.set(person_id, dateArray)
    await this.findOneAndUpdate({ _id: clothes_id }, { $set: { 'handedOut': newHandedOut } })
  }
}

clothesSchema.statics.getReceiversOfClothes = async function (clothesID) {
  let clothes = await this.findById(clothesID)
  let receivers = new Map()
  if (!clothes) {
    // Do nothing
  } else {
    let personIDs = Array.from(clothes.handedOut.keys())
    let personsArray = await Person.find()
    personsArray = personsArray.filter((person) =>
      personIDs.includes(person._id.toString())
    )
    for (let i = 0; i < personsArray.length; i++) {
      const element = personsArray[i]
      receivers.set(element, clothes.handedOut.get(element._id.toString()))
    }
  }
  return receivers
}

clothesSchema.statics.getAPersonsClothes = async function (personID) {
  let allClothes = await this.find()
  let clothes = []
  for (let i = 0; i < allClothes.length; i++) {
    const element = allClothes[i]
    if (element.handedOut.has(personID)) {
      clothes.push(element)
    }
  }
  return clothes
}

module.exports = mongoose.model('Clothes', clothesSchema)