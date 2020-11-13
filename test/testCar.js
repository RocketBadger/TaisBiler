require('should')
const mongoose = require('mongoose')
const Car = require('../model/Car')

/* Attributter:
brand
model
licensePlate
retired
colour
id */

before((done) => {
    mongoose.connect('mongodb://localhost/tbiler_test', {
        useFindAndModify: false
    })
    const db = mongoose.connection
    db.on('error', error => console.log(error))
    db.once('open', () => { done() })
})

beforeEach((done) => {
    mongoose.connection.collections.cars.drop(async () => {
        let car = new Car({
            brand: 'BMW',
            model: 'X5',
            licensePlate: 'AA12345',
            retired: true,
            colour: 'black',
            id: 1
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
        should.equal(car.retired, undefined)
        car.colour.should.be.equal('white')
        should.equal(car.id, undefined)
    })
    it('new Car', () => {
        let car = new Car({
            brand: 'BMW',
            model: 'X5',
            licensePlate: 'AA12345',
            retired: true,
            colour: 'black',
            id: 1
        })
        car.brand.should.be.equal('BMW')
        car.model.should.be.equal('X5')
        car.licensePlate.should.be.equal('AA12345')
        car.retired.should.be.equal(true)
        car.colour.should.be.equal('black')
        car.id.should.be.equal(1)
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
        car.retired.should.be.equal(true)
        car.colour.should.be.equal('black')
        car.id.should.be.equal(1)
    })
    it('updateCar model', async () => {
        let car = await Car.findOne({})
        car = await Car.updateCar(car, { model: 'C1' })
        car.brand.should.be.equal('BMW')
        car.model.should.be.equal('C1')
        car.licensePlate.should.be.equal('AA12345')
        car.retired.should.be.equal(true)
        car.colour.should.be.equal('black')
        car.id.should.be.equal(1)
    })
    it('updateCar licensePlate', async () => {
        let car = await Car.findOne({})
        car = await Car.updateCar(car, { licensePlate: 'BB22555' })
        car.brand.should.be.equal('BMW')
        car.model.should.be.equal('X5')
        car.licensePlate.should.be.equal('BB22555')
        car.retired.should.be.equal(true)
        car.colour.should.be.equal('black')
        car.id.should.be.equal(1)
    })
    it('updateCar colour', async () => {
        let car = await Car.findOne({})
        car = await Car.updateCar(car, { colour: 'blue' })
        car.brand.should.be.equal('BMW')
        car.model.should.be.equal('X5')
        car.licensePlate.should.be.equal('AA12345')
        car.retired.should.be.equal(true)
        car.colour.should.be.equal('blue')
        car.id.should.be.equal(1)
    })
    it('updateCar id', async () => {
        let car = await Car.findOne({})
        car = await Car.updateCar(car, { id: '4' })
        car.brand.should.be.equal('BMW')
        car.model.should.be.equal('X5')
        car.licensePlate.should.be.equal('AA12345')
        car.retired.should.be.equal(true)
        car.colour.should.be.equal('black')
        car.id.should.be.equal(4)
    })
    it('updateCar brand and colour', async () => {
        let car = await Car.findOne({})
        car = await Car.updateCar(car, { brand: 'Mercedes', colour: 'blue' })
        car.brand.should.be.equal('Mercedes')
        car.model.should.be.equal('X5')
        car.licensePlate.should.be.equal('AA12345')
        car.retired.should.be.equal(true)
        car.colour.should.be.equal('blue')
        car.id.should.be.equal(1)
    })
    it('updateCar all attributes', async () => {
        let car = await Car.findOne({})
        car = await Car.updateCar(car, { brand: 'Mercedes', model: 'C1', licensePlate: 'BB22555', retired: false, colour: 'blue', id: 4 })
        car.brand.should.be.equal('Mercedes')
        car.model.should.be.equal('C1')
        car.licensePlate.should.be.equal('BB22555')
        car.retired.should.be.equal(false)
        car.colour.should.be.equal('blue')
        car.id.should.be.equal(4)
    })
})

describe('setStatus', () => {
    it('set status to false', async () => {
        let car = await Car.findOne({})
        car.retired.should.be.equal(true)
        car.setStatus(false)
        car.brand.should.be.equal('BMW')
        car.model.should.be.equal('X5')
        car.licensePlate.should.be.equal('AA12345')
        car.retired.should.be.equal(false)
        car.colour.should.be.equal('black')
        car.id.should.be.equal(1)
    })
    it('set status to true', async () => {
        let car = await Car.findOne({})
        car.setStatus(false)
        car.setStatus(true)
        car.brand.should.be.equal('BMW')
        car.model.should.be.equal('X5')
        car.licensePlate.should.be.equal('AA12345')
        car.retired.should.be.equal(true)
        car.colour.should.be.equal('black')
        car.id.should.be.equal(1)
    })
})