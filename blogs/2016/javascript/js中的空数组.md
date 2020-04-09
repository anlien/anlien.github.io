###JavaScript数组是JavaScript对象的特殊形式，数组索引实际上和碰巧是整数的属性名差不多。  

数组的实现是经过优化的，用数字索引来访问数组元素一般来说比访问常规的对象属性要快很多。在操作数据方面，经常使用数组来进行操作。
在开发方面应该注重的是逻辑与代码，而不是轮子的构造，有些方法完全可以借用原生的方法。
在开发项目中，创建一个空数组，只指定了长度，没有给定值，例如，`var arr=newArray(20)`,此时使用遍历方法，是否可以访问数组中的值？
    这个稍后再回答，先来说下我的疑惑点：空数组。

   创建数组的方式有多种，方式不同创建的数组对象也不一样。例如：
```js
   var arr1=[undefined,undefined,undefined,undefined,undefined],
         arr2=[,,,,],
         arr3 = new Array(5);
```
    
这三种是常用的创建方式，可以发散下思维，进行下转换，转换为我们常见的形式。
```js
    var arrA = [1,3,4,6,7];   =>delete arrA[1] => [1,undefined,4,6,7];   ====>arr1
```
####三种表示方法的对比
    假如我有一个需求，想存放7个数字，但是有两个数字暂时未定(undefined表示)，已知的五个数字怎么存放？
    第一种(arr1)：arrA = [2,undefined,4,6,8,undefined,10]
    第二种(arr2)：arrB = [2,,4,6,8,,10]
    第三种(arr3): arrC = new Array(7),
                  arrC[0]=2,
                  arrC[2]=4,
                  arrC[3]=6,
                  arrC[4]=8,                       
                  arrC[6]=10;

这三种表示方法真的一样吗?

    读取值方面：
    因为数组是特殊的对象。数组索引仅仅是对象属性名的一种特殊类型，这意味着当试图查询任何对象中不存在的属性时，不会报错，只会得
    到undefined值。 length：都是7。

    forEach遍历：
    arrA:
    0:2 
    1:undefined
    2:4
    3:6
    4:8
    5:undefined
    6:10

    arrB 和arrC ===>直接跳过空位
    0:2
    2:4
    3:6
    4:8
    6:10

    filter(), every() 和some() 也是直接跳过空位，此处不再演示。

####map处理

```js
    arrArr = arrB.map(function(val,index){
        console.log(val)
        return val || 33333;
    })
    console.log(arrArr)
    arrA ==> [2, 33333, 4, 6, 8, 33333, 10]
    arrB  和arrC==> [ 2, empty, 4, 6, 8, empty, 10 ]
```
**结论：map()会跳过空位，但会保留这个值。**

####join()与toString()

    join()与toString()会将空位视为undefined，而undefined和null会被处理成空字符串。

    ```js
    in
    1 in arrA  //true 
    1 in ArrB  //false
    
    hasOwnProperty
    arrA.hasOwnProperty(1)  //true
    arrB.hasOwnProperty(1) //false
    
    Object.keys
    Object.keys(arrA) // ["0", "1", "2", "3", "4", "5", "6"]
    Object.keys(arrB) // ["0", "2", "3", "4", "6"]
    
    $.earch
     [2, undefined, 4, 6, 8, undefined, 10]
    ```

####为什么会有上面的现象？

    空位有自己的位置，但是这个位置的值未定义，数组中没有存储值甚至数组的索引属性"0","1"等还未定义。如果一定要读取，
    结果就是undefined。

如果修改下：

    * 第一种(arr1)：arrA = [2,undefined,4,6,8,10,undefined]
    * 第二种(arr2)：arrB = [2,,4,6,8,10,]
    * 第三种(arr3):   arrC = new Array(7)，
                          arrC[0]=2,
                          arrC[2]=4,
                          arrC[3]=6,
                          arrC[4]=8,                       
                          arrC[65=10;

    length
        arrA:7
        arrB:6
        arrC:7
    最后一个逗号将会被忽略。原因：数组直接量的语法运行有可选的结尾的逗号。


