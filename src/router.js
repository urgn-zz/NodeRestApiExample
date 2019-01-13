/**
 * @apiDefine userResponse
 * @apiSuccess {Number} user.id         Surrogate key of user entry.
 * @apiSuccess {string} user.login      Users login name.
 * @apiSuccess {string} user.email      User access level.
 * @apiSuccess {string} user.password   Authentication token of user.
 */

/**
 * @apiDefine userBodyParameters
 * @apiParam {Object} body              Body of request.
 * @apiParam {string} body.login        Users login name.
 * @apiParam {string} body.email        User access level.
 * @apiParam {string} body.password     Authentication token of user.
 */

const express = require('express');
const UserApi = require('./api/UserApi');
const ApiErrors = require('./api/ApiErrors');
const storage = require('./userStaticStorage');

let router = express.Router({mergeParams: true});
let userApi = new UserApi(storage);

let handleErrors = (e, res) => {

    console.error(e.message);

    if (e.message === ApiErrors.USER_NOT_FOUND) {
        res.status(404).json({message: e.message});
    } else if (e.message === ApiErrors.MISSING_PARAMETERS) {
        res.status(400).json({message: e.message});
    } else {
        res.status(500).json({message: e.message});
    }
};

/**
 * @api {get} /user Get list of users.
 * @apiName geUser
 * @apiVersion 0.1.0
 * @apiGroup User
 *
 * @apiSuccess {Object[]} games List of the user.
 * @apiUse userResponse
 */
router.get('/', function (req, res, next) {
    try {
        console.log("All data request");

        let data = userApi.readAll();
        res.status(200).json(data);
    } catch (e) {
        handleErrors(e, res);
    }
});

/**
 * @api {get} /user/:id Get single user data.
 * @apiName geUser
 * @apiVersion 0.1.0
 * @apiGroup User
 *
 * @apiSuccess {Object[]} games List of the user.
 * @apiUse userResponse
 */
router.get('/:id', function (req, res, next) {
    let id = req.params.id;

    try {
        console.log("All data request");

        let data = userApi.read(id);
        res.status(200).json(data);
    } catch (e) {
        handleErrors(e, res);
    }
});


/**
 * @api {post} /user Add new user.
 * @apiName postUser
 * @apiVersion 0.1.0
 * @apiPermission root
 * @apiGroup User
 *
 * @apiSuccess {Object} user Attributes of newly created user.
 * @apiUse userResponse
 *
 * @apiUse userBodyParameters
 */
router.post("/", function (req, res, next) {
    let attr = req.body;

    try {
        console.log(`New user creation. params: ${JSON.stringify(req.body)}`);

        let data = userApi.create(attr);
        res.status(200).json(data);
    } catch (e) {
        handleErrors(e, res);
    }
});

/**
 * @api {put} /user/:id Update user information.
 * @apiName putUser
 * @apiVersion 0.1.0
 * @apiPermission root
 * @apiGroup User
 *
 * @apiSuccess {Object} user Attributes of updated user.
 * @apiUse userResponse
 *
 * @apiParam {Number} id ID of edited user.
 * @apiUse userBodyParameters
 */
router.put("/:id", function (req, res, next) {
    let id = req.params.id,
        attr = req.body;


    console.log(`User update. id: ${id} params: ${JSON.stringify(attr)}`);

    try {
        let data = userApi.update(id, attr);
        res.status(200).json(data);
    } catch (e) {
        handleErrors(e, res);
    }
});

/**
 * @api {delete} /user/:id Remove user record.
 * @apiName deleteUser
 * @apiVersion 0.1.0
 * @apiPermission root
 * @apiGroup User
 *
 * @apiParam {Number} id ID of user to remove.
 *
 * @apiSuccess {string} message In case of success should contain "OK"
 */
router.delete("/:id", function (req, res, next) {
    let id = req.params.id;

    console.log(`User removal. id: ${id}`);

    try {
        userApi.remove(id);
        res.status(200).json({status: "OK"});
    } catch (e) {
        handleErrors(e, res);
    }

});

module.exports = router;
