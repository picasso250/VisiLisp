function evaluateExpression(expression, environment = {}) {
    if (!Array.isArray(expression)) {
        // Check if it's a variable
        if (typeof expression === 'string') {
            return environment[expression];
        }
        return expression;
    }

    var operator = expression[0];
    var args = expression.slice(1);

    switch (operator) {
        case '+':
            return args.reduce((acc, val) => acc + evaluateExpression(val, environment), 0);
        case '-':
            if (args.length === 1) {
                return -evaluateExpression(args[0], environment);
            } else if (args.length === 2) {
                return evaluateExpression(args[0], environment) - evaluateExpression(args[1], environment);
            } else {
                throw new Error('Subtraction operator expects 1 or 2 arguments');
            }
        case '*':
            return args.reduce((acc, val) => acc * evaluateExpression(val, environment), 1);
        case '/':
            if (args.length === 2) {
                return evaluateExpression(args[0], environment) / evaluateExpression(args[1], environment);
            } else {
                throw new Error('Division operator expects 2 arguments');
            }
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
            return function(...lambdaArgs) {
                const lambdaEnvironment = {...environment};
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
            if (args.length !== 2 || typeof args[0] !== 'string') {
                throw new Error('Define operator expects a variable name and a value');
            }
            environment[args[0]] = evaluateExpression(args[1], environment);
            return environment[args[0]];
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
