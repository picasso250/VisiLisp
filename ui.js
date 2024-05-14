const coderoot = document.getElementById('coderoot');
const resultBox = document.getElementById("result");
// 当点击按钮时执行的函数
document.getElementById("runButton").addEventListener("click", function () {
    // 获取代码
    const code = parseFromDom(coderoot);
    console.log(JSON.stringify(code))

    // 对代码进行求值
    let result = evaluateExpressions(code, env0);

    // 显示结果
    resultBox.textContent = result;
});

document.getElementById("exportButton").addEventListener("click", function () {
    const code = parseFromDom(coderoot);
    console.log(JSON.stringify(code, undefined, 2));
    // to clipboard
    let textarea = document.createElement('textarea');
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
    const code = [
        sqrt_2_program,
        ['comment', "运行函数"],
        ['sqrt-2']
    ];
    coderoot.innerHTML = "";
    renderCode(coderoot, code);
    console.log(JSON.stringify(code))
    resultBox.textContent = "现在，点击“运行”按钮"
});
// document.getElementById("exampleButton").click();
