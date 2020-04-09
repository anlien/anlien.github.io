[参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)

JavaScript对于有基于类的语言经验的开发人员来说有点令人困惑 (如Java或C ++) ，因为它是动态的，并且本身不提供类实现.。(在ES2015/ES6中引入了class关键字，但是只是语法糖，JavaScript 仍然是基于原型的)。

涉及到继承这一块，Javascript 只有一种结构，那就是：对象。在 javaScript 中，每个对象都有一个指向它的原型（prototype）对象的内部链接。这个原型对象又有自己的原型，直到某个对象的原型为 null 为止（也就是不再有原型指向），组成这条链的最后一环。这种一级一级的链结构就称为原型链（prototype chain）。

```js 
// 让我们假设我们有一个对象 o, 其有自己的属性 a 和 b：
// {a: 1, b: 2}
// o 的原型 o.[[Prototype]]有属性 b 和 c：
// {b: 3, c: 4}
// 最后, o.[[Prototype]].[[Prototype]] 是 null.
// 这就是原型链的末尾，即 null，
// 根据定义，null 没有[[Prototype]].
// 综上，整个原型链如下: 
// {a:1, b:2} ---> {b:3, c:4} ---> null
```

#### 继承方法
在 JavaScript 里，任何函数都可以添加到对象上作为对象的属性。函数的继承与其他的属性继承没有差别，包括上面的“属性遮蔽”（这种情况相当于其他语言的方法重写）。
当继承的函数被调用时，this 指向的是当前继承的对象，而不是继承的函数所在的原型对象。

#### 使用不同的方法来创建对象和生成原型链
```js 
var o = {a: 1};

// o这个对象继承了Object.prototype上面的所有属性
// 所以可以这样使用 o.hasOwnProperty('a').
// hasOwnProperty 是Object.prototype的自身属性。
// Object.prototype的原型为null。
// 原型链如下:
// o ---> Object.prototype ---> null


// 数组都继承于Array.prototype 
// (indexOf, forEach等方法都是从它继承而来).
// 原型链如下:
// a ---> Array.prototype ---> Object.prototype ---> null


// 函数都继承于Function.prototype
// (call, bind等方法都是从它继承而来):
// f ---> Function.prototype ---> Object.prototype ---> null 
```

Object.getPrototypeOf:
[参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf)
Object.getPrototypeOf()方法返回指定对象的原型(也就是该对象内部[[Prototype]]的值)。
语法：Object.getPrototypeOf(object)
es5与es6的区别：在 ES5 中，如果参数不是一个对象类型，将抛出一个 TypeError 异常。在 ES6 中，参数被强制转换为Object。
```js
> Object.getPrototypeOf("foo");
TypeError: "foo" is not an object  // ES5 code
> Object.getPrototypeOf("foo");
String.prototype                   // ES6 code
```

Object.setPrototypeOf:
[参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf)
将一个指定的对象的原型设置为另一个对象或者null(既对象的[[Prototype]]内部属性).
语法：Object.setPrototypeOf(obj, prototype)


### Polyfill
```js 
//chrome和火狐中有效，IE无效
Object.setPrototypeOf = Object.setPrototypeOf || function (obj, proto) {
  obj.__proto__ = proto;
  return obj; 
}
```

#### prototype 和 Object.getPrototypeOf
像上面的例子中，
如果你执行 var a1 = new A(); var a2 = new A(); 
那么 a1.doSomething 事实上会指向Object.getPrototypeOf(a1).doSomething，它就是你在 A.prototype.doSomething 中定义的内容。
比如：Object.getPrototypeOf(a1).doSomething == Object.getPrototypeOf(a2).doSomething == A.prototype.doSomething。

简而言之， prototype 是用于类型的，而 Object.getPrototypeOf() 是用于实例的（instances），两者功能一致。

[[Prototype]] 看起来就像递归引用， 如a1.doSomething，Object.getPrototypeOf(a1).doSomething，
Object.getPrototypeOf(Object.getPrototypeOf(a1)).doSomething 等等等， 直到它找到 doSomething 这个属性或者 Object.getPrototypeOf 返回 null。

因此，当你执行：
```js
 var o = new Foo();
```
javaScript 实际上执行的是：

```js 
var o = new Object();
o.[[Prototype]] = Foo.prototype;
Foo.call(o);
```

（或者类似上面这样的），然后当你执行：
```js
o.someProp;
```
它会检查是否存在 someProp 属性。如果没有，它会查找 Object.getPrototypeOf(o).someProp ,如果仍旧没有，它会继续查找 Object.getPrototypeOf(Object.getPrototypeOf(o)).someProp ，一直查找下去，直到它找到这个属性 或者 Object.getPrototypeOf() 返回 null。

### 标签：
oop 、 继承 、面向对象
[其他参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript)

