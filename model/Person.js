const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  name: {
    type: String
  },
  position: {
    type: String
  },
  birthday: {
    type: Date
  }
})

//-----------Schema Methods---------------------
personSchema.statics.updatePerson = async function (person, change) {
  return await this.findOneAndUpdate(
    { _id: person._id },
    { $set: change },
    { new: true }
  )
}

//----------person/object methods---------------

//---------export så muligt at importere------
module.exports = mongoose.model('Person', personSchema)
