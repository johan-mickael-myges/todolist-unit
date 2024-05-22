const InvalidListException = require('./InvalidListException');

module.exports = class InvalidListItemException extends InvalidListException {
    constructor(message = 'Invalid list item', item) {
        super(message);
        this.name = 'InvalidListItemException';
        this.item = item;
    }
}