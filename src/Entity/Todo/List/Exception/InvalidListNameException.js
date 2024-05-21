const InvalidItemException = require('./InvalidListException');

module.exports = class InvalidListNameException extends InvalidItemException {
    constructor(message = 'Invalid list name') {
        super(message);
        this.name = 'InvalidListNameException';
    }
}