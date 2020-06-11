### 将字符串转为数组
  [...'abc']; // ["a", "b", "c"]

### 删除排序数组中的重复项
```js
/**
 * @param {number[]} nums
 */
var removeDuplicates = function(nums) {
    var setArr = new Set(nums);// Use to remove duplicate elements from the array
    nums.splice(0,nums.length,...setArr)
};
```
### [超过上限的数处理](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
```js
    var bigNum = BigInt(1) + BigInt(1);
    bg.toString();
```

### set
#### set与Array
```js
//使用 Array.from 转换Set为Array
var myArr = Array.from(mySet);
```

```js
mySet2 = new Set([1,2,3,4]);
mySet2.size; // 4
[...mySet2]; // [1,2,3,4]
```

### set与String
```js
let text = 'India';
let mySet = new Set(text);  // Set {'I', 'n', 'd', 'i', 'a'}
mySet.size;  // 5
```

### map
#### map与Array
```js
let kvArray = [["key1", "value1"], ["key2", "value2"]];
// 使用常规的Map构造函数可以将一个二维键值对数组转换成一个Map对象
let myMap = new Map(kvArray);

// 使用Array.from函数可以将一个Map对象转换成一个二维键值对数组
console.log(Array.from(myMap)); // 输出和kvArray相同的数组
// 更简洁的方法来做如上同样的事情，使用展开运算符
console.log([...myMap]);

// 或者在键或者值的迭代器上使用Array.from，进而得到只含有键或者值的数组
console.log(Array.from(myMap.keys())); // 输出 ["key1", "key2"]  可以与values类比

let clone = new Map(myMap);
console.log(myMap === clone); // false. 浅比较 不为同一个对象的引用
```
#### map对象合并
```js
let first = new Map([[1, 'one'],[2, 'two'], [3, 'three']]);
let second = new Map([[1, 'uno'],[2, 'dos']]);

// 合并两个Map对象时，如果有重复的键值，则后面的会覆盖前面的。
// 展开运算符本质上是将Map对象转换成数组。
let merged = new Map([...first, ...second]);
console.log(merged.get(1)); // uno
console.log(merged.get(2)); // dos
console.log(merged.get(3)); // three
```
### yield*
* [Operators/yield](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/yield)
  
* [Operators/yield\*](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/yield*)

```js
function* anotherGenerator(i) {
  yield i + 1;
  yield i + 2;
  yield i + 3;
}

function* generator(i){
  yield i;
  yield* anotherGenerator(i);// 移交执行权
  yield i + 10;
}

var gen = generator(10);

console.log(gen.next().value); // 10
console.log(gen.next().value); // 11
console.log(gen.next().value); // 12
console.log(gen.next().value); // 13
console.log(gen.next().value); // 20
```

#### 传递参数

```js
function *createIterator() {
    let first = yield 1;
    let second = yield first + 2; // 4 + 2 
                                  // first =4 是next(4)将参数赋给上一条的
    yield second + 3;             // 5 + 3
}

let iterator = createIterator();

console.log(iterator.next());    // "{ value: 1, done: false }"
console.log(iterator.next(4));   // "{ value: 6, done: false }"
console.log(iterator.next(5));   // "{ value: 8, done: false }"
console.log(iterator.next());    // "{ value: undefined, done: true }"
```

#### 显示返回

```js
function* yieldAndReturn() {
  yield "Y";
  return "R";//显式返回处，可以观察到 done 也立即变为了 true
  yield "unreachable";// 不会被执行了
}

var gen = yieldAndReturn()
console.log(gen.next()); // { value: "Y", done: false }
console.log(gen.next()); // { value: "R", done: true }
console.log(gen.next()); // { value: undefined, done: true }
```

