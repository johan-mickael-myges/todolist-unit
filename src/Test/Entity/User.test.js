// Utils
const { faker } = require('@faker-js/faker');

// Entities
const User = require('../../Entity/User');

// Exceptions
const InvalidUserEmailException = require('../../Entity/Exception/InvalidUserEmailException');
const InvalidUserPasswordException = require('../../Entity/Exception/InvalidUserPasswordException');
const InvalidUserFirstnameException = require('../../Entity/Exception/InvalidUserFirstnameException');
const InvalidUserLastnameException = require('../../Entity/Exception/InvalidUserLastnameException');

describe('User email validation', () => {
    test.each([
        ['invalid-email', false],
        ['missing-at-sign.com', false],
        ['missingdot@com', false],
        ['@missing-local-part.com', false],
        ['missing-domain@.com', false],
        ['missing-tld@domain.', false],
        ['valid.email@domain.com', true],
    ])('%s is %s', (email, expected) => {
        let user = new User();
        user.email = email;

        if (expected) {
            expect(user.checkEmail()).toBe(expected);
            return;
        }

        expect(() => user.checkEmail()).toThrow(InvalidUserEmailException);
    });
});

describe('User password validation', () => {
    test.each([
        ['', false],
        ['invalid-password', false],
        ['Johan123', false],
        ['J0h@1', false],
        ['j0h@n123!', false],
        ['J0H@N123!', false],
        ['J0h@n123!', true],
        ['J0h@n123!J0h@n123!J0h@n123!J0h@n123!J0h@n123!J0h@n123!J0h@n123!', false]
    ])('%s is %s', (password, expected) => {
        let user = new User();
        user.password = password;
        if (expected) {
            expect(user.checkPassword()).toBe(expected);
            return;
        }

        expect(() => user.checkPassword()).toThrow(InvalidUserPasswordException);
    });
});

describe('User firstname validation', () => {
    test.each([
        ['', false],
        [faker.person.firstName(), true],
    ])('%s is %s', (firstname, expected) => {
        let user = new User();
        user.firstname = firstname;
        if (expected) {
            expect(user.checkFirstname()).toBe(expected);
            return;
        }

        expect(() => user.checkFirstname()).toThrow(InvalidUserFirstnameException);
    });
});


describe('User lastname validation', () => {
    test.each([
        ['', false],
        [faker.person.lastName(), true],
    ])('%s is %s', (lastname, expected) => {
        let user = new User();
        user.lastname = lastname;
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
        ['', false],
        ['invalid-birthdate', false],
        [now.setFullYear(now.getFullYear() - 6), false], // 6 yo
        [now.setFullYear(now.getFullYear() - 24), true], // 24 yo
        [now.setFullYear(now.getFullYear() - 13), true], // 13 yo
    ])('%s is %s', (birthdate, expected) => {
        let user = new User();
        user.birthdate = birthdate;
        expect(user.checkBirthdate()).toBe(expected);
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