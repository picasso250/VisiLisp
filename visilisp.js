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
            for (let i = 0; i < args.length; i++) {
                const condition = args[i][0];
                const expression = args[i][1];
                if (evaluateExpression(condition, environment)) {
                    return evaluateExpression(expression, environment);
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
        case 'quote':
            if (args.length !== 1) {
                throw new Error('Quote operator expects 1 argument');
            }
            return args[0]; // Simply return the operand without evaluation
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

function evaluateExpressions(list, environment) {
    var result;
    list.forEach(item => {
        result = evaluateExpression(item, environment);
    });
    return result;
}