#### 迭代二维数组
```js
function* iterArr(arr) {            //迭代器返回一个迭代器对象
  if (Array.isArray(arr)) {         // 内节点
      for(let i=0; i < arr.length; i++) {
          yield* iterArr(arr[i]);   // (*)递归
      }
  } else {                          // 离开     
      yield arr;
  }
}
// 使用 for-of 遍历:
var arr = ['a', ['b', 'c'], ['d', 'e']];
for(var x of iterArr(arr)) {
        console.log(x);               // a  b  c  d  e
 }

// 或者直接将迭代器展开:
var arr = [ 'a', ['b',[ 'c', ['d', 'e']]]];
var gen = iterArr(arr);
arr = [...gen];                        // ["a", "b", "c", "d", "e"]
```
#### 不要重用生成器
生成器不应该重用，即使for...of循环的提前终止，例如通过break关键字。在退出循环后，生成器关闭，并尝试再次迭代，不会产生任何进一步的结果。
```js
var gen = (function *(){
    yield 1;
    yield 2;
    yield 3;
})();
for (let o of gen) {
    console.log(o);
    break;//关闭生成器
} 

//生成器不应该重用，以下没有意义！
for (let o of gen) {
    console.log(o);
}
```

## 示例
### separate scope
```js
(function(a= function(){ return typeof b === 'undefined'; }){
  var b = 1;
  return a();//true
}());
```
### function 'length' property
```js
(function() {
    return function (a, ...b) { }.length === 1 && function (...c) { }.length === 0;
})()
```

### with strings, in function calls
```js
function(){
  return Math.max(..."1234") === 4;
}
```
### with generator instances, in calls
```js
function(){
  var iterable = (function*(){ yield 1; yield 2; yield 3; }());
  return Math.max(...iterable) === 3;
}
```
### computed shorthand methods
```js
function(){
  var x = 'y';
  return ({ [x](){ return 1 } }).y() === 1;
}
```
## template literals 
### toString conversion
```js
function(){
  var a = {
    toString: function() { return "foo"; },
    valueOf: function() { return "bar"; },
  };
  return `${a}` === "foo";
}
```
### tagged template literals
```js
function(){
  var called = false;
  function fn(parts, a, b) {
    called = true;
    return parts instanceof Array &&
      parts[0]     === "foo"      &&
      parts[1]     === "bar\n"    &&
      parts.raw[0] === "foo"      &&
      parts.raw[1] === "bar\\n"   &&
      a === 123                   &&
      b === 456;
  }
  return fn `foo${123}bar\n${456}` && called;
}
```
### passed array is frozen
```js
function(){
  return (function(parts) {
    return Object.isFrozen(parts) && Object.isFrozen(parts.raw);
  }) `foo${0}bar${0}baz`;
}
```

### TemplateStrings permanent caching
```js
function(){
  function strings(array) {
    return array;
  }
  function getStrings() {
    return strings`foo`;
  }
  var original = getStrings();
  var newed = new getStrings();
  return original === getStrings() && original === newed;
}();
```

## destructuring, declarations
### with strings
```js
function(){
  var [a, b, c] = "ab";
  return a === "a" && b === "b" && c === undefined;
}
```
### with generator instances
```js
function(){
  var [a, b, c] = (function*(){ yield 1; yield 2; }());
  return a === 1 && b === 2 && c === undefined;
}
```
### object destructuring with primitives
```js
function(){
  var {toFixed} = 2;
  var {slice} = '';
  return toFixed === Number.prototype.toFixed
    && slice === String.prototype.slice;
}
```

### nested
```js
function(){
  var [e, {x:f, g}] = [9, {x:10}];
  var {h, x:[i]} = {h:11, x:[12]};
  return e === 9 && f === 10 && g === undefined
    && h === 11 && i === 12;
}
```
### in for-in loop heads
```js
function(){
  for(var [i, j, k] in { qux: 1 }) {
    return i === "q" && j === "u" && k === "x";
  }
}
```
```js
function(){
  for(var [i, j, k] of [[1,2,3]]) {
    return i === 1 && j === 2 && k === 3;
  }
}
```
### in catch heads
```js
function(){
  try {
    throw [1,2];
  } catch([i,j]) {
    try {
      throw { k: 3, l: 4 };
    } catch({k, l}) {
      return i === 1 && j === 2 && k === 3 && l === 4;
    }
  }
}
```
### rest
```js
function(){
  var [a, ...b] = [3, 4, 5];//截取数组
  var [c, ...d] = [6];
  return a === 3 && b instanceof Array && (b + "") === "4,5" &&
    c === 6 && d instanceof Array && d.length === 0;
}
```

