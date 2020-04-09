>this对象是在运行时基于函数的执行环境绑定的：在全局函数中，this等于window，而在函数被作为某个对象的方法调用时，this等于那个对象。

```js
function Foo(name){  this.name = name  }
Foo.prototype.sayName = function(){   console.log(this.name)  }

var foo = new Foo("li");
window.name = "llll";
var callSay = foo.sayName;

foo.sayName() // ==> "li"
callSay(); // ==> "llll"

```

```js 
var name = "windName"

var obj = {
    name: "objName",
    sayName:function(){
        console.log(this.name)
        return this.name;
    }
}

/**  */
obj.sayName();  // ===> objName

/*加上括号之后，就好像只是在引用一个函数，但this的值得到了维持。 
**因为obj.sayName 和 (obj.sayName) 的定义是相同的。 */
(obj.sayName)(); // ===> objName


console.log(obj.sayName = obj.sayName); // ==> ƒ (){ console.log(this.name);  return this.name; }

/**
 * 第三行代码先执行了一条赋值语句，然后再调用赋值后的结果。
 * 因为这赋值表达式的值是函数本身，所以this的值不能得到维持，结果就返回"windName"
 */
(obj.sayName = obj.sayName)(); // ===> windName
```

参考：
[msdn function](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Functions)
[new  关键字](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)
[this 关键字](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this)
[function ](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Functions)
[gentle-explanation-of-this-in-javascript](https://dmitripavlutin.com/gentle-explanation-of-this-in-javascript/)