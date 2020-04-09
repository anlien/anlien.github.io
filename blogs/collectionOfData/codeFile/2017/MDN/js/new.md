[new 参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)

new运算符的作用是创建一个对象实例。这个对象可以是用户自定义的，也可以是一些系统自带的带构造函数的对象。

语法：new constructor[([arguments])]

参数：
构造函数(constructor)
一个指明了对象类型的函数。
传参(arguments)
一个用来被构造函数调用的参数列表。

#### 描述：
创建一个用户自定义的对象需要两步：

1.定义构造函数
2.通过new来创建对象实例

创建一个对象类型需要创建一个指定了名称和属性的函数；其中这些属性可以指向它本身，也可以指向其他对象，看下面的例子：

当代码new foo(...)执行时：
1.一个新对象被创建。它继承自foo.prototype.
2.构造函数foo被执行。执行的时候，相应的传参会被传入，同时上下文(this)会被指定为这个新实例。new foo 等同于 new foo(), 只能用在不传递任何参数的情况。
3.如果构造函数返回了一个“对象”，那么这个对象会取代整个new出来的结果。如果构造函数没有返回对象，那么new出来的结果为步骤1创建的对象，ps：一般情况下构造函数不返回任何值，不过用户如果想覆盖这个返回值，可以自己选择返回一个普通对象来覆盖。当然，返回数组也会覆盖，因为数组也是对象。

你可以通过给 Function.prototype 添加属性的方式来给所有先前定义的实例来添加属性。这种定义属性的方式会影响到所有通过new构造函数创建的对象，因为它们共享了这个对象类型。

[function.prototype](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)


new，它和 this 密切相关。它的作用是创建一个崭新的空对象，然后使用指向那个对象的 this 调用特定的函数。注意，含有 this 的特定函数不会返回任何值，只会修改 this 对象本身。new 关键字将生成的 this 对象返回给调用方，而被 new 调用的函数成为构造函数。