### nested rest
```js
function(){
  var a = [1, 2, 3], first, last;
  [first, ...[a[2], last]] = a;//注意此处，变量和数组引用也可以
  return first === 1 && last === 3 && (a + "") === "1,2,2";
}
```
### computed properties
```js
function(){
  var qux = "corge";
  return function({ [qux]: grault }) {
      return grault === "garply";
    }({ corge: "garply" });
}
```
## new.target
### in constructors
```js
function(){
  var passed = false;
  new function f() {
    passed = (new.target === f);
  }();
  (function() {
    passed &= (new.target === undefined);
  }());
  return passed;
}
```
# binding
## const
### for loop statement scope
```js
function(){
  const baz = 1;
  for(const baz = 0; false;) {}
  return baz === 1;
}
```
### for-in loop iteration scope
```js
function(){
  var scopes = [];
  for(const i in { a:1, b:1 }) {
    scopes.push(function(){ return i; });
  }
  return (scopes[0]() === "a" && scopes[1]() === "b");
}
```

### temporal dead zone
```js
// (function (a = function () { return typeof b === 'undefined'; }) {
//     const b = 1;
//     console.log(a());//true
// }());

function(){
  var passed = (function(){ try { qux; } catch(e) { return true; }}());
  function fn() { passed &= qux === 456; }//此处返回 true
  const qux = 456;
  fn();
  return passed;
}
```
### lexical "this" binding
```js
function(){
  var d = { x : "bar", y : function() { return z => this.x + z; }}.y();
  var e = { x : "baz", y : d };
  return d("ley") === "barley" && e.y("ley") === "barley";
}
```

### "this" unchanged by call or apply
```js
function(){
  var d = { x : "foo", y : function() { return () => this.x; }};
  var e = { x : "bar" };
  return d.y().call(e) === "foo" && d.y().apply(e) === "foo";
}
```

### can't be bound, can be curried
```js
function(){
  var d = { x : "bar", y : function() { return z => this.x + z; }};
  var e = { x : "baz" };
  return d.y().bind(e, "ley")() === "barley";
}
```
### lexical "arguments" binding
```js
function(){
  var f = (function() { return z => arguments[0]; }(5));
  return f(6) === 5;
}
```
### no "prototype" property
```js
function(){
  var a = () => 5;
  return !a.hasOwnProperty("prototype");
}
```

## class
### lexical "super" binding in methods
```js
function(){
  class B {
    qux() {
      return "quux";
    }
  }
  class C extends B {
    baz() {
      return x => super.qux();
    }
  }
  var arrow = new C().baz();
  return arrow() === "quux";
}
```

### computed prototype methods

```js
function(){
  var foo = "method";
  class C {
    [foo]() { return 2; }
  }
  return typeof C.prototype.method === "function"
    && new C().method() === 2;
}
```
### computed accessor properties

```js
function(){
  var garply = "foo", grault = "bar", baz = false;
  class C {
    get [garply]() { return "foo"; }
    set [grault](x) { baz = x; }
  }
  new C().bar = true;
  return new C().foo === "foo" && baz;
}
```

### class name is lexically scoped
```js
function(){
  class C {

    method() { return typeof C === "function"; }//注意此处
  }
  var M = C.prototype.method;
  C = undefined;//注意此处
  return C === undefined && M();//返回true
}
// var C = /*#__PURE__*/function () {
//   function C() {
//     _classCallCheck(this, C);
//   }

//   _createClass(C, [{
//     key: "method",
//     value: function method() {
//       return typeof C === "function";
//     }
//   }]);

//   return C;
// }();

// var M = C.prototype.method;
// C = undefined;
// console.log(C === undefined && M());
```
### methods aren't enumerable

```js
function(){
  class C {
    foo() {}
    static bar() {}
  }
  return !C.prototype.propertyIsEnumerable("foo") && !C.propertyIsEnumerable("bar");
}
```
### extends

```js
function(){
  class B {}
  class C extends B {}
  return new C() instanceof B
    && B.isPrototypeOf(C);
}
```
### extends null

