/**
 * @apiDefine userResponse
 * @apiSuccess {Number} user.bo_user_id             Surrogate key of user entry.
 * @apiSuccess {string} user.bo_user_login          Users login name.
 * @apiSuccess {string} user.bo_user_access_level   User access level.
 * @apiSuccess {string} user.bo_user_pass           Authentifucation token of user.
 */

/**
 * @apiDefine userBodyParameters
 * @apiParam {Object} body                      Body of request.
 * @apiParam {string} body.bo_user_login        Users login name.
 * @apiParam {string} body.bo_user_access_level User access level.
 * @apiParam {string} body.bo_user_pass         Authentifucation token of user.
 */

const express = require('express'),
    router = express.Router({mergeParams: true}),
    UserApi = require('./api/UserApi'),
    storage = require('./userStaticStorage'),
    userApi = new UserApi(storage);

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
        next();
    } catch (e) {
        res.status(500).send(e);
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
    let attributes = mapAPItoDB(req.body);
    db.User.create(attributes)
        .then(user => {
            res.status(200);
            res.send(JSON.stringify(mapDBtoAPI(user.dataValues)));
        })
        .catch(err => dbErrorParser(err, res, next));
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
        attributes = mapAPItoDB(req.body);

    return db.User.findOne({where: {bo_user_id: id}})
        .then(user => user.updateAttributes(attributes))
        .then(user => {
            res.status(200);
            res.send(JSON.stringify(mapDBtoAPI(user.dataValues)));
        })
        .catch(err => dbErrorParser(err, res, next));
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

    db.User.destroy({where: {bo_user_id: id}})
        .then(() => {
            res.status(200);
            res.send(JSON.stringify({
                message: "OK"
            }));
        }).catch(err => dbErrorParser(err, res, next));
});

module.exports = router;