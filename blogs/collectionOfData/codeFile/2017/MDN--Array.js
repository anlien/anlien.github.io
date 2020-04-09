// 鲜为人知的事实：其实 Array.prototype 也是一个数组。
Array.isArray(Array.prototype); 




//Let len be toUint32(lenValue).
var len = O.length >>> 0;





// 1. Let O be the result of calling toObject() passing the
// |this| value as the argument.
var O = Object(this);




//Array中分删除索引、没被赋值索引、已经被赋值的索引
Array.every  // 中 callback 只会为那些已经被赋值的索引调用


// 生成一个数字序列
```js
Array.from({length:5}, (v, k) => k);    // [0, 1, 2, 3, 4]
```



//Object.keys() 方法会返回一个由给定对象的所有 可枚举 自身属性的属性名组成的数组，
//数组中属性名的排列顺序和使用for-in循环遍历该对象时返回的顺序一致 (顺序一致不包括数字属性)
//（两者的主要区别是 for-in 还会遍历出一个对象从其原型链上继承到的可枚举属性）。



//计算数组中各个值出现次数
var names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];

var countedNames = names.reduce(function(allNames, name) { 
  if (name in allNames) {
    allNames[name]++;
  }
  else {
    allNames[name] = 1;
  }
  return allNames;
}, {});
// countedNames is { 'Alice': 2, 'Bob': 1, 'Tiff': 1, 'Bruce': 1 }
// 此处有一个 allNames[name] ++ 为何能增加对象的值？
// 如果在全局对象中声明一个a,那么a++后再次访问a时，a是几？
// 一个是在全局对象window下，一个是在{}下，都是对象，空间不同。
// 

//递增 (++)
//递增运算符（increment operator)为其操作数增加1，返回一个数值。
//  如果后置（postfix）使用，即运算符位于操作数的后面（如 x++），那么将会在递增前返回数值。
//  如果前置（prefix）使用，即运算符位于操作数的前面（如 ++x），那么将会在递增后返回数值。
//示例：
// 后置 
var x = 3;
y = x++; // y = 3, x = 4

// 前置
var a = 2;
b = ++a; // a = 3, b = 3




//数组扁平化
var flattened =  [[0,1],[2,3],[4,5]].reduce(function(a,b){
	return a.concat(b);
},[])





//对象数组的连接要使用展开运算符和初始值
// friends - an array of objects 
// where object field "books" - list of favorite books 
var friends = [ 
{ name: "Anna", books: ["Bible", "Harry Potter"], age: 21 }, 
{ name: "Bob", books: ["War and peace", "Romeo and Juliet"], age: 26 },
{ name: "Alice", books: ["The Lord of the Rings", "The Shining"], age: 18 }
]

// allbooks - list which will contain all friends books +  
// additional list contained in initialValue
var allbooks = friends.reduce(function(prev, curr) {
  return [...prev, ...curr.books];
}, ["Alphabet"]);

// allbooks = ["Alphabet", "Bible", "Harry Potter", "War and peace", 
// "Romeo and Juliet", "The Lord of the Rings", "The Shining"]





//数据类型
//url:https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures
//最新的ECMAScript标准定义了7种数据类型：
//6种 原始类型：
//Boolean 、NUll、Undefined、Number、String、Symbol(ECMAScript 6新定义)
//和 Object
//




//有时你想对字符串或其他类似数组的对象使用数组的方法（如函数arguments）。
//通过这样做，你可以把一个字符串作为（或以其他方式把非数组作为数组）数组里的字符来使用。
//例如，为了检查变量str每一个字符是否是字母，你会这样写：
//
function isLetter(character) {
  return character >= 'a' && character <= 'z';
}

if (Array.prototype.every.call(str, isLetter)) {
  console.log("The string '" + str + "' contains only letters!");
}




//返回一个新数组
//
//
// 返回一个由当前数组和其它若干个数组或者若干个非数组值组合而成的新数组。
Array.prototype.concat()
// 将所有在过滤函数中返回 true 的数组元素放进一个新数组中并返回。
Array.prototype.filter()
//返回一个由回调函数的返回值组成的新数组。
Array.prototype.map()
    




