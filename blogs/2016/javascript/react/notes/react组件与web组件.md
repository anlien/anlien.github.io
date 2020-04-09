因为React和Web组件是用来解决不同问题的, 试图比较两者将不可避免地导致似是而非的结论。
Web组件为可复用组件提供了强大的封装, 而React则提供了一个使DOM与你的__数据同步__的声明式库。
两者的目标是互补的；工程师可以混合使用这些技术。作为一个开发者，你可以在你的Web组件中使用React，或者在React中使用Web组件，或者两者一起使用。


例子：
	```javascript		
	  // Define WebComponent
	  var proto = Object.create(HTMLElement.prototype, {
	    attachedCallback: {
	      value: function() {
	        var mountPoint = document.createElement('span');
	        this.createShadowRoot().appendChild(mountPoint);

	        var name = this.getAttribute('name');
	        var url = 'https://www.google.com/search?q=' + encodeURIComponent(name);
	        ReactDOM.render(<a href={url}>{name}</a>, mountPoint);
	      }
	    }
	  });

	  document.registerElement('x-search', {prototype: proto});

	  // Define React Component
	  class HelloMessage extends React.Component {
	    render() {
	      return <div>Hello <x-search name={this.props.name} />!</div>;
	    }
	  }

	  // Mount React Component (which uses WebComponent which uses React)
	  var container = document.getElementById('container');
	  ReactDOM.render(<HelloMessage name="Jim Sproch" />, container);
	```

> 注意:
>
> 两个组件系统的程序模型 (web 组件 与 react 组件) 区别在
> web组件通常暴露一个命令式的API (比如 一个 `video` web 组件可能暴露 `play()`与 `pause()` 函数)。 
> 因为web 组件的属性是声明式函数,他们应该可以执行, 但是如果要访问命令式API的一个web组件, 你将需要在组件上附加一个引用
> 并与DOM节点直接交互。如果你在使用第三方web组件, 我们推荐你写一个React组件作为你的web组件的封装。
> 
> 当前，一个由web组件触发的事件可能不能准确地在React渲染树中传递。
> 你将需要手动附加event handlers来在你的react组件中处理这些事件。
