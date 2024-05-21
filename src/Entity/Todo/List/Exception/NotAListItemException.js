const InvalidItemException = require('./InvalidListException');

module.exports = class NotAListItemException extends InvalidItemException {
    constructor(message = 'Not a list item', item) {
        super(message);
        this.name = 'NotAListItemException';
        this.item = item;
    }
}