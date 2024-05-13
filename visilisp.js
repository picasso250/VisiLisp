function evaluateExpression(expression, environment) {

    if (!Array.isArray(expression)) {
        if (typeof expression === 'string') {
            if (environment.hasOwnProperty(expression)) {
                return environment[expression];
            } else {
                throw new Error('Variable not found: ' + expression);
            }
        }
        return expression;
    }

    let operator = expression[0];
    let args = expression.slice(1);

    function buildLambda(parameters, body) {
        return function (...lambdaArgs) {
            const lambdaEnvironment = { ...environment };
            for (let i = 0; i < parameters.length; i++) {
                lambdaEnvironment[parameters[i]] = lambdaArgs[i];
            }
            return evaluateExpression(body, lambdaEnvironment);
        };
    }

    function doDefine(name, expressions, value) {
        expressions.forEach(expr => evaluateExpression(expr, environment));
        const finalValue = evaluateExpression(value, environment);
        environment[name] = finalValue;
        return finalValue;
    }

    switch (operator) {
        case 'quote':
            if (args.length !== 1) {
                throw new Error('Quote operator expects 1 argument');
            }
            return args[0];
        case 'if':
            const condition = evaluateExpression(args[0], environment);
            const trueBranch = args[1];
            const falseBranch = args[2];
            return evaluateExpression(condition ?
                evaluateExpression(trueBranch, environment) :
                evaluateExpression(falseBranch, environment),
                environment);
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
            const parameters = args[0];
            const body = args[1];
            return buildLambda(parameters, body);
        case 'define':
            if (Array.isArray(args[0])) {
                const funcDef = args[0];
                if (funcDef.length < 1 || typeof funcDef[0] !== 'string') {
                    throw new Error('Function definition expects a function name and one or more arguments');
                }
                const funcName = funcDef[0];
                const parameters = funcDef.slice(1);
                const expressions = args.slice(1, -1);
                const body = args[args.length - 1];
                return doDefine(funcName, expressions, buildLambda(parameters, body));
            } else {
                if (args.length < 2 || typeof args[0] !== 'string') {
                    throw new Error('Define operator expects a variable name and one or more expressions');
                }
                const name = args[0];
                const expressions = args.slice(1, -1);
                const value = args[args.length - 1];
                return doDefine(name, expressions, value);
            }
        default:
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
    let result;
    list.forEach(item => {
        result = evaluateExpression(item, environment);
    });
    return result;
}
