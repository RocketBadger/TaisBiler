require('should')
const Car = require('../model/Car')
const Repair = require('../model/Repair')
const Damage = require('../model/Damage')
const Person = require('../model/Person')

/* Attributter:
brand
model
licensePlate
retired
colour
nickName */

beforeEach(async () => {
  let car = new Car({
    brand: 'BMW',
    model: 'X5',
    licensePlate: 'AA12345',
    engine: 'V5',
    year: 2018,
    particulateFilter: false,
    retired: true,
    colour: 'black',
    nickName: 'One'
  })
  let carOther = await Car.create({
    brand: 'dudum',
    model: 'dummde',
    licensePlate: 'BB56789',
    engine: 'dudum',
    year: 2022,
    particulateFilter: true,
    retired: true,
    colour: 'black2',
    nickName: 'Two'
  })
  await car.save()
  console.log('ok')
})

afterEach(async () => {
  await Car.collection.drop()
})

// Oprette bil
describe('Car', function () {
  it('create car empty', function () {
    let car = new Car()
    should.equal(car.brand, undefined)
    should.equal(car.model, undefined)
    should.equal(car.licensePlate, undefined)
    should.equal(car.engine, undefined)
    should.equal(car.year, undefined)
    should.equal(car.particulateFilter, false)
    should.equal(car.retired, false)
    car.colour.should.be.equal('white')
    should.equal(car.nickName, undefined)
  })
  it('new Car', async () => {
    let car1 = new Car({
      brand: 'BMW',
      model: 'X5',
      licensePlate: 'AA12345',
      engine: 'V5',
      year: 2018,
      particulateFilter: false,
      retired: true,
      colour: 'black',
      nickName: 'One'
    })
    car1 = await car1.save()
    car1.brand.should.be.equal('BMW')
    car1.model.should.be.equal('X5')
    car1.licensePlate.should.be.equal('AA12345')
    car1.engine.should.be.equal('V5')
    car1.year.should.be.equal(2018)
    car1.particulateFilter.should.be.equal(false)
    car1.retired.should.be.equal(true)
    car1.colour.should.be.equal('black')
    car1.nickName.should.be.equal('One')

    let car2 = await Car.findOne({ brand: 'dudum' })
    car2.brand.should.be.equal('dudum')
    car2.model.should.be.equal('dummde')
    car2.licensePlate.should.be.equal('BB56789')
    car2.engine.should.be.equal('dudum')
    car2.year.should.be.equal(2022)
    car2.particulateFilter.should.be.equal(true)
    car2.retired.should.be.equal(true)
    car2.colour.should.be.equal('black2')
    car2.nickName.should.be.equal('Two')
  })
})

