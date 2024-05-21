const InvalidUserException = require('./InvalidUserException');
module.exports = class InvalidUserLastnameException extends InvalidUserException {
    constructor(message = 'Invalid user lastname') {
        super(message);
        this.name = 'InvalidUserLastnameException.js';
    }
}