const IEntity = require('../../IEntity');
const Item = require('../Item/Item');

const InvalidListNameException = require("../List/Exception/InvalidListNameException");
const InvalidListItemException = require("../List/Exception/InvalidListItemException");
const TooManyListItemsException = require("../List/Exception/TooManyListItemsException");
const NotAListItemException = require("../List/Exception/NotAListItemException");
module.exports = class List extends IEntity {
    constructor(
        name = '',
        items = []
    ) {
        super();
        this._name = name;
        this._items = items;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get items() {
        return this._items;
    }

    set items(value) {
        this._items = value;
    }

    addItem(item) {
        if (!(item instanceof Item)) {
            throw new NotAListItemException('Invalid list item', item);
        }

        if (!item.isValid()) {
            throw new InvalidListItemException('Invalid list item', item);
        }

        this._items.push(item);
    }

    removeItem(item) {
        this._items = this._items.filter(i => i !== item);
    }

    clearItems() {
        this._items = [];
    }

    checkName() {
        if (!this._name || !this._name.trim()) {
            throw new InvalidListNameException();
        }
        return true;
    }

    checkItems() {
        if (this._items.length > 10) {
            throw new TooManyListItemsException();
        }

        this._items.forEach(item => item.isValid());

        return true;
    }

    isValid() {
        let isValid;

        try {
            isValid = this.checkEmail() && this.checkItems();
        } catch (error) {
            isValid = false;
        }

        return isValid;
    }
}