const Car = require('./model/Car');
require('should');

// Oprette bil
describe('Car', function () {
  it('create car empty', function () {
    let car = new Car();
    should.equal(car.brand, undefined);
    should.equal(car.model, undefined);
    should.equal(car.licensePlate, undefined);
    should.equal(car.retired, undefined);
    car.colour.should.be.equal('white');
    should.equal(car.id, undefined);
  });
  it('new Car', () => {
    let car2 = new Car({
      brand: 'BMW',
      model: 'X5',
      licensePlate: 'aa12345',
      retired: true,
      colour: 'Black',
      id: 1,
    });

    car2.brand.should.be.equal('BMW');
    car2.model.should.be.equal('X5');
    car2.licensePlate.should.be.equal('aa12345');
    car2.retired.should.be.equal(true);
    car2.colour.should.be.equal('Black');
    car2.id.should.be.equal(1);
  });
});

// Ændre bil-attributter
describe('updateCar', () => {
  it('update car', () => {
    // let car3 = new Car('BMW', 'X3', 'Tais1', false, 'red', 1);
    let car3 = new Car({
    brand: 'BMW',
    model: 'X3',
    licensePlate: 'Tais1',
    retired: false,
    colour: 'red',
    id: 1,
  });

    car3.brand.should.be.equal('BMW');
    car3.model.should.be.equal('X3');
    car3.licensePlate.should.be.equal('Tais1');
    car3.retired.should.be.equal(false);
    car3.colour.should.be.equal('red');
    car3.id.should.be.equal(1);

    car = Car.findOne({colour: 'red'});
    car.brand.should.be.equal('BMW');
    car.model.should.be.equal('X3');
    car.licensePlate.should.be.equal('Tais1');
    car.retired.should.be.equal(false);
    car.colour.should.be.equal('red');
    car.id.should.be.equal(1);
  });
});