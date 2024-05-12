const binaryOperators = new Set();
for (let op in env0) {
    if (env0[op].length === 2) {
        binaryOperators.add(op);
    }
}

function renderCode(coderoot,code) {
    code.forEach((c) => {
        coderoot.appendChild(renderAst(c));
    });
}
function renderAst(ast) {
    if (typeof ast === "string" || typeof ast === "number" || typeof ast === "boolean") {
        return makeElement({
            tag: "span",
            text: ast.toString(),
            classes: ['ast', 'term'],
            data: { "type": typeof ast },
        });
    }
    const classes = ['ast', 'len' + ast.length];
    const divs = ast.map(renderAst);
    if (divs[0]) {
        if (typeof ast[0] === "string") {
            classes.push(ast[0]);
            if (binaryOperators.has(ast[0]))
                classes.push("binaryop");
        }
    }
    return makeElement({ tag: "div", children: divs, classes: classes });
}
function parseFromDom(element) {
    const result = [];
    Array.from(element.children).forEach(child => {
        if (child.tagName === 'DIV') {
            const children = parseFromDom(child);
            result.push(children);
        } else {
            // 获取子节点的data-type属性
            const type = child.dataset.type;
            result.push(parseTyped(child.textContent.trim(), type));
        }
    });
    return result;
}
function parseTyped(v, t) {
    // 将 type 的第一个字母转为大写
    const trans = (t[0].toUpperCase() + t.slice(1));
    return window[trans](v);
}