// Ændre bil-attributter
describe('updateCar', () => {
  it('updateCar brand', async () => {
    let car = await Car.findOne({ licensePlate: 'BB56789' })
    const update = { brand: 'Mercedes' }

    await car.updateThisCar(update)
    car = await Car.findOne({ licensePlate: 'BB56789' })

    car.brand.should.be.equal('Mercedes')
    car.model.should.be.equal('dummde')
    car.licensePlate.should.be.equal('BB56789')
    car.engine.should.be.equal('dudum')
    car.year.should.be.equal(2022)
    car.particulateFilter.should.be.equal(true)
    car.retired.should.be.equal(true)
    car.colour.should.be.equal('black2')
    car.nickName.should.be.equal('Two')

    let car2 = await Car.findOne({ brand: 'BMW' })
    car2.brand.should.be.equal('BMW')
    car2.model.should.be.equal('X5')
    car2.licensePlate.should.be.equal('AA12345')
    car2.engine.should.be.equal('V5')
    car2.year.should.be.equal(2018)
    car2.particulateFilter.should.be.equal(false)
    car2.retired.should.be.equal(true)
    car2.colour.should.be.equal('black')
    car2.nickName.should.be.equal('One')
  })
  it('updateCar model', async () => {
    let car = await Car.findOne({ brand: 'dudum' })
    await car.updateThisCar({ model: 'C1' })
    car = await Car.findOne({ brand: 'dudum' })
    car.brand.should.be.equal('dudum')
    car.model.should.be.equal('C1')
    car.licensePlate.should.be.equal('BB56789')
    car.engine.should.be.equal('dudum')
    car.year.should.be.equal(2022)
    car.particulateFilter.should.be.equal(true)
    car.retired.should.be.equal(true)
    car.colour.should.be.equal('black2')
    car.nickName.should.be.equal('Two')

    let car2 = await Car.findOne({ brand: 'BMW' })
    car2.brand.should.be.equal('BMW')
    car2.model.should.be.equal('X5')
    car2.licensePlate.should.be.equal('AA12345')
    car2.engine.should.be.equal('V5')
    car2.year.should.be.equal(2018)
    car2.particulateFilter.should.be.equal(false)
    car2.retired.should.be.equal(true)
    car2.colour.should.be.equal('black')
    car2.nickName.should.be.equal('One')
  })
  it('updateCar licensePlate', async () => {
    let car = await Car.findOne({ brand: 'dudum' })
    car = await car.updateThisCar({ licensePlate: 'BB22555' })
    car = await Car.findOne({ brand: 'dudum' })
    car.brand.should.be.equal('dudum')
    car.model.should.be.equal('dummde')
    car.licensePlate.should.be.equal('BB22555')
    car.engine.should.be.equal('dudum')
    car.year.should.be.equal(2022)
    car.particulateFilter.should.be.equal(true)
    car.retired.should.be.equal(true)
    car.colour.should.be.equal('black2')
    car.nickName.should.be.equal('Two')

    let car2 = await Car.findOne({ brand: 'BMW' })
    car2.brand.should.be.equal('BMW')
    car2.model.should.be.equal('X5')
    car2.licensePlate.should.be.equal('AA12345')
    car2.engine.should.be.equal('V5')
    car2.year.should.be.equal(2018)
    car2.particulateFilter.should.be.equal(false)
    car2.retired.should.be.equal(true)
    car2.colour.should.be.equal('black')
    car2.nickName.should.be.equal('One')
  })
  it('updateCar brand and colour', async () => {
    let car = await Car.findOne({ brand: 'BMW' })
    const carId = car._id
    car = await car.updateThisCar({ brand: 'Mercedes', colour: 'blue' })
    car = await Car.findById(carId)
    car.brand.should.be.equal('Mercedes')
    car.model.should.be.equal('X5')
    car.licensePlate.should.be.equal('AA12345')
    car.engine.should.be.equal('V5')
    car.year.should.be.equal(2018)
    car.particulateFilter.should.be.equal(false)
    car.retired.should.be.equal(true)
    car.colour.should.be.equal('blue')
    car.nickName.should.be.equal('One')
    let car2 = await Car.findOne({ brand: 'dudum' })
    car2.brand.should.be.equal('dudum')
    car2.model.should.be.equal('dummde')
    car2.licensePlate.should.be.equal('BB56789')
    car2.engine.should.be.equal('dudum')
    car2.year.should.be.equal(2022)
    car2.particulateFilter.should.be.equal(true)
    car2.retired.should.be.equal(true)
    car2.colour.should.be.equal('black2')
    car2.nickName.should.be.equal('Two')
  })
  it('updateCar all attributes', async () => {
    let car = await Car.findOne({ brand: 'BMW' })
    const carId = car._id
    car = await car.updateThisCar({
      brand: 'Mercedes',
      model: 'C1',
      licensePlate: 'BB22555',
      engine: 'BrumBrum',
      year: 2019,
      particulateFilter: true,
      retired: false,
      colour: 'blue',
      nickName: 'Four'
    })
    car = await Car.findById(carId)
    car.brand.should.be.equal('Mercedes')
    car.model.should.be.equal('C1')
    car.licensePlate.should.be.equal('BB22555')
    car.engine.should.be.equal('BrumBrum')
    car.year.should.be.equal(2019)
    car.particulateFilter.should.be.equal(true)
    car.retired.should.be.equal(false)
    car.colour.should.be.equal('blue')
    car.nickName.should.be.equal('Four')
    let car2 = await Car.findOne({ brand: 'dudum' })
    car2.brand.should.be.equal('dudum')
    car2.model.should.be.equal('dummde')
    car2.licensePlate.should.be.equal('BB56789')
    car2.engine.should.be.equal('dudum')
    car2.year.should.be.equal(2022)
    car2.particulateFilter.should.be.equal(true)
    car2.retired.should.be.equal(true)
    car2.colour.should.be.equal('black2')
    car2.nickName.should.be.equal('Two')
  })
})
// slette bil
describe('deleteCar', function () {
  it('delete a car', async function () {
    let noBeforeDelete = await Car.count({})
    let car = await Car.findOne({ model: 'dummde' })
    car.brand.should.be.equal('dudum')
    await Car.deleteCar(car)
    let car2 = await Car.findOne()
    let noAfterDelete = await Car.count({})
    car2.brand.should.be.equal('BMW')
    noBeforeDelete.should.be.equal(2)
    noAfterDelete.should.be.equal(1)
  })
})

