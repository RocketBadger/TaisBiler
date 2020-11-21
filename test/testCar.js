require('should')
const mongoose = require('mongoose')
const Car = require('../model/Car')

/* Attributter:
brand
model
licensePlate
retired
colour
nickName */

before((done) => {
  mongoose.connect('mongodb://localhost/tbiler_test', {
    useFindAndModify: false,
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
      nickName: 'One',
    })
    await car.save()
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
  it('new Car', () => {
    let car = new Car({
      brand: 'BMW',
      model: 'X5',
      licensePlate: 'AA12345',
      engine: 'V5',
      year: 2018,
      retired: true,
      colour: 'black',
      nickName: 'One',
    })
    car.brand.should.be.equal('BMW')
    car.model.should.be.equal('X5')
    car.licensePlate.should.be.equal('AA12345')
    car.engine.should.be.equal('V5')
    car.year.should.be.equal(2018)
    car.retired.should.be.equal(true)
    car.colour.should.be.equal('black')
    car.nickName.should.be.equal('One')
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
  it('updateCar id', async () => {
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
    car = await Car.updateCar(car, { brand: 'Mercedes', colour: 'blue' })
    car.brand.should.be.equal('Mercedes')
    car.model.should.be.equal('X5')
    car.licensePlate.should.be.equal('AA12345')
    car.engine.should.be.equal('V5')
    car.year.should.be.equal(2018)
    car.retired.should.be.equal(true)
    car.colour.should.be.equal('blue')
    car.nickName.should.be.equal('One')
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
      nickName: 'Four',
    })
    car.brand.should.be.equal('Mercedes')
    car.model.should.be.equal('C1')
    car.licensePlate.should.be.equal('BB22555')
    car.engine.should.be.equal('BrumBrum')
    car.year.should.be.equal(2019)
    car.retired.should.be.equal(false)
    car.colour.should.be.equal('blue')
    car.nickName.should.be.equal('Four')
  })
})

describe('repair', () => {
  it('add repair today', async () => {
    const car = await Car.findOne({})
    await car.addRepair({
      date: Date.now(),
      repair: 'Totalskadet',
      repaired: false,
    })
    car.repairs.length.should.be.equal(1)
  })
  it('add repair Christmas', async () => {
    const car = await Car.findOne({})
    await car.addRepair({
      date: new Date(1995, 11, 24),
      repair: 'Stor bule og hovprint',
      repaired: true,
    })
    car.repairs.length.should.be.equal(1)
  })
  it('add two repairs', async () => {
    const car = await Car.findOne({})
    await car.addRepair({
      date: new Date(1995, 11, 24),
      repair: 'Stor bule og hovprint',
      repaired: true,
    })
    await car.addRepair({
      date: Date.now(),
      repair: 'Totalskadet',
      repaired: false,
    })
    car.repairs.length.should.be.equal(2)
  })
})

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
      repaired: false,
    })
    car.damages.length.should.be.equal(1)
  })
  it('add two damages', async () => {
    const car = await Car.findOne({})
    await car.addDamage({
      date: new Date(1995, 11, 24),
      damage: 'Ramt af slæde',
      repaired: true,
    })
    await car.addDamage({ damage: 'Tippet som ko' })
    car.damages.length.should.be.equal(2)
  })
})