```js
function(){
  class C extends null {
    constructor() { return Object.create(null); }
  }
  return Function.prototype.isPrototypeOf(C)
    && Object.getPrototypeOf(C.prototype) === null;
}
```

## super
### in methods, property access

```js
function(){
  class B {}
  B.prototype.qux = "foo";
  B.prototype.corge = "baz";
  class C extends B {
    quux(a) { return super.qux + a + super["corge"]; }
  }
  C.prototype.qux = "garply";
  return new C().quux("bar") === "foobarbaz";
}
```
### in methods, method calls

```js
function(){
  class B {
    qux(a) { return "foo" + a; }
  }
  class C extends B {
    qux(a) { return super.qux("bar" + a); }
  }
  return new C().qux("baz") === "foobarbaz";
}
```
### method calls use correct "this" binding

```js
function(){
  class B {
    qux(a) { return this.foo + a; }
  }
  class C extends B {
    qux(a) { return super.qux("bar" + a); }
  }
  var obj = new C();
  obj.foo = "foo";
  return obj.qux("baz") === "foobarbaz";
}
```
### constructor calls use correct "new.target" binding

```js
function(){
  var passed;
  class B {
    constructor() { passed = (new.target === C); }
  }
  class C extends B {
    constructor() { super(); }
  }
  new C();
  return passed;
}
```
## generators
### basic functionality

```js
function(){
  function * generator(){
    yield 5; yield 6;
  };
  var iterator = generator();
  var item = iterator.next();
  var passed = item.value === 5 && item.done === false;
  item = iterator.next();
  passed    &= item.value === 6 && item.done === false;
  item = iterator.next();
  passed    &= item.value === undefined && item.done === true;
  return passed;
}
```
### correct "this" binding

```js
function(){
  function * generator(){
    yield this.x; yield this.y;// 添加了this
  };
  var iterator = { g: generator, x: 5, y: 6 }.g();
  var item = iterator.next();
  var passed = item.value === 5 && item.done === false;
  item = iterator.next();
  passed    &= item.value === 6 && item.done === false;
  item = iterator.next();
  passed    &= item.value === undefined && item.done === true;
  return passed;
}
```
### sending

```js
function(){
  var sent;
  function * generator(){
    sent = [yield 5, yield 6];
  };
  var iterator = generator();
  iterator.next();
  iterator.next("foo");
  iterator.next("bar");
  return sent[0] === "foo" && sent[1] === "bar";
}
```
## Map
### Map.prototype.set returns this

```js
function(){
  var map = new Map();
  return map.set(0, 0) === map;
}
```
## Proxy

```js
function(){
  var proxied = { };
  var proxy = Object.create(new Proxy(proxied, {
    get: function (t, k, r) {
      return t === proxied && k === "foo" && r === proxy && 5;
    }
  }));
  return proxy.foo === 5;
}
``` 
## String

```js
// 正常情况下，你也许不需要将 String.raw() 当作函数调用。
// 但是为了模拟 `t${0}e${1}s${2}t` 你可以这样做:
String.raw({ raw: 'test' }, 0, 1, 2); // 't0e1s2t'
// 注意这个测试, 传入一个 string, 和一个类似数组的对象
// 下面这个函数和 `foo${2 + 3}bar${'Java' + 'Script'}baz` 是相等的.
String.raw({
  raw: ['foo', 'bar', 'baz'] 
}, 2 + 3, 'Java' + 'Script'); // 'foo5barJavaScriptbaz'
```
## Object

```js
var obj = Object.create({ a: "qux", d: "qux" });
obj.a = "foo"; obj.b = "bar"; obj.c = "baz";
var v = Object.values(obj);
Array.isArray(v) && String(v) === "foo,bar,baz"; //true
```
* [参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)

### object rest properties

```js
function(){
  var {a, ...rest} = {a: 1, b: 2, c: 3};
  return a === 1 && rest.a === undefined && rest.b === 2 && rest.c === 3;
}
```

```js
var { a, ...rest } = { b: 2, a: 1, c: 3 };
console.log(rest);//{b:2,c:3}
```

## 参考
* [for...of](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of)
* [for...in](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in)
* [hasOwnProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)