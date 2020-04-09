[class 参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes)
[class 例子](https://googlechrome.github.io/samples/classes-es6/index.html)
[es6-in-depth-classes](https://hacks.mozilla.org/2015/07/es6-in-depth-classes/)

在 ECMAScript 6 引入的 JavaScript 类（class）是 JavaScript 现有的原型继承的语法糖。 类并不是 JavaScript 里加入的新的面向对象的继承模型。JavaScript 中的类只是能让我们用更简洁明了的语法创建对象及处理相关的继承。

### 定义类
类实际上是个“特殊的函数”，而且正如函数的定义方式有函数声明和函数表达式两种一样，类的定义方式也有两种，分别是：类声明和类表达式。


#### 类声明 
[参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/class)
和class表达式一样，class声明体在严格模式(strict mode)下运行。构造函数（constructor）是可选的。
Class声明不可以提升(这点和函数声明不一样)。


#### 类表达式 
[参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/class)
类表达式是用来定义类的一种语法。和函数表达式相同的一点是，类表达式可以是命名也可以是匿名的。如果是命名类表达式，这个名字只能在类体内部才能访问到。JavaScript 的类也是基于原型继承的。

语法：
```js 
var MyClass = class [className] [extends] {
  // class body
};

```
类表达式的语法和类语句的语法很类似，只是在类表达式中，你可以省略掉类名，而类语句中不能。
和类语句一样，类表达式中的代码也是强制严格模式的。

如果你想在类体内部也能引用这个类本身，那么你就可以使用命名类表达式，并且这个类名只能在类体内部访问。
```js
// TBD
var Foo = class NamedFoo { }
```

注意：类表达式和类声明一样也不会有提升的现象.


#### class 例子中的代码
[class 例子](https://googlechrome.github.io/samples/classes-es6/index.html)


注意：Classes support extending other classes, but can also extend other objects. Whatever you extend must be a constructor.
注意：此处说的不全对，在使用 extends 创建子类中，就没有构造函数。

```js
// Classes support extending other classes, but can also extend
// other objects. Whatever you extend must be a constructor.
//
// Let's extend the Polygon class to create a new derived class
// called Square.

class Square extends Polygon {
  constructor(length) {
    // The reserved 'super' keyword is for making super-constructor
    // calls and allows access to parent methods.
    //
    // Here, it will call the parent class' constructor with lengths
    // provided for the Polygon's width and height
    super(length, length);
    // Note: In derived classes, super() must be called before you
    // can use 'this'. Leaving this out will cause a reference error.
    this.name = 'Square';
  }

  // Getter/setter methods are supported in classes,
  // similar to their ES5 equivalents
  get area() {
    return this.height * this.width;
  }

  set area(value) {
    this.area = value;
  }
}

let s = new Square(5);

s.sayName();
ChromeSamples.log('The area of this square is ' + s.area);

```

Example 5: Defining static methods
```js 
// Classes support static members which can be accessed without an
// instance being present.
class Triple {
  // Using the 'static' keyword creates a method which is associated
  // with a class, but not with an instance of the class.
  static triple(n) {
    n = n || 1;
    return n * 3;
  }
}

// super.prop in this example is used for accessing super-properties from
// a parent class. This works fine in static methods too:
class BiggerTriple extends Triple {
  static triple(n) {
    return super.triple(n) * super.triple(n);
  }
}

ChromeSamples.log(Triple.triple());
ChromeSamples.log(Triple.triple(6));
ChromeSamples.log(BiggerTriple.triple(3));
// var tp = new Triple();
// ChromeSamples.log(tp.triple()); tp.triple is not a function
```

// Example 6: Subclassing built-in classes and DOM
```js
// Extend Date built-in
class MyDate extends Date {
  constructor() {
    super();
  }

  getFormattedDate() {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
      'Oct', 'Nov', 'Dec'];
    return this.getDate() + '-' + months[this.getMonth()] + '-' +
      this.getFullYear();
  }
}

var aDate = new MyDate();
ChromeSamples.log(aDate.getTime());
ChromeSamples.log(aDate.getFormattedDate());



// Extend DOM Audio element
class MyAudio extends Audio {
  constructor() {
    super();
    this._lyrics = '';
  }

  get lyrics() {
    return this._lyrics;
  }

  set lyrics(str) {
    this._lyrics = str;
  }
}

var player = new MyAudio();
player.controls = true;
player.lyrics = 'Never gonna give you up';
document.querySelector('body').appendChild(player);
ChromeSamples.log(player.lyrics);


// Note: The V8 in Chrome 42 supports subclassing built-ins but Arrays.
// Subclassing arrays supported in Chrome 43.

class Stack extends Array {
  constructor() {
    super();
  }

  top() {
    return this[this.length - 1];
  }
}

var stack = new Stack();
stack.push('world');
stack.push('hello');
ChromeSamples.log(stack.top());
ChromeSamples.log(stack.length);

```

###类体和方法定义
类的成员需要定义在一对花括号 {} 里，花括号里的代码和花括号本身组成了类体。类成员包括类构造器和类方法（包括静态方法和实例方法）。

#### 构造器
构造器方法是一个特殊的类方法，其用于创建和初始化对象（用该类生成的）。一个类只能拥有一个名为 constructor 的方法，否则会抛出 SyntaxError 异常。

在子类的构造器中可以使用 super 关键字调用父类的构造器。


#### 静态方法 
static 关键字用来定义类的静态方法。静态方法是指那些不需要对类进行实例化，使用类名就可以直接访问的方法，需要注意的是静态方法不能被实例化的对象调用。静态方法经常用来作为工具函数。


#### 使用 extends 创建子类
extends 关键字可以用在类声明或者类表达式中来创建一个继承了某个类的子类。


同样也可以用于原有的原型继承的“类”

```js
function Animal (name) {
  this.name = name;  
}
Animal.prototype.speak = function () {
  console.log(this.name + ' makes a noise.');
}

class Dog extends Animal {
  speak() {
    super.speak();
    console.log(this.name + ' barks.');
  }
}

var d = new Dog('Mitzie');
d.speak();
```

需要注意的是类不能继承一般（非构造的）对象。如果你想要创建的类继承某个一般对象的话，你要使用 Object.setPrototypeOf()：
```js
var Animal = {
  speak() {
    console.log(this.name + ' makes a noise.');
  }
};

class Dog {
  constructor(name) {
    this.name = name;
  }
  speak() {
    super.speak();
    console.log(this.name + ' barks.');
  }
}
Object.setPrototypeOf(Dog.prototype, Animal);

var d = new Dog('Mitzie');
d.speak();
```

