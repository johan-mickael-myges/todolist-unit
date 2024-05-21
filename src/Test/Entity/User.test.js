// Utils
const { faker } = require('@faker-js/faker');

// Entities
const User = require('../../Entity/User/User');

// Exceptions
const InvalidUserEmailException = require('../../Entity/User/Exception/InvalidUserEmailException');
const InvalidUserPasswordException = require('../../Entity/User/Exception/InvalidUserPasswordException');
const InvalidUserFirstnameException = require('../../Entity/User/Exception/InvalidUserFirstnameException');
const InvalidUserLastnameException = require('../../Entity/User/Exception/InvalidUserLastnameException');
const InvalidUserBirthdateException = require('../../Entity/User/Exception/InvalidUserBirthdateException');
const UserTooYoungException = require('../../Entity/User/Exception/UserTooYoungException');

describe('User email validation', () => {
    describe('Invalid email', () => {
        test.each([
            [null],
            [''],
            ['invalid-email'],
            ['missing-at-sign.com'],
            ['missingdot@com'],
            ['@missing-local-part.com'],
            ['missing-domain@.com'],
            ['missing-tld@domain.'],
        ])('Testing [%s]', (email) => {
            let user = new User(email);
            expect(() => user.checkEmail()).toThrow(InvalidUserEmailException);
        });
    });

    describe('Valid email', () => {
        test.each([
            ['valid.email@domain.com'],
        ])('Testing [%s]', (email) => {
            let user = new User(email);
            expect(user.checkEmail()).toBe(true);
        });
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
    describe('Invalid firstname', () => {
        test.each([
            [null],
            [''],
        ])('Testing [%s]', (firstname) => {
            let user = new User(null, null, firstname);
            expect(() => user.checkFirstname()).toThrow(InvalidUserFirstnameException);
        });
    });

    describe('Valid firstname', () => {
        test.each([
            ['Johan'],
            [faker.person.firstName()],
        ])('Testing [%s]', (firstname) => {
            let user = new User(null, null, firstname);
            expect(user.checkFirstname()).toBe(true);
        });
    });
});


describe('User lastname validation', () => {
    describe('Invalid lastname', () => {
        test.each([
            [null],
            [''],
        ])('Testing [%s]', (lastname) => {
            let user = new User(null, null, null, lastname);
            expect(() => user.checkLastname()).toThrow(InvalidUserLastnameException);
        });
    });

    describe('Valid lastname', () => {
        test.each([
            ['Johan'],
            [faker.person.lastName()],
        ])('Testing [%s]', (lastname) => {
            let user = new User(null, null, null, lastname);
            expect(user.checkLastname()).toBe(true);
        });
    });
});

describe('User birthdate validation', () => {
    const now = new Date();

    describe('Invalid birthdate value', () => {
        test.each([
            [''],
            ['invalid-birthdate'],
        ])('Testing [%s]', (birthdate) => {
            let user = new User(null, null, null, null, birthdate);
            expect(() => user.checkBirthdate()).toThrow(InvalidUserBirthdateException);
        });
    });

    describe('Birthdate too small', () => {
        test.each([
            [now.setFullYear(now.getFullYear() - 12)],
        ])('Testing [%s]', (birthdate) => {
            let user = new User(null, null, null, null, birthdate);
            expect(() => user.checkBirthdate()).toThrow(UserTooYoungException);
        });
    });

    describe('Valid birthdate', () => {
        test.each([
            [null],
            [now.setFullYear(now.getFullYear() - 13)],
            [now.setFullYear(now.getFullYear() - 24)],
        ])('Testing [%s]', (birthdate) => {
            let user = new User(null, null, null, null, birthdate);
            expect(user.checkBirthdate()).toBe(true);
        });
    });
});

describe('User entity validation', () => {
    const now = (new Date()).setFullYear(1999);
    describe('Invalid user', () => {
        test.each([
            [new User()],
            [new User('')],
            [new User('m.johan.rkt@gmail.com', 'Johan123', 'Johan','Mickaël', now)],
        ])('Testing %s', (user) => {
            expect(user.isValid()).toBe(false);
        });
    });

    describe('Valid user', () => {
        test.each([
            [new User('m.johan.rkt@gmail.com', 'J0h@n123!', 'Johan','Mickaël', now)],
        ])('Testing %s', (user) => {
            expect(user.isValid()).toBe(true);
        });
    });
});