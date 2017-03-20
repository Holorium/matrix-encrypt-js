const expect = require('chai').expect,
    Matrix = require('../src/matrix'),
    Vector = require('../src/vector');

describe('test matrix', () => {

    it('has some functions', () => {
        let m = new Matrix();
        expect(m.generate).to.be.a('function');
        expect(m.at).to.be.a('function');
        expect(m.transform).to.be.a('function');
        expect(m.det).to.be.a('function');
        expect(m.without).to.be.a('function');
        expect(m.invert).to.be.a('function');
        expect(m.multiply).to.be.a('function');
        expect(m.cofactorMatrix).to.be.a('function');
        expect(m.transpose).to.be.a('function');
        expect(m.sign).to.be.a('function');
        expect(m.scale).to.be.a('function');
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

    it('computes minor correctly', () => {
        let m1 = new Matrix([
                1, 2, 3, 4,
                5, 6, 7, 8,
                9, 10, 11, 12,
                13, 14, 15, 16,
            ]),
            m2 = m1.without(2, 1);

        expect(m2.values).to.have.length(9);
        expect(m2.values.map((v) => { return v.toJSNumber(); })).to.deep.equal([
            1, 3, 4,
            5, 7, 8,
            13, 15, 16,
        ]);
    });

    describe('determinant', () => {

        it('1x1', () => {
            let m = new Matrix([1]);
            expect(m.det().toJSNumber()).to.equal(1);
        });

        it('2x2', () => {
            let m = new Matrix([1, 2, 3, 4]);
            expect(m.det().toJSNumber()).to.equal(-2);
        });

        it('3x3', () => {
            let m = new Matrix([1, 2, 3, 4, 5, 6, 7, 8, 11]);
            expect(m.det().toJSNumber()).to.equal(-6);
        });

        it('4x4', () => {
            let m = new Matrix([1, 6, 3, 5, 4, 6, 8, 9, 4, 3, 3, 2, 1, 6, 7, 8]);
            expect(m.det().toJSNumber()).to.equal(-138);
        });
    });

    it('has a sign function', () => {
        let m = new Matrix([1]);
        expect(m.sign(1).toJSNumber()).to.equal(-1);
        expect(m.sign(2).toJSNumber()).to.equal(1);
        expect(m.sign(3).toJSNumber()).to.equal(-1);
    });

    it('computes the cofactor matrix', () => {
        let m = new Matrix([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        expect(m.cofactorMatrix().values.map((v) => { return v.toJSNumber(); })).to.deep.equal([
            -3, 6, -3,
            6, -12, 6,
            -3, 6, -3,
        ]);
    });

    it('computes the transposed matrix', () => {
        let m = new Matrix([
            1, 2, 3, 4,
            5, 6, 7, 8,
            9, 10, 11, 12,
            13, 14, 15, 16,
        ]);
        expect(m.transpose().values.map((v) => { return v.toJSNumber(); })).to.deep.equal([
            1, 5, 9, 13,
            2, 6, 10, 14,
            3, 7, 11, 15,
            4, 8, 12, 16,
        ]);
    });

    it('has a multiply function', () => {
        let m1 = new Matrix([1, 2, 3, 4, 5, 6, 7, 8, 9]),
            m2 = new Matrix([10, 11, 12, 13, 14, 15, 16, 17, 18]),
            result = m1.multiply(m2);
        expect(result.values).to.have.length(9);
        expect(result.values.map((v) => { return v.toJSNumber(); })).to.deep.equal([
            84, 90, 96, 201, 216, 231, 318, 342, 366,
        ]);
    });

    describe('scales', () => {

        it('normally', () => {
            let m = new Matrix([1, 2, 3, 4]);
            expect(m.scale(2).values.map((v) => { return v.toJSNumber(); })).to.deep.equal([
                2, 4, 6, 8,
            ]);
        });

        it('mod 7', () => {
            let m = new Matrix([1, 2, 3, 4]);
            expect(m.scale(2, 7).values.map((v) => { return v.toJSNumber(); })).to.deep.equal([
                2, 4, 6, 1,
            ]);
        });
    });

    describe('inverse', () => {

        it('non invertable matrix', () => {
            let m = new Matrix([1, 2, 3, 4, 5, 6, 7, 8, 9]);
            expect(m.invert(11)).to.equal(undefined);
        });

        it('inverts correctly', () => {
            let m = new Matrix([1, 2, 3, 4]);
            expect(m.invert(11).values.map((v) => { return v.toJSNumber(); })).to.deep.equal([
                9, 1, 7, 5,
            ]);
        });

        it('has correct result if multiplied with inverse', () => {
            let m = new Matrix([1, 2, 3, 4, 5, 6, 7, 8, 10]),
                inv = m.invert(11);

            expect(m.multiply(inv, 11).values.map((v) => { return v.toJSNumber(); })).to.deep.equal([
                1, 0, 0, 0, 1, 0, 0, 0, 1,
            ]);
        });

    });
});
