require('should')
const mongoose = require('mongoose')
const Car = require('../model/Car')
const Repair = require('../model/Repair')
const Damage = require('../model/Damage')

/* Attributter:
brand
model
licensePlate
retired
colour
nickName */

before((done) => {
  mongoose.connect('mongodb://localhost/tbiler_test', {
    useFindAndModify: false
  })
  const db = mongoose.connection
  db.on('error', (error) => console.log(error))
  db.once('open', () => {
    done()
  })
})

beforeEach((done) => {
  mongoose.connection.collections.cars.drop(async () => {
    let car = new Car({
      brand: 'BMW',
      model: 'X5',
      licensePlate: 'AA12345',
      engine: 'V5',
      year: 2018,
      retired: true,
      colour: 'black',
      nickName: 'One'
    })
    let carOther = new Car({
      brand: 'BMW2',
      model: 'X52',
      licensePlate: 'BB56789',
      engine: 'V52',
      year: 2022,
      retired: true,
      colour: 'black2',
      nickName: 'Two'
    })

    await car.save()
    await carOther.save()
    done()
  })
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
    should.equal(car.retired, undefined)
    car.colour.should.be.equal('white')
    should.equal(car.nickName, undefined)
  })
  it('new Car', async () => {
    let car = new Car({
      brand: 'BMW',
      model: 'X5',
      licensePlate: 'AA12345',
      engine: 'V5',
      year: 2018,
      retired: true,
      colour: 'black',
      nickName: 'One'
    })
    car.brand.should.be.equal('BMW')
    car.model.should.be.equal('X5')
    car.licensePlate.should.be.equal('AA12345')
    car.engine.should.be.equal('V5')
    car.year.should.be.equal(2018)
    car.retired.should.be.equal(true)
    car.colour.should.be.equal('black')
    car.nickName.should.be.equal('One')

    let car2 = await Car.findOne({ brand: 'BMW2' })
    car2.brand.should.be.equal('BMW2')
    car2.model.should.be.equal('X52')
    car2.licensePlate.should.be.equal('BB56789')
    car2.engine.should.be.equal('V52')
    car2.year.should.be.equal(2022)
    car2.retired.should.be.equal(true)
    car2.colour.should.be.equal('black2')
    car2.nickName.should.be.equal('Two')
  })
})

