var bigInteger = require('big-integer');

function Matrix(value) {
    if (value instanceof Array) {
        this.values = new Array(value.length);
        for (var i = 0; i < this.values.length; i++) this.values[i] = bigInteger(value[i]);
        this.size = Math.sqrt(this.values.length) >> 0;
    } else {
        this.size = value;
    }
}

Matrix.prototype.at = function (row, column) {
    return this.values[column + row * this.size];
};

Matrix.prototype.generate = function (residueClass) {
    this.values = new Array(this.size * this.size);
    for (var i = 0; i < this.values.length; i++) this.values[i] = bigInteger.randBetween(1, residueClass - 1);
    return this;
};

Matrix.prototype.transform = function (vector, residueClass) {
    if (vector.values.length !== this.size) throw Error('Vector length (' + vector.values.length + ') must be equal to matrix size (' + this.size + ').');
    var Vector = require('./vector'),
        result = new Array(this.size);

    // loop over rows
    for (var r = 0; r < this.size; r++) {
        result[r] = bigInteger.zero;
        // loop over columns
        for (var c = 0; c < this.size; c++) {
            result[r] = result[r].add(this.at(r, c).multiply(vector.values[c])).mod(residueClass.toString());
        }
    }

    return Vector.fromNumbers(result);
};

module.exports = Matrix;
