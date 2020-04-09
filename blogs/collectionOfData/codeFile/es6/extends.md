[参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes/extends)
extends关键词被用在类声明或者类表达式上，以创建一个类的子类。

extends关键词用来集成一个普通类以及内建对象。
扩展的.prototype必须是一个Object 或者 null。

#### 扩展 null
可以像扩展普通类一样扩展null，但是新对象的原型将不会继承 Object.prototype.
```js 
class nullExtends extends null {
  constructor() {}
}

Object.getPrototypeOf(nullExtends); // Function.prototype
Object.getPrototypeOf(nullExtends.prototype) // null。

```

#### 扩展 null

可以像扩展普通类一样扩展null，但是新对象的原型将不会继承 Object.prototype.

```js

class nullExtends extends null {
  constructor() {}
}

Object.getPrototypeOf(nullExtends); // Function.prototype
Object.getPrototypeOf(nullExtends.prototype) // null

```