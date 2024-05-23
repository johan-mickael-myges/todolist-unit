const IEntity = require('../../IEntity');
const Item = require('../Item/Item');

const InvalidListNameException = require("../List/Exception/InvalidListNameException");
const InvalidListItemException = require("../List/Exception/InvalidListItemException");
const TooManyListItemsException = require("../List/Exception/TooManyListItemsException");
const NotAListItemException = require("../List/Exception/NotAListItemException");
const NotUniqueItemException = require("../List/Exception/NotUniqueItemException");

module.exports = class List extends IEntity {
    MAX_ITEM_COUNT = 10;
    MAX_ITEM_CREATED_DIFF_MINUTES = 30;

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

    findItemByName(name) {
        return this.items.find(item => item.name === name);
    }

    addItem(item) {
        if (!(item instanceof Item)) {
            throw new NotAListItemException('Invalid list item', item);
        }

        if (!item.isValid()) {
            throw new InvalidListItemException('Invalid list item', item);
        }

        if (this.findItemByName(item.name)) {
            throw new NotUniqueItemException(item);
        }

        this.items.push(item);
    }

    removeItem(item) {
        this.items = this.items.filter(i => i !== item);
    }

    clearItems() {
        this.items = [];
    }

    checkName() {
        if (!this.name || !this.name.trim()) {
            throw new InvalidListNameException();
        }

        return true;
    }

    checkNoDuplicateItems() {
        for (let i = 0; i < this.items.length; i++) {
            for (let j = i + 1; j < this.items.length; j++) {
                if (this.items[i].name === this.items[j].name) {
                    return false;
                }
            }
        }

        return true;
    }

    checkItems() {
        if (this.items.length > this.MAX_ITEM_COUNT) {
            throw new TooManyListItemsException();
        }

        for (let i= 0; i < this.items.length; i++) {
            if (!this.items[i].isValid()) {
                throw new InvalidListItemException();
            }
        }

        if (!this.checkNoDuplicateItems()) {
            throw new NotUniqueItemException();
        }

        return true;
    }

    isValid() {
        let isValid;

        try {
            isValid = this.checkName() && this.checkItems();
        } catch (error) {
            isValid = false;
        }

        return isValid;
    }
}