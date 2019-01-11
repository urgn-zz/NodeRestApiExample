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
        return this.email;
    }
    
    set email(value) {
        this.email = value;
    }

    get password() {
        return this.password;
    }
    
    set password(value) {
        this.password = value;
    }
}

module.exports = User;