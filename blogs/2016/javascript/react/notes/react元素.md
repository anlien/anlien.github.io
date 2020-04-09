## React

`React` 是 React 库的入口点。如果你使用预编译包中的一个，则 `React` 为全局变量；如果你使用 CommonJS 模块，React支持`require()` 它。

### React.Component

```javascript
class Component
```
__当使用ES6类定义时__,React.Component是React组件的基类。
使用方法：

	```javascript
	export class Counter extends React.Component {
	  constructor(props) {
	    super(props);
	    this.state = {count: props.initialCount};
	  }
	  tick() {
	    this.setState({count: this.state.count + 1});
	  }
	  render() {
	    return (
	      <div onClick={this.tick.bind(this)}>
	        Clicks: {this.state.count}
	      </div>
	    );
	  }
	}

	Counter.propTypes = { initialCount: React.PropTypes.number };
	Counter.defaultProps = { initialCount: 0 };

	```
>React.Component和React.createClass 的区别：

>* 设置state的方式不同。React.Component没有getInitialState方法，设置或初始state时是在构造函数中设置。在构造函数中设置`this.state = value`。
>* React.Component的Prop 验证设置方式不同。prop的验证是作为构造函数的静态属性设置，不是在class body中设置。
 * React.createClass是通过设置proptype属性来进行验证。（propTyoe尽量在开发阶段使用）。
>* Prop 的默认值设置方式不同，prop的默认值是作为构造的静态属性进行赋值，不是在Class body中设置。
 * React.createClass 是通过getDefaultProps方法进行设置

 #### React.Component 的API
	
	当渲染时，React 组件的实例在 React 内部被创建。这些实例在随后的渲染中被__重复使用__，并可以在组件方法中通过 `this` 访问。唯一的在 React 之外获取 React 组件实例句柄的方法是保存 `ReactDOM.render` 的返回值。在其它组件内，你可以使用 [refs](/react/docs/more-about-refs-zh-CN.html) 得到相同的结果。

##### setState

```javascript
void setState(
  function|object nextState,
  [function callback]
)
```
执行一个 nextState 到当前 state 的浅合并。这是你从事件处理器和服务器请求回调用来触发 UI 更新的主要手段。

第一个参数可以是一个对象（包含0或者多个keys来更新）或者一个（state 和 props的）函数，__它返回一个包含要更新的keys的对象__。

这里是一个简单的运用:

```javascript
setState({mykey: 'my new value'});
```

也可以以 `function(state, props)` 传递一个函数。当你想要把一个在设置任何值之前参考前一次 state+props 的值的原子更新放在队列中 这会有很用。例如，假如我们想在 state 增加一个值:

```javascript
//注意：参数是渲染前的state和当前的属性Props
setState(function(previousState, currentProps) {
  return {myInteger: previousState.myInteger + 1};
});
```

第二个（可选）的参数是一个将会在 `setState` 完成和组件被重绘后执行的回调函数。

> 注意:
>
> *绝对不要* 直接改变 `this.state`，因为之后调用 `setState()` 可能会替换掉你做的改变。把 `this.state` 当做是不可变的。
>
> `setState()` 不会立刻改变 `this.state`，而是创建一个即将处理的 state 转变。在调用该方法之后访问 `this.state` 可能会返回现有的值。
>
> 对 `setState` 的调用没有任何同步性的保证，并且调用可能会为了性能收益批量执行。
>
> `setState()` 将总是触发一次重绘，除非在 `shouldComponentUpdate()` 中实现了条件渲染逻辑。如果可变对象被使用了，但又不能在 `shouldComponentUpdate()` 中实现这种逻辑，仅在新 state 和之前的 state 存在差异的时候调用 `setState()` 可以避免不必要的重新渲染。

##### forceUpdate

```javascript
void forceUpdate(
  [function callback]
)
```

默认情况下，当你的组件的 state 或者 props 改变，你的组件将会重绘。然而，如果它们隐式的改变（例如：在对象深处的数据改变了但没有改变对象本身）或者如果你的 `render()` 方法依赖于其他的数据，你可以用调用  `forceUpdate()` 来告诉 React 它需要重新运行 `render()`。

调用 `forceUpdate()` 将会导致 `render()` 跳过 `shouldComponentUpdate()` 在组件上被调用，这会为子级触发正常的生命周期方法。包括每个子级的 `shouldComponentUpdate()` 方法。如果标记改变了，React 仍仅只更新 DOM。

通常你应该试着避免所有对 `forceUpdate()` 的使用并且在 `render()` 里只从 `this.props` 和 `this.state` 读取。这会使你的组件 "纯粹" 并且你的组件会更简单和高效。



### React.createClass

```javascript
ReactClass createClass(object specification)

```

给定一份规格（specification），创建一个组件类。组件通常要实现一个 `render()` 方法，它返回 **单个的** 子级。该子级可能包含任意深度的子级结构。组件与标准原型类的不同之处在于，你不需要对它们调用 new。  它们是为你在后台构造实例（通过 new）的便利的包装器。当渲染时，React 组件的实例在 React 内部被创建，这些实例在随后的渲染中被__重复使用__。

更多关于规格对象（specification object）的信息，请见 [组件规格和生命周期](/react/docs/component-specs-zh-CN.html) 。


### React.createElement

```javascript
ReactElement createElement(
  string/ReactClass type,
  [object props],
  [children ...]
)
```

创建并返回一个新的给定类型的 `ReactElement`。type 参数既可以是一个 html 标签名字符串（例如. “div”，“span”，等等），也可以是一个 `ReactClass` （用 `React.createClass` 创建的）。

### React.cloneElement

```
ReactElement cloneElement(
  ReactElement element,
  [object props],
  [children ...]
)
```

使用 `element` 作为起点，克隆并返回一个新的 `ReactElement` 。生成的 element 将会拥有原始 element 的 props 与新的 props 的浅合并。新的子级将会替换现存的子级。 不同于 `React.addons.cloneWithProps`，来自原始 element 的 `key` 和 `ref` 将会保留。对于合并任何 props 没有特别的行为（不同于 `cloneWithProps`）。更多细节详见[v0.13 RC2 blog post](/react/blog/2015/03/03/react-v0.13-rc2.html) 。


### React.createFactory

```javascript
factoryFunction createFactory(
  string/ReactClass type
)
```

返回一个生成给定类型的 ReactElements 的函数。如同 `React.createElement`，type 参数既可以是一个 html 标签名字符串（例如. “div”，“span”，等等），也可以是一个 `ReactClass` 。

createFactory只是一种模式,创建模式的目的是隔离与简化创建组件的过程。

例如使用工厂的例子：
	```javascript
		var factory = React.createFactory("li");
		var child1 = factory(null,"first Text content");
		var child2 = factory(null,'second Text content');
		var root = React.DOM.ul({className:'myLIst'},child1,child2);
		ReactDOM.render(root,document.getElementById("content"));
	```
	有点不必每次创建li元素。
	工厂化后，可以直接使用。用ReactClass与普通元素一致。

### React.isValidElement

```javascript
boolean isValidElement(* object)
```

验证对象是否是一个 ReactElement。


### React.DOM

`React.DOM` 用 `React.createElement` 为 DOM 组件提供了便利的__包装器__。该方式应该只在不使用 JSX 的时使用。例如，`React.DOM.div(null, 'Hello World!')`。


### React.PropTypes

`React.PropTypes` 包含了能与 组件的`propTypes` 对象一起使用的类型，用以验证传入你的组件的 props。更多有关 `propTypes` 的信息，请见 [可重用组件](/react/docs/reusable-components-zh-CN.html)。

### React.PropTypes  与 React.Children   api说的比较明确，不再做介绍。
React.Children.map
React.Children.forEach
React.Children.count
React.Children.only
React.Children.toArray


## ReactDOM

`react-dom` 包提供了 具体的DOM方法,这些方法可以在你的app的顶层作为一个你需要时脱离React模式的安全舱口 被使用.你的大多数组件不需要使用这个模块.

### ReactDOM.render

```javascript
ReactComponent render(
  ReactElement element,
  DOMElement container,
  [function callback]
)
```

渲染一个 ReactElement 到 DOM 里提供的 `容器（container）`中，并返回一个对 组件(或者返回 `null` 对于 [无状态组件](/react/docs/reusable-components-zh-CN.html#无状态函数)) 的[引用](/react/docs/more-about-refs.html)

如果 ReactElement 之前被渲染到了 `container` 中，这将对它执行一次更新，并仅变动需要变动的 DOM 来反映最新的 React 组件。

如果提供了可选的回调函数，则该函数将会在组件渲染或者更新之后被执行。

> 注意:
>
> `ReactDOM.render()` 控制你传入的 container 节点的内容。
>  当初次调用时，任何现存于内的 DOM 元素将被替换。
>  其后的调用使用 React的 diffing 算法来有效率的更新。
>
> `ReactDOM.render()` 不会修改 container 节点（只修改 container 的子级）。
>  将来，也许能够直接插入一个组件到已经存在的 DOM 节点而不覆盖
>  现有的子级。


### ReactDOM.findDOMNode

```javascript
DOMElement findDOMNode(ReactComponent component)
```
如果这个组件已经被挂载到了 DOM，它返回相应的浏览器原生的 DOM 元素。这个方法对于读取 DOM 的值很有用，比如表单域的值和执行 DOM 的测量。**在大多数情况下,你可以连接一个ref到DOM节点上,并避免使用 `findDOMNode`** 如果 `render` 返回 `null` 或者 `false`， `findDOMNode` 返回 `null`.

> 注意:
>
> `findDOMNode()` 是一个用来访问底层DOM节点的安全舱口.大多数情况下,使用这个安全舱口是不被鼓励的,因为它穿破了组件的抽象.
>
> `findDOMNode()` 只在已挂载的组件上工作(即是,已经被放置到DOM里的组件).如果你尝试在没有被挂载的组件上调用这个方法(比如在 一个没有被创建的组件的`render()`里 调用 `findDOMNode()` )会抛出一个异常.
>
> `findDOMNode()` 不能用在无状态组件.