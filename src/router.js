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
        let data = userApi.readAll();
        res.status(200).send(data);
    } catch (e) {
        if (e.message === ApiErrors.USER_NOT_FOUND) {
            res.status(404).send();
        } else {
            res.status(500).send(e);
        }
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
    let id = req.params.id;

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

});

module.exports = router;
