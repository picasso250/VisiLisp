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

    it("should evaluate a lambda function", function () {
        const addOne = evaluateExpression(['lambda', ['x'], ['+', 'x', 1]], env0);
        expect(addOne(5)).toEqual(6);
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

    it("should define and access variables", function () {
        let env = Object.assign({}, env0);
        // Define a variable 'x' with value 5
        evaluateExpression(['define', 'x', 5], env);

        // Define a variable 'y' with value 10
        evaluateExpression(['define', 'y', 10], env);

        // Test accessing variable 'x'
        expect(evaluateExpression('x', env)).toEqual(5);

        // Test accessing variable 'y'
        expect(evaluateExpression('y', env)).toEqual(10);
    });

    it("should calculate factorial recursively", function () {
        let env = Object.assign({}, env0);
        // Define factorial function recursively
        evaluateExpression(['define', 'fact',
            ['lambda', ['n'],
                ['cond',
                    ['=', 'n', 0], 1,
                    true, ['*', 'n', ['fact', ['-', 'n', 1]]]
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

});
