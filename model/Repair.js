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
  }
})

module.exports = mongoose.model('Repair', repairSchema)
