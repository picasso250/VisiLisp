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
};

// Add Lisp functions
env0['null?'] = (a) => a === null || a === undefined;
env0['atom?'] = (a) => typeof a !== 'object';
env0['list?'] = (a) => Array.isArray(a);

// 带有错误处理的函数
env0['car'] = (a) => {
    if (!Array.isArray(a)) {
        throw new Error('car expects a list as argument');
    }
    if (a.length === 0) {
        throw new Error('car cannot be applied to an empty list');
    }
    return a[0];
};

env0['cdr'] = (a) => {
    if (!Array.isArray(a)) {
        throw new Error('cdr expects a list as argument');
    }
    if (a.length === 0) {
        throw new Error('cdr cannot be applied to an empty list');
    }
    return a.slice(1);
};

env0['cons'] = (a, b) => {
    if (b === null || b === undefined)
        b = [];
    if (!Array.isArray(b)) {
        throw new Error('cons expects a list as second argument');
    }
    return [a, ...b];
};

env0['apply'] = (func, args) => {
    if (typeof func !== 'function') {
        throw new Error('apply expects a function as first argument');
    }
    if (!Array.isArray(args)) {
        throw new Error('apply expects a list of arguments as second argument');
    }
    return func(...args);
};

env0['map'] = (func, list) => {
    if (typeof func !== 'function') {
        throw new Error('map expects a function as first argument');
    }
    if (!Array.isArray(list)) {
        throw new Error('map expects a list as second argument');
    }
    return list.map(func);
};

env0['filter'] = (predicate, list) => {
    if (typeof predicate !== 'function') {
        throw new Error('filter expects a function as first argument');
    }
    if (!Array.isArray(list)) {
        throw new Error('filter expects a list as second argument');
    }
    return list.filter(predicate);
};

env0['reduce'] = (func, list, initialValue) => {
    if (typeof func !== 'function') {
        throw new Error('reduce expects a function as first argument');
    }
    if (!Array.isArray(list)) {
        throw new Error('reduce expects a list as second argument');
    }
    return list.reduce(func, initialValue);
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

// 不定参函数
env0['list'] = (...args) => args;

// 内置对象/函数
env0["eval"] = eval;
env0["Array"] = Array;
env0["Object"] = Object;
env0["String"] = String;
env0["Date"] = Date;
env0["RegExp"] = RegExp;
env0["Function"] = Function;
env0["Number"] = Number;
env0["Boolean"] = Boolean;
env0["Error"] = Error;
env0["Promise"] = Promise;
env0["Math"] = Math;
env0["JSON"] = JSON;
