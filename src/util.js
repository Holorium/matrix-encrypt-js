var bigInteger = require('big-integer');

module.exports = {

    strToMatrix: function (str) {
        var list = str.split('0x'),
            Matrix = require('./matrix');
        list.shift(); // first value is useless
        return new Matrix(list.map(function (val) {
            return bigInteger(val, 16);
        }));
    },

    matrixToString: function (matrix) {
        return matrix.values.map(function (number) {
            return '0x' + number.toString(16);
        }).join('');
    },

    randomPrime: function (numBits) {
        var minimum = bigInteger('1' + new Array(numBits).join('0'), 2).toString(10),
            maximum = bigInteger(new Array(numBits + 1).join('1'), 2).toString(10),
            result;

        do {
            result = bigInteger.randBetween(minimum, maximum);
        } while (!result.isProbablePrime(10));

        return result;
    },

    checksum: function (vectors) {
        var checksum = vectors[0].clone();
        for (var i = 1; i < vectors.length; i++) {
            checksum.XOR(vectors[i]);
        }
        return checksum;
    },

};
