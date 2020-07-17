
# [React.Component](https://zh-hans.reactjs.org/docs/react-api.html#reactcomponent)
React.Component 是使用 ES6 classes 方式定义 React 组件的基类。

# [React.PureComponent](https://zh-hans.reactjs.org/docs/react-api.html#reactpurecomponent)
React.PureComponent 与 React.Component 很相似。两者的区别在于 React.Component 并未实现 shouldComponentUpdate()，而 React.PureComponent 中以浅层对比 prop 和 state 的方式来实现了该函数。

如果赋予 React 组件相同的 props 和 state，render() 函数会渲染相同的内容，那么在某些情况下使用 React.PureComponent 可提高性能。

# [React.memo](https://zh-hans.reactjs.org/docs/react-api.html#reactmemo)
```js
const MyComponent = React.memo(function MyComponent(props) {
  /* 使用 props 渲染 */
});
```
React.memo 为高阶组件。它与 React.PureComponent 非常相似，但只适用于函数组件，而不适用 class 组件。

如果你的函数组件在给定相同 props 的情况下渲染相同的结果，那么你可以通过将其包装在 React.memo 中调用，以此通过记忆组件渲染结果的方式来提高组件的性能表现。这意味着在这种情况下，React 将跳过渲染组件的操作并直接复用最近一次渲染的结果。

React.memo 仅检查 props 变更。当 context 发生变化时，它仍会重新渲染。

默认情况下其只会对复杂对象做浅层对比，如果你想要控制对比过程，那么请将自定义的比较函数通过第二个参数传入来实现。
```js
function MyComponent(props) { /* 使用 props 渲染 */ }
function areEqual(prevProps, nextProps) {
  /*如果把 nextProps 传入 render 方法的返回结果与将 prevProps 传入 render 方法的返回结果一致则返回 true，否则返回 false*/
}
export default React.memo(MyComponent, areEqual);
```

# [useMemo](https://zh-hans.reactjs.org/docs/hooks-reference.html#usememo)
```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```
把“创建”函数和依赖项数组作为参数传入 useMemo，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算。

记住，传入 useMemo 的函数会在渲染期间执行。请不要在这个函数内部执行与渲染无关的操作，诸如副作用这类的操作属于 useEffect 的适用范畴，而不是 useMemo。

如果没有提供依赖项数组，useMemo 在每次渲染时都会计算新的值。

# Hook
### callback ref
```js
function MeasureExample() {
  const [height, setHeight] = useState(0);

  const measuredRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);

  return (
    <>
      <h1 ref={measuredRef}>Hello, world</h1>
      <h2>The above header is {Math.round(height)}px tall</h2>
    </>
  );
}
```

# 参考
* [组合 vs 继承](https://zh-hans.reactjs.org/docs/composition-vs-inheritance.html)
* [reactcomponent](https://zh-hans.reactjs.org/docs/react-api.html)
* [hooks](https://zh-hans.reactjs.org/docs/hooks-reference.html#basic-hooks)
* [callback-refs](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html#callback-refs)