[参考地址](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)

从 ECMAScript 6 开始，JavaScript 增加了对 Promise 对象的支持，它允许你对延时和异步操作流进行控制。

所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。


Promise 对象是一个返回值的代理，这个返回值在promise对象创建时未必已知。它允许你为异步操作的成功返回值或失败信息指定处理方法。 这使得异步方法可以像同步方法那样返回值：异步方法会返回一个包含了原返回值的 promise 对象来替代原返回值。


Promise 对象有以下几种状态:
* pending (进行中): 初始的状态，即正在执行，不处于 fulfilled 或 rejected 状态。
* fulfilled (已完成): 成功的完成了操作。
* rejected (已失败): 失败，没有完成操作。
* settled (已解决): Promise 处于 fulfilled 或 rejected 二者中的任意一个状态, 不会是 pending。

pending状态的promise对象既可转换为带着一个成功值的fulfilled 状态，也可变为带着一个失败信息的 rejected 状态。当状态发生转换时，promise.then绑定的方法（函数句柄）就会被调用。(当绑定方法时，如果 promise对象已经处于 fulfilled 或 rejected 状态，那么相应的方法将会被立刻调用， 所以在异步操作的完成情况和它的绑定方法之间不存在竞争条件。)


注意：注意： 如果一个promise对象处在fulfilled或rejected状态而不是pending状态，那么它也可以被称为settled状态。你可能也会听到一个术语resolved ，它表示promise对象处于settled状态，或者promise对象被锁定在了调用链中。
```js
<!--标注：下面略微修改了英文版的示例，主要是执行3次testPromise()的效果，如果您有疑问，可以参看英文的说明文档：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise-->
<div id="log"></div>
<script>
    'use strict';
    var promiseCount = 0;
    function testPromise() {
        var thisPromiseCount = ++promiseCount;

        var log = document.getElementById('log');
        log.insertAdjacentHTML('beforeend', thisPromiseCount + ') 开始(同步代码开始)<br/>');

        // 我们创建一个新的promise: 然后用'result'字符串完成这个promise (3秒后)
        var p1 = new Promise(function (resolve, reject) {
            // 完成函数带着完成（resolve）或拒绝（reject）promise的能力被执行
            log.insertAdjacentHTML('beforeend', thisPromiseCount + ') Promise开始(异步代码开始)<br/>');

            // 这只是个创建异步完成的示例
            window.setTimeout(function () {
                // 我们满足（fullfil）了这个promise!
                resolve(thisPromiseCount)
            }, Math.random() * 2000 + 1000);
        });

        // 定义当promise被满足时应做什么
        p1.then(function (val) {
            // 输出一段信息和一个值
            log.insertAdjacentHTML('beforeend', val + ') Promise被满足了(异步代码结束)<br/>');
        });

        log.insertAdjacentHTML('beforeend', thisPromiseCount + ') 建立了Promise(同步代码结束)<br/><br/>');
    }
</script>
```

promise的三种调用：

```js
// End B

// Executes the method call 
$http(mdnAPI) 
  .get(payload) 
  .then(callback.success) 
  .catch(callback.error);

// Executes the method call but an alternative way (1) to handle Promise Reject case 
$http(mdnAPI) 
  .get(payload) 
  .then(callback.success, callback.error);

// Executes the method call but an alternative way (2) to handle Promise Reject case 
$http(mdnAPI) 
  .get(payload) 
  .then(callback.success)
  .then(undefined, callback.error);

```

[Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)