
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
const atomInput = document.getElementById("atomInput");
const listInput = document.getElementById("listInput");
const appendBtn = document.getElementById('appendButton');
const changeBtn = document.getElementById('modifyButton');
const replaceBtn = document.getElementById('replaceButton');
const suggestionDiv = document.getElementById("suggestionDiv");
const moveUp = document.getElementById('moveUpButton');
const moveDown = document.getElementById('moveDownButton');
const delBtn = document.getElementById('deleteButton');

const inputFocus=() => {
    // 显示备选 div
    suggestionDiv.style.display = "block";
}
const inputBlur=() => {
    // 隐藏备选 div
    setTimeout(function () {
        suggestionDiv.style.display = "none";
    }, 100);
}
atomInput.addEventListener("focus", inputFocus);
atomInput.addEventListener("blur", inputBlur);
listInput.addEventListener("focus", inputFocus);
listInput.addEventListener("blur", inputBlur);

suggestionDiv.addEventListener("click", function (event) {
    console.log("click")
    const target = event.target;
    const text = target.textContent;
    // insert to modalInput
    modalInput.value += text;
    modalInput.focus();
    suggestionDiv.style.display = "none";
});
function codeBlockOnClick(event) {
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
        atomInput.value = target.textContent;

        changeBtn.onclick = function () {
            const v = atomInput.value;
            const t = typeSelect.value;
            target.textContent = parseTyped(v, t);
            target.dataset.type = t;
            hideModal();
        }
    } else {
        showByClass("list_control");
        appendBtn.onclick = function () {
            const forAddContent = listInput.value;
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
        const forChangeContent = listInput.value;
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

    // Event listener for delete button
    delBtn.onclick = function () {
        // 获取当前选中的项
        const selectedItem = target;

        // 删除选中项
        selectedItem.parentNode.removeChild(selectedItem);

        hideModal();
    }
}
coderoot.addEventListener("click", codeBlockOnClick);
// codeShow.addEventListener("click", codeBlockOnClick);

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
function briefAst(ast) {
    if (Array.isArray(ast)) {
        return ast.map(a => Array.isArray(a) ?
            a.map(e => Array.isArray(e) ? '...' : e) :
            a);
    } else {
        return ast;
    }
}