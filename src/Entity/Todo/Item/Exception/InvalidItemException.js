module.exports = class InvalidItemException extends Error {
    constructor(message = 'Invalid item') {
        super(message);
        this.name = 'InvalidItemException';
    }
}