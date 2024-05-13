const sqrt_2_program = ['define', ['sqrt-2'],
    ['define', ['improve', 'guess'],
        ['/', ['+', 'guess', ['/', 2, 'guess']], 2]
    ],
    ['define', ['good-enough?', 'guess'],
        ['<', ['abs', ['-', ['*', 'guess', 'guess'], 2]], 0.0001]
    ],
    ['define', ['sqrt-iter', 'guess'],
        ['if', ['good-enough?', 'guess'], 'guess', ['sqrt-iter', ['improve', 'guess']]]
    ],
    ['define', ['abs', 'x'],
        [['.', 'Math', ['quote', 'abs']], 'x']
    ],
    ['sqrt-iter', 1.0]
];

evaluateExpression(sqrt_2_program, env0);
let r = evaluateExpression(['sqrt-2'], env0);
console.log(r);
