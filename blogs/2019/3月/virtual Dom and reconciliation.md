### 为什么叫 virtual Dom
React was originally created for the DOM but it was later adapted to also support native platforms with React Native. This introduced the concept of “renderers” to React internals.
React最初是为DOM创建的，但后来经过调整，也支持使用React native的本机平台。这引入了“渲染器”的概念来响应内部。

The virtual DOM is a concept implemented by libraries in JavaScript on top of browser APIs.虚拟DOM是一个由JavaScript库在浏览器api之上实现的概念。

### [What is the Virtual DOM?](https://reactjs.org/docs/faq-internals.html#what-is-the-virtual-dom)

The virtual DOM (VDOM) is a programming concept where an ideal, or “virtual”, representation of a UI is kept in memory and synced with the “real” DOM by a library such as ReactDOM. This process is called reconciliation.

Since “virtual DOM” is more of a pattern than a specific technology, people sometimes say it to mean different things. In React world, the term “virtual DOM” is usually associated with React elements since they are the objects representing the user interface. React, however, also uses internal objects called “fibers” to hold additional information about the component tree. They may also be considered a part of “virtual DOM” implementation in React.
'virtual Dom' 跟多的是一种模式，而不是一种特定的技术，人们有时会说它意味着不同的东西。在React世界中，术语“虚拟DOM”通常与React元素相关联，因为它们是表示用户界面的对象。但是，React还使用称为“fiber”的内部对象来保存有关组件树的其他信息。“fibers”也可以被认为是React中“虚拟DOM”实现的一部分。

### What is 'React Fiber'
Fiber is the new reconciliation engine in React 16. Its main goal is to enable incremental rendering of the virtual DOM.
Fiber 是React 16中新的和解引擎。fiber的目标是能够增量渲染virtual DOM。

### 称为 virtual dom 合适吗？
1.The DOM is just one of the rendering environments React can render to, the other major targets being native iOS and Android views via React Native. (This is why "virtual DOM" is a bit of a misnomer.)

总结以上几个点：
* 1.React最初只有Dom，所以有虚拟dom一说(自己注：在16之前)。
* 2.因为说起“virtual DOM”有一部分人说是一个特定的技术，更多人说是一种模式。存在人们的理解是不同的。
* 3.通常virtual DOM指的是 UI的表示形式保存在内存中，并通过诸如ReactDOM之类的库与“实际”DOM同步.在16版之后，Ui的信息基本存在fiber中，也就是 在React中 fibers是实现'virtual DOM'的部分。
* 4. In React world, the term “virtual DOM” is usually associated with React elements since they are the objects representing the user interface.'virtual Dom' 和 React element 表示用户界面的对象。

按16版文档来说，fiber用来代表ui，virtual DOM 更多指的是“fibers”。

### Reconciliation
When a component’s props or state change, React decides whether an actual DOM update is necessary by comparing the newly returned element with the previously rendered one. When they are not equal, React will update the DOM. This process is called “reconciliation”.
当组件的props或state更改，React通过比较新返回的元素和之前呈现的元素来决定是否需要实际的DOM更新。如果不相等，React会更新Dom。这个过程称为 “reconciliation”。