const express = require('express');
const request = require('supertest');
const app = require('../src/index');
const storage = require('../src/userStaticStorage');
const UserModel = require('../src/models/User');

describe('Integration test for the API and express route', () => {

    before(() => {
        new UserModel(storage, {
            login: "test1",
            email: "test2",
            password: "test3"
        });

        new UserModel(storage, {
            login: "test1",
            email: "test2",
            password: "test3"
        });

        new UserModel(storage, {
            login: "test1",
            email: "test2",
            password: "test3"
        });

        new UserModel(storage, {
            login: "test1",
            email: "test2",
            password: "test3"
        });
    });

    describe('simple get all', (done) => {

        it("should get all values", (done) => {
            request(app)
                .get('/')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    debugger;
                    if (err) throw err;
                    done();
                });
        });

    });

    describe('get user by id', () => {

    });

    describe('update user', () => {

    });

    describe('remove user', () => {

    });

});