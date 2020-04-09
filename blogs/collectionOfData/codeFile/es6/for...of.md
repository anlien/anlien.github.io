[参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Loops_and_iteration)
[参考 for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)
[参考 for...of 中文](https://developer.mozilla.org/zh-CN//docs/Web/JavaScript/Reference/Statements/for...of)

for...of语句在可迭代的对象上创建了一个循环(包括Array, Map, Set, 参数对象（ arguments） 等等)，对值的每一个独特的属性调用一个将被执行的自定义的和语句挂钩的迭代。

```js

for (variable of object) {
  statement
}

```

下面的这个例子展示了 for...of 和 for...in 两种循环语句之间的区别。与 for...in 循环遍历的结果是数组元素的下标不同的是， for...of 遍历的结果是元素的值：


```js 

let arr = [3, 5, 7];
arr.foo = "hello";

for (let i in arr) {
   console.log(i); // logs "0", "1", "2", "foo"
}

for (let i of arr) {
   console.log(i); // logs "3", "5", "7" // 注意这里没有 hello
}

```