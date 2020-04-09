键值：
	当没有唯一标识的时候，可以给组件模型添加一个新的 ID 属性，或者计算部分内容的哈希值来生成一个键值。
	记住，键值仅需要在兄弟节点中唯一，而不是全局唯一。

React节点：
	一个ReactNode可以是：
		* ReactElement
		* string(又名ReactText)
		* number (又名ReactText)
		* ReactNode 实名数组(又名ReactFragment)

React组件：
	使用React开发中，可以__仅__使用ReactElement实例，但充分利用React，就要使用ReactComponent来封装状__态化的组件__。

	一个ReactComponent类就是一个简单的Javascript类（或者说是“构造函数”）。

	当该构造函数调用的时候，应该会返回一个对象，该对象至少带有一个 render 方法。该对象指向一个 ReactComponent 实例。

	除非为了测试，正常情况下不要自己调用该构造函数。React 帮你调用这个函数。
	
	把 ReactComponent 类传给 createElement，就会得到一个 ReactElement 实例。

	当该实例传给 React.render 的时候，React 将会调用构造函数，然后创建并返回一个 ReactComponent。

	如果一直用相同的 ReactElement 类型和相同的 DOM 元素容器调用 React.render，将会总是返回相同的实例。该实例是状态化的。

	```js
		var componentA = React.render(<MyComponent />, document.body);
		var componentB = React.render(<MyComponent />, document.body);
		componentA === componentB; // true
	```


####入口点（Entry Point）
```js
	React.render = (ReactElement, HTMLElement | SVGElement) => ReactComponent;
```

####节点和元素（Nodes and Elements）
```js
	type ReactNode = ReactElement | ReactFragment | ReactText;

	type ReactElement = ReactComponentElement | ReactDOMElement;

	type ReactDOMElement = {
	  type : string,
	  props : {
	    children : ReactNodeList,
	    className : string,
	    etc.
	  },
	  key : string | boolean | number | null,
	  ref : string | null
	};

	type ReactComponentElement<TProps> = {
	  type : ReactClass<TProps>,
	  props : TProps,
	  key : string | boolean | number | null,
	  ref : string | null
	};

	type ReactFragment = Array<ReactNode | ReactEmpty>;

	type ReactNodeList = ReactNode | ReactEmpty;

	type ReactText = string | number;

	type ReactEmpty = null | undefined | boolean;
```

#### 类和组件（Classes and Components）
```js
	type ReactClass<TProps> = (TProps) => ReactComponent<TProps>;

	type ReactComponent<TProps> = {
	  props : TProps,
	  render : () => ReactElement
	};
```


