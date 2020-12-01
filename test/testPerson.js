require('should')
const Person = require('../model/Person')

beforeEach(async () => {
  const date = new Date(1234, 12, 12)
  const date2 = new Date(1111, 11, 11)
  let person1 = Person({
    name: 'Worker One',
    position: 'Stargazer',
    birthday: date
  })
  let person2 = Person({
    name: 'Worker Two',
    position: 'Roofer',
    birthday: date2
  })
  await person1.save()
  await person2.save()
})
afterEach(() => {
  mongoose.connection.collections.people.drop()
})
// Oprette person
describe('Person', function () {
  it('create person no info', function () {
    let person = new Person()
    should.equal(person.name, undefined)
    should.equal(person.position, undefined)
    should.equal(person.birthday, undefined)
  })

  it('Person with info', async () => {
    const date = new Date(1234, 12, 12)
    const date2 = new Date(1111, 11, 11)
    let person1 = await Person.findOne({ name: 'Worker One' })
    person1.name.should.be.equal('Worker One')
    person1.position.should.be.equal('Stargazer')
    // person1.birthday.should.be.equal(date)

    let person = await Person.findOne({ name: 'Worker Two' })
    person.name.should.be.equal('Worker Two')
    person.position.should.be.equal('Roofer')
    // person.birthday.should.be.equal(date2)
  })
})

// Ændre person info
describe('updatePerson', () => {
  it('updatePerson name', async () => {
    let person22 = new Person({
      name: 'Worker TwoTwo',
      position: 'Roofer',
      birthday: new Date(2002, 02, 02)
    })
    await person22.save()
    let person = await Person.findOne({ name: 'Worker TwoTwo' })
    person = await Person.updatePerson(person, { name: 'Worker No1' })
    person.name.should.be.equal('Worker No1')
    person.position.should.be.equal('Roofer')
    // person.birthday.should.be.equal(new Date(2002, 02, 02))

    let personOther = await Person.findOne({ name: 'Worker No1' })
    personOther.name.should.be.equal('Worker No1')
    personOther.position.should.be.equal('Roofer')
    // personOther.birthday.should.be.equal(new Date(1111, 11, 11))
  })
  it('updatePerson position', async () => {
    let person2 = new Person({
      name: 'Worker Two',
      position: 'Roofer',
      birthday: new Date(2002, 02, 02)
    })
    await person2.save()
    let person = await Person.findOne({ name: 'Worker Two' })
    person = await Person.updatePerson(person, { position: 'Sleeper' })
    person.name.should.be.equal('Worker Two')
    person.position.should.be.equal('Sleeper')
    // person.birthday.should.be.equal(new Date(2002, 02, 02))

    let personOther = await Person.findOne({ name: 'Worker No1' })
    personOther.name.should.be.equal('Worker No1')
    personOther.position.should.be.equal('Roofer')
    // personOther.birthday.should.be.equal(new Date(1111, 11, 11))
  })
  it('updatePerson birthday', async () => {
    let person = await Person.findOne({ name: 'Worker Two' })
    person = await Person.updatePerson(person, {
      birthday: new Date(1333, 13, 13)
    })
    person.name.should.be.equal('Worker Two')
    person.position.should.be.equal('Sleeper')
    // person.birthday.should.be.equal(new Date(1333, 13, 13))

    let personOther = await Person.findOne({ name: 'Worker No1' })
    personOther.name.should.be.equal('Worker No1')
    personOther.position.should.be.equal('Roofer')
    // personOther.bir.should.be.equal(new Date(1111, 11, 11))
  })
  it('updatePerson nothing', async () => {
    let person = await Person.findOne()
    person = await Person.updatePerson(person, {})
    person.name.should.be.equal('Worker No1')
    person.position.should.be.equal('Sleeper')
    perosn.birthday.should.be.equal(new Date(1333, 13, 13))

    let personOther = await Person.findOne({ name: 'Worker One' })
    personOther.name.should.be.equal('Worker One')
    personOther.position.should.be.equal('Carpenter')
    personOther.bir.should.be.equal(new Date(1111, 11, 11))
  })
})
