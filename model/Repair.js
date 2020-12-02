const mongoose = require('mongoose')

const repairSchema = new mongoose.Schema({
  date: {
    type: Date
  },
  repair: {
    type: String
  },
  repaired: {
    type: Boolean,
    default: false
  },
  _id: {
    type: String
  }
})

module.exports = mongoose.model('Repair', repairSchema)
