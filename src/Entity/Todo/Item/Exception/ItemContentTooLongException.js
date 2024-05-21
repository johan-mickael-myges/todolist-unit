const InvalidItemException = require('./InvalidItemException');

module.exports = class ItemContentTooLongException extends InvalidItemException {
    constructor(message = 'Item content too long') {
        super(message);
        this.name = 'ItemContentTooLongException';
    }
}