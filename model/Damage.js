const mongoose = require('mongoose')

const damageSchema = mongoose.Schema({
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
