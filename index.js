var util = require('./src/util'),
    Matrix = require('./src/matrix'),
    Vector = require('./src/vector'),
    bigInteger = require('big-integer');

/**
 * Creates a new Encrpyter
 * @class
 * @param {Object} opt - Configuration object for encrypter
 * @param {string} opt.residueClass - The residueClass of all computations. Must be a prime number. Not required, if numBits is present.
 * @param {string} opt.key - A string representation of a square matrix in hex numbers. If not present, a new key will be generated.
 * @param {Number} opt.numBits - The number of bits, the generated residueClass should have. The higher the number, the more secure the encryption is.
 * @param {Number} opt.size - The size of the matrix (which is always a square matrix). Default is 4
 */
var Encrypter = function (opt) {
    if (!opt.residueClass && !opt.numBits) throw new Error('residueClass or numBits are required to setup a new Encrypter.');

    if (opt.residueClass) this.residueClass = bigInteger(opt.residueClass);
    else this.residueClass = util.randomPrime(opt.numBits);

    if (opt.key) this.key = util.strToMatrix(opt.key);
    else this.key = new Matrix(opt.size || 4).generate(this.residueClass);
};

Encrypter.prototype.encrypt = function (str, checksum) {
    // divide into vectors according to the matrix size
    var vectors = [], i;
    for (i = 0; i < str.length; i += this.key.size) vectors.push(Vector.fromString(str.substr(i, this.key.size)));
    // if checksum is true, prepend checksum vector
    if (checksum === true) vectors.unshift(util.checksum(vectors));
    // encrypt vector wise
    for (i = 0; i < vectors.length; i++) vectors[i] = this.key.transform(vectors[i], this.residueClass);
    return vectors.map(function (v) {
        return v.toString();
    }).join('');
};

Encrypter.prototype.decrypt = function (str, defaultMessage) {
    if (defaultMessage) return defaultMessage;
    return str;
};

Encrypter.prototype.getKey = function () {
    return util.matrixToString(this.key);
};

module.exports = Encrypter;
