

###　Array.from 
［Array.From］(https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)
>Array.from(arrayLike[, mapFn[, thisArg]])
>一个新的Array实例

#### 一些示例

// 字符串对象既是类数组又是可迭代对象
```js
Array.from("foo");                      // ["f", "o", "o"]
```

// 使用 map 函数转换数组元素
```js
Array.from([1, 2, 3], x => x + x);      // [2, 4, 6]
```

// 生成一个数字序列
```js
Array.from({length:5}, (v, k) => k);    // [0, 1, 2, 3, 4]
```

>版本：ES2015

