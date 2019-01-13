const storage = require('./userStaticStorage');
const UserModel = require('./models/User');

new UserModel(storage, {
   login: "l",
   email: "mail",
   password: "pwd"
});
