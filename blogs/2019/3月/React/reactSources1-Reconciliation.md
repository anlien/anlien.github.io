
#### Reconciliation
When a component’s props or state change, React decides whether an actual DOM update is necessary by comparing **the newly returned element with the previously rendered one**. When they are not equal, React will update the DOM. This process is called “reconciliation”.[引用](https://reactjs.org/docs/glossary.html#reconciliation)


[详细内容](https://reactjs.org/docs/reconciliation.html)

Motivation目的

When you use React, at a single point in time you can think of the render() function as creating a tree of React elements. **On the next state or props update, that render() function will return a different tree of React elements**. **React then needs to figure out how to efficiently update the UI to match the most recent tree.**（当你使用React，在单一时间点你可以考虑render()函数作为创建React元素的树。在下一次状态或属性更新，render()函数将返回一个不同的React元素的树。React需要算出如何高效更新UI以匹配最新的树）

React implements a heuristic O(n) algorithm based on two assumptions:（React基于两点假设，实现了一个启发的O(n)算法：）

1.Two elements of different types will produce different trees.（个不同类型的元素将产生不同的树）

2.The developer can hint at which child elements may be stable across different renders with a key prop.（通过渲染器附带key属性，开发者可以示意哪些子元素可能是稳定的。）

The Diffing Algorithm 对比算法：

When diffing two trees, React first compares the two root elements. The behavior is different depending on the types of the root elements.（当对比两棵树时，React首先比较两个根节点。根节点的type不同，其行为也不同。）

* Elements of Different Types

  > Whenever the root elements have different types, React will tear down the old tree and build the new tree from scratch.

  >When tearing down a tree, old DOM nodes are destroyed. Component instances receive componentWillUnmount(). When building up a new tree, new DOM nodes are inserted into the DOM. Component instances receive componentWillMount() and then componentDidMount(). Any state associated with the old tree is lost.

  >Any components below the root will also get unmounted and have their state destroyed.

* DOM Elements Of The Same Type
  > When comparing two React DOM elements of the same type, **React looks at the attributes of both**, keeps the same underlying DOM node, **and only updates the changed attributes**.After handling the DOM node, React then recurses on the children

* Component Elements Of The Same Type

  >When a component updates, **the instance stays the same**, so that state is maintained across renders. React updates the props of the underlying component instance to match the new element, and calls componentWillReceiveProps() and componentWillUpdate() on the underlying instance.

  >Next, the render() method is called and the diff algorithm recurses on the previous result and the new result.


Recursing On Children

By default, when recursing on the children of a DOM node, React just iterates over both lists of children at the same time and generates a mutation whenever there’s a difference.

Tradeoffs

It is important to remember that the reconciliation algorithm is an implementation detail. **React could rerender the whole app on every action; the end result would be the same**. Just to be clear, rerender in this context means calling render for all components, it doesn’t mean React will unmount and remount them. It will only apply the differences following the rules stated in the previous sections.(重要的是要记住，协调算法是一个实现细节.React可以在每个动作上重新呈现整个应用程序; 最终结果是一样的。)


### 汇总reconciliation
* [react-fiber-architecture](https://github.com/acdlite/react-fiber-architecture)
* [react-fiber-architecture中文](https://github.com/xxn520/react-fiber-architecture-cn)


React 用来比较两棵树的算法，它确定树中的哪些部分需要被更新。

React的API的核心思想是将更新视为导致整个应用程序重新呈现。

Reconciliation is the algorithm behind what is popularly understood as the "virtual DOM." A high-level description goes something like this: when you render a React application, a tree of nodes that describes the app is generated and saved in memory. This tree is then flushed to the rendering environment — for example, in the case of a browser application, it's translated to a set of DOM operations. When the app is updated (usually via setState), a new tree is generated. The new tree is diffed with the previous tree to compute which operations are needed to update the rendered app.

Reconciliation 是被大家广泛知晓的 "virtual DOM" 背后的算法。更加高层的描述如下：当渲染一个 React 应用，会生成一棵描述应用结构的节点树，并保存在内存中。这棵树随后被刷新到渲染环境。举例来说，我们的浏览器环境，它会转换为一个 DOM 操作的集合。当应用更新的时候（通常是通过 setState 触发），会生成一棵新的树。新树会和先前的树进行对比，并计算出更新应用所需要的操作。

Although Fiber is a ground-up rewrite of the reconciler, the high-level algorithm described in the React docs will be largely the same。

#### Reconciliation versus rendering

The DOM is just one of the rendering environments React can render to, the other major targets being native iOS and Android views via React Native. (This is why "virtual DOM" is a bit of a misnomer.)DOM 仅仅是 React 支持的一个渲染环境，通过 React Native 它还可以支持原生 iOS 和 Android 页面的渲染。

The reason it can support so many targets is because React is designed so that reconciliation and rendering are separate phases. The reconciler does the work of computing which parts of a tree have changed; the renderer then uses that information to actually update the rendered app. React 之所以能够支持如此多的渲染环境，主要是因为在设计上，reconciliation 和rendering两个过程是分离的。reconciler 完成计算树的哪些部分已经改变的工作。然后renderer使用该信息来实际更新渲染的应用程序。

This separation means that React DOM and React Native can use their own renderers while sharing the same reconciler, provided by React core.

**Fiber reimplements the reconciler**. It is not principally concerned with rendering, though renderers will need to change to support (and take advantage of) the new architecture.