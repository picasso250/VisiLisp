function renderCode(code) {
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
    const divs = ast.map(renderAst);
    if (divs[0])
        divs[0].classList.add("head");
    return makeElement({
        tag: "div",
        children: divs,
        classes: ['ast', ast[0]]
    });
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