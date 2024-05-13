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
coderoot.addEventListener("click", function (event) {
    const target = event.target;
    modal.style.display = "block";
    console.log(target)

    if (target.tagName === "SPAN") {
        codeShow.textContent = target.textContent;
        termContrl.style.display = "block";

        const modalInput = document.getElementById("modalInput");
        const modalSubmit = document.getElementById("modalSubmit");
        const typeSelect = document.getElementById("typeSelect");

        typeSelect.value = target.dataset.type;
        modalInput.value = target.textContent;

        modalSubmit.onclick = function () {
            const v = modalInput.value;
            const t = typeSelect.value;
            target.textContent = parseTyped(v, t);
            target.dataset.type = t;
            hideModal();
        }
    } else {
        const targetCode = parseFromDom(target);
        codeShow.innerHTML = '';
        codeShow.appendChild(renderAst(targetCode));
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
    const addBtn = document.getElementById('add');
    addBtn.onclick = function () {
        const forAddContent = document.getElementById("forAdd").value;
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
    const replaceBtn = document.getElementById('replace');
    replaceBtn.onclick = function () {
        const forAddContent = document.getElementById("forAdd").value;
        if (forAddContent === "") {
            target.parentNode.insertBefore(makeElement({ tag: "div", classes: ['ast'] }), target);
        } else {
            const vs = parseInput(forAddContent);
            if (vs.length === 1) {
                target.parentNode.insertBefore(renderAst(vs[0]), target);
            } else {
                target.parentNode.insertBefore(renderAst(vs), target);
            }
        }
        target.parentNode.removeChild(target);
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
    termContrl.style.display = "none";
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