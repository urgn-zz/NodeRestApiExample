const UserModel = require('../models/User');
const _storage = Symbol('_storage');
const _ = require('lodash');
const ApiErrors = require('./ApiErrors');
const CollectionErrors = require('../store/CollectionErrors');

class UserApi {

    constructor(userStorage) {
        this[_storage] = userStorage;
    }

    create({login, email, password}) {
        if (_.isUndefined(login) || _.isUndefined(email) || _.isUndefined(password)) {
            throw new Error(ApiErrors.MISSING_PARAMETERS);
        }

        return new UserModel(this[_storage], {login, email, password}).toSimpleObject();
    }

    readAll() {
        return this[_storage].findAll().map(userModel => userModel.toSimpleObject());
    }

    read(id) {
        let model = this[_storage].findById(id);

        if (_.isUndefined(model)) {
            throw new Error(ApiErrors.USER_NOT_FOUND);
        }

        return model.toSimpleObject();
    }

    update(id, {login, email, password}) {
        const model = this[_storage].findById(id);

        if (_.isUndefined(model)) {
            throw new Error(ApiErrors.USER_NOT_FOUND);
        }

        model.login = !_.isUndefined(login) ? login : model.login;
        model.email = !_.isUndefined(email) ? email : model.email;
        model.password = !_.isUndefined(password) ? password : model.password;

        return model.toSimpleObject();
    }

    remove(id) {
        try {
            this[_storage].removeById(id);
        } catch (e) {
            if (e.message === CollectionErrors.NO_MODEL) {
                throw new Error(ApiErrors.USER_NOT_FOUND);
            } else {
                throw e;
            }
        }
    }

}

module.exports = UserApi;
