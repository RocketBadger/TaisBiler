require('should')
const { createCar, updateCar, setStatus } = require('../model/Car')

/* Attributter:
brand
model
licensePlate
retired
colour
id */



// Oprette bil
describe('createCar', function () {
    it('create car empty', function () {
        let car = createCar()
        should.equal(car.brand, undefined)
        should.equal(car.model, undefined)
        should.equal(car.licensePlate, undefined)
        should.equal(car.retired, undefined)
        car.colour.should.be.equal('white')
        should.equal(car.id, undefined)
    })
    it('create car', () => {
        let car = createCar('BMW', 'X3', 'Tais1', false, 'red', 1)
        car.brand.should.be.equal('BMW')
        car.model.should.be.equal('X3')
        car.licensePlate.should.be.equal('Tais1')
        car.retired.should.be.equal(false)
        car.colour.should.be.equal('red')
        car.id.should.be.equal(1)
    })
})

// Ændre bil-attributter
describe('updateCar', () => {
    it('update car', () => {
        let car2 = createCar('BMW', 'X3', 'Tais1', false, 'red', 1)
        car = updateCar(car2, { colour: 'blue' })
        car.brand.should.be.equal('BMW')
        car.model.should.be.equal('X3')
        car.licensePlate.should.be.equal('Tais1')
        car.retired.should.be.equal(false)
        car.colour.should.be.equal('blue')
        car.id.should.be.equal(1)
    })
    it('change brand', () => {
        let car = { brand: 'BMW', model: 'X3', licensePlate: 'Tais1', retired: false, colour: 'red', id: 1 }
        updateCar(car, { brand: 'Mercedes' })
        car.brand.should.be.equal('Mercedes')
        car.model.should.be.equal('X3')
        car.licensePlate.should.be.equal('Tais1')
        car.retired.should.be.equal(false)
        car.colour.should.be.equal('red')
        car.id.should.be.equal(1)
    })
    it('change model', () => {
        let car = { brand: 'BMW', model: 'X3', licensePlate: 'Tais1', retired: false, colour: 'red', id: 1 }
        updateCar({ model: 'C1' })
        car.should.be.equal({ brand: 'BMW', model: 'C1', licensePlate: 'Tais1', retired: false, colour: 'red', id: 1 })
    })
    it('change licensePlate', () => {
        let car = { brand: 'BMW', model: 'X3', licensePlate: 'Tais1', retired: false, colour: 'red', id: 1 }
        updateCar({ licensePlate: 'Tais2' })
        car.should.be.equal({ brand: 'BMW', model: 'X3', licensePlate: 'Tais2', retired: false, colour: 'red', id: 1 })
    })
    it('change colour', () => {
        let car = { brand: 'BMW', model: 'X3', licensePlate: 'Tais1', retired: false, colour: 'red', id: 1 }
        updateCar({ colour: 'blue' })
        car.should.be.equal({ brand: 'BMW', model: 'X3', licensePlate: 'Tais1', retired: false, colour: 'blue', id: 1 })
    })
    it('change id', () => {
        let car = { brand: 'BMW', model: 'X3', licensePlate: 'Tais1', retired: false, colour: 'red', id: 1 }
        updateCar({ id: 2 })
        car.should.be.equal({ brand: 'BMW', model: 'X3', licensePlate: 'Tais1', retired: false, colour: 'red', id: 2 })
    })
    it('change model and colour', () => {
        let car = { brand: 'BMW', model: 'X3', licensePlate: 'Tais1', retired: false, colour: 'red', id: 1 }
        updateCar({ model: 'Mercedes', colour: 'blue' })
        car.should.be.equal({ brand: 'Mercedes', model: 'X3', licensePlate: 'Tais1', retired: false, colour: 'red', id: 1 })
    })
    it('change all attributes', () => {
        let car = { brand: 'BMW', model: 'X3', licensePlate: 'Tais1', retired: false, colour: 'red', id: 1 }
        car.updateCar({ brand: 'Mercedes', model: 'C1', licensePlate: 'Tais2', retired: false, colour: 'blue', id: 2 })
        car.should.be.equal({ brand: 'Mercedes', model: 'C1', licensePlate: 'Tais2', retired: false, colour: 'blue', id: 2 })
    })
})

// Ændre bil-status (retired/unretired)
describe('updateCarStatus', () => {
    it('change to true', () => {
        let car = { brand: 'BMW', model: 'X3', licensePlate: 'Tais1', retired: false, colour: 'red', id: 1 }
        car.setStatus(true)
        car.should.be.equal({ brand: 'BMW', model: 'C1', licensePlate: 'Tais2', retired: true, colour: 'blue', id: 2 })
    })
    it('change status to false', () => {
        let car = { brand: 'BMW', model: 'X3', licensePlate: 'Tais1', retired: true, colour: 'red', id: 1 }
        car.setStatus(false)
        car.should.be.equal({ brand: 'BMW', model: 'C1', licensePlate: 'Tais2', retired: false, colour: 'blue', id: 2 })
    })
})