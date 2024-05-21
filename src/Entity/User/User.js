const IEntity = require('../IEntity');

const InvalidUserException = require('./Exception/InvalidUserException');
const InvalidUserEmailException = require('./Exception/InvalidUserEmailException');
const InvalidUserPasswordException = require('./Exception/InvalidUserPasswordException');
const InvalidUserFirstnameException = require('./Exception/InvalidUserFirstnameException');
const InvalidUserLastnameException = require('./Exception/InvalidUserLastnameException');
const InvalidUserBirthdateException = require('./Exception/InvalidUserBirthdateException');
const UserTooYoungException = require('./Exception/UserTooYoungException');

class User extends IEntity {
    constructor(
        _email = '',
        _password = '',
        _firstname = '',
        _lastname = '',
        _birthdate = ''
    ) {
        super();
        this._email = _email;
        this._password = _password;
        this._firstname = _firstname;
        this._lastname = _lastname;
        this._birthdate = _birthdate;
    }

    MIN_AGE = 13;

    get email() {
        return this._email;
    }

    set email(email) {
        this._email = email;
    }

    get password() {
        return this._password;
    }

    set password(password) {
        this._password = password;
    }

    get firstname() {
        return this._firstname;
    }

    set firstname(firstname) {
        this._firstname = firstname;
    }

    get lastname() {
        return this._lastname;
    }

    set lastname(lastname) {
        this._lastname = lastname;
    }

    get birthdate() {
        return this._birthdate;
    }

    set birthdate(birthdate) {
        this._birthdate = birthdate;
    }

    checkEmail() {
        if (!this._email) {
            throw new InvalidUserEmailException();
        }

        if (!this._email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            throw new InvalidUserEmailException('Invalid email format');
        }

        return true;
    }

    checkPassword() {
        if (!this._password) {
            throw new InvalidUserPasswordException('Password is required');
        }

        if (this._password.length < 8 || this._password.length > 40) {
            throw new InvalidUserPasswordException('Password must be between 8 and 40 characters');
        }

        if (!this._password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
            throw new InvalidUserPasswordException('Password must contain at least one uppercase letter, one lowercase letter, one number and one special character');
        }

        return true;
    }

    checkFirstname() {
        if (!this._firstname) {
            throw new InvalidUserFirstnameException('Firstname is required');
        }

        return true;
    }

    checkLastname() {
        if (!this._lastname) {
            throw new InvalidUserLastnameException('Lastname is required');
        }

        return true;
    }

    checkBirthdate() {
        let birthdate = new Date(this._birthdate);

        if (birthdate.toString() === 'Invalid Date') {
            throw new InvalidUserBirthdateException('Invalid birthdate');
        }

        let now = new Date();
        let diff = now - birthdate;
        let age = Math.floor(diff / 31557600000); // 31557600000 = 1000ms * 60s * 60min * 24h * 365.25d

        if (age < this.MIN_AGE) {
            throw new UserTooYoungException();
        }

        return true;
    }

    isValid() {
        let isValid;

        try {
            isValid = this.checkEmail()
                && this.checkPassword()
                && this.checkFirstname()
                && this.checkLastname()
                && this.checkBirthdate();
        } catch (error) {
            isValid = false;
        }

        return isValid;
    }
}

module.exports = User;