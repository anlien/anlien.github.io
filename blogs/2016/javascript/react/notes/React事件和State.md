## 简单例子

```javascript
var LikeButton = React.createClass({
  getInitialState: function() {
    return {liked: false};
  },
  handleClick: function(event) {
    this.setState({liked: !this.state.liked});
  },
  render: function() {
    var text = this.state.liked ? 'liked' : 'haven\'t liked';
    return (
      <p onClick={this.handleClick}>
        You {text} this. Click to toggle.
      </p>
    );
  }
});

ReactDOM.render(
  <LikeButton />,
  document.getElementById('example')
);
```

###事件的绑定
  React里只需要把事件处理器(Event handler) 以驼峰名（camelCased）形式当做组件的props传入即可，就像使用普通HTML那样。例如HTML以小写onclick的形式绑定事件。
  React内部创建一套事件系统来使所有事件在IE8和以上的浏览器表现一致。这也就使得React不仅可以捕获冒泡和捕获事件，而且event参数与W3c规范一致，不存在兼容性问题。也就是说，通过props传入的事件处理和传统的事件不是一回事，是经过处理加和处理的。

###事件中的this
  在Javascript里创建回调的时候，为了保证'this'的正确性，一般都需要显示地绑定__方法__到它的实例上。在React中，所有方法被自动绑定到它的组件实例上，一般通过bind方法来绑定到当前的实例。React中传传入的参数一般为对象，绑定时一般指定当前的对象。
  React会缓存这些绑定方法，所以CPU和内存都是非常高效的。（高效的原因之一：事件代理机制）


###事件代理
  React 实际并没有把事件处理器绑定到节点本身。当 React __启动__的时候，它在最外层使用唯一一个事件监听器处理所有事件。当组件被__加载和卸载__时，只是在内部映射里__添加或删除__事件处理器。当事件__触发__，React 根据__映射__来__决定如何分发__。当映射里没有事件处理函数时，会当作空操作处理。参考 [David Walsh 很棒的文章](http://davidwalsh.name/event-delegate) 了解这样做高效的原因。

###无自动绑定
  方法遵循正式的ES6 class的语义，意味着它们不会自动绑定this到实例上。你必须显示的使用.bind(this) or 箭头函数 =>：
  
  ```javascript
  // 你可以使用 bind() 来绑定 `this`
  <div onClick={this.tick.bind(this)}>

  // 或者你可以使用箭头函数
  <div onClick={() => this.tick()}>
  ```
  
  es6中的：
  我们建议你在构造函数中绑定事件处理器，这样对于所有实例它们只需绑定一次：
  ```javascript
  constructor(props) {
    super(props);
    this.state = {count: props.initialCount};
    this.tick = this.tick.bind(this);
  }
  ```

  现在你可以直接使用 `this.tick` 因为它已经在构造函数里绑定过一次了。
  ```javascript
    // 它已经在构造函数里绑定过了
    <div onClick={this.tick}>
  ```


## State 工作原理

常用的通知 React 数据变化的方法是调用 `setState(data, callback)`。这个方法会合并（__merge__） `data` 到 `this.state`，并重新渲染组件。重新渲染完成后，调用可选的 `callback` 回调。大部分情况下不需要提供 `callback`，因为 React 会负责把界面更新到最新状态。
因为内部是merge对象，所以state传入的一个对象来进行merge参数！

## 哪些组件应该有 State？

大部分组件的工作应该是从 `props` 里取数据并渲染出来。但是，有时需要对用户输入、服务器请求或者时间变化等作出响应，这时才需要使用 State。

**尝试把尽可能多的组件无状态化。** 这样做能隔离 state，把它放到最合理的地方，也能减少冗余，同时易于解释程序运作过程。

常用的模式是创建多个只负责渲染数据的无状态（stateless）组件，在它们的上层创建一个有状态（stateful）组件并把它的状态通过 `props` 传给子级。这个有状态的组件封装了所有用户的交互逻辑，而这些无状态组件则负责声明式地渲染数据。

## 哪些 *应该* 作为 State？

**State 应该包括那些可能被组件的事件处理器改变并触发用户界面更新的数据。** 真实的应用中这种数据一般都很小且能被 JSON 序列化。当创建一个状态化的组件时，思考一下表示它的状态最少需要哪些数据，并只把这些数据存入 `this.state`。在 `render()` 里再根据 state 来计算你需要的其它数据。你会发现以这种方式思考和开发程序最终往往是正确的，因为如果在 state 里添加冗余数据或计算所得数据，那么你就需要经常手动保持数据同步，而不能让 React 来帮你处理。

## 哪些 *不应该* 作为 State？

`this.state` 应该仅包括能表示用户界面状态所需的最少数据。因此，它不应该包括：

* **计算所得数据：** 不要担心根据 state 来预先计算数据 —— 把所有的计算都放到 `render()` 里更容易保证用户界面和数据的一致性。例如，在 state 里有一个数组（listItems），我们要把数组长度渲染成字符串， 直接在 `render()` 里使用 `this.state.listItems.length + ' list items'` 比把它放到 state 里好的多。
* **React 组件：** 在 `render()` 里使用当前 props 和 state 来创建它。
* **基于 props 的重复数据：** 尽可能使用 props 来作为实际状态的源。把 props 保存到 state 的一个有效的场景是需要知道它以前值的时候，因为 props 可能因为父组件的重绘而变化。

## 组件其实是状态机（State Machines）

React 把用户界面当作简单状态机。** 把用户界面想像成拥有不同状态然后渲染这些状态 **，可以轻松让用户界面和数据保持一致。

React 里，只需** 更新组件的 state **，然后根据新的 state __ 重新渲染__用户界面（不要操作 DOM）。React 来决定如何最高效地更新 DOM。