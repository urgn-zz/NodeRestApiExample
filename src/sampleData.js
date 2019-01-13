const storage = require('./userStaticStorage');
const UserModel = require('./models/User');
const faker = require('faker');

for (let i = 0; i < 5; i++) {
    new UserModel(storage, {
        login: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password()
    });
}

