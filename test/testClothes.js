require('should')
const mongoose = require('mongoose')
const Clothes = require('../model/Clothes')
const Person = require('../model/Person')

/* Attributter:
name
size
brand
handedOut */

// Oprette tøj
describe('Clothes', function () {
    it('create clothes empty', function () {
        let clothes = new Clothes()
        should.equal(clothes.name, undefined)
        should.equal(clothes.size, undefined)
        should.equal(clothes.brand, undefined)
        should.equal(clothes.handedOut, undefined)
    })
    it('create clothes', function () {
        let clothes = new Clothes({
            name: 'Sko',
            size: '48',
            brand: 'Puma',
        })
        clothes.name.should.be.equal('Sko')
        clothes.size.should.be.equal('48')
        clothes.brand.should.be.equal('Puma')
    })
})

describe('clothes statistics', function () {
    beforeEach(async () => {
        let sweater = new Clothes({
            name: 'Trøje',
            size: 'large',
            brand: 'NT-Tag'
        })
        await sweater.save()
        let pants = new Clothes({
            name: 'Bukser',
            size: 'large',
            brand: 'Kansas'
        })
        await pants.save()
        let shoes = new Clothes({
            name: 'Sko',
            size: '48',
            brand: 'Puma'
        })
        await shoes.save()
    })
    afterEach(() => {
        Clothes.drop()
    })
    it('get persons from specific piece of clothes', async function () {
        let clothes = await Clothes.findOne({ name: 'Sko' })
        let person = new Person({
            name: 'Sam',
            position: 'Sjakbejs',
            birthday: new Date(1983, 5, 2)
        })
        await person.save()
        let person2 = new Person({
            name: 'Dean',
            position: 'Tagdækker',
            birthday: new Date(1979, 1, 24)
        })
        await person2.save()
        await clothes.addPerson(person, new Date())
        await clothes.addPerson(person2, new Date())
        let persons = await Clothes.getReceiversOfClothes(clothes._id.toString())
        persons.size.should.be.equal(2)
        // persons.should.has({ name: 'Sam', position: 'Sjakbejs', birthday: new Date(1983, 5, 2) })
        // persons.should.contain({ name: 'Dean', position: 'Tagdækker', birthday: new Date(1979, 1, 24) })
        // persons.should.not.contain({ name: 'Bobby', position: 'Sekretær', birthday: new Date(1950, 8, 12) })
    })
    it('get specific person clothes', async function () {
        let person = new Person({
            name: 'Sam',
            position: 'Sjakbejs',
            birthday: new Date(1983, 5, 2)
        })
        await person.save()
        let clothes = await Clothes.findOne({ name: 'Sko' })
        // TO-DO add person to handedout
        await clothes.save()
        let personClothes = await Clothes.getAPersonsClothes(person._id)
        personClothes.length.should.be.equal(1)
        personClothes.should.contain({ name: 'Sko', size: '48', brand: 'Puma' })
        personClothes.should.not.contain({ name: 'Bukser', size: 'large', brand: 'Kansas' })
    })
})