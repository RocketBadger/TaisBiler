const { createCar, updateCar, findCar } = require('./model/Car')

// let car = createCar()
// console.log(car)

let car = createCar('BMW', 'X3', 'Tais1', false, 'red', 1)
// updateCar(car, { colour: 'blue' })
// console.log(car.colour);
// console.log(car);

console.log(findCar(car));