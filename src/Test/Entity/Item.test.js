// Utils
const { faker } = require('@faker-js/faker');

// Entities
const Item = require('../../Entity/Todo/Item/Item');

// Exceptions
const InvalidItemNameException = require('../../Entity/Todo/Item/Exception/InvalidItemNameException');
const InvalidItemContentException = require('../../Entity/Todo/Item/Exception/InvalidItemContentException');
const InvalidItemCreatedException = require('../../Entity/Todo/Item/Exception/InvalidItemCreatedException');
const ItemContentTooLongException = require('../../Entity/Todo/Item/Exception/ItemContentTooLongException');

describe('Item name validation', () => {
    describe('Invalid name', () => {
        test.each([
            [null],
            [''],
            [' '],
        ])('Testing [%s]', (name) => {
            let item = new Item(name);
            expect(() => item.checkName()).toThrow(InvalidItemNameException);
        });
    });

    describe('Valid name', () => {
        test.each([
            ['valid name'],
            [faker.word.noun()],
        ])('Testing [%s]', (name) => {
            let item = new Item(name);
            expect(item.checkName()).toBe(true);
        });
    });
});

describe('Item content validation', () => {
    describe('Invalid content', () => {
        test.each([
            [null],
            [''],
            [' '],
        ])('Testing [%s]', (content) => {
            let item = new Item(null, content);
            expect(() => item.checkContent()).toThrow(InvalidItemContentException);
        });

        test('Testing content too long', () => {
            let item = new Item(null, faker.word.words(500));
            expect(() => item.checkContent()).toThrow(ItemContentTooLongException);
        });
    });

    describe('Valid content', () => {
        test.each([
            ['valid content'],
            [faker.word.words(5)],
        ])('Testing [%s]', (content) => {
            let item = new Item(null, content);
            expect(item.checkContent()).toBe(true);
        });
    });
});

describe('Item created validation', () => {
    describe('Invalid created', () => {
        test.each([
            [null],
            [''],
            [faker.word.words(5)],
        ])('Testing [%s]', (created) => {
            let item = new Item(null, null, created);
            expect(() => item.checkCreated()).toThrow(InvalidItemCreatedException);
        });
    });

    describe('Valid created', () => {
        test('Testing valid created', () => {
            let item = new Item(null, null, new Date());
            expect(item.checkCreated()).toBe(true);
        });
    });
});

describe('Item entity validation', () => {
    describe('Invalid Item', () => {
        test.each([
            [new Item()],
            [new Item(null, null, null)],
            [new Item(null, null, new Date())],
            [new Item('', '', '')],
        ])(`Testing [%s]`, (item) => {
            expect(item.isValid()).toBe(false);
        });
    });

    describe('Valid Item', () => {
        test('Testing valid Item entity', () => {
            let item = new Item('valid name', 'valid content', new Date());
            expect(item.isValid()).toBe(true);
        });
    });
});