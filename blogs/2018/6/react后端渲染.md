* [AlloyTeam:从零开始React服务器渲染](http://www.alloyteam.com/2017/01/react-from-scratch-server-render/)
* [react-router](https://reacttraining.com/react-router/web/example/basic)

### server render
* [react server render](https://github.com/zeit/next.js/)
* [react-snap](https://github.com/stereobooster/react-snap/blob/master/doc/alternatives.md)
* [creating-an-app](https://github.com/facebook/create-react-app#creating-an-app)
* [Pre-Rendering into Static HTML Files](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#pre-rendering-into-static-html-files)
预渲染的主要好处是，无论您的JavaScript包是否成功下载，您都可以使用HTML有效内容获取每个页面的核心内容。它也增加了您的应用程序的每条路线将被搜索引擎拾取的可能性。



* [stackoverflow server render ](https://stackoverflow.com/questions/27290354/reactjs-server-side-rendering-vs-client-side-rendering/27291188#27291188)


For a given website / web-application, you can use react either client-side, server-side or both.

Client-Side
Over here, you are completely running ReactJS on the browser. This is the simplest setup and includes most examples (including the ones on http://reactjs.org). The initial HTML rendered by the server is a placeholder and the entire UI is rendered in the browser once all your scripts load.

Server-Side
Think of ReactJS as a server-side templating engine here (like jade, handlebars, etc...). The HTML rendered by the server contains the UI as it should be and you do not wait for any scripts to load. Your page can be indexed by a search engine (if one does not execute any javascript).

Since the UI is rendered on the server, none of your event handlers would work and there's no interactivity (you have a static page).

Both
Here, the initial render is on the server. Hence, the HTML received by the browser has the UI as it should be. Once the scripts are loaded, the virtual DOM is re-rendered once again to set up your components' event handlers.

Over here, you need to make sure that you re-render the exact same virtual DOM (root ReactJS component) with the same props that you used to render on the server. Otherwise, ReactJS will complain that the server-side and client-side virtual DOMs don't match.

Since ReactJS diffs the virtual DOMs between re-renders, the real DOM is not mutated. Only the event handlers are bound to the real DOM elements.


#### react-router-server-rendering
* [react-dom-server](https://reactjs.org/docs/react-dom-server.html#)
 服务端渲染的优势：
 * the initial request for faster page loads
 * allow search engines to crawl your pages for SEO purposes.
  use renderToString on the server and ReactDOM.hydrate() on the client.

#### react.hydrate
参考react-dom/client/ReactDOM.js:
hydrate:

> render(): Calling ReactDOM.render() to hydrate server-rendered markup will stop working in React v17. Replace the ReactDOM.render() call with ReactDOM.hydrate() if you want React to attach to the server HTML.

React expects that the rendered content is identical between the server and the client.

suppressHydrationWarning = {true} 来消除不同元素的警告。

If you’d rather play it safe, you have a few options:

Bind methods in the constructor.
Use arrow functions, e.g. onClick={(e) => this.handleClick(e)}.
Keep using createReactClass.


* [server rendering ](https://tylermcginnis.com/react-router-server-rendering/)
* [server rendering code](https://github.com/tylermcginnis/rrssr)
* 
### 未看
* [react-server-example](https://github.com/mhart/react-server-example)
* [服务端渲染](https://juejin.im/post/5a0536346fb9a044fe45d33a)
* [详解react/redux的服务端渲染：页面性能与SEO](http://www.cnblogs.com/penghuwan/p/7126054.html)