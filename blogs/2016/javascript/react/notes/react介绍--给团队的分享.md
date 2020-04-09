>这篇文章是用来分享使用的。个人学了这么久的React，需要给组员进行分享。
>理解有不到位的地方，请斧正！

###React诞生
React 是一个 Facebook 和 Instagram 用来创建用户界面的 JavaScript 库。

###React与众不同之处？
 React实现了一个浏览器无关的dom系统和事件处理。
 React 里只需把事件处理器（event handler）以骆峰命名（camelCased）形式当作组件的 props 传入即可，就像使用普通 HTML 那样。React 内部创建一套合成事件系统来使所有事件在 IE8 和以上浏览器表现一致。事件处理器接收到的 events 参数与 W3C 规范 一致，无论你使用哪种浏览器。

### 什么是React？
创建React是为了解决一个问题：构建随着时间数据不断变化的大规模应用数据。React仅仅只要表达出你的应用程序在任一个时间点应该呈现的样子，然后当底层的数据变了，React 会自动处理所有用户界面的更新。

####例子
```js
	var Counter = React.createClass({
		getInitialState:function(){
			return { count: 0 };
		},
		handleClick:function(){
			this.setState({
				count:this.state.count+1
			});
		},
		render:function(){
			return (
				<button onClick={this.handleClick}>Click me! Number of clicks: {this.state.count}</button>
			)
		}
	});
	ReactDOM.render(<Counter/>,document.getElementById('container'))
```
这个例子中并没有操作button中count的js，只是更改state的值来实现更改。只更改数据，不管dom的渲染。

###React中数据更新方式
 React 把用户界面当作简单状态机。React只需更新组件的 state，然后根据新的 state 重新渲染用户界面（不要操作 
 DOM）。React 来决定如何最高效地更新 DOM。

###React的更新---虚拟dom
React用一种更快的内置仿造dom来操作差异，为React计算出效率最高的dom改变。React维持了一个快速的内存中的DOM表示。render() 方法实际上返回一个对DOM的描述，然后React能将其与内存中的“描述”进行比较，以计算出最快速的方式更新浏览器。

###React组件
React组件非常简单，它们就是简单的函数，接受props和stae作为参数，然后渲染出html。

###React也是函数
```js

function FancyCheckbox(props) {
  var { checked, ...other } = props;
  var fancyClass = checked ? 'FancyChecked' : 'FancyUnchecked';
  // `other` 包含 { onClick: console.log } 但 checked 属性除外
  return (
    <div {...other} className={fancyClass} />
  );
}

ReactDOM.render(
  <FancyCheckbox checked={true} onClick={console.log.bind(console)}>
    Hello world!
  </FancyCheckbox>,
  document.getElementById('example')
);

```

###React兼容性
React实现了一个完备的合成事件（synthetic event）系统，以使得所有的事件对象都被保证符合W3C细则，而不论各个浏览器的怪癖，并且所有事件跨浏览器地一致并高效的冒泡（bubbles），你甚至能在IE8里使用一些HTML5事件！
大多数时间你应该和React的"伪造浏览器"呆在一起，因为它更高性能并且容易推理。

###React与传统的差异？
* 在使用jQuery操作dom时，不仅要管理前端缓存的数据，还要进行dom的修改操作。
* React是通过直接修改数据来实现dom的操作，并利用差异化来实现渲染，省去了操作dom的步骤。

* 使用jquery编写的组件时，dom元素一般是片段的，是嵌套好的。复用性较差，通用的东西不多。jQuery使用别人的组件时，一般会有较多的冗余，或者需要重新打包组装。
* React可以拼接组装，组件简单易用。细分化可以增加组件的复用性，编写好的组件可以积累。还可以利用网上的资源，使用大牛的组件。React组件一般是单独的，使用起来也不会有其它组件的冗余。
