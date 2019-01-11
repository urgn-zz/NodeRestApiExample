const Model = require('../core/Model');

//Private field access symbols
const _login = Symbol('_login');
const _email = Symbol('_email');
const _password = Symbol('_password');

class User extends Model {

    constructor(collection, {login, email, password}) {
        super(collection);

        this[_login] = login;
        this[_email] = email;
        this[_password] = password;
    }

    get login() {
        return this[_login];
    }

    set login(value) {
        this[_login] = value;
    }

    get email() {
        return this[_email];
    }

    set email(value) {
        this[_email] = value;
    }

    get password() {
        return this[_password];
    }

    set password(value) {
        this[_password] = value;
    }

    toSimpleObject() {
        return {
            id: this.id,
            login: this.login,
            email: this.email,
            password: this.password
        }
    }
}

module.exports = User;