const InvalidListException = require('./InvalidListException');

module.exports = class InvalidListNameException extends InvalidListException {
    constructor(message = 'Invalid list name') {
        super(message);
        this.name = 'InvalidListNameException';
    }
}