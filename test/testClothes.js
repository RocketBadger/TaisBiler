require('should')
const mongoose = require('mongoose')
const Clothes = require('../model/Clothes')

/* Attributter:
name
size
brand
handedOut */

// Oprette tøj
describe('Clothes', function () {
    // it('create clothes empty', function () {
    //     let clothes = new Clothes()
    //     should.equal(clothes.name, undefined)
    //     should.equal(clothes.size, undefined)
    //     should.equal(clothes.brand, undefined)
    //     should.equal(clothes.handedOut, undefined)
    // })
    it('create clothes', function () {
        let clothes = new Clothes({
            name: 'Sko',
            size: '48',
            brand: 'Puma',
        })
        clothes.name.should.be.equal('Sko')
        clothes.size.should.be.equal('48')
        clothes.brand.should.be.equal('Puma')
    })
})