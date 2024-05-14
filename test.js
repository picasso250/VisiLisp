describe("evaluateExpression", function () {
    it("should add two numbers", function () {
        expect(evaluateExpression(['+', 1, 2], env0)).toEqual(3);
    });

    it("should multiply two numbers", function () {
        expect(evaluateExpression(['*', 2, 3], env0)).toEqual(6);
    });

    it("should divide two numbers", function () {
        expect(evaluateExpression(['/', 10, 2], env0)).toEqual(5);
    });

    it("should subtract two numbers", function () {
        expect(evaluateExpression(['-', 10, 5], env0)).toEqual(5);
    });

    it("should check if two numbers are equal", function () {
        expect(evaluateExpression(['=', 3, 3], env0)).toEqual(true);
        expect(evaluateExpression(['=', 3, 4], env0)).toEqual(false);
    });

    it("should check if first number is less than the second number", function () {
        expect(evaluateExpression(['<', 2, 3], env0)).toEqual(true);
        expect(evaluateExpression(['<', 3, 2], env0)).toEqual(false);
    });

    it("should check if first number is greater than the second number", function () {
        expect(evaluateExpression(['>', 3, 2], env0)).toEqual(true);
        expect(evaluateExpression(['>', 2, 3], env0)).toEqual(false);
    });

    it("should handle quote operator", function () {
        // Test quote operator
        expect(evaluateExpression(['quote', ['x', 'y', 'z']], {})).toEqual(['x', 'y', 'z']);
    });
    
    it("should handle comment", function () {
        expect(evaluateExpression(['comment', 'This is a comment'], {})).toEqual(undefined);
    });
    
    it("should evaluate a lambda function", function () {
        const addOne = evaluateExpression(['lambda', ['x'], ['+', 'x', 1]], env0);
        expect(addOne(5)).toEqual(6);
    });

    it("should evaluate conditional expressions", function () {
        let env = Object.assign({}, env0);
        // def a conditional expression
        evaluateExpression(['def', 'result',
            ['cond',
                [true, 1],
                [false, 2],
                [true, 3]
            ]
        ], env);
    
        // Test the conditional expression
        expect(evaluateExpression('result', env)).toEqual(1);
    });    

    it("should test closure support", function () {
        const makeCounter = evaluateExpression(['lambda', ['x'],
            ['lambda', [],
                ['+', 'x', 1]
            ]
        ], env0);

        const counter1 = makeCounter(3);
        const counter2 = makeCounter(9);

        expect(counter1()).toEqual(4);
        expect(counter2()).toEqual(10);
    });

    it("should def and access variables", function () {
        let env = Object.assign({}, env0);
        // def a variable 'x' with value 5
        evaluateExpression(['def', 'x', 5], env);

        // def a variable 'y' with value 10
        evaluateExpression(['def', 'y', 10], env);

        // Test accessing variable 'x'
        expect(evaluateExpression('x', env)).toEqual(5);

        // Test accessing variable 'y'
        expect(evaluateExpression('y', env)).toEqual(10);
    });

    it("should calculate factorial recursively", function () {
        let env = Object.assign({}, env0);
        // def factorial function recursively
        evaluateExpression(['def', 'fact',
            ['lambda', ['n'],
                ['cond',
                    [['=', 'n', 0], 1],
                    [true, ['*', 'n', ['fact', ['-', 'n', 1]]]]
                ]
            ]
        ], env);

        // Test factorial of 0
        expect(evaluateExpression(['fact', 0], env)).toEqual(1);

        // Test factorial of 1
        expect(evaluateExpression(['fact', 1], env)).toEqual(1);

        // Test factorial of 5
        expect(evaluateExpression(['fact', 5], env)).toEqual(120);
    });

    it("should throw error for Variable not found", function () {
        expect(function () {
            evaluateExpression(['unknown', 1, 2], env0);
        }).toThrowError("Variable not found: unknown");
    });

    it("should throw error if incorrect number of arguments is provided", function () {
        expect(() => evaluateExpression(['+', 1], env0)).toThrowError("+ requires exactly 2 arguments");
        expect(() => evaluateExpression(['-', 5, 3, 2], env0)).toThrowError("- requires exactly 2 arguments");
        expect(() => evaluateExpression(['*', 4], env0)).toThrowError("* requires exactly 2 arguments");
        expect(() => evaluateExpression(['/', 10, 2, 3], env0)).toThrowError("/ requires exactly 2 arguments");
        expect(() => evaluateExpression(['=', 3], env0)).toThrowError("= requires exactly 2 arguments");
        expect(() => evaluateExpression(['<', 2, 3, 4], env0)).toThrowError("< requires exactly 2 arguments");
        expect(() => evaluateExpression(['>', 3], env0)).toThrowError("> requires exactly 2 arguments");
    });

    it("should assign and access variables", function () {
        let env = Object.assign({}, env0);
    
        // Assign a value to variable 'x'
        evaluateExpression([':=', 'x', 5], env);
    
        // Assign a value to variable 'y'
        evaluateExpression([':=', 'y', 10], env);
    
        // Test accessing variable 'x'
        expect(evaluateExpression('x', env)).toEqual(5);
    
        // Test accessing variable 'y'
        expect(evaluateExpression('y', env)).toEqual(10);
    });

});
