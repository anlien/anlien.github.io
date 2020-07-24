# React Api （16.13.1）
```js
{
  Children:{
    map: ()=> void,
    forEach: ()=> void,
    count: ()=> void,
    toArray: ()=> void,
    only: ()=> void
  },
  Component: function Component(props,context,updater){},
  PureComponent: function PureComponent(props, context, updater){},

  Fragment: Symbol(react.fragment),
  Profiler: Symbol(react.profiler),
  StrictMode: Symbol(react.strict_mode),
  Suspense: Symbol(react.suspense),
  lazy: function lazy(ctor){},

  cloneElement: function cloneElementWithValidation(element, props, children){},
  createContext: function createContext(defaultValue, calculateChangedBits){},
  createElement: function createElementWithValidation(type, props, children){},
  createFactory: function createFactoryWithValidation(type){},

  createRef: function createRef(){},
  forwardRef: function forwardRef(render){},

  isValidElement: function isValidElement(object){},

  memo: function memo(type, compare){},

  useCallback: function useCallback(callback, deps){},
  useContext: function useContext(Context, unstable_observedBits){},
  useDebugValue: function useDebugValue(value, formatterFn){},
  useEffect: function useEffect(create, deps){},
  useImperativeHandle: function useImperativeHandle(ref, create, deps){},
  useLayoutEffect: function useLayoutEffect(create, deps){},
  useMemo: function useMemo(create, deps){},
  useReducer: function useReducer(reducer, initialArg, init){},
  useRef: function useRef(initialValue){},
  useState: function useState(initialState){},

  version: "16.13.1"
}
```
# React 生命周期
## Mounting（挂载）
当组件实例被创建并插入 DOM 中时，其生命周期调用顺序如下：

* [constructor()](https://reactjs.org/docs/react-component.html#constructor)
* [static getDerivedStateFromProps()](https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops)
* [render()](https://reactjs.org/docs/react-component.html#render)
* [componentDidMount()](https://reactjs.org/docs/react-component.html#componentdidmount)

## Updating(更新)
* [static getDerivedStateFromProps()](https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops)
* [shouldComponentUpdate()](https://reactjs.org/docs/react-component.html#shouldcomponentupdate)
* [render()](https://reactjs.org/docs/react-component.html#render)
* [getSnapshotBeforeUpdate()](https://reactjs.org/docs/react-component.html#getsnapshotbeforeupdate)
* [componentDidUpdate()](https://reactjs.org/docs/react-component.html#componentdidupdate)

## Unmounting(卸载)
* [componentWillUnmount()](https://reactjs.org/docs/react-component.html#componentwillunmount)

## Error Handling(错误处理)
*  [static getDerivedStateFromError()](https://reactjs.org/docs/react-component.html#static-getderivedstatefromerror)
*  [componentDidCatch()](https://reactjs.org/docs/react-component.html#componentdidcatch)

## Other APIs
* [setState()](https://reactjs.org/docs/react-component.html#setstate)
* [forceUpdate()](https://reactjs.org/docs/react-component.html#forceupdate)

## Class Properties
* [defaultProps](https://reactjs.org/docs/react-component.html#defaultprops)
* [displayname](https://reactjs.org/docs/react-component.html#displayname)

## Instance Properties
* [props](https://reactjs.org/docs/react-component.html#props)
* [state](https://reactjs.org/docs/react-component.html#state)

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
长远来看，我们期望 Hook 能够成为人们编写 React 组件的主要方式。
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