const InvalidListException = require('./InvalidListException');

module.exports = class TooManyListItems extends InvalidListException {
    constructor(message = 'Too many list items') {
        super(message);
        this.name = 'TooManyListItemsException';
    }
}