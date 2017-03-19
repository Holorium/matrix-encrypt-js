const expect = require('chai').expect;

describe('matrix-encrypt-js', () => {

    let Encrypter = require('../index');

    it('returns prototype with some methods', () => {
        expect(Encrypter).to.be.a('function');
        expect(Encrypter.prototype).to.be.a('object');
        let encrypter = new Encrypter();
        expect(encrypter.encrypt).to.be.a('function');
        expect(encrypter.decrypt).to.be.a('function');
    });

});
