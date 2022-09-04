const isValid = require('../../utils/validation');

describe('Email validation', () => {
    const validEmails = [
        'something@something.com',
        'my.something123@something.org',
        'something_123@something.me.net',
    ];

    test.each(validEmails)('should return true for valid email %s', (email) => {
        expect(isValid(email)).toBeTruthy;
    });

    const invalidEmails = [
        'something@something', // missing top level domain
        'something@something.', // missing top level domain
        'something.something.com', // missing @
        'something@', // missing domain
        'something@.com.my', // top level domain cannot start with a dot
        '@something.me.net', // no character before @
        'something@something.b', // .b is not a valid top level domain
        '.something@something.com', // an email cannot start with a dot
        'something()*@something.com', // only letters, numbers, dots, and underscores are allowed
        'something..1234@something.com', // double dots are not allowed
    ];

    test.each(invalidEmails)('should return false for invalid email %s', (email) => {
        expect(isValid(email)).toBeFalsy;
    });
});