//----------repair-------------
// Tilføje reparation til bil
describe('addRepair', () => {
  it('add repair today', async () => {
    const car = await Car.findOne()
    const repair = new Repair({
      date: Date.now(),
      repair: 'Totalskadet',
      repaired: false
    })
    await car.addRepair(repair)
    car.repairs.length.should.be.equal(1)
  })
  it('add repair Christmas', async () => {
    const car = await Car.findOne()
    await car.addRepair({
      date: new Date(1995, 11, 24),
      repair: 'Stor bule og hovprint',
      repaired: true
    })
    car.repairs.length.should.be.equal(1)
  })
  it('add two repairs', async () => {
    const car = await Car.findOne()
    await car.addRepair({
      date: new Date(1995, 11, 24),
      repair: 'Stor bule og hovprint',
      repaired: true
    })
    await car.addRepair({
      date: Date.now(),
      repair: 'Totalskadet',
      repaired: false
    })
    car.repairs.length.should.be.equal(2)
  })
})

// ændre reparation
describe('changeRepair', () => {
  it('change repair all', async () => {
    const date1 = Date.parse('March 21, 2012')
    let car = await Car.findOne({ brand: 'BMW' })
    const carId = car._id
    const repairId = car.Id + 'a'
    const repair = new Repair({
      date: Date.now(),
      repair: 'Totalskadet',
      repaired: false,
      _id: repairId
    })
    const r = await car.addRepair(repair)
    car = await Car.findById(carId)
    car.repairs.length.should.be.equal(1)
    let actualRepair = await car.repairs[0]
    const repairID2 = actualRepair._id
    const repairChange = new Repair({
      date: date1,
      repair: 'ok',
      repaired: true
    })

    const r2 = await car.changeRepair(actualRepair, repairChange)
    car = await Car.findById(carId)
    const updatedRepair = car.repairs[0]
    car.repairs.length.should.be.equal(1)
    updatedRepair._id.should.be.equal(repairId)
    updatedRepair.repaired.should.be.equal(true)
    updatedRepair.repair.should.be.equal('ok')
    updatedRepair.date.valueOf().should.be.equal(date1)
  })
  it('change repair repaired', async () => {
    let car = await Car.findOne({ brand: 'BMW' })
    const date1 = Date.now()
    const repair = new Repair({
      date: date1,
      repair: 'Totalskadet',
      repaired: false,
      _id: car._id + 'a'
    })
    const repair2 = new Repair({
      date: Date.now(),
      repair: 'Totalskadet',
      repaired: false,
      _id: car._id + 'b'
    })

    let actualRepair = await car.addRepair(repair)
    let actualRepair2 = await car.addRepair(repair2)
    actualRepair = await car.repairs[0]
    car = await Car.findOne({ brand: 'BMW' })
    actualRepair = await car.repairs[0]
    actualRepair2 = await car.repairs[1]
    let updatedRepair = await car.changeRepair(actualRepair, {
      repaired: true
    })
    car = await Car.findOne({ brand: 'BMW' })
    updatedRepair = await car.repairs[0]
    car.repairs.length.should.be.equal(2)
    actualRepair2.repaired.should.be.equal(false)
    updatedRepair.repaired.should.be.equal(true)
    updatedRepair.repair.should.be.equal('Totalskadet')
    updatedRepair.date.valueOf().should.be.equal(date1)
  })
})
