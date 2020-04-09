[参考文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes/constructor)

constructor 是和 class 一起用来创建和初始化对象的特殊方法。

在构造方法中可以使用 super 关键字来调用父类的构造方法。
如果没有显式指定构造方法，则会添加默认的constructor方法。

#### 默认构造方法

如果没有显式定义，会默认添加一个空的constructor方法。对于基类"Base classes"，默认构造方法如下:
```js 
constructor() {}
```

对于派生类"Derived classes" ，默认构造方法如下:
```js
constructor(...args) {
  super(...args);
}
```