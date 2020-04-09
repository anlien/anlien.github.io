### Object.setPrototypeOf
[参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf)
### 概述
将一个指定的对象的原型设置为另一个对象或者null(既对象的[[Prototype]]内部属性).

### 语法

```js 
	Object.setPrototypeOf(obj, prototype)
```

###　参数：
obj
将被设置原型的对象.

prototype
该对象新的原型(可以是一个对象或者null).


###　描述

如果对象的[[Prototype]]被修改成不可扩展(通过 Object.isExtensible()查看)，就会抛出 TypeError异常。如果prototype参数不是一个对象或者null(例如，数字，字符串，boolean，或者 undefined)，则什么都不做。否则，该方法将obj的[[Prototype]]修改为新的值。


Object.setPrototypeOf()是ECMAScript 6最新草案中的方法，相对于 Object.prototype.__proto__ ，它被认为是修改对象原型更合适的方法。


### Polyfill

```js
//chrome和火狐中有效，IE无效
Object.setPrototypeOf = Object.setPrototypeOf || function (obj, proto) {
  obj.__proto__ = proto;
  return obj; 
}
```
