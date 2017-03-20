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

    it('decrypts some text correctly', () => {
        let text = 'some test',
            encrypter = new Encrypter({ numBits: 20 }),
            encryption = encrypter.encrypt(text);

        expect(encrypter.decrypt(encryption)).to.equal(text);
    });

    it('decrypts some text with checksum', () => {
        let text = 'some other text',
            encrypter = new Encrypter({ numBits: 20 }),
            encryption = encrypter.encrypt(text, true);

        expect(encrypter.decrypt(encryption, 'default string')).to.equal(text);
    });

    it('fails to decrypt some short text with checksum', () => {
        let encrypter = new Encrypter({ numBits: 20 }),
            defaultString = 'default string';

        encrypter.encrypt('and another text', true);

        expect(encrypter.decrypt('0xa0x8', defaultString)).to.equal(defaultString);
    });

    it('fails to decrypt some text with checksum', () => {
        let encrypter = new Encrypter({ numBits: 20 }),
            defaultString = 'default string';

        encrypter.encrypt('test and another text', true);

        expect(encrypter.decrypt('0xa0xb0xc0xd0xe0xf0x10x20x30x40x50x60x7', defaultString)).to.equal(defaultString);
    });

});
