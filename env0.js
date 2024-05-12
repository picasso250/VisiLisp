const env0 = {
    '+': function (a, b) {
        if (arguments.length !== 2) {
            throw new Error('Addition operation requires exactly two arguments');
        }
        return a + b;
    },
    '-': function (a, b) {
        if (arguments.length !== 2) {
            throw new Error('Subtraction operation requires exactly two arguments');
        }
        return a - b;
    },
    '*': function (a, b) {
        if (arguments.length !== 2) {
            throw new Error('Multiplication operation requires exactly two arguments');
        }
        return a * b;
    },
    '/': function (a, b) {
        if (arguments.length !== 2) {
            throw new Error('Division operation requires exactly two arguments');
        }
        return a / b;
    },
    '=': function (a, b) {
        if (arguments.length !== 2) {
            throw new Error('Equality comparison requires exactly two arguments');
        }
        return a === b;
    },
    '<': function (a, b) {
        if (arguments.length !== 2) {
            throw new Error('Less than comparison requires exactly two arguments');
        }
        return a < b;
    },
    '>': function (a, b) {
        if (arguments.length !== 2) {
            throw new Error('Greater than comparison requires exactly two arguments');
        }
        return a > b;
    },
    'abs': function (num) {
        if (arguments.length !== 1) {
            throw new Error('Absolute value function requires exactly one argument');
        }
        if (num < 0) {
            return -num;
        }
        return num;
    }
};