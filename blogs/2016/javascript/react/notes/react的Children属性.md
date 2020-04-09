###起因：
	通过复用那些接口定义良好的组件来开发新的模块化组件。

###从属关系的建立
	`拥有者` 就是给其它组件设置 `props` 的那个组件。
	更正式地说，如果组件 `Y` 在 `render()` 方法是创建了组件 `X`，那么 `Y` 就拥有 `X`。
	组件不能修改自身的 `props` - 它们总是与它们的拥有者所设置的值保持一致。这是保持用户界面一致性的基本不变量。
	
	

	例如：
	```javascript
		var Avatar = React.createClass({
		  render: function() {
		    return (
		      <div>
		        <PagePic pagename={this.props.pagename} />
		        <PageLink pagename={this.props.pagename} />
		      </div>
		    );
		  }
		});
	```
	把从属关系与父子关系加以区别至关重要。从属关系是 React 特有的，而父子关系简单来讲就是 DOM 里的标签的关系。在上一个例子中，`Avatar` 拥有 `div`、`PagePic` 和 `PageLink` 实例，`div` 是 `PagePic` 和 `PageLink` 实例的**父级**（但不是拥有者）。

##子级
	实例化 React 组件时，你可以在开始标签和结束标签之间引用在React 组件或者Javascript 表达式：

	例如：
	```javascript

	    var Parent = React.createClass({
	      render:function(){
	        return <a {...this.props}> {'√'} { this.props.children } </a>
	      }
	    });

	    ReactDOM.render(
	        <Parent href="/checked.html">
	        	<Child />
	        	click here!
	        	<p>p children</p>
	        	<input type="text"/>
	        </Parent>
	      ,document.getElementById("container")
	    );
	```
	`Parent` 能通过专门的 `this.props.children`  prop 读取子级。**`this.props.children` 是一个不透明的数据结构：** 通过 [React.Children 工具类](/react/docs/top-level-api.html#react.children) 来操作。

### `React.Children`
	`React.Children` 为处理不透明的数据结构提供了 `this.props.children` 这个工具。

#### React.Children.map

```javascript
array React.Children.map(object children, function fn [, object thisArg])
```

在每一个包含在 `children` 中的直接子级上调用 `fn` ，`fn`中的 `this` 设置为 `thisArg`。如果 `children` 是一个嵌套的对象或者数组，它将被遍历：`fn`中不会传入容器对象。如果 children 是 `null` 或者 `undefined`，则返回 `null` 或者 `undefined` 而不是一个空数组。

#### React.Children.forEach

```javascript
React.Children.forEach(object children, function fn [, object thisArg])
```

类似 `React.Children.map()`，但是不返回数组。

#### React.Children.count

```javascript
number React.Children.count(object children)
```

返回 `children` 中的组件总数，相等于传递给 `map` 或者 `forEach` 的回调函数应被调用次数。

#### React.Children.only

```javascript
object React.Children.only(object children)
```

返回 `children` 中仅有的子级。否则抛出异常。

#### React.Children.toArray

```javascript
array React.Children.toArray(object children)
```

以赋key给每个child的平坦的数组形式,返回不透明的 `children` 数据结构.如果你想操纵你的渲染方法的子级的合集这很有用,尤其如果你想在 `this.props.children` 传下之前渲染或者切割.



__this.props.childre是__是直接读取子项,在元素中直接访问。
其余的为React.children 的方法.