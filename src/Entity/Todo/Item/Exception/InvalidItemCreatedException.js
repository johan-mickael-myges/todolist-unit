const InvalidItemException = require('./InvalidItemException');

module.exports = class InvalidItemCreatedException extends InvalidItemException {
    constructor(message = 'Invalid item created date') {
        super(message);
        this.name = 'InvalidItemCreatedException';
    }
}