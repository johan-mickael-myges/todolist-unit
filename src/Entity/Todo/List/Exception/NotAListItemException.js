const InvalidListException = require('./InvalidListException');

module.exports = class NotAListItemException extends InvalidListException {
    constructor(message = 'Not a list item', item) {
        super(message);
        this.name = 'NotAListItemException';
        this.item = item;
    }
}