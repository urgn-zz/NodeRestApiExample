const Collection = require('./Collection');

const _id = Symbol('_id');
const _parent = Symbol('_parent');

/**
 * Class Model
 */
class Model {

    constructor(collection) {
        if (!collection) {
            throw new Error('Missing parent collection.');
        }

        this[_parent] = collection;
        this[_id] = collection.allocateNewId();

        collection.storeModel(this);
    }

    get id() {
        return this[_id];
    }

}

module.exports = Model;
