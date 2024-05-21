module.exports = class InvalidListException extends Error {
    constructor(message = 'Invalid list') {
        super(message);
        this.name = 'InvalidListException';
    }
}