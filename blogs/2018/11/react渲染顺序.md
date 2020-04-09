### 服务端渲染react
```js
/*测试组件 app.js组件*/
var React = require('react');
class MyComponent extends React.Component {
    render() {
      return <div>Hello World</div>;
    }
}
module.exports = MyComponent;
```
```js
/**启动组件*/
const Koa = require("koa");
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const MyComponent = require("./app.js");
const React = require("react");
const ReactDOMServer = require('react-dom/server');

router.get("/",(ctx,next) => {
    const body = ReactDOMServer.renderToString(<MyComponent/>);
    console.log("body",body);
    ctx.body = "根目录" + body;
});
app.use(router.routes());
app.listen(3000);
```
报错：不支持jsx语法的问题。

### jsx 与 js组件
jsx与js组件区别在创建组件。请看*example/logger/js/logger.js* 和 *example/logger/jsx/logger.jsx*


#### 想解决的问题
在node端中直接渲染jsx

#### 解决方法
* npm install -d babel-cli 
* npm install -d babel-preset-react
* 在package.json中script：{ "start" : "babel-node ./server/server.js --presets react"}
* 启动 npm run start


#### 生命周期回顾
例子是*example/logger/js/logger.js*。
* 1.constructor
* 2.componentWillMount
* 3.**render**
* 4.<span style="color:red;">**componentDidMount**</span>

* 5.componentWillReceiveProps
* 6.shouldComponentUpdate
* 7.componentWillUpdate
* 8.**render**
* 9.componentDidUpdate

* 10.componentWillReceiveProps
* 11.shouldComponentUpdate
* 12.componentWillUpdate
* 13.**render**
* 14.componentDidUpdate

* 15.componentWillUnmount


### 参考
* [reactquickly](https://github.com/ioriwitte/reactquickly)
* [react16.x中服务端渲染SSR](https://github.com/forthealllight/blog/issues/7)
* [babel-preset-react](https://www.npmjs.com/package/babel-preset-react)
