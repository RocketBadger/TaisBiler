const mongoose = require('mongoose')

const clothesSchema = new mongoose.Schema({
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
    // handedOut: {
    //     type: Map,
    //     of: Array
    // }
})

module.exports = mongoose.model('Clothes', clothesSchema)