var bigInteger = require('big-integer');

function Vector(values) {
    this.values = values;

}

Vector.prototype.XOR = function (other) {
    if (this.values.length !== other.values.length) throw new Error('Cannot XOR vectors of different size');
    for (var i = 0; i < this.values.length; i++) {
        this.values[i] = this.values[i].xor(other.values[i]);
    }
    return this;
};

Vector.prototype.clone = function () {
    return self.fromNumbers(this.values);
};

Vector.prototype.toHexString = function () {
    return this.values.map(function (val) {
        return '0x' + val.toString(16);
    }).join('');
};

Vector.prototype.toString = function () {
    return this.values.map(function (val) {
        return String.fromCharCode(val.toJSNumber());
    }).join('');
};

Vector.prototype.equals = function (other) {
    if (this.values.length !== other.values.length) return false;
    for (var i = 0; i < this.values.length; i++) {
        if (!this.values[i].equals(other.values[i])) return false;
    }
    return true;
};

var self = module.exports = {

    zero: function (size) {
        return new Vector(new Array(size).map(function () { return bigInteger.zero; }));
    },

    fromString: function (str, size) {
        if (!size) size = str.length;
        var values = new Array(size);
        for (var i = 0; i < values.length; i++) {
            if (i < str.length) {
                values[i] = bigInteger(str.charCodeAt(i));
            } else {
                values[i] = 0;
            }
        }
        return new Vector(values);
    },

    fromNumbers: function (list, size) {
        var values = new Array(size || list.length), i;
        for (i = 0; i < (size || list.length); i++) values[i] = bigInteger(list[i]);
        for (i = list.length; i < size; i++) values[i] = 0;
        return new Vector(values);
    },

};
