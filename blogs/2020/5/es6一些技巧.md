### 将字符串转为数组
  [...'abc']; // ["a", "b", "c"]

### 删除排序数组中的重复项
```js
/**
 * @param {number[]} nums
 */
var removeDuplicates = function(nums) {
    var setArr = new Set(nums);
    nums.splice(0,nums.length,...setArr)
};
```
### [超过上限的数处理](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
```js
    var bigNum = BigInt(1) + BigInt(1);
    bg.toString();
```
