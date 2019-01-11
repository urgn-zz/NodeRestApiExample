//Private field access symbols
const _idCounter = Symbol('_idCounter');
const _modelClass = Symbol('_modelClass');
const _data = Symbol('_data');

/**
 * class `Collection` for storing and management of `Model`s
 */
class Collection {

    /**
     * constructor of `Collection` class
     *
     * @param modelClass {class} type of stored `Model`s
     */
    constructor(modelClass) {
        this[_idCounter] = 0;
        this[_modelClass] = modelClass;
        this[_data] = [];
    }

    /**
     * method to get unique unoccupied identifier in this collection
     *
     * @returns {number} unique unoccupied identifier
     */
    allocateNewId() {
        return ++this[_idCounter];
    }

    /**
     * method to get `Model` identified by certain `id`
     *
     * @param id {Number} `id` to look up
     * @returns {Model|undefined} looked up `Model`
     */
    findById(id) {
        return this[_data].find(m => m.id === id);
    }

    /**
     * method to get all `Model`s of current collection
     *
     * @returns {Model[]} array of `Model`s
     */
    findAll() {
        return this[_data].slice(0);
    }

    storeModel(model) {
        if (!(model instanceof this[_modelClass])) {
            throw "Models class does not belong to this collection.";
        }

        if (!model.parent === this) {
            throw "Models parent is not this collection."
        }

        if (!model.id) {
            throw "Model has no ID."
        }

        if (this.findById(model.id)) {
            throw "Models ID is occupied in this collection."
        }

        this[_data].push(model);
    }

    /**
     * method that removes `Model` from this collection identified by given `id`
     *
     * @param id {Number} `id` of `Model` to remove from this collection
     */
    removeById(id) {
        let pos = this[_data].indexOf(this.findById(id));

        if (pos > -1) {
            this[_data].splice(pos, 1);
        } else {
            throw `No element with id === ${id}.`;
        }
    }

    /**
     * getter for an amount of all collection element
     */
    get count() {
        return this[_data].length;
    }
}

module.exports = Collection;
