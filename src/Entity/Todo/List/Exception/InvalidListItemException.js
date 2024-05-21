const InvalidItemException = require('./InvalidListException');

module.exports = class InvalidListItemException extends InvalidItemException {
    constructor(message = 'Invalid list item', item) {
        super(message);
        this.name = 'InvalidListItemException';
        this.item = item;
    }
}