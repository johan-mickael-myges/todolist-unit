// Utils
const { faker } = require('@faker-js/faker');

// Entities
const List = require('../../Entity/Todo/List/List');
const Item = require('../../Entity/Todo/Item/Item');
// Mock
jest.mock('../../Entity/Todo/Item/Item');

// Exceptions
const InvalidListNameException = require('../../Entity/Todo/List/Exception/InvalidListNameException');
const InvalidListItemException = require('../../Entity/Todo/List/Exception/InvalidListItemException');
const NotAListItemException = require('../../Entity/Todo/List/Exception/NotAListItemException');

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

        list.addItem(item1);
        list.addItem(item2);
        list.addItem(item3);
    });

    test('It remove found item', () => {
        list.removeItem(item2);

        expect(list.items).toHaveLength(2);
        expect(list.items).toContain(item1);
        expect(list.items).toContain(item3);
        expect(list.items).not.toContain(item2);
    });

    test('It can clear all items', () => {
        list.clearItems();

        expect(list.items).toHaveLength(0);
    });
});