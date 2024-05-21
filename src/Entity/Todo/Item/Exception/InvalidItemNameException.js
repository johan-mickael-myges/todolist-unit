const InvalidItemException = require('./InvalidItemException');

module.exports = class InvalidItemNameException extends InvalidItemException {
    constructor(message = 'Invalid item name') {
        super(message);
        this.name = 'InvalidItemNameException';
    }
}