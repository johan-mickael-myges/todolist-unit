const InvalidUserException = require('./InvalidUserException');
module.exports = class InvalidUserBirthdateException extends InvalidUserException {
    constructor(message = 'Invalid user birthdate') {
        super(message);
        this.name = 'InvalidUserBirthdateException.js';
    }
}