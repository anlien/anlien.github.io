### router.js

This is a very basic router, shared between the server (in server.js) and
browser (in App.js).

A basic routing resolution function to go through each route and see if the given URL matches. 
If so we return the route key and data-fetching function the route's component has declared (if any).

### app.js
```js
//state
 this.setState({routeKey: route.key, data: data})

  // We look up the current route via its key, and then render its component
  // passing in the data we've fetched, and the click handler for routing
  render: function() {
        return React.createElement(router.routes[this.state.routeKey].component, {data: this.state.data, onClick: this.handleClick})
   },

```
在外层控制组件输入数据，然后渲染数据。

### 参考
* [react-server-routing-example](https://github.com/mhart/react-server-routing-example)

非常好的例子。