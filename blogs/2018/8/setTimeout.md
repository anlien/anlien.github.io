### 零延迟
零延迟并不是意味着回调会立即执行。在零延迟调用 setTimeout 时，其并不是过了给定的时间间隔后就马上执行回调函数。其等待的时间基于队列里正在等待的消息数量。在下面的例子中，"this is just a message" 将会在回调 (callback) 获得处理之前输出到控制台，这是因为延迟是要求运行时 (runtime) 处理请求所需的最小时间，但不是有所保证的时间。

```js 
(function () {
  console.log('this is the start');
  setTimeout(function cb() {
    console.log('this is a msg from call back');
  });
  console.log('this is just a message');
  setTimeout(function cb1() {
    console.log('this is a msg from call back1');
  }, 0);
  console.log('this is the  end');
})();

// "this is the start"
// "this is just a message"
// "this is the end"
// "this is a msg from call back"
// "this is a msg from call back1"
```

### 添加消息：

在浏览器里，当一个事件出现且有一个事件监听器被绑定时，消息会被随时添加。如果没有事件监听器，事件会丢失。所以点击一个附带点击事件处理函数的元素会添加一个消息。其它事件亦然。

调用 setTimeout 函数会在一个时间段过去后在队列中添加一个消息。这个时间段作为函数的第二个参数被传入。如果队列中没有其它消息，消息会被马上处理。但是，如果有其它消息，setTimeout消息必须等待其它消息处理完。因此第二个参数仅仅表示最少的时间 而非确切的时间。

#### 参考

* [EventLoop](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop)
* [事件循环的例外](https://stackoverflow.com/questions/2734025/is-javascript-guaranteed-to-be-single-threaded/2734311#2734311)