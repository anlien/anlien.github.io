mdn上：
代码执行new Foo()

1.一个继承自Foo.prototype 的新对象被创建
2.使用指定的参数调用构造函数Foo，并将this绑定到新创建的对象。
3.由构造函数返回的对象就是new表达式的结果。如果构造函数没有显示返回一个对象，则使用步骤1创建对象。


javascript高级程序3:
a.创建一个新对象
b.将构造函数的作用域赋给新对象(因此this就指向这个新对象)
c.执行构造函数中的代码
d.返回新对象


### 参考
* [mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)
