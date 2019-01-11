const UserApi = require('../../src/api/UserApi');
const storage = require('../../src/userStaticStorage');
const UserModel = require('../../src/models/User');
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const ApiErrors = require('../../src/api/ApiErrors');

describe('User API class test', () => {

    before(() => {
        this.users = [
            {
                id: 1,
                login: "user1",
                email: "email1",
                password: "password1"
            },
            {
                id: 2,
                login: "user2",
                email: "email2",
                password: "password2"
            },
            {
                id: 3,
                login: "user3",
                email: "email3",
                password: "pwd3"
            },
            {
                id: 4,
                login: "user4",
                email: "email4",
                password: "password4"
            },
        ];

        this.users.forEach((fields) => {
            new UserModel(storage, fields);
        });

        this.api = new UserApi(storage);
    });

    it('should read all pre created records', () => {
        let data = this.api.readAll();
        assert.deepEqual(this.users, data);
    });

    it('should create user with given parameters', () => {
        const uniqLogin = Symbol('login');

        let createData = this.api.create({
            login: uniqLogin,
            email: "usual_email",
            password: "ushellnotpass"
        });

        let findData = this.api.readAll().find((u) => u.login === uniqLogin);

        assert.deepEqual(createData, findData);
    });

    it('should read single record with id = 1', () => {
        let data = this.api.read(1);
        assert.deepEqual(this.users[0], data);
    });

    it('should get error while reading id = -1', () => {
        expect(() => this.api.read(-1)).to.throw(Error, ApiErrors.USER_NOT_FOUND);
    });

    it('should change password for record 1', () => {
        let newPassword = "xyz",
            data = this.api.update(1, {password: newPassword});

        assert.equal(this.users[0].login, data.login);
        assert.equal(this.users[0].email, data.email);
        assert.equal(newPassword, data.password);

        let readData = this.api.read(1);

        assert.equal(readData.login, data.login);
        assert.equal(readData.email, data.email);
        assert.equal(readData.password, data.password);
    });

    it('should throw an error when updating record -1', () => {
        expect(() => this.api.update(-1, {password: "test"}))
            .to
            .throw(Error, ApiErrors.USER_NOT_FOUND);
    });

    it('should remove record with id 1', () => {
        this.api.remove(1);
        expect(() => this.api.read(1)).to.throw(Error, ApiErrors.USER_NOT_FOUND);
    });

    it('should throw an error when removing id -1', () => {
        expect(() => this.api.remove(-1)).to.throw(Error, ApiErrors.USER_NOT_FOUND);
    });

});