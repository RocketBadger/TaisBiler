require('should')
const Clothes = require('../model/Clothes')
const Person = require('../model/Person')

/* Attributter:
name
size
brand
handedOut */

afterEach(async () => {
  await Clothes.collection.drop()
})

// Oprette tøj
describe('Clothes', function () {
  it('create clothes empty', function () {
    let clothes = new Clothes()
    should.equal(clothes.name, undefined)
    should.equal(clothes.size, undefined)
    should.equal(clothes.brand, undefined)
    should.equal(clothes.handedOut.size, 0)
  })
  it('create clothes', function () {
    let clothes = new Clothes({
      name: 'Sko',
      size: '48',
      brand: 'Puma'
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
  it('get receivers of a specific piece of clothes', async function () {
    let clothes = await Clothes.findOne({ name: 'Sko' })
    let person = new Person({
      name: 'Sam',
      position: 'Sjakbejs',
      birthday: new Date(1983, 5, 2)
    })
    await person.save()
    let person1 = await Person.findOne({ name: 'Sam' })
    let person2 = new Person({
      name: 'Dean',
      position: 'Tagdækker',
      birthday: new Date(1979, 1, 24)
    })
    await person2.save()
    await Clothes.addPerson(
      clothes._id.toString(),
      person1._id.toString(),
      new Date()
    )
    await Clothes.addPerson(
      clothes._id.toString(),
      person1._id.toString(),
      new Date()
    )
    await Clothes.addPerson(
      clothes._id.toString(),
      person2._id.toString(),
      new Date()
    )
    let persons = await Clothes.getReceiversOfClothes(clothes._id.toString())
    persons.size.should.be.equal(2)
    // persons
    //   .has(person1)
    //   .should.equal(true)
  })
  it('get clothes from a specific person', async function () {
    let person = new Person({
      name: 'Sam',
      position: 'Sjakbejs',
      birthday: new Date(1983, 5, 2)
    })
    await person.save()
    let clothes = await Clothes.findOne({ name: 'Sko' })
    await Clothes.addPerson(
      clothes._id.toString(),
      person._id.toString(),
      new Date()
    )
    await clothes.save()
    let personClothes = await Clothes.getAPersonsClothes(person._id.toString())
    personClothes.length.should.be.equal(1)
    personClothes.includes(clothes).should.equal(true)
  })
})