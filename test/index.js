const expect = require('chai').expect;

describe('matrix-encrypt-js', () => {

    let Encrypter = require('../index');

    it('returns prototype with some methods', () => {
        expect(Encrypter).to.be.a('function');
        expect(Encrypter.prototype).to.be.a('object');
        let encrypter = new Encrypter({ numBits: 100 });
        expect(encrypter.encrypt).to.be.a('function');
        expect(encrypter.decrypt).to.be.a('function');
        expect(encrypter.getKey).to.be.a('function');
    });

    it('returns the correct matrix', () => {
        let key = '0xaa0x170x765a0xfa42',
            encrypter = new Encrypter({ key: key, numBits: 100 });
        expect(encrypter.getKey()).to.equal(key);
    });

    it('encrypts some text', () => {
        let encrypter = new Encrypter({ key: '0xa0x80x160xc', residueClass: 251 });

        // did this one time per hand and seems to be fine ;)
        expect(encrypter.encrypt('test')).to.equal('0xd30xfa0x460x9d');
    });

    it('encrypts some text with checksum', () => {
        let encrypter = new Encrypter({ key: '0xa0x80x160xc', residueClass: 251 });

        // did this also one time per hand and seems to be fine ;)
        expect(encrypter.encrypt('test', true)).to.equal('0xce0x6b0xd30xfa0x460x9d');
    });

});
