const IEntity = require('../../IEntity');

const InvalidItemNameException = require('./Exception/InvalidItemNameException');
const InvalidItemContentException = require('./Exception/InvalidItemContentException');
const ItemContentTooLongException = require('./Exception/ItemContentTooLongException');
const InvalidItemCreatedException = require('./Exception/InvalidItemCreatedException');

module.exports = class Item extends IEntity {
    constructor(
        _name = '',
        _content = '',
        _created = new Date(),
    ) {
        super();
        this._name = _name;
        this._content = _content;
        this._created = _created;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    get content() {
        return this._content;
    }

    set content(content) {
        this._content = content;
    }

    get created() {
        return this._created;
    }

    set created(created) {
        this._created = created;
    }

    checkName() {
        if (!this._name) {
            throw new InvalidItemNameException();
        }
        return true;
    }

    checkContent() {
        if (!this._content) {
            throw new InvalidItemContentException();
        }

        if (this._content.length > 1000) {
            throw new ItemContentTooLongException();
        }

        return true;
    }

    checkCreated() {
        if (!this._created) {
            throw new InvalidItemCreatedException();
        }

        const date = new Date(this._created);
        if (date.toString() === 'Invalid Date') {
            throw new InvalidItemCreatedException();
        }

        return true;
    }

    isValid() {
        try {
            this.checkName()
            && this.checkContent()
            && this.checkCreated();
        } catch (e) {
            return false;
        }

        return true;
    }
}