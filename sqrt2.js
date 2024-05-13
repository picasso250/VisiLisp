const sqrt_2_program = ['define', ['sqrt-2'],
    ['comment', '迭代，求出更好的猜测值'],
    ['define', ['improve', 'guess'],
    ['comment', '你可以使用求导得出这个式子，或者使用你的直觉：2/guess 和 guess 如果不同，则它们的平均数始终是一个更好的值'],
    ['/', ['+', 'guess', ['/', 2, 'guess']], 2]
    ],
    ['comment', '猜测值足够好吗？'],
    ['define', ['good-enough?', 'guess'],
        ['comment', '如果它的平方和2的差值足够小'],
        ['<', ['abs', ['-', ['*', 'guess', 'guess'], 2]], 0.0001]
    ],
    ['comment', '主递归'],
    ['define', ['sqrt-iter', 'guess'],
        ['if', ['good-enough?', 'guess'], 'guess', ['sqrt-iter', ['improve', 'guess']]]
    ],
    ['comment', '绝对值'],
    ['define', ['abs', 'x'],
        ['comment', '这里使用js内置的Math对象'],
        [['.', 'Math', ['quote', 'abs']], 'x']
    ],
    ['sqrt-iter', 1.0]
];

evaluateExpression(sqrt_2_program, env0);
let r = evaluateExpression(['sqrt-2'], env0);
console.log(r);
