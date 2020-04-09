## 组件的生命周期

组件的生命周期有三个主要部分：

* **挂载:** 组件被注入DOM。
* **更新:** 组件被重新渲染来决定DOM是否应被更新。
* **卸载:** 组件从DOM中被移除。

React提供生命周期方法，以便你可以指定钩挂到这个过程上。我们提供了 **will** 方法，该方法在某事发生前被调用，**did**方法，在某事发生后被调用。

### 挂载

* `getInitialState(): object` 在组件挂载前被调用。有状态组件(Stateful components) 应该实现此函数并返回初始state的数据。
* `componentWillMount()` 在挂载发生前被立即调用。
* `componentDidMount()` 在挂载发生后被立即调用。 需要DOM node的初始化应该放在这里。


### componentWillMount

```javascript
void componentWillMount()
```

被调用一次,即在客户端也在服务端,在最初的渲染发生之前 立即被调用.如果你在这个方法里调用 `setState` , `render()` 将会看到更新的 state 并不论state的变化只执行一次.

### componentDidMount
```javascript
void componentDidMount()
```
被调用一次,只在客户端(不在服务端),在最初的渲染发生之后 立即被调用.在生命周期的这个点上,你可以访问任何对你的子级的refs (比如 访问底层的DOM表达).子组件的 `componentDidMount()` 方法**在父组件之前被调用**.

如果你想与其他 JavaScript 框架整合,用 `setTimeout` 或 `setInterval` 设置timers,或者发送 **AJAX **请求,执行这些操作在此方法中.



### 更新

* `componentWillReceiveProps(object nextProps)` 当挂载的组件接收到新的props时被调用。此方法应该被用于比较`this.props` 和 `nextProps`以用于使用`this.setState()`执行状态转换。
* `shouldComponentUpdate(object nextProps, object nextState): boolean` 当组件决定任何改变是否要更新到DOM时被调用。作为一个优化实现比较`this.props` 和 `nextProps` 、`this.state` 和 `nextState` ，如果React应该跳过更新，返回`false`。
* `componentWillUpdate(object nextProps, object nextState)` 在更新发生前被立即调用。你不能在此调用`this.setState()`。
* `componentDidUpdate(object prevProps, object prevState)` 在更新发生后被立即调用。

### componentWillReceiveProps

```javascript
void componentWillReceiveProps(
  object nextProps
)
```

当一个组件收到新的props时被调用.这个方法不会为最初的渲染调用.

使用它作为响应 prop 转换的时机(在`render()` 被用 `this.setState()` 更新state调用 之前) .旧的 props 可以通过 `this.props` 访问. 在这个函数里调用 `this.setState()` 不会触发任何额外的渲染.

```javascript
componentWillReceiveProps: function(nextProps) {
  this.setState({
    likesIncreasing: nextProps.likeCount > this.props.likeCount
  });
}
```

> 注意:
>
> 并没有类似的 `componentWillReceiveState` 方法. 一个即将到来的 prop 转变可能会导致一个 state 变化,但是反之不是. 如果你需要实现一个对 state 变化相应的操作,使用 `componentWillUpdate`.

### shouldComponentUpdate

```javascript
boolean shouldComponentUpdate(
  object nextProps, object nextState
)
```

当新的props或者state被收到,在渲染前被调用.这个方法不会在最初的渲染或者 `forceUpdate` 时被调用.

使用此方法作为一个 `return false` 的时机,当你确定新的 props 和 state 的转换不需要组件更新时.

```javascript
shouldComponentUpdate: function(nextProps, nextState) {
  return nextProps.id !== this.props.id;
}
```

如果 `shouldComponentUpdate` 返回false, `render()` 会在下次state变化前被完全跳过. 另外,`componentWillUpdate` 和 `componentDidUpdate` 将不会被调用.

默认情况下, `shouldComponentUpdate` 总是返回 `true` 来阻止当 `state` 突变时的细微bug,但是如果你仔细的把 `state` 作为不变量对待并只从 `render()`里的 `props` 和 `state`读,你就可以用一个比较旧的props和state与他们的替换者的实现来重写 `shouldComponentUpdate`.


如果性能是瓶颈,尤其是随着成百上千的组件,使用 `shouldComponentUpdate` 来加速你的app.

###  componentWillUpdate

```javascript
void componentWillUpdate(
  object nextProps, object nextState
)
```

当新的props或者state被接受时,在渲染前被立即调用.这个方法不会被初始渲染调用.

使用这个方法作为 在更新发生前执行一些准备 的时机.

> Note:
>
> 你 *不能* 在这个方法里使用 `this.setState()` .如果你需要响应一个prop变化来更新state,使用 `componentWillReceiveProps` 来替代.


###  componentDidUpdate

```javascript
void componentDidUpdate(
  object prevProps, object prevState
)
```

在组件的更新被刷新到DOM后立即被调用.这个方法不会被初始渲染调用.

使用这个方法作为 当组件被更新后在DOM上操作 的时机.


### 卸载

* `componentWillUnmount()` 在组件被卸载和摧毁前被立即调用。清理应该放在这里。

```javascript
void componentWillUnmount()
```

在组件被从DOM卸载 前 被立即调用.

在这个方法里执行一些必要的清理操作,比如无效化 timers 或者清理任何被 `componentDidMount` 创建的DOM元素.


### 已挂载的方法

_Mounted_ 复合组件同样支持以下方法:

* `component.forceUpdate()` 可以在任何已挂载的组件上调用，在你知道某些深处的组件状态在未使用 `this.setState()` 就被改变了时。


## 浏览器支持

React 支持绝大多数流行的浏览器，包括 Internet Explorer 9 及以上。

（我们不支持那些不支持 ES5 methods 的更老的浏览器，但你可能发现如果你的页面包含了类似 [es5-shim and es5-sham](https://github.com/es-shims/es5-shim) 的填充物时是可以在更老的浏览器上运行的。是否做这一步取决于你自己。）
