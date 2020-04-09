//网址：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Functions

//作用域和函数堆栈

//递归
//一个函数可以指向并调用自身(call itself)。有三种方法可以达到这个目的：
//1.函数名
//2.arguments.callee
//3.作用域下的一个指向该函数的变量名
//


//调用自身的函数我们称之为递归函数(recursive function)。
//在某种意义上说，递归近似于循环。两者都重复执行相同的代码，并且两者都需要一个终止条件（避免无限循环或者无限递归）。
//例如以下的循环:
var x = 0;
while (x < 10) { // "x < 10" 是循环条件
   // do stuff
   x++;
}

//可以被转化成一个递归函数和对其的调用：
function loop(x) {
  if (x >= 10) // "x >= 10" 是退出条件（等同于 "!(x < 10)"）
    return;
  // 做些什么
  loop(x + 1); // 递归调用
}
loop(0);


//将递归算法转换为非递归算法是可能的，不过逻辑上通常会更加复杂，而且需要使用堆栈。
//事实上，递归函数就使用了堆栈：函数堆栈。
//这种类似堆栈的行为可以在下例中看到：
function foo(i) {
  if (i < 0)
    return;
  console.log('begin:' + i);
  foo(i - 1);
  console.log('end:' + i);
}
foo(3);

// 输出:

// begin:3
// begin:2
// begin:1
// begin:0
// end:0
// end:1
// end:2
// end:3
// 
// 

///###  闭包
//闭包是JavaScript中最强大的特性之一。
//JavaScript允许函数嵌套，并且内部函数可以访问定义在外部函数中的所有变量和函数，以及外部函数能访问的所有变量和函数。
//但是，外部函数却不能够访问定义在内部函数中的变量和函数。
//这给内部函数的变量提供了一定的安全性。
//而且，当内部函数生存周期大于外部函数时，由于内部函数可以访问外部函数的作用域，
//定义在外部函数的变量和函数的生存周期就会大于外部函数本身。
//当内部函数以某一种方式被任何一个外部函数作用域访问时，一个闭包就产生了。
//
//闭包中的神奇变量this是非常诡异的。使用它必须十分的小心，
//因为this指代什么完全取决于函数在何处被调用，而不是在何处被定义
//

```js 
this.x = 9; 
var module = {
  x: 81,
  getX: function() { return this.x; }
};

module.getX(); // 返回 81

var retrieveX = module.getX;
retrieveX(); // 返回 9, 在这种情况下，"this"指向全局作用域

// 创建一个新函数，将"this"绑定到module对象
// 新手可能会被全局的x变量和module里的属性x所迷惑
var boundGetX = retrieveX.bind(module);
boundGetX(); // 返回 81

```
