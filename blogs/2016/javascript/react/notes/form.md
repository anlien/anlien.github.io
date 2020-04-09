## 交互属性

表单组件支持几个受用户交互影响的属性：

* `value`，用于 `<input>`、`<textarea>` 组件。
* `checked`，用于类型为 `checkbox` 或者 `radio` 的 `<input>` 组件。
* `selected`，用于 `<option>` 组件。

在 HTML 中，`<textarea>` 的值通过子节点设置；在 React 中则应该使用 `value` 代替。

表单组件可以通过 `onChange` 回调函数来监听组件变化。当用户做出以下交互时，`onChange` 执行并通过浏览器做出响应：

* `<input>` 或 `<textarea>` 的 `value` 发生变化时。
* `<input>` 的 `checked` 状态改变时。
* `<option>` 的 `selected` 状态改变时。

和所有 DOM 事件一样，所有的 HTML 原生组件都支持 `onChange` 属性，而且可以用来监听冒泡的 `change` 事件。

> 注意:
>
> 对于 `<input>` and `<textarea>`， `onChange` 取代 — 一般应该用来替代 — DOM内建的 [`oninput`](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/oninput) 事件处理。



为什么使用受控组件？

在 React 中使用诸如 `<input>` 的表单组件时，遇到了一个在传统 __HTML__ 中没有的挑战。比如下面的代码：

```html
  <input type="text" name="title" value="Untitled" />
```

它渲染一个*初始值*为 `Untitled` 的输入框。当用户改变输入框的值时，节点的 `value` 属性( *property*)将随之变化，但是 `node.getAttribute('value')` 还是会返回初始设置的值 `Untitled`.

与 HTML 不同，__React 组件必须在任何时间点表现视图的状态，而不仅仅是在初始化时。__比如在 React 中：

```javascript
  render: function() {
    return <input type="text" name="title" value="Untitled" />;
  }
```

由于这个方法描述了在任意时间点上的视图，那么文本输入框的值就应该*始终*为 `Untitled`。

这也就是为什么定时器数字变化，而输入框中的值不变：
	React 组件必须在任何时间点表现视图的状态，而不仅仅是在初始化时。


