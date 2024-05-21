// Utils
const { faker } = require('@faker-js/faker');

// Entities
const User = require('../../Entity/User');

// Exceptions
const InvalidUserEmailException = require('../../Entity/Exception/InvalidUserEmailException');
const InvalidUserPasswordException = require('../../Entity/Exception/InvalidUserPasswordException');
const InvalidUserFirstnameException = require('../../Entity/Exception/InvalidUserFirstnameException');
const InvalidUserLastnameException = require('../../Entity/Exception/InvalidUserLastnameException');
const InvalidUserBirthdateException = require('../../Entity/Exception/InvalidUserBirthdateException');
const UserTooYoungException = require('../../Entity/Exception/UserTooYoungException');

describe('User email validation', () => {
    test.each([
        [null, false],
        ['', false],
        ['invalid-email', false],
        ['missing-at-sign.com', false],
        ['missingdot@com', false],
        ['@missing-local-part.com', false],
        ['missing-domain@.com', false],
        ['missing-tld@domain.', false],
        ['valid.email@domain.com', true],
    ])('%s is %s', (email, expected) => {
        let user = new User(email);

        if (expected) {
            expect(user.checkEmail()).toBe(expected);
            return;
        }

        expect(() => user.checkEmail()).toThrow(InvalidUserEmailException);
    });
});

describe('User password validation', () => {
    test.each([
        [null, false],
        ['', false],
        ['invalid-password', false],
        ['Johan123', false],
        ['J0h@1', false],
        ['j0h@n123!', false],
        ['J0H@N123!', false],
        ['J0h@n123!', true],
        ['J0h@n123!J0h@n123!J0h@n123!J0h@n123!J0h@n123!J0h@n123!J0h@n123!', false]
    ])('%s is %s', (password, expected) => {
        let user = new User(null, password);

        if (expected) {
            expect(user.checkPassword()).toBe(expected);
            return;
        }

        expect(() => user.checkPassword()).toThrow(InvalidUserPasswordException);
    });
});

describe('User firstname validation', () => {
    test.each([
        [null, false],
        ['', false],
        [faker.person.firstName(), true],
    ])('%s is %s', (firstname, expected) => {
        let user = new User(null, null, firstname);

        if (expected) {
            expect(user.checkFirstname()).toBe(expected);
            return;
        }

        expect(() => user.checkFirstname()).toThrow(InvalidUserFirstnameException);
    });
});


describe('User lastname validation', () => {
    test.each([
        [null, false],
        ['', false],
        [faker.person.lastName(), true],
    ])('%s is %s', (lastname, expected) => {
        let user = new User(null, null, null, lastname);
        if (expected) {
            expect(user.checkLastname()).toBe(expected);
            return;
        }

        expect(() => user.checkLastname()).toThrow(InvalidUserLastnameException);
    });
});

describe('User birthdate validation', () => {
    const now = new Date();
    test.each([
        ['', false, InvalidUserBirthdateException],
        ['invalid-birthdate', false, InvalidUserBirthdateException],
        [now.setFullYear(now.getFullYear() - 6), false, UserTooYoungException], // 6 yo
        [now.setFullYear(now.getFullYear() - 24), true, null], // 24 yo
        [now.setFullYear(now.getFullYear() - 13), true, null], // 13 yo
    ])('%s is %s', (birthdate, expected, exception) => {
        let user = new User(null, null, null, null, birthdate);

        if (expected) {
            expect(user.checkBirthdate()).toBe(expected);
            return;
        }

        expect(() => user.checkBirthdate()).toThrow(exception);
    });
});

describe('User entity validation', () => {
    const now = (new Date()).setFullYear(1999);
    test.each([
        [new User(), false],
        [new User(''), false],
        [new User('m.johan.rkt@gmail.com', 'Johan123', 'Johan','Mickaël', now), false],
        [new User('m.johan.rkt@gmail.com', 'J0h@n123!', 'Johan','Mickaël', now), true]
    ])('%s is %s', (user, expected) => {
        expect(user.isValid()).toBe(expected);
    });
});