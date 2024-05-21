const { faker } = require('@faker-js/faker');

const User = require('../../Entity/User');

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
        expect(user.checkEmail()).toBe(expected);
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
        expect(user.checkPassword()).toBe(expected);
    });
});

describe('User firstname validation', () => {
    test.each([
        ['', false],
        [faker.person.firstName(), true],
    ])('%s is %s', (firstname, expected) => {
        let user = new User();
        user.firstname = firstname;
        expect(user.checkFirstname()).toBe(expected);
    });
});


describe('User lastname validation', () => {
    test.each([
        ['', false],
        [faker.person.lastName(), true],
    ])('%s is %s', (lastname, expected) => {
        let user = new User();
        user.lastname = lastname;
        expect(user.checkLastname()).toBe(expected);
    });
});

describe('User birthdate validation', () => {
    test.each([
        ['', false],
        ['invalid-birthdate', false],
        [(new Date()).setFullYear(2015), false], // 6 yo
        [(new Date()).setFullYear(2000), true], // 24 yo
        [(new Date()).setFullYear(2006), true], // 13 yo
    ])('%s is %s', (birthdate, expected) => {
        let user = new User();
        user.birthdate = birthdate;
        expect(user.checkBirthdate()).toBe(expected);
    });
});

describe('User entity validation', () => {
    test.each([
        [new User(), false],
        [new User(''), false],
        [new User('m.johan.rkt@gmail.com', 'Johan123', 'Johan','Mickaël', (new Date()).setFullYear(1999)), false],
        [new User('m.johan.rkt@gmail.com', 'J0h@n123!', 'Johan','Mickaël', (new Date()).setFullYear(1999)), true]
    ])('%s is %s', (user, expected) => {
        expect(user.isValid()).toBe(expected);
    });
});