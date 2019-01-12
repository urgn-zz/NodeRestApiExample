const express = require('express');
const request = require('supertest');
const chai = require('chai');
const assert = chai.assert;

const app = require('../../src/app');
const storage = require('../../src/userStaticStorage');
const UserModel = require('../../src/models/User');

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

    describe('read all users', () => {

        it("should get all values", (done) => {
            request(app)
                .get('/user')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect((res, err) => {
                    assert.equal(res.body.length, 4, "all elements returned");
                })
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });
        });

    });

    describe('create user', () => {

        it('should create new user with id 5', (done) => {
            let newUserAttributes = {
                login: "newUser",
                email: "someMail",
                password: "strongPass"
            };

            request(app)
                .post("/user")
                .send(newUserAttributes)
                .set('Accept', 'application/json')
                .expect((res) => {
                    assert.deepEqual(res.body, {id: 5, ...newUserAttributes})
                })
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    done();
                });
        });

        it('should return bad request on missing params', (done) => {
            let newUserAttributes = {
                login: "newUser",
                email: "someMail"
            };

            request(app)
                .post("/user")
                .send(newUserAttributes)
                .set('Accept', 'application/json')
                .expect(502)
                .end((err, res) => {
                    if (err) return done(err);
                    done();
                });
        });
    });

    describe('update user', () => {

        it('should update user with id 1', (done) => {
            let newPwd = "<>ABCD!@#$",
                id = 1;

            request(app)
                .put(`/user/${id}`)
                .send({password: newPwd})
                .expect((res) => {
                    assert.equal(res.body.id, id);
                    assert.equal(res.body.password, newPwd);
                })
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    done();
                });
        });

        it('causes 404 for update user with id -1', (done) => {
            let newPwd = "<>ABCD!@#$",
                id = -1;

            request(app)
                .put(`/user/${id}`)
                .send({password: newPwd})
                .expect(404)
                .end((err, res) => {
                    if (err) return done(err);
                    done();
                });
        });

    });

    describe('remove user', () => {
        it('should remove user with id 1', (done) => {
            let id = 1;

            request(app)
                .delete(`/user/${id}`)
                .expect((res) => {
                    assert.equal(res.body.status, "OK");
                })
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    request(app)
                        .get('/user')
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect((res, err) => {
                            res.body.forEach((user) => {
                                assert.notEqual(user.id, id);
                            });
                        })
                        .expect(200)
                        .end(function (err, res) {
                            if (err) return done(err);
                            done();
                        });
                });
        });


        it('causes 404 for delete user with id -1', (done) => {
            let id = -1;

            request(app)
                .delete(`/user/${id}`)
                .expect(404)
                .end((err, res) => {
                    if (err) return done(err);
                    done();
                });
        });

    });

});