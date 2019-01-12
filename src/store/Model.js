//Private field access symbols
const _id = Symbol('_id');
const _parent = Symbol('_parent');

/**
 * class `Model` represents one item of data to store in the `Collection` object
 */
class Model {

    /**
     * `Model`s constructor, creates instance of `Model` and stores it in the parent `Collection` object
     *
     * @param collection {Collection} parent object with storage
     */
    constructor(collection) {
        if (!collection) {
            throw new Error('Missing parent collection.');
        }

        this[_parent] = collection;
        this[_id] = collection.allocateNewId();

        collection.storeModel(this);
    }

    /**
     * getter for `id` field
     *
     * @returns {Number} unique identifier of current `Model`
     */
    get id() {
        return this[_id];
    }

}

module.exports = Model;
