const Collection = require("./store/Collection");
const UserModel = require("./models/User");

const staticUserCollection = new Collection(UserModel);

module.exports = staticUserCollection;
