### react-server-example 

在服务端渲染静态html，在客户端根据APP_PROPS中的数据，然后渲染交互。
```js
    // The actual server-side rendering of our component occurs here, and we pass our data in as `props`. 
    // This div is the same one that the client will "render" into on the browser from browser.js
    div({
    id: 'content',
    dangerouslySetInnerHTML: {__html: ReactDOMServer.renderToString(App(props))},
    }),
    // The props should match on the client and server, so we stringify them on the page to be available for access by the code run in browser.js
    // You could use any var name here as long as it's unique
    script({
      dangerouslySetInnerHTML: {__html: 'var APP_PROPS = ' + safeStringify(props) + ';'},
    }),
```
server.js中，在渲染页面时将数据注入到 APP_PROPS。
```js
   // The props should match on the client and server, so we stringify them on the page to be available for access by the code run in browser.js
      // You could use any var name here as long as it's unique
      script({
        dangerouslySetInnerHTML: {__html: 'var APP_PROPS = ' + safeStringify(props) + ';'},
      }),
```
在server.js中，打包工具使用的是browserify，另外文件也使用了缓存。

在 browser.js：This script will run in the browser and will render our component using the value from APP_PROPS that we generate inline in the page's html on the server.
```js
  ReactDOM.render(App(window.APP_PROPS), document.getElementById('content'))
```

### 参考
* [参考 react-server-example](https://github.com/mhart/react-server-example)