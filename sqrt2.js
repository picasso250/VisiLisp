
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