// Ændre bil-attributter
describe('updateCar', () => {
  it('updateCar brand', async () => {
    let car = await Car.findOne({})
    car = await Car.updateCar(car, { brand: 'Mercedes' })
    car.brand.should.be.equal('Mercedes')
    car.model.should.be.equal('X5')
    car.licensePlate.should.be.equal('AA12345')
    car.engine.should.be.equal('V5')
    car.year.should.be.equal(2018)
    car.retired.should.be.equal(true)
    car.colour.should.be.equal('black')
    car.nickName.should.be.equal('One')

    let car2 = await Car.findOne({ brand: 'BMW2' })
    car2.brand.should.be.equal('BMW2')
    car2.model.should.be.equal('X52')
    car2.licensePlate.should.be.equal('BB56789')
    car2.engine.should.be.equal('V52')
    car2.year.should.be.equal(2022)
    car2.retired.should.be.equal(true)
    car2.colour.should.be.equal('black2')
    car2.nickName.should.be.equal('Two')
  })
  it('updateCar model', async () => {
    let car = await Car.findOne({})
    car = await Car.updateCar(car, { model: 'C1' })
    car.brand.should.be.equal('BMW')
    car.model.should.be.equal('C1')
    car.licensePlate.should.be.equal('AA12345')
    car.engine.should.be.equal('V5')
    car.year.should.be.equal(2018)
    car.retired.should.be.equal(true)
    car.colour.should.be.equal('black')
    car.nickName.should.be.equal('One')

    let car2 = await Car.findOne({ brand: 'BMW2' })
    car2.brand.should.be.equal('BMW2')
    car2.model.should.be.equal('X52')
    car2.licensePlate.should.be.equal('BB56789')
    car2.engine.should.be.equal('V52')
    car2.year.should.be.equal(2022)
    car2.retired.should.be.equal(true)
    car2.colour.should.be.equal('black2')
    car2.nickName.should.be.equal('Two')
  })
  it('updateCar licensePlate', async () => {
    let car = await Car.findOne({})
    car = await Car.updateCar(car, { licensePlate: 'BB22555' })
    car.brand.should.be.equal('BMW')
    car.model.should.be.equal('X5')
    car.licensePlate.should.be.equal('BB22555')
    car.engine.should.be.equal('V5')
    car.year.should.be.equal(2018)
    car.retired.should.be.equal(true)
    car.colour.should.be.equal('black')
    car.nickName.should.be.equal('One')

    let car2 = await Car.findOne({ brand: 'BMW2' })
    car2.brand.should.be.equal('BMW2')
    car2.model.should.be.equal('X52')
    car2.licensePlate.should.be.equal('BB56789')
    car2.engine.should.be.equal('V52')
    car2.year.should.be.equal(2022)
    car2.retired.should.be.equal(true)
    car2.colour.should.be.equal('black2')
    car2.nickName.should.be.equal('Two')
  })
  it('updateCar engine', async () => {
    let car = await Car.findOne({})
    car = await Car.updateCar(car, { engine: 'BrumBrum' })
    car.brand.should.be.equal('BMW')
    car.model.should.be.equal('X5')
    car.licensePlate.should.be.equal('AA12345')
    car.engine.should.be.equal('BrumBrum')
    car.year.should.be.equal(2018)
    car.retired.should.be.equal(true)
    car.colour.should.be.equal('black')
    car.nickName.should.be.equal('One')
  })
  it('updateCar year', async () => {
    let car = await Car.findOne({})
    car = await Car.updateCar(car, { year: 2019 })
    car.brand.should.be.equal('BMW')
    car.model.should.be.equal('X5')
    car.licensePlate.should.be.equal('AA12345')
    car.engine.should.be.equal('V5')
    car.year.should.be.equal(2019)
    car.retired.should.be.equal(true)
    car.colour.should.be.equal('black')
    car.nickName.should.be.equal('One')
  })
  it('updateCar colour', async () => {
    let car = await Car.findOne({})
    car = await Car.updateCar(car, { colour: 'blue' })
    car.brand.should.be.equal('BMW')
    car.model.should.be.equal('X5')
    car.licensePlate.should.be.equal('AA12345')
    car.engine.should.be.equal('V5')
    car.year.should.be.equal(2018)
    car.retired.should.be.equal(true)
    car.colour.should.be.equal('blue')
    car.nickName.should.be.equal('One')
  })
  it('updateCar nickName', async () => {
    let car = await Car.findOne({})
    car = await Car.updateCar(car, { nickName: 'Four' })
    car.brand.should.be.equal('BMW')
    car.model.should.be.equal('X5')
    car.licensePlate.should.be.equal('AA12345')
    car.engine.should.be.equal('V5')
    car.year.should.be.equal(2018)
    car.retired.should.be.equal(true)
    car.colour.should.be.equal('black')
    car.nickName.should.be.equal('Four')
  })
  it('updateCar brand and colour', async () => {
    let car = await Car.findOne({})
    const carId = car._id
    car = await Car.updateCar(car, { brand: 'Mercedes', colour: 'blue' })
    car = await Car.findById(carId)
    car.brand.should.be.equal('Mercedes')
    car.model.should.be.equal('X5')
    car.licensePlate.should.be.equal('AA12345')
    car.engine.should.be.equal('V5')
    car.year.should.be.equal(2018)
    car.retired.should.be.equal(true)
    car.colour.should.be.equal('blue')
    car.nickName.should.be.equal('One')

    let car2 = await Car.findOne({ brand: 'BMW2' })
    car2.brand.should.be.equal('BMW2')
    car2.model.should.be.equal('X52')
    car2.licensePlate.should.be.equal('BB56789')
    car2.engine.should.be.equal('V52')
    car2.year.should.be.equal(2022)
    car2.retired.should.be.equal(true)
    car2.colour.should.be.equal('black2')
    car2.nickName.should.be.equal('Two')
  })
  it('updateCar all attributes', async () => {
    let car = await Car.findOne({})
    car = await Car.updateCar(car, {
      brand: 'Mercedes',
      model: 'C1',
      licensePlate: 'BB22555',
      engine: 'BrumBrum',
      year: 2019,
      retired: false,
      colour: 'blue',
      nickName: 'Four'
    })
    car.brand.should.be.equal('Mercedes')
    car.model.should.be.equal('C1')
    car.licensePlate.should.be.equal('BB22555')
    car.engine.should.be.equal('BrumBrum')
    car.year.should.be.equal(2019)
    car.retired.should.be.equal(false)
    car.colour.should.be.equal('blue')
    car.nickName.should.be.equal('Four')

    let car2 = await Car.findOne({ brand: 'BMW2' })
    car2.brand.should.be.equal('BMW2')
    car2.model.should.be.equal('X52')
    car2.licensePlate.should.be.equal('BB56789')
    car2.engine.should.be.equal('V52')
    car2.year.should.be.equal(2022)
    car2.retired.should.be.equal(true)
    car2.colour.should.be.equal('black2')
    car2.nickName.should.be.equal('Two')
  })
})

describe('deleteCar', function () {
  it('delete car', async function () {
    let noBeforDelete = await Car.count({})
    let car = await Car.findOne()
    car.brand.should.be.equal('BMW')
    await Car.deleteCar(car)
    let car2 = await Car.findOne()
    let noAfterDelete = await Car.count({})
    car2.brand.should.be.equal('BMW2')
    noBeforDelete.should.be.equal(2)
    noAfterDelete.should.be.equal(1)
  })
})

