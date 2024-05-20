const binaryOperators = new Set();
for (let op in env0) {
    if (env0[op].argsCount === 2) {
        binaryOperators.add(op);
    }
}
binaryOperators.add('.');
binaryOperators.add('of');

function renderCode(coderoot, code) {
    coderoot.innerHTML = "";
    code.forEach((c) => {
        coderoot.appendChild(renderAst(c));
    });
}
function renderAst(ast) {
    if (typeof ast === "string" || typeof ast === "number" || typeof ast === "boolean") {
        return makeElement({
            tag: "span",
            text: ast.toString(),
            classes: ['ast', 'term', typeof ast],
            data: { "type": typeof ast },
        });
    }
    const classes = ['ast', 'len' + ast.length];
    const divs = ast.map(renderAst);
    if (divs[0]) {
        if (typeof ast[0] === "string") {
            if (ast[0] && /^[\w-]+$/.test(ast[0]))
                classes.push(ast[0]);
            else
                classes.push("operator");

            if (binaryOperators.has(ast[0]))
                classes.push("binaryop");
        }
    }
    return makeElement({ tag: "div", children: divs, classes: classes });
}
function parseFromDom(element) {
    if (element.tagName === 'DIV') {
        return Array.from(element.children).map(child => {
            return parseFromDom(child);
        });
    } else {
        // 获取子节点的data-type属性
        const type = element.dataset.type;
        return (parseTyped(element.textContent.trim(), type));
    }
}
function parseTyped(v, t) {
    // 将 type 的第一个字母转为大写
    const trans = (t[0].toUpperCase() + t.slice(1));
    return window[trans](v);
}