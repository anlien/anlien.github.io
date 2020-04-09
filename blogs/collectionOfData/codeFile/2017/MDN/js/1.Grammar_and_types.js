//参考：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Grammar_and_types#Variable_scope
//
var a;
// a 的值是 undefined
console.log("The value of a is " + a); 

// Uncaught ReferenceError: b is not defined
console.log("The value of b is " + b); 

// c 的值是 undefined 
console.log("The value of c is " + c); 
var c;

// Uncaught ReferenceError: x is not defined 
console.log("The value of x is " + x); 
let x;


//NaN的生成
数值类型环境中 undefined 值会被转换为 NaN。
var a;
// 计算为 NaN
a + 2;



当你对一个 null 变量求值时，空值 null 在数值类型环境中会被当作0来对待，而布尔类型环境中会被当作 false。
var n = null;
typeof(n);

// "object"
// The Null type has exactly one value, called null.
console.log(n * 32); // 0


变量的作用域
//在所有函数之外声明的变量，叫做全局变量，因为它可被当前文档中的任何其他代码所访问。在函数内部声明的变量，叫做局部变量，因为它只能在该函数内部访问。

//ECMAScript 6 之前的JavaScript没有 语句块 作用域；相反，语句块中声明的变量将成为语句块所在代码段的局部变量。例如，如下的代码将在控制台输出 5，
//因为 x 的作用域是声明了 x 的那个函数（或全局范围），而不是 if 语句块。
if (true) {  var x = 5; }
console.log(x); // 5

//反例
if(false){
  var add = function(){
    console.log("add");  
    return "bb";    
  }  

  var y = 6;
  
  function yy(){   console.log("yy")  }
}
console.log(y);				//undefined
console.log(add);			//undefined
console.log(typeof yy);		//undefined

//如果使用 ECMAScript 6 中的 let 声明，上述行为将发生变化。

if (true) {
  let y = 5;
}
console.log(y); // ReferenceError: y is not defined


在同一作用域中，不能使用与变量名或函数名相同的名字来命名常量。例如：


数据类型：
avaScript语言可以识别下面 7 种不同类型的值：

    六种 原型 数据类型:
        Boolean.  布尔值，true 和 false.
        null. 一个表明 null 值的特殊关键字。 JavaScript 是大小写敏感的，因此 null 与 Null、NULL或其他变量完全不同。
        undefined.  变量未定义时的属性。
        Number.  表示数字，例如： 42 或者 3.14159。
        String.  表示字符串，例如："Howdy"
        Symbol ( 在 ECMAScript 6 中新添加的类型).。一种数据类型，它的实例是唯一且不可改变的。
    以及 Object 对象



Objects 和 functions 是本语言的其他两个基本要素。你可以将对象视为存放值的命名容器，而将函数视为你的应用程序能够执行的过程(procedures)。



在涉及加法运算符(+)的数字和字符串表达式中，JavaScript 会把数字值转换为字符串。
"37" + 7 // "377"

在涉及其它运算符（译注：如下面的减号'-'）时，JavaScript语言不会把数字变为字符串。
"37" - 7 // 30


单目加法运算符
将字符串转换为数字的另一种方法是使用单目加法运算符。
"1.1" + "1.1" = "1.11.1"
(+"1.1") + (+"1.1") = 2.2   // 注：加入括号为清楚起见，不是必需的。



拼接字符串的几种方法：
* `this is a string `

* 输入字符串时，可以使用\\
也可以在换行之前加上反斜线以转义换行（译注：实际上就是一条语句拆成多行书写），这样反斜线和换行都不会出现在字符串的值中。
var str = "this string \
is broken \
across multiple\
lines."
console.log(str);   // this string is broken across multiplelines.


* 可以使用字符模板
// String interpolation
var name = "Bob", time = "today";
`Hello ${name}, how are you ${time}?`
* 可以使用join拼接
