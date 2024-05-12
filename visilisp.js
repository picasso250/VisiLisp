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

function evaluateExpression(expression, environment) {

    if (!Array.isArray(expression)) {
        // Check if it's a variable
        if (typeof expression === 'string') {
            if (environment.hasOwnProperty(expression)) {
                return environment[expression];
            } else {
                throw new Error('Variable not found: ' + expression);
            }
        }
        return expression;
    }

    var operator = expression[0];
    var args = expression.slice(1);

    switch (operator) {
        case 'cond':
            for (let i = 0; i < args.length; i += 2) {
                if (evaluateExpression(args[i], environment)) {
                    return evaluateExpression(args[i + 1], environment);
                }
            }
            throw new Error('No true condition found in cond expression');
        case 'lambda':
            // Create a closure by capturing the current environment
            const parameters = args[0];
            const body = args[1];
            return function (...lambdaArgs) {
                const lambdaEnvironment = { ...environment };
                for (let i = 0; i < parameters.length; i++) {
                    lambdaEnvironment[parameters[i]] = lambdaArgs[i];
                }
                return evaluateExpression(body, lambdaEnvironment);
            };
        case '=':
            if (args.length !== 2) {
                throw new Error('Equality operator expects 2 arguments');
            }
            return evaluateExpression(args[0], environment) === evaluateExpression(args[1], environment);
        case 'define':
            if (args.length < 2 || typeof args[0] !== 'string') {
                throw new Error('Define operator expects a variable name and one or more expressions');
            }
            const name = args[0];
            const expressions = args.slice(1, -1);
            const value = args[args.length - 1];

            // Evaluate each expression in order
            expressions.forEach(expr => evaluateExpression(expr, environment));

            // Evaluate the final value
            const finalValue = evaluateExpression(value, environment);

            environment[name] = finalValue;
            return finalValue;
        default:
            // Check if it's a function call
            const func = evaluateExpression(operator, environment);
            const funcArgs = args.map(arg => evaluateExpression(arg, environment));
            if (typeof func === 'function') {
                return func(...funcArgs);
            } else {
                throw new Error('Unknown operator or function: ' + operator);
            }
    }
}

const sqrt_2_program = ['define', 'sqrt-2',
    ['define', 'improve', ['lambda', ['guess'],
        ['/', ['+', 'guess', ['/', 2, 'guess']], 2]
    ]],
    ['define', 'good-enough?', ['lambda', ['guess'],
        ['<', ['abs', ['-', ['*', 'guess', 'guess'], 2]], 0.0001]
    ]],
    ['define', 'sqrt-iter', ['lambda', ['guess'],
        ['cond', ['good-enough?', 'guess'], 'guess', true, ['sqrt-iter', ['improve', 'guess']]]
    ]],
    ['lambda', [],
        ['sqrt-iter', 1.0]
    ]
];

evaluateExpression(sqrt_2_program, env0);
let r = evaluateExpression(['sqrt-2'], env0);
console.log(r)

