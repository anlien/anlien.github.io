[参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)
ECMAScript 6 引入了一个新的数据结构来将一个值映射到另一个值。一个Map对象就是一个简单的键值对映射集合，可以按照数据插入时的顺序遍历所有的元素。

[Map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)
[map_prototype](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/prototype)

### Object和Map的比较

一般地，objects会被用于将字符串类型映射到数值。Object允许设置键值对、根据键获取值、删除键

、检测某个键是否存在。而Map具有更多的优势。

* Object的键均为Strings类型，在Map里键可以是任意类型
* 必须手动计算Object的尺寸，但是可以很容易地获取使用Map的尺寸
* Map的遍历遵循元素的插入顺序
* Object有原型，所以映射中有一些缺省的键。可以理解为（map = Object.create(null)）
这两条提示可以帮你决定是使用Map还是Object：

* 如果键在运行时才能知道，或者所有的键类型相同，所有的值类型相同，那就使用Object
* 如果需要对个别元素进行操作，使用Object


[WeakMap](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
WeakMap 对象是键/值对的集合，且其中的键是弱引用的。其键只能是对象，而值则可以是任意的。