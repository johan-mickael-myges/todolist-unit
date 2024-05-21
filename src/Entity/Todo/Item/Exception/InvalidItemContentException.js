const InvalidItemException = require('./InvalidItemException');

module.exports = class InvalidItemContentException extends InvalidItemException {
    constructor(message = 'Invalid item content') {
        super(message);
        this.name = 'InvalidItemContentException';
    }
}