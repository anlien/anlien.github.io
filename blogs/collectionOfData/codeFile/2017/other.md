### 类数组对象
* arguments
* 字符串
```js
 cloned = new Array(size);
if (this.charAt) {
    for (i = 0; i < size; i++) {
        cloned[i] = this.charAt(start + i);
    }
} else {
    for (i = 0; i < size; i++) {
        cloned[i] = this[start + i];
    }
}
```