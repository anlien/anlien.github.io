```js
function copy(obj){
  var copy = Object.create(Object.getPrototypeOf(obj));
  var propNames = Object.getOwnPropertyNames(obj)

  propNames.forEach(function(name){
    var desc = Object.getOwnPropertyDescriptor(obj,name)
    Object.defineProperty(copy,name,desc);
  })

  return copy
}

```

有一次面试，遇到一个克隆对象的问题，一时想不起上面的代码，就写了个Object.assgin({},obj)。后来发现Object.assgin有个坑，上代码：
  ```js
  let obj = {
  a: 1,
  b: {
    c: 2,
  },
}

let newObj = Object.assign({}, obj);
console.log(newObj); // { a: 1, b: { c: 2} }

obj.a = 10;
console.log(obj); // { a: 10, b: { c: 2} }
console.log(newObj); // { a: 1, b: { c: 2} }

newObj.a = 20;
console.log(obj); // { a: 10, b: { c: 2} }
console.log(newObj); // { a: 20, b: { c: 2} }

newObj.b.c = 30;
console.log(obj); // { a: 10, b: { c: 30} }
console.log(newObj); // { a: 20, b: { c: 30} }
  ```

  使用copy也没跳出这个坑。


  ### 参考
  * [copying-objects-in-javascript](https://scotch.io/bar-talk/copying-objects-in-javascript)
