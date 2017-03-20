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

Vector.prototype.toString = function () {
    return this.values.map(function (val) {
        return '0x' + val.toString(16);
    }).join('');
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

    fromNumbers: function (list) {
        var values = new Array(list.length);
        for (var i = 0; i < list.length; i++) values[i] = bigInteger(list[i]);
        return new Vector(values);
    },

};
