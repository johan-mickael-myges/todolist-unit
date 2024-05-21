class User {

    constructor(
        _email = '',
        _password = '',
        _firstname = '',
        _lastname = '',
        _birthdate = ''
    ) {
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
            return false;
        }

        return !!this._email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    }

    checkPassword() {
        if (!this._password) {
            return false;
        }

        if (this._password.length < 8 || this._password.length > 40) {
            return false;
        }

        return !!this._password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
    }

    checkFirstname() {
        return !!this._firstname;
    }

    checkLastname() {
        return !!this._lastname;
    }

    checkBirthdate() {
        let birthdate = new Date(this._birthdate);
        let now = new Date();
        let diff = now - birthdate;
        let age = Math.floor(diff / 31557600000); // 31557600000 = 1000ms * 60s * 60min * 24h * 365.25d
        return age >= this.MIN_AGE;
    }

    isValid() {
        return this.checkEmail()
            && this.checkPassword()
            && this.checkFirstname()
            && this.checkLastname()
            && this.checkBirthdate();
    }
}

module.exports = User;