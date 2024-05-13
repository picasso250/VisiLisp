const env0 = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
    '=': (a, b) => a === b,
    '<': (a, b) => a < b,
    '>': (a, b) => a > b,
    '%': (a, b) => a % b, // Modulus operator
    '**': (a, b) => a ** b, // Exponentiation operator
    '&&': (a, b) => a && b, // Logical AND
    '||': (a, b) => a || b, // Logical OR
    '!==': (a, b) => a !== b, // Not equal to
    '<=': (a, b) => a <= b, // Less than or equal to
    '>=': (a, b) => a >= b, // Greater than or equal to
    '!=': (a, b) => a != b, // Not equal to (non-strict)
    '<<': (a, b) => a << b, // Left shift
    '>>': (a, b) => a >> b, // Right shift
    '>>>': (a, b) => a >>> b, // Unsigned right shift
    '&': (a, b) => a & b, // Bitwise AND
    '|': (a, b) => a | b, // Bitwise OR
    '^': (a, b) => a ^ b, // Bitwise XOR
    '~': (a) => ~a, // Bitwise NOT (Unary)
    'typeof': (a) => typeof a, // Typeof operator
    'instanceof': (a, b) => a instanceof b, // Instanceof operator
    'in': (a, b) => a in b, // In operator
    'delete': (a, b) => delete a[b], // Delete operator
    '.': (a, b) => a[b],
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
    env0[name].argsCount = length;
}

env0["Math"] = Math;