// repair

describe('addRepair', () => {
  it('add repair today', async () => {
    const car = await Car.findOne({})
    const carId = car._id
    const repair = new Repair({
      date: Date.now(),
      repair: 'Totalskadet',
      repaired: false
    })
    await car.addRepair(repair)
    car.repairs.length.should.be.equal(1)
  })
  it('add repair Christmas', async () => {
    const car = await Car.findOne({})
    await car.addRepair({
      date: new Date(1995, 11, 24),
      repair: 'Stor bule og hovprint',
      repaired: true
    })
    car.repairs.length.should.be.equal(1)
  })
  it('add two repairs', async () => {
    const car = await Car.findOne({})
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
  it('change repair all', async () => {
    const date1 = Date.parse('March 21, 2012')
    const car = await Car.findOne({})
    const carId = car._id
    const repair = new Repair({
      date: Date.now(),
      repair: 'Totalskadet',
      repaired: false
    })
    const actualRepair = await car.addRepair(repair)
    const repairChange = new Repair({
      date: date1,
      repair: 'ok',
      repaired: true
    })
    const updatedRepair = await car.changeRepair(actualRepair, repairChange)
    updatedRepair.repaired.should.be.equal(true)
    updatedRepair.repair.should.be.equal('ok')
    updatedRepair.date.valueOf().should.be.equal(date1)
  })
  it('change repair repaired', async () => {
    const car = await Car.findOne({})
    const carId = car._id
    const date1 = Date.now()
    const repair = new Repair({
      date: date1,
      repair: 'Totalskadet',
      repaired: false
    })
    const repair2 = new Repair({
      date: Date.now(),
      repair: 'Totalskadet',
      repaired: false
    })

    const actualRepair = await car.addRepair(repair)
    const actualRepair2 = await car.addRepair(repair2)
    const updatedRepair = await car.changeRepair(actualRepair, {
      repaired: true
    })
    car.repairs.length.should.be.equal(2)
    actualRepair2.repaired.should.be.equal(false)
    updatedRepair.repaired.should.be.equal(true)
    updatedRepair.repair.should.be.equal('Totalskadet')
    updatedRepair.date.valueOf().should.be.equal(date1)
  })
})

describe('deleteRepair', function () {
  it('delete a repair', async function () {
    let car = await Car.findOne({})
    const repair = new Repair({
      date: Date.now(),
      repair: 'Totalskadet',
      repaired: false
    })
    const repair2 = new Repair({
      date: Date.now(),
      repair: 'Totalskadet',
      repaired: false
    })
    await car.addRepair(repair)
    await car.addRepair(repair2)
    let noBeforDelete = await car.repairs.length
    await car.deleteRepair(repair)
    let noAfterDelete = await car.repairs.length

    noBeforDelete.should.be.equal(2)
    noAfterDelete.should.be.equal(1)
  })
})

// Damage
describe('damage', () => {
  it('add damage default', async () => {
    const car = await Car.findOne({})
    await car.addDamage({})
    car.damages.length.should.be.equal(1)
  })
  it('add damage Christmas', async () => {
    const car = await Car.findOne({})
    await car.addDamage({
      date: new Date(1995, 11, 24),
      damage: 'Ramt af slæde',
      repaired: false
    })
    car.damages.length.should.be.equal(1)
  })
  it('add two damages', async () => {
    const car = await Car.findOne({})
    await car.addDamage({
      date: new Date(1995, 11, 24),
      damage: 'Ramt af slæde',
      repaired: true
    })
    await car.addDamage({ damage: 'Tippet som ko' })
    car.damages.length.should.be.equal(2)
  })
  it('change damage', async () => {
    const car = await Car.findOne({})
    const carId = car._id
    const damage = new Damage({
      date: Date.now(),
      damage: 'Totalskadet',
      repaired: false
    })
    const actualDamage = await car.addDamage(damage)
    const damageChange = new Damage({
      date: Date.now(),
      damage: 'ok',
      repaired: true
    })
    const updatedDamage = await car.changeDamage(actualDamage, damageChange)
    updatedDamage.repaired.should.be.equal(true)
    updatedDamage.damage.should.be.equal('ok')
  })

  it('change damage repaired', async () => {
    const car = await Car.findOne({})
    const carId = car._id
    const date1 = Date.now()
    const damage = new Damage({
      date: date1,
      damage: 'Totalskadet',
      repaired: false
    })
    const actualDamage = await car.addDamage(damage)

    const updatedDamage = await car.changeDamage(actualDamage, {
      repaired: true
    })
    updatedDamage.repaired.should.be.equal(true)
    updatedDamage.damage.should.be.equal('Totalskadet')
    updatedDamage.date.valueOf().should.be.equal(date1)
  })
})
