const IEntity = require('../IEntity');
class Item extends IEntity {
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
            return false;
        }
        return true;
    }

    checkContent() {
        if (!this._content) {
            return false;
        }

        if (this._content.length > 1000) {
            return false;
        }

        return true;
    }

    checkCreated() {
        if (!this._created) {
            return false;
        }

        const date = new Date(this._created);
        if (date.toString() === 'Invalid Date') {
            return false;
        }

        return true;
    }

    isValid() {
        return this.checkName()
            && this.checkContent()
            && this.checkCreated();
    }
}