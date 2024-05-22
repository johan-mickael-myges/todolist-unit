// Utils
const {faker} = require('@faker-js/faker');

// Entities
const List = require('../../Entity/Todo/List/List');
const Item = require('../../Entity/Todo/Item/Item');

// Mock
jest.mock('../../Entity/Todo/Item/Item');

// Exceptions
const InvalidListNameException = require('../../Entity/Todo/List/Exception/InvalidListNameException');
const InvalidListItemException = require('../../Entity/Todo/List/Exception/InvalidListItemException');
const NotAListItemException = require('../../Entity/Todo/List/Exception/NotAListItemException');
const NotUniqueItemException = require('../../Entity/Todo/List/Exception/NotUniqueItemException');
const TooManyListItemsException = require("../../Entity/Todo/List/Exception/TooManyListItemsException");

describe('List name validation', () => {
    describe('Invalid list name', () => {
        test.each([
            [null],
            [''],
            [' '],
        ])('Testing [%s]', (name) => {
            const list = new List(name);
            expect(() => list.checkName()).toThrow(InvalidListNameException);
        });
    });

    test('Valid list name', () => {
        const list = new List(faker.lorem.word());
        expect(list.name).toBe(list.name);
    });
});

describe('Unique list items', () => {
    let list, item1, item2;
    beforeEach(() => {
        list = new List();
        item1 = new Item();
        item2 = new Item();

        item1.name = 'work';
        item2.name = 'sleep';
        item1.isValid.mockReturnValue(true);
        item2.isValid.mockReturnValue(true);

        list.addItem(item1);
        list.addItem(item2);
    });

    test('It checks if items are unique', () => {
        expect(list.checkNoDuplicateItems()).toBe(true);
    });

    test('It throws an exception if items are not unique', () => {
        item2.name = 'work';
        expect(list.checkNoDuplicateItems()).toBe(false);
    });
});

describe('Adding list items', () => {
    let list;
    beforeEach(() => {
        list = new List();
    });

    test('It adds an item when valid', () => {
        const item = new Item();

        item.isValid.mockReturnValue(true);
        list.addItem(item);

        expect(item.isValid).toBeCalledTimes(1);
        expect(list.items).toHaveLength(1);
        expect(list.items).toContain(item);
    });

    describe('It does not add item when invalid', () => {
        test.each([
            [null],
            [''],
        ])('Item instance is invalid: [%s]', (item) => {
            expect(() => list.addItem(item)).toThrow(NotAListItemException);
            expect(list.items).toHaveLength(0);
        });

        test('Item value is invalid', () => {
            const item = new Item();

            item.isValid.mockReturnValue(false);
            expect(() => list.addItem(item)).toThrow(InvalidListItemException);
            expect(item.isValid).toBeCalledTimes(1);
            expect(list.items).toHaveLength(0);
        });

        test('Item is not unique', () => {
            const item = new Item();
            item.isValid.mockReturnValue(true);
            list.addItem(item);
            expect(() => list.addItem(item)).toThrow(NotUniqueItemException);
            expect(list.items).toHaveLength(1);
        });
    });
});

describe('Removing list items', () => {
    let list, item1, item2, item3;
    beforeEach(() => {
        list = new List();
        item1 = new Item();
        item2 = new Item();
        item3 = new Item();

        item1.isValid.mockReturnValue(true);
        item2.isValid.mockReturnValue(true);
        item3.isValid.mockReturnValue(true);

        list.items = [item1, item2, item3];
    });

    test('It removes found item', () => {
        list.removeItem(item2);

        expect(list.items).toHaveLength(2);
        expect(list.items).toContain(item1);
        expect(list.items).toContain(item3);
        expect(list.items).not.toContain(item2);
    });

    test('It not removes not found item', () => {
        const item4 = new Item();
        list.removeItem(item4);

        expect(list.items).toHaveLength(3);
        expect(list.items).not.toContain(item4);
    });

    test('It can clear all items', () => {
        list.clearItems();

        expect(list.items).toHaveLength(0);
    });
});

describe('List items validation', () => {
    let list, items;
    beforeEach(() => {
        list = new List();
        items = [];
        for (let i = 0; i < list.MAX_ITEM_COUNT - 1; i++) {
            let item = new Item();
            item.name = `Item ${i}`;
            item.isValid.mockReturnValue(true);
            items.push(item);
        }
    });

    test('It can check on number of items', () => {
        // Add 2 more items
        for (let i = 0; i < 2; i++) {
            let item = new Item();
            item.name = `Additional Item ${i}`;
            item.isValid.mockReturnValue(true);
            items.push(item);
        }
        list.items = items;

        expect(list.items).toHaveLength(list.MAX_ITEM_COUNT + 1);
        expect(() => list.checkItems()).toThrow(TooManyListItemsException);
    });

    test('It can check if all items are valid', () => {
        list.items = items;

        expect(list.checkItems()).toBe(true);

        list.items.map((item) => {
            expect(item.isValid).toBeCalledTimes(1);
        });
    });

    test('It can check if some items are invalid', () => {
        let invalidItem = new Item();
        invalidItem.name = 'Invalid item';
        invalidItem.isValid.mockReturnValue(false);
        items.push(invalidItem);
        list.items = items;

        expect(() => list.checkItems()).toThrow(InvalidListItemException);

        list.items.map((item) => {
            expect(item.isValid).toBeCalledTimes(1);
        });
    });

    test('It can check if items are unique', () => {
        // Ensure the list is empty
        list.items = [];

        // Add 1 item
        let item = new Item();
        item.name = `first item`;
        item.isValid.mockReturnValue(true);
        list.addItem(item);

        expect(() => list.checkItems()).not.toThrow(NotUniqueItemException);

        // Add 2 items with the same name
        for (let i = 0; i < 2; i++) {
            let item = new Item();
            item.name = `something`;
            item.isValid.mockReturnValue(true);
            list.items.push(item);
        }

        expect(() => list.checkItems()).toThrow(NotUniqueItemException);
    });
});

describe('List validation', () => {
    let list = new List('My list');
    let item1, item2;
    beforeEach(() => {
        item1 = new Item();
        item1.name = 'Work';
        item1.isValid.mockReturnValue(true);

        item2 = new Item();
        item2.name = 'Sleep';
        item2.isValid.mockReturnValue(true);
    });

    test('It returns true if list is valid', () => {
        expect(list.isValid()).toBe(true);
    });

    test('It returns false if list name is invalid', () => {
        list.name = '';
        expect(list.isValid()).toBe(false);
    });

    test('It returns false if list items are invalid', () => {
        item1.isValid.mockReturnValue(false);
        expect(list.isValid()).toBe(false);
    });
});