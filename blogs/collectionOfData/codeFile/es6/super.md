[参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/super)

super 关键字用于访问父对象上的函数。

```js
super([arguments]); // 访问父对象上的构造函数
super.functionOnParent([arguments]); // 访问对象上的方法
```

#### 描述
当被用在在构造函数中时，super 关键字被单独使用，且必须用于 this 关键字之前。它也可以被用来访问父对象上的方法。

#### 例子
```js
class Polygon {
  constructor(height, width) {
    this.name = 'Polygon';
    this.height = height;
    this.width = width;
  }
  sayName() {
    console.log('Hi, I am a ', this.name + '.');
  }
}

class Square extends Polygon {
  constructor(length) {
    this.height; // 引用错误, 必须要先调用 super!
    
    // 这里我们调用父类的构造方法并传入 length
    // 作为 Polygon's 的 width 和 height
    super(length, length);
    
    // Note: 在派生的类中, super() 必须在 'this' 之前调用
    // 如果漏掉，则会造成引用错误。
    this.name = 'Square';
  }

  get area() {
    return this.height * this.width;
  }

  set area(value) {
    this.area = value;
  } 
}
```

#### 调用父类上的静态方法
用 super 调用父类的 静态方法。

```js
class Human {
  constructor() {}
  static ping() {
    return 'ping';
  }
}

class Computer extends Human {
  constructor() {}
  static pingpong() {
    return super.ping() + ' pong';
  }
}
Computer.pingpong(); // 'ping pong'

```


#### 在对象字面量中使用 super.prop

```js 
var obj1 = {
  method1() {
    console.log("method 1");
  }
}

var obj2 = {
  method2() {
   super.method1();
  }
}

Object.setPrototypeOf(obj2, obj1);
obj2.method2(); // logs "method 1"
```

