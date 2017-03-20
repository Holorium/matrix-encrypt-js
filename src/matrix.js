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

Matrix.prototype.without = function (row, column) {
    var values = [];
    for (var r = 0; r < this.size; r++) {
        if (r === row) continue;
        for (var c = 0; c < this.size; c++) {
            if (c === column) continue;
            values.push(this.at(r, c));
        }
    }
    return new Matrix(values);
};

Matrix.prototype.sign = function (num) {
    return bigInteger(num).mod(2).equals(0) ? bigInteger.one : bigInteger.minusOne;
};

Matrix.prototype.det = function () {
    if (this.size === 1) {
        return this.values[0];
    } else if (this.size === 2) {
        return this.at(0, 0).multiply(this.at(1, 1)).minus(this.at(1, 0).multiply(this.at(0, 1)));
    }

    var det = bigInteger.zero;
    for (var i = 0; i < this.size; i++) {
        var sign = this.sign(i);
        det = det.add(sign.multiply(this.at(0, i)).multiply(this.without(0, i).det()));
    }
    return det;
};

Matrix.prototype.cofactorMatrix = function (residueClass) {
    var values = [];
    for (var r = 0; r < this.size; r++) {
        for (var c = 0; c < this.size; c++) {
            var sign = this.sign(r + c),
                result = sign.multiply(this.without(r, c).det());
            if (residueClass) {
                result = result.mod(residueClass);
                if (result.lesser(bigInteger.zero)) result = result.add(residueClass);
            }
            values.push(result);
        }
    }
    return new Matrix(values);
};

Matrix.prototype.invert = function (residueClass) {
    var det = this.det();
    if (det.equals(bigInteger.zero)) return;
    det = det.mod(residueClass);
    if (det.lesser(bigInteger.zero)) det = det.add(residueClass);

    var adjointMatrix = this.cofactorMatrix(residueClass).transpose(),
        invDet = det.modInv(residueClass);

    return adjointMatrix.scale(invDet, residueClass);
};

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

Matrix.prototype.transpose = function () {
    var values = [];
    for (var r = 0; r < this.size; r++) {
        for (var c = 0; c < this.size; c++) {
            values.push(bigInteger(this.at(c, r)));
        }
    }
    return new Matrix(values);
};

Matrix.prototype.multiply = function (other, residueClass) {
    if (this.size !== other.size) throw new Error('The size of both matrices should be the same. ');
    var values = [];
    for (var r = 0; r < this.size; r++) {
        for (var c = 0; c < this.size; c++) {
            var result = bigInteger.zero;
            for (var l = 0; l < this.size; l++) {
                result = result.add(this.at(r, l).multiply(other.at(l, c)));
            }
            if (residueClass) result = result.mod(residueClass);
            values.push(result);
        }
    }

    return new Matrix(values);
};

Matrix.prototype.scale = function (scale, residueClass) {
    scale = bigInteger(scale);
    var values = [];
    for (var r = 0; r < this.size; r++) {
        for (var c = 0; c < this.size; c++) {
            var result = this.at(r, c).multiply(scale);
            if (residueClass) result = result.mod(residueClass);
            values.push(result);
        }
    }
    return new Matrix(values);
};

module.exports = Matrix;
