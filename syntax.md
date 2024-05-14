# VisiLisp 语法文档

VisiLisp 是一种简化的 Lisp 方言，用于表达和计算表达式。以下是 VisiLisp 的语法说明：

## 表达式

VisiLisp 中的表达式可以是以下任意一种类型：

1. **原子 (Atoms)**: 可以是数字、字符串或变量名。

   - 数字: 例如 `42`, `3.14`, `-5`.
   - 字符串: 用作关键字/变量名，如果想得到字符串，请使用 `quote`.

2. **列表 (Lists)**: 由括号 `()` 包围的元素序列，其中第一个元素通常是操作符，其余元素是参数。

## 操作符

VisiLisp 支持以下操作符：

1. **quote**: 用于返回其参数而不求值。
   - 语法: `(quote expression)`
   - 示例: `(quote (1 2 3))` 返回 `(1 2 3)` 而不求值。

2. **if**: 用于条件判断。
   - 语法: `(if condition true-branch false-branch)`
   - 示例: `(if (> x 0) 'positive 'negative)` 在 `x` 大于 `0` 时返回 `'positive'`，否则返回 `'negative'`.

3. **cond**: 用于多条件判断。
   - 语法: `(cond (condition1 expression1) (condition2 expression2) ...)`
   - 示例: `(cond ((> x 0) 'positive) ((< x 0) 'negative) (else 'zero))` 返回根据 `x` 的值返回 `'positive'`, `'negative'` 或 `'zero'`.

4. **lambda**: 用于创建匿名函数。
   - 语法: `(lambda (parameters) body)`
   - 示例: `(lambda (x y) (+ x y))` 返回一个函数，接受两个参数并返回它们的和。

5. **def**: 用于定义变量或函数。
   - 语法: 
     - `(def variable value)`
     - `(def (function-name parameters) expressions... body)`
   - 示例: 
     - `(def x 5)` 定义变量 `x` 的值为 `5`.
     - `(def (square x) (* x x))` 定义函数 `square`，接受参数 `x`，返回其平方值。

## 函数调用

除了以上列出的操作符外，VisiLisp 还支持调用用户自定义的函数和内置函数。函数调用的语法为：

```
(function-name arg1 arg2 ...)
```

其中 `function-name` 是要调用的函数名，`arg1`, `arg2`, ... 是函数的参数。

## 示例

以下是一些 VisiLisp 表达式的示例：

- `(quote (1 2 3))`
- `(if (> x 0) 'positive 'negative)`
- `(cond ((> x 0) 'positive) ((< x 0) 'negative) (else 'zero))`
- `(lambda (x y) (+ x y))`
- `(def x 5)`
- `(def (square x) (* x x))`
- `(square 4)`

以上是 VisiLisp 的基本语法说明，可以帮助您开始编写和理解 VisiLisp 代码。