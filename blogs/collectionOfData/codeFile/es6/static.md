[static 参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes/static)
static关键字定义一个类中的静态方法。
静态方法经常作为程序的工具函数使用。
```js
class Tripple {
  static tripple(n) {
    n = n || 1;
    return n * 3;
  }
}

class BiggerTripple extends Tripple {
  static tripple(n) {
    return super.tripple(n) * super.tripple(n);
  }
}

console.log(Tripple.tripple());          // 3
console.log(Tripple.tripple(6));         // 18
console.log(BiggerTripple.tripple(3));   // 81
var tp = new Tripple();
console.log(BiggerTripple.tripple(3));   // 81（不会受父类被实例化的影响）
console.log(tp.tripple());               // 'tp.tripple is not a function'.

```