const sqrt_2_program = ['def', ['sqrt-2'],
    ['comment', "使用牛顿迭代法求根号二"],
    ['def', ['improve', 'guess'],
        ['comment', '迭代，求出更好的猜测值：你可以使用求导得出这个式子，或者使用你的直觉：如果 2/guess 和 guess 不同，则它们的平均数始终是一个更好的值'],
        ['/', ['+', 'guess', ['/', 2, 'guess']], 2]
    ],
    ['def', ['good-enough?', 'guess'],
        ['comment', '猜测值足够好吗？如果它的平方和2的差值足够小'],
        ['<', ['abs', ['-', ['*', 'guess', 'guess'], 2]], 0.0001]
    ],
    ['def', ['sqrt-iter', 'guess'],
        ['comment', '主递归'],
        ['if', ['good-enough?', 'guess'], 'guess', ['sqrt-iter', ['improve', 'guess']]]
    ],
    ['def', ['abs', 'x'],
        ['comment', '求绝对值：这里使用js内置的Math对象'],
        [['.', 'Math', 'abs'], 'x']
    ],
    ['sqrt-iter', 1.0]
];

evaluateExpression(sqrt_2_program, env0);
let r = evaluateExpression(['sqrt-2'], env0);
console.log(r);
