const coderoot = document.getElementById('coderoot');

// 当点击按钮时执行的函数
document.getElementById("runButton").addEventListener("click", function () {
    // 获取代码
    const code = parseFromDom(coderoot);
    console.log(JSON.stringify(code))

    // 对代码进行求值
    var result = evaluateExpressions(code, env0);

    // 显示结果
    document.getElementById("result").textContent = result;
});

// Modal functionality
const modal = document.getElementById("myModal");
const termContrl = document.querySelector(".term_control");
// When the user clicks on <span> (x), close the modal
const spanClose = document.getElementsByClassName("close")[0];
spanClose.onclick = function () {
    hideModal();
}
const codeShow = document.getElementById('codeShow');
const codeSource = document.getElementById('codeSource');
const addBtn = document.getElementById('add');
const modalInput = document.getElementById("modalInput");
const changeBtn = document.getElementById('change');
const replaceBtn = document.getElementById('replace');
const suggestionDiv = document.getElementById("suggestionDiv");

modalInput.addEventListener("focus", () => {
    // 显示备选 div
    suggestionDiv.style.display = "block";
});

modalInput.addEventListener("blur", () => {
    // 隐藏备选 div
    setTimeout(function () {
        suggestionDiv.style.display = "none";
    }, 100);
});

suggestionDiv.addEventListener("click", function (event) {
    console.log("click")
    const target = event.target;
    const text = target.textContent;
    // insert to modalInput
    modalInput.value += text;
    modalInput.focus();
    suggestionDiv.style.display = "none";
});

coderoot.addEventListener("click", function (event) {
    const target = event.target;
    if (target === coderoot) {
        replaceBtn.style.display = "none";
    }
    modal.style.display = "block";
    console.log(target)

    if (target.tagName === "SPAN") {
        showByClass("term_control");
        codeShow.textContent = target.textContent;
        codeSource.textContent = target.textContent;

        const typeSelect = document.getElementById("typeSelect");
        typeSelect.value = target.dataset.type;
        modalInput.value = target.textContent;

        changeBtn.onclick = function () {
            const v = modalInput.value;
            const t = typeSelect.value;
            target.textContent = parseTyped(v, t);
            target.dataset.type = t;
            hideModal();
        }
    } else {
        showByClass("list_control");
        addBtn.onclick = function () {
            const forAddContent = modalInput.value;
            if (forAddContent === "") {
                target.appendChild(makeElement({ tag: "div", classes: ['ast'] }))
            } else {
                const vs = parseInput(forAddContent);
                if (vs.length === 1) {
                    target.appendChild(renderAst(vs[0]));
                } else {
                    target.appendChild(renderAst(vs));
                }
            }
            hideModal();
        }

        const targetCode = parseFromDom(target);
        codeShow.innerHTML = '';
        codeShow.appendChild(renderAst(briefAst(targetCode)));
        codeSource.textContent = JSON.stringify(targetCode);
    }
    replaceBtn.onclick = function () {
        const forChangeContent = modalInput.value;
        if (forChangeContent === "") {
            target.parentNode.insertBefore(makeElement({ tag: "div", classes: ['ast'] }), target);
        } else {
            const vs = parseInput(forChangeContent);
            if (vs.length === 1) {
                target.parentNode.insertBefore(renderAst(vs[0]), target);
            } else {
                target.parentNode.insertBefore(renderAst(vs), target);
            }
        }
        target.parentNode.removeChild(target);
        hideModal();
    }
    const moveUp = document.getElementById('moveUp');
    const moveDown = document.getElementById('moveDown');
    moveUp.onclick = function () {
        // 获取当前选中的项
        const selectedItem = target;

        // 获取选中项的前一个兄弟元素
        const prevSibling = selectedItem.previousElementSibling;
        if (!prevSibling) return; // 如果没有前一个兄弟元素，直接返回

        // 将选中项移动到前一个兄弟元素的前面
        selectedItem.parentNode.insertBefore(selectedItem, prevSibling);

        hideModal();
    }

    // Event listener for moveDown button
    moveDown.onclick = function () {
        // 获取当前选中的项
        const selectedItem = target;

        // 获取选中项的后一个兄弟元素
        const nextSibling = selectedItem.nextElementSibling;
        if (!nextSibling) return; // 如果没有后一个兄弟元素，直接返回

        // 将选中项移动到后一个兄弟元素的后面
        selectedItem.parentNode.insertBefore(nextSibling, selectedItem);

        hideModal();
    }

    const delBtn = document.getElementById('delete');
    // Event listener for delete button
    delBtn.onclick = function () {
        // 获取当前选中的项
        const selectedItem = target;

        // 删除选中项
        selectedItem.parentNode.removeChild(selectedItem);

        hideModal();
    }


});
// 函数：将字符串转换为数字、true、false 或保持原样
function parseInput(input) {
    return input.split(/\s+/).map(item => {
        if (item === "true") {
            return true;
        } else if (item === "false") {
            return false;
        } else {
            const num = parseFloat(item);
            return isNaN(num) ? item : num;
        }
    });
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        hideModal();
    }
}
function hideModal() {
    modal.style.display = "none";
    hideByClass("term_control");
    hideByClass("list_control");
    replaceBtn.style.display = "";
}
function hideByClass(cls) {
    Array
        .from(document.getElementsByClassName(cls))
        .forEach(element => element.style.display = "none");
}
function showByClass(cls) {
    Array
        .from(document.getElementsByClassName(cls))
        .forEach(element => element.style.display = "block");
}
document.getElementById("exportButton").addEventListener("click", function () {
    const code = parseFromDom(coderoot);
    console.log(JSON.stringify(code, undefined, 2));
    // to clipboard
    var textarea = document.createElement('textarea');
    textarea.value = JSON.stringify(code);
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
});
document.getElementById("saveButton").addEventListener("click", function () {
    const code = parseFromDom(coderoot);
    localStorage.setItem("code", JSON.stringify(code));
});
document.getElementById("loadButton").addEventListener("click", function () {
    try {
        const code = JSON.parse(localStorage.getItem("code"));
        coderoot.innerHTML = "";
        renderCode(coderoot, code);
    } catch (e) {
        console.error("Failed to load from local storage");
    }
});
document.getElementById("exampleButton").addEventListener("click", function () {
    const code = [sqrt_2_program, ['sqrt-2']];
    coderoot.innerHTML = "";
    renderCode(coderoot, code);
    console.log(JSON.stringify(code))
});
function briefAst(ast) {
    if (Array.isArray(ast)) {
        return ast.map(e => Array.isArray(e) ? '...' : e);
    } else {
        return ast;
    }
}