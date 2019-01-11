const Collection = require('../../src/core/Collection');
const Model = require('../../src/core/Model');
const chai = require('chai'),
    expect = chai.expect,
    assert = chai.assert;

describe("Model and collection test", () => {

    before(() => {
        this.collection = new Collection(Model);

    });

    it("should not be possible to create model without collection", () => {
        expect(() => new Model()).to.throw(Error, 'Missing parent collection.')
    });

    it("should add several models to a collection and check count", () => {
        assert.equal(this.collection.count, 0);

        this.model1 = new Model(this.collection);
        this.model2 = new Model(this.collection);
        this.model3 = new Model(this.collection);

        assert.equal(this.collection.count, 3);
    });

    it("should get element by id", () => {
        assert.equal(this.collection.findById(this.model1.id), this.model1);
    });

    it("should get all elements", () => {
        let data = this.collection.findAll();

        assert.equal(data[0], this.model1);
        assert.equal(data[1], this.model2);
        assert.equal(data[2], this.model3);
    });

    it("should remove element by id", () => {
        assert.equal(this.collection.count, 3);
        assert.equal(this.collection.findById(this.model3.id), this.model3);

        this.collection.removeById(this.model3.id);

        assert.equal(this.collection.count, 2);
        assert.equal(this.collection.findById(this.model3.id), undefined);
    });

});