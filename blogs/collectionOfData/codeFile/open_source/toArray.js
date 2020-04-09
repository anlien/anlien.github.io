//MDN:https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments
var args = Array.prototype.slice.call(arguments);

//jQuery 1.4.1
function toArray() {		
	return Array.prototype.slice.call( this, 0 );
}

//为什么能转换？
//slice 方法可以用来将一个类数组（Array-like）对象/集合转换成一个数组。
//你只需将该方法绑定到这个对象上。下述代码中 list 函数中的 arguments 就是一个类数组对象。
//
//
//除了使用 Array.prototype.slice.call(arguments)，你也可以简单的使用 [].slice.call(arguments) 来代替。另外，你可以使用 bind 来简化该过程。
//
```js 
var unboundSlice = Array.prototype.slice;
var slice = Function.prototype.call.bind(unboundSlice);

function list() {
  return slice(arguments);
}

var list1 = list(1, 2, 3); // [1, 2, 3]

```


//mdn：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from
// 将类数组对象（arguments）转换成数组
(function () {
    var args = Array.from(arguments);
    return args;
})(1, 2, 3);

