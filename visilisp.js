function evaluateExpression(expression) {
    if (!Array.isArray(expression)) {
        return expression;
    }

    var operator = expression[0];
    var args = expression.slice(1);

    switch (operator) {
        case '+':
            return args.reduce((acc, val) => acc + evaluateExpression(val), 0);
        case '-':
            if (args.length === 1) {
                return -evaluateExpression(args[0]);
            } else if (args.length === 2) {
                return evaluateExpression(args[0]) - evaluateExpression(args[1]);
            } else {
                throw new Error('Subtraction operator expects 1 or 2 arguments');
            }
        case '*':
            return args.reduce((acc, val) => acc * evaluateExpression(val), 1);
        case '/':
            if (args.length === 2) {
                return evaluateExpression(args[0]) / evaluateExpression(args[1]);
            } else {
                throw new Error('Division operator expects 2 arguments');
            }
        case 'cond':
            for (let i = 0; i < args.length; i += 2) {
                if (evaluateExpression(args[i])) {
                    return evaluateExpression(args[i + 1]);
                }
            }
            throw new Error('No true condition found in cond expression');
        default:
            throw new Error('Unknown operator: ' + operator);
    }
}

// Test
console.log(evaluateExpression(['+', 1, 2])); // Output: 3
console.log(evaluateExpression(['-', 5])); // Output: -5
console.log(evaluateExpression(['*', 2, 3])); // Output: 6
console.log(evaluateExpression(['/', 10, 2])); // Output: 5
console.log(evaluateExpression(['cond', true, 1, false, 2, true, 3])); // Output: 1
