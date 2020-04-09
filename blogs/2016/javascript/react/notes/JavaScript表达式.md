###Javascript 表达式

### 属性表达式

要使用 JavaScript 表达式作为属性值，只需把这个表达式用一对大括号 (`{}`) 包起来，不要用引号 (`""`)。

```javascript
// 输入 (JSX):
var person = <Person name={window.isLoggedIn ? window.name : ''} />;
// 输出 (JS):
var person = React.createElement(
  Person,
  {name: window.isLoggedIn ? window.name : ''}
);
```

### Boolean 属性

省略一个属性的值会导致JSX把它当做 `true`。要传值 `false`必须使用属性表达式。这常出现于使用HTML表单元素，含有属性如`disabled`, `required`, `checked` 和 `readOnly`。

```javascript
// 在JSX中，对于禁用按钮这二者是相同的。
<input type="button" disabled />;
<input type="button" disabled={true} />;

// 在JSX中，对于不禁用按钮这二者是相同的。
<input type="button" />;
<input type="button" disabled={false} />;
```

### 子节点表达式

同样地，JavaScript 表达式可用于描述子结点：

```javascript
// 输入 (JSX):
var content = <Container>{window.isLoggedIn ? <Nav /> : <Login />}</Container>;
// 输出 (JS):
var content = React.createElement(
  Container,
  null,
  window.isLoggedIn ? React.createElement(Nav) : React.createElement(Login)
);
```

### 注释

JSX 里添加注释很容易；它们只是 JS 表达式而已。你仅仅需要小心的是当你在一个标签的子节点块时，要用 `{}` 包围要注释的部分。

```javascript
var content = (
  <Nav>
    {/* child comment, 用 {} 包围 */}
    <Person
      /* 多
         行
         注释 */
      name={window.isLoggedIn ? window.name : ''} // 行尾注释
    />
  </Nav>
);
```

> 注意:
>
> JSX 类似于 HTML，但不完全一样。参考 [JSX 陷阱](/react/docs/jsx-gotchas-zh-CN.html) 了解主要不同。


## 展开属性（Spread Attributes）

现在你可以使用 JSX 的新特性 - 展开属性：

```javascript
  var props = {};
  props.foo = x;
  props.bar = y;
  var component = <Component {...props} />;
```

传入对象的属性会被复制到组件内。

它能被多次使用，也可以和其它属性一起用。注意顺序很重要，后面的会覆盖掉前面的。

```javascript
  var props = { foo: 'default' };
  var component = <Component {...props} foo={'override'} />;
  console.log(component.props.foo); // 'override'
```

## 这个奇怪的 `...` 标记是什么？

这个 `...` 操作符（增强的操作符）已经被 [ES6 数组](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator) 支持。相关的还有 ECMAScript 规范草案中的 [Object 剩余和展开属性（Rest and Spread Properties）](https://github.com/sebmarkbage/ecmascript-rest-spread)。我们利用了这些还在制定中标准中已经被支持的特性来使 JSX 拥有更优雅的语法。

###延伸展开属性
添加style的属性
```javascript
	var HelloMessage = React.createClass({
		render:function(){
			return (<p style={{color:"red"}}>hello</p>)
		}
	})
```


此处给style添加属性时，使用了双括号！
