const InvalidListException = require('./InvalidListException');

module.exports = class NotUniqueItemException extends InvalidListException {
    constructor(message = 'The list item is not unique', item) {
        super(message);
        this.name = 'InvalidListNameException';
        this.item = item;
    }
}