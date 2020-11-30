const mongoose = require('mongoose')
const { mapReduce } = require('./Repair')

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
    handedOut: {
        type: Map,
        of: Array,
        default: new Map()
    }
}, { minimize: false })

clothesSchema.methods.addPerson = async function (person, date) {
    let personID = person._id.toString()
    if (this.handedOut.has(personID)) {
        // handedOut.get(person._id).push(date)
        let dateArray = this.handedOut.get(personID) // HVIS IKKE OVENSTÅENDE VIRKER
        dateArray.push(date)
        this.handedOut.set(personID, dateArray)
        await this.save()
    } else {
        let dateArray = new Array()
        dateArray.push(date)
        this.handedOut.set(personID, dateArray)
        await this.save()
    }
}

clothesSchema.statics.getReceiversOfClothes = async function (clothesID) {
    let clothes = await this.findOne({ _id: clothesID })
    let receivers = new Map()
    if (!clothes) {
        // Do nothing
    } else {
        let personIDs = Array.from(clothes.handedOut.keys())
        let personsArray = await this.find().where('_id').in(personIDs).exec()
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