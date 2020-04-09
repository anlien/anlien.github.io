# [Update on Async Rendering](https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html)
* 16.3对 componentWillMount 、componentWillReceiveProps、componentWillUpdate将添加UNSAFE_
* 17.0 将移除 componentWilllMount、 componentWillReceiveProps、componentWillUpdate.

### 原因：
* 1.Like componentWillUpdate, componentWillReceiveProps might get called multiple times for a single update.[参考](side-effects-on-props-change)
* 2.对于异步渲染，在 'render' 和 'commit' 之间存在延迟。 例如，如果在此期间，用户调整窗口大小，在componentWillUpdate读取的值，将过时。
* 3.componentWillMount： React总是在render之后执行componentWillMount。componentWillMount的效果和componentDidMount 效果基本等效。

此处只做些小结，具体看原文。

## 新生命周期：getDerivedStateFromProps
getDerivedStateFromProps is invoked right before calling the render method, both on the initial mount and on subsequent updates. It should return an object to update the state, or null to update nothing.

Note that this method is fired on every render, regardless of the cause. This is in contrast to UNSAFE_componentWillReceiveProps, which only fires when the parent causes a re-render and not as a result of a local setState.

getDerivedStateFromProps 存在只有一个目的。它使组件能够根据props的更改来更新其内部state.

 

## 新生命周期：getSnapshotBeforeUpdate
getSnapshotBeforeUpdate() is invoked right before the most recently rendered output is committed to e.g. the DOM.It enables your component to capture some information from the DOM (e.g. scroll position) before it is potentially changed.Any value returned by this lifecycle will be passed as a parameter to componentDidUpdate().

A snapshot value (or null) should be returned

### 兼容包
在React 16.3发布时，同时也发布了兼容包[react-lifecycles-compat](https://github.com/reactjs/react-lifecycles-compat).