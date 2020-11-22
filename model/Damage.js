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
  }
})

module.exports = mongoose.model('Damage', damageSchema)
