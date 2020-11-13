// const { createCar, updateCar, findCar } = require('./model/Car')
const Car = require('./model/Car')

// let car = createCar()
// console.log(car)

// let car = createCar('BMW', 'X3', 'Tais1', false, 'red', 1)
// updateCar(car, { colour: 'blue' })
// console.log(car.colour);
// console.log(car);

// console.log(findCar(car));

// let car = Car.createCar('BMW' , 'X7', 'fe56789', false, 'White', 1);
const car = new Car ({
    brand: 'BMW',
    model: 'X7',
    licensePlate: 'fe56789',
    retired: false,
    colour: 'White',
    id: 1
})

car.save()
console.log(car)