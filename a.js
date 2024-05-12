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
        default:
            throw new Error('Unknown operator: ' + operator);
    }
}

// Test
console.log(evaluateExpression(['+', 1, 2])); // 输出 3
console.log(evaluateExpression(['-', 5])); // 输出 -5
console.log(evaluateExpression(['*', 2, 3])); // 输出 6
console.log(evaluateExpression(['/', 10, 2])); // 输出 5
