const expect = require('chai').expect,
    Matrix = require('../src/matrix'),
    Vector = require('../src/vector');

describe('test matrix', () => {

    it('has some functions', () => {
        let m = new Matrix();
        expect(m.generate).to.be.a('function');
        expect(m.at).to.be.a('function');
        expect(m.transform).to.be.a('function');
    });

    it('generates a new matrix', () => {
        let m = new Matrix(2);
        expect(m.values).to.equal(undefined);
        m.generate(7);
        expect(m.values).to.have.length(4);
        expect(m.values[0].toJSNumber()).to.be.lessThan(7);
        expect(m.values[1].toJSNumber()).to.be.lessThan(7);
        expect(m.values[2].toJSNumber()).to.be.lessThan(7);
        expect(m.values[3].toJSNumber()).to.be.lessThan(7);
    });

    it('computes the size correctly', () => {
        expect(new Matrix(new Array(10 * 10)).size).to.equal(10);
        expect(new Matrix(new Array(834 * 834)).size).to.equal(834);
        expect(new Matrix(new Array(25 * 25)).size).to.equal(25);
    });

    it('returns values at correct position', () => {
        let m = new Matrix([1, 2, 3, 4]);
        expect(m.at(0, 0).toJSNumber()).to.equal(1);
        expect(m.at(0, 1).toJSNumber()).to.equal(2);
        expect(m.at(1, 0).toJSNumber()).to.equal(3);
        expect(m.at(1, 1).toJSNumber()).to.equal(4);
    });

    it('transforms a vector', () => {
        let m = new Matrix([1, 2, 3, 4]),
            v = Vector.fromNumbers([5, 6]),
            result = m.transform(v, 11);

        expect(result.values).to.have.length(2);
        expect(result.values[0].toJSNumber()).to.equal(6);
        expect(result.values[0].toJSNumber()).to.equal(6);
    });
});
