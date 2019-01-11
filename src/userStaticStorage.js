const Collection = require("./core/collection");
const UserModel = require("./models/User");

const staticUserCollection = new Collection(UserModel);

module.exports = staticUserCollection;
