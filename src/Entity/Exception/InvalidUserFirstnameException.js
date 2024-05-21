const InvalidUserException = require('./InvalidUserException');
module.exports = class InvalidUserFirstnameException extends InvalidUserException {
    constructor(message = 'Invalid user firstname') {
        super(message);
        this.name = 'InvalidUserFirstnameException';
    }
}