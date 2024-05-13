const env0 = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
    '=': (a, b) => a === b,
    '<': (a, b) => a < b,
    '>': (a, b) => a > b,
    'abs': function (num) {
        if (num < 0) {
            return -num;
        }
        return num;
    }
};
for (const name in env0) {
    const f = env0[name];
    const length = f.length;
    env0[name] = function (...args) {
        if (arguments.length !== length) {
            throw new Error(`${name} requires exactly ${length} arguments`);
        }
        return f(...args);
    }
}