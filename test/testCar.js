require('should')

/* Attributter:
brand
model
licensePlate
retired
colour
id */

// Oprette bil
describe('createCar', () => {
    it('create car empty', () => {
        createCar().should.be.equal()
    })
    it('create car', () => {
        let car = { brand: 'BMW', model: 'X3', licensePlate: 'Tais1', retired: false, colour: 'red', id: 1 }
        car.should.be.equal({ brand: 'BMW', model: 'X3', licensePlate: 'Tais1', retired: false, colour: 'red', id: 1 })
    })
})

// Ændre bil-attributter
describe('updateCar', () => {
    it('update car', () => {
        updateCar().should.be.equal()
    })
    it('change brand', () => {
        let car = { brand: 'BMW', model: 'X3', licensePlate: 'Tais1', retired: false, colour: 'red', id: 1 }
        car.updateCar({ brand: 'Mercedes' })
        car.should.be.equal({ brand: 'Mercedes', model: 'X3', licensePlate: 'Tais1', retired: false, colour: 'red', id: 1 })
    })
    it('change model', () => {
        let car = { brand: 'BMW', model: 'X3', licensePlate: 'Tais1', retired: false, colour: 'red', id: 1 }
        car.updateCar({ model: 'C1' })
        car.should.be.equal({ brand: 'BMW', model: 'C1', licensePlate: 'Tais1', retired: false, colour: 'red', id: 1 })
    })
    it('change licensePlate', () => {
        let car = { brand: 'BMW', model: 'X3', licensePlate: 'Tais1', retired: false, colour: 'red', id: 1 }
        car.updateCar({ licensePlate: 'Tais2' })
        car.should.be.equal({ brand: 'BMW', model: 'X3', licensePlate: 'Tais2', retired: false, colour: 'red', id: 1 })
    })
    it('change colour', () => {
        let car = { brand: 'BMW', model: 'X3', licensePlate: 'Tais1', retired: false, colour: 'red', id: 1 }
        car.updateCar({ colour: 'blue' })
        car.should.be.equal({ brand: 'BMW', model: 'X3', licensePlate: 'Tais1', retired: false, colour: 'blue', id: 1 })
    })
    it('change id', () => {
        let car = { brand: 'BMW', model: 'X3', licensePlate: 'Tais1', retired: false, colour: 'red', id: 1 }
        car.updateCar({ id: 2 })
        car.should.be.equal({ brand: 'BMW', model: 'X3', licensePlate: 'Tais1', retired: false, colour: 'red', id: 2 })
    })
    it('change model and colour', () => {
        let car = { brand: 'BMW', model: 'X3', licensePlate: 'Tais1', retired: false, colour: 'red', id: 1 }
        car.updateCar({ model: 'Mercedes', colour: 'blue' })
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