[null](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null)
[undefined](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)

### null 概述
值 null 是一个 JavaScript 字面量，表示空值（null or an "empty" value），即没有对象被呈现（no object value is present）。它是 JavaScript 原始值 之一。

### undefined 概述
undefined有多重角色,通常情况下,我们所说的undefined都指的是全局对象的一个属性"undefined".

一个未初始化的变量的值为undefined,一个没有传入实参的形参变量的值为undefined,如果一个函数什么都不返回,则该函数默认返回undefined.

有时必须使用typeof的原因是,如果一个变量根本没有被声明,只有使用typeof判断才不会报错,用相等运算符判断会抛出异常。

### 描述
null 是一个字面量（而不是全局对象的一个属性，undefined 是）。在 APIs 中，null 常被放在期望一个对象，但是不引用任何对象的参数位置。当检测 null 或 undefined 时，注意相等（==）与全等（===）两个操作符的区别 （前者会执行类型转换）。


null 与 undefined 的不同点：
typeof null        // object (bug in ECMAScript, should be null)
typeof undefined   // undefined
null === undefined // false
null  == undefined // true

