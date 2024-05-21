const InvalidUserException = require('./InvalidUserException');
module.exports = class UserTooYoungException extends InvalidUserException {
    constructor(message = 'The user is too young') {
        super(message);
        this.name = 'UserTooYoungException';
    }
}