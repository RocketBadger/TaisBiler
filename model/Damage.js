const mongoose = require('mongoose')

const damageSchema = new mongoose.Schema({
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
  },
  _id: {
    type: String
  }
})

module.exports = mongoose.model('Damage', damageSchema)