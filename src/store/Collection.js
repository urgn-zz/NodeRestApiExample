const CollectionErrors = require('./CollectionErrors');

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
        return this[_data].find(m => m.id === Number(id));
    }

    /**
     * method to get all `Model`s of current collection
     *
     * @returns {Model[]} array of `Model`s
     */
    findAll() {
        return this[_data].slice(0);
    }

    /**
     * method to add `Model` to the `Collection`s storage
     *
     * @param model {Model} `Model` to add
     */
    storeModel(model) {
        if (!(model instanceof this[_modelClass])) {
            throw new Error(CollectionErrors.WRONG_MODEL);
        }

        if (!model.parent === this) {
            throw new Error(CollectionErrors.BAD_MODEL_PARENT);
        }

        if (!model.id) {
            throw new Error(CollectionErrors.NO_MODEL_ID);
        }

        if (this.findById(model.id)) {
            throw new Error(CollectionErrors.OCCUPIED_ID);
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
            throw new Error(CollectionErrors.NO_MODEL);
        }
    }

    /**
     * getter for an amount of all collection element
     */
    get count() {
        return this[_data].length;
    }

    /**
     * Cleans entire collection
     */
    clear() {
        this[_idCounter] = 0;
        this[_data] = [];
    }
}

module.exports = Collection;
