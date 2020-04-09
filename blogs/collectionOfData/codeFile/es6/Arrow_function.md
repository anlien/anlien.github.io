[箭头函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
[深入理解箭头函数](https://hacks.mozilla.org/2015/06/es6-in-depth-arrow-functions/)
[详细语法](http://wiki.ecmascript.org/doku.php?id=harmony:arrow_function_syntax)

箭头函数就是个简写形式的函数表达式，并且它拥有词法作用域的this值（即不会新产生自己作用域下的this, arguments, super 和 new.target 等对象）。此外，箭头函数总是匿名的。

### 语法 
#### 基础语法
```js 
(param1, param2, …, paramN) => { statements }

(param1, param2, …, paramN) => expression
         // equivalent to:  => { return expression; }

// 如果只有一个参数，圆括号是可选的:
(singleParam) => { statements }
singleParam => { statements }

// 无参数的函数需要使用圆括号:
() => { statements }

```

#### 高级语法

```js

// 返回对象字面量时应当用圆括号将其包起来:
params => ({foo: bar})

// 支持 Rest parameters 和 default parameters:
(param1, param2, ...rest) => { statements }
(param1 = defaultValue1, param2, …, paramN = defaultValueN) => { statements }

// Destructuring within the parameter list is also supported
var f = ([a, b] = [1, 2], {x: c} = {x: a + b}) => a + b + c;
f();  // 6

```

### 描述
箭头函数的引入有两个方面的影响：一是更简短的函数书写，二是对 this 的词法解析。

#### 对this的词法解析----不绑定this
在箭头函数出现之前，每个新定义的函数都有其自己的  this 值（例如，构造函数的 this 指向了一个新的对象；严格模式下的函数的 this 值为 undefined；如果函数是作为对象的方法被调用的，则其 this 指向了那个调用它的对象）。在面向对象风格的编程中，这被证明是非常恼人的事情。

示例：
```js
function Person() {
  // 构造函数 Person() 定义的 `this` 就是新实例对象自己
  this.age = 0;
  setInterval(function growUp() {
    // 在非严格模式下，growUp() 函数定义了其内部的 `this`
    // 为全局对象, 不同于构造函数Person()的定义的 `this`
    this.age++; 
  }, 1000);
}

var p = new Person();
```


箭头函数则会捕获其所在上下文的  this 值，作为自己的 this 值，因此下面的代码将如期运行。
```js
	function Person(){
	  this.age = 0;

	  setInterval(() => {
	    this.age++; // |this| 正确地指向了 person 对象
	  }, 1000);
	}

	var p = new Person();
```

#### 使用call或apply调用
由于 this 已经在词法层面完成了绑定，通过 call() 或 apply() 方法调用一个函数时，只是传入了参数而已，对 this 并没有什么影响：
```js
var adder = {
  base : 1,
    
  add : function(a) {
    var f = v => v + this.base;
    return f(a);
  },

  addThruCall: function(a) {
    var f = v => v + this.base;
    var b = {
      base : 2
    };
            
    return f.call(b, a);
  }
};

console.log(adder.add(1));         // 输出 2
console.log(adder.addThruCall(1)); // 仍然输出 2（而不是3 ——译者注）
```

#### 不绑定 arguments
箭头函数不会在其内部暴露出 arguments 对象： arguments.length, arguments[0], arguments[1] 等等，都不会指向箭头函数的 arguments，而是指向了箭头函数所在作用域的一个名为 arguments 的值(如果有的话，否则，就是 undefined)。

```js
var arguments = 42;
var arr = () => arguments;

arr(); // 42

function foo() {
  var f = () => arguments[0]; // foo's implicit arguments binding
  return f(2);
}

foo(1); // 1
```

箭头函数没有自己的 arguments 对象，不过在大多数情形下，rest参数可以给出一个解决方案：

```js

function foo() { 
  var f = (...args) => args[0]; 
  return f(2); 
}

foo(1); // 2

```

#### 像方法一样使用箭头函数
如上所述, 箭头函数表达式  *对 没有方法名的函数*  是最合适的.让我们看看当我们试着把它们作为方法时发生了什么.

```js

'use strict';
var obj = {
  i: 10,
  b: () => console.log(this.i, this),
  c: function() {
    console.log( this.i, this)
  }
}
obj.b(); // prints undefined, Window
obj.c(); // prints 10, Object {...}

```
箭头函数没有定义this绑定。 


#### 使用 new 操作符

箭头函数不能用作构造器，和 new 一起用就会抛出错误。


