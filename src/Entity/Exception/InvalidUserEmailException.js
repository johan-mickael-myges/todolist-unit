const InvalidUserException = require('./InvalidUserException');
module.exports = class InvalidUserEmailException extends InvalidUserException {
    constructor(message = 'Invalid user email') {
        super(message);
        this.name = 'InvalidUserEmailException';
    }
}