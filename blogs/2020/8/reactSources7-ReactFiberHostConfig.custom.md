react-reconciler 支持的所有方法的列表如下：
```js

// This is a host config that's used for the `react-reconciler` package on npm.
// It is only used by third-party renderers.
//
// Its API lets you pass the host config as an argument. 它的API允许您将主机配置作为参数传递
// However, inside the `react-reconciler` we treat host config as a module.
// This file is a shim between two worlds.
//
// It works because the `react-reconciler` bundle is wrapped in something like: 
//它之所以能够工作，是因为“response -reconciler”包被包装成类似这样的东西
//
// module.exports = function ($$$config) {
//   /* reconciler code */
// }
//
// So `$$$config` looks like a global variable, but it's really an argument to a top-level wrapping function.

declare var $$$hostConfig: any;
export opaque type Type = mixed; // eslint-disable-line no-undef
export opaque type Props = mixed; // eslint-disable-line no-undef
export opaque type Container = mixed; // eslint-disable-line no-undef
export opaque type Instance = mixed; // eslint-disable-line no-undef
export opaque type TextInstance = mixed; // eslint-disable-line no-undef
export opaque type HydratableInstance = mixed; // eslint-disable-line no-undef
export opaque type PublicInstance = mixed; // eslint-disable-line no-undef
export opaque type HostContext = mixed; // eslint-disable-line no-undef
export opaque type UpdatePayload = mixed; // eslint-disable-line no-undef
export opaque type ChildSet = mixed; // eslint-disable-line no-undef
export opaque type TimeoutHandle = mixed; // eslint-disable-line no-undef
export opaque type NoTimeout = mixed; // eslint-disable-line no-undef

export const getPublicInstance = $$$hostConfig.getPublicInstance;
export const getRootHostContext = $$$hostConfig.getRootHostContext;
export const getChildHostContext = $$$hostConfig.getChildHostContext;
export const prepareForCommit = $$$hostConfig.prepareForCommit;
export const resetAfterCommit = $$$hostConfig.resetAfterCommit;
export const createInstance = $$$hostConfig.createInstance;
export const appendInitialChild = $$$hostConfig.appendInitialChild;
export const finalizeInitialChildren = $$$hostConfig.finalizeInitialChildren;
export const prepareUpdate = $$$hostConfig.prepareUpdate;
export const shouldSetTextContent = $$$hostConfig.shouldSetTextContent;
export const shouldDeprioritizeSubtree = $$$hostConfig.shouldDeprioritizeSubtree;
export const createTextInstance = $$$hostConfig.createTextInstance;
export const scheduleDeferredCallback = $$$hostConfig.scheduleDeferredCallback;
export const cancelDeferredCallback = $$$hostConfig.cancelDeferredCallback;
export const shouldYield = $$$hostConfig.shouldYield;
export const scheduleTimeout = $$$hostConfig.setTimeout;
export const cancelTimeout = $$$hostConfig.clearTimeout;
export const noTimeout = $$$hostConfig.noTimeout;
export const now = $$$hostConfig.now;
export const isPrimaryRenderer = $$$hostConfig.isPrimaryRenderer;
export const supportsMutation = $$$hostConfig.supportsMutation;
export const supportsPersistence = $$$hostConfig.supportsPersistence;
export const supportsHydration = $$$hostConfig.supportsHydration;

// -------------------
//      Mutation
//     (optional)
// -------------------
export const appendChild = $$$hostConfig.appendChild;
export const appendChildToContainer = $$$hostConfig.appendChildToContainer;
export const commitTextUpdate = $$$hostConfig.commitTextUpdate;
export const commitMount = $$$hostConfig.commitMount;
export const commitUpdate = $$$hostConfig.commitUpdate;
export const insertBefore = $$$hostConfig.insertBefore;
export const insertInContainerBefore = $$$hostConfig.insertInContainerBefore;
export const removeChild = $$$hostConfig.removeChild;
export const removeChildFromContainer = $$$hostConfig.removeChildFromContainer;
export const resetTextContent = $$$hostConfig.resetTextContent;
export const hideInstance = $$$hostConfig.hideInstance;
export const hideTextInstance = $$$hostConfig.hideTextInstance;
export const unhideInstance = $$$hostConfig.unhideInstance;
export const unhideTextInstance = $$$hostConfig.unhideTextInstance;

// -------------------
//     Persistence
//     (optional)
// -------------------
export const cloneInstance = $$$hostConfig.cloneInstance;
export const createContainerChildSet = $$$hostConfig.createContainerChildSet;
export const appendChildToContainerChildSet =
  $$$hostConfig.appendChildToContainerChildSet;
export const finalizeContainerChildren =
  $$$hostConfig.finalizeContainerChildren;
export const replaceContainerChildren = $$$hostConfig.replaceContainerChildren;
export const cloneHiddenInstance = $$$hostConfig.cloneHiddenInstance;
export const cloneUnhiddenInstance = $$$hostConfig.cloneUnhiddenInstance;
export const createHiddenTextInstance = $$$hostConfig.createHiddenTextInstance;

// -------------------
//     Hydration
//     (optional)
// -------------------
export const canHydrateInstance = $$$hostConfig.canHydrateInstance;
export const canHydrateTextInstance = $$$hostConfig.canHydrateTextInstance;
export const getNextHydratableSibling = $$$hostConfig.getNextHydratableSibling;
export const getFirstHydratableChild = $$$hostConfig.getFirstHydratableChild;
export const hydrateInstance = $$$hostConfig.hydrateInstance;
export const hydrateTextInstance = $$$hostConfig.hydrateTextInstance;
export const didNotMatchHydratedContainerTextInstance = $$$hostConfig.didNotMatchHydratedContainerTextInstance;
export const didNotMatchHydratedTextInstance = $$$hostConfig.didNotMatchHydratedTextInstance;
export const didNotHydrateContainerInstance = $$$hostConfig.didNotHydrateContainerInstance;
export const didNotHydrateInstance = $$$hostConfig.didNotHydrateInstance;
export const didNotFindHydratableContainerInstance = $$$hostConfig.didNotFindHydratableContainerInstance;
export const didNotFindHydratableContainerTextInstance = $$$hostConfig.didNotFindHydratableContainerTextInstance;
export const didNotFindHydratableInstance = $$$hostConfig.didNotFindHydratableInstance;
export const didNotFindHydratableTextInstance = $$$hostConfig.didNotFindHydratableTextInstance;

```

### 联想

javascript 是面向对象的语言。在javascript中创建html，其实是一个对象。但在console中看到的是元素。为什么要说这个呢？
若果按照 "数据驱动" 去想react，那么和dom打交道的，看不见的都是对象(数据)。

在执行react代码时，先将代码转换为数据，那么接下来要处理的就是增、删、改、查这些数据。react-reconciler 是一个独立的包。

目的：尝试从react-reconciler 切入理解。


### 有意思的问题

替换的问题：react\packages\react-reconciler\src\ReactFiberHostConfig.js
```js
import invariant from 'shared/invariant';

// We expect that our Rollup, Jest, and Flow configurations
// always shim this module with the corresponding host config
// (either provided by a renderer, or a generic shim for npm).
//我们希望我们的Rollup、Jest和Flow配置总是使用相应的主机配置来填充这个模块(要么由渲染器提供，要么为npm提供通用的填充)。
//
// We should never resolve to this file, but it exists to make
// sure that if we *do* accidentally break the configuration,
// the failure isn't silent.

invariant(false, 'This module must be shimmed by a specific renderer.');
```

在react-reconciler/forks中有各种配置的js，react处理的方式有点像接口。react-reconciler可以适用不同场景，例如native、dom。如何适配不同的场景呢？

打包处理：github\react\scripts\rollup\forks.js
```js
//... 289行代码
    for (let rendererInfo of inlinedHostConfigs) {
      if (rendererInfo.entryPoints.indexOf(entry) !== -1) {
        return `react-reconciler/src/forks/ReactFiberHostConfig.${
          rendererInfo.shortName
        }.js`;
      }
    }
//..
```

还能有这操作，牛！！

### 参考：

The full list of supported methods [can be found here](https://github.com/facebook/react/blob/master/packages/react-reconciler/src/forks/ReactFiberHostConfig.custom.js). For their signatures, we recommend looking at specific examples below.

The React repository includes several renderers. Each of them has its own host config.

The examples in the React repository are declared a bit differently than a third-party renderer would be. In particular, the `HostConfig` object mentioned above is never explicitly declared, and instead is a *module* in our code. However, its exports correspond directly to properties on a `HostConfig` object you'd need to declare in your code:

* [React ART](https://github.com/facebook/react/blob/master/packages/react-art/src/ReactART.js) and its [host config](https://github.com/facebook/react/blob/master/packages/react-art/src/ReactARTHostConfig.js)
* [React DOM](https://github.com/facebook/react/blob/master/packages/react-dom/src/client/ReactDOM.js) and its [host config](https://github.com/facebook/react/blob/master/packages/react-dom/src/client/ReactDOMHostConfig.js)
* [React Native](https://github.com/facebook/react/blob/master/packages/react-native-renderer/src/ReactNativeRenderer.js) and its [host config](https://github.com/facebook/react/blob/master/packages/react-native-renderer/src/ReactNativeHostConfig.js)

If these links break please file an issue and we’ll fix them. They intentionally link to the latest versions since the API is still evolving. If you have more questions please file an issue and we’ll try to help!
