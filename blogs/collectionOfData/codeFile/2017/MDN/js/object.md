
[参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Working_with_Objects)

### 枚举一个对象的所有属性
* for...in 循环
	该方法依次访问一个对象及其原型链中所有可枚举的属性。
* Object.keys(o)
	该方法返回一个对象 o 自身包含（不包括原型中）的所有属性的名称的数组。
* Object.getOwnPropertyNames(o)
	该方法返回一个数组，它包含了对象 o 所有拥有的属性（无论是否可枚举）的名称。

