# [sneak-peek-beyond-react-16](https://reactjs.org/blog/2018/03/01/sneak-peek-beyond-react-16.html)
Dan Abramov : “在计算能力和网络速度方面存在巨大差异的情况下，我们如何为每个人提供最佳的用户体验?”

# 两个demo
On the first demo, Dan says: “We’ve built a generic way to ensure that high-priority updates don’t get blocked by a low-priority update, called **time slicing**. If my device is fast enough, it feels almost like it’s synchronous; if my device is slow, the app still feels responsive. It adapts to the device thanks to the [requestIdleCallback](https://developers.google.com/web/updates/2015/08/using-requestidlecallback) API. Notice that only the final state was displayed(注意，只显示了最终状态); the rendered screen is always consistent and we don’t see visual artifacts of slow rendering causing a janky user experience.”

On the second demo, Dan explains: “We’ve built a generic way for components to suspend rendering while they load async data, which we call **suspense**. You can pause any state update until the data is ready, and you can add async loading to any component deep in the tree without plumbing all the props and state through your app and hoisting the logic. On a fast network, updates appear very fluid and instantaneous without a jarring cascade of spinners that appear and disappear. On a slow network, you can intentionally design which loading states the user should see and how granular or coarse they should be, instead of showing spinners based on how the code is written. The app stays responsive throughout.”

## time slicing
The CPU Demo.

With time slicing, React can now split computations of updates on children components into chunks during idle callbacks and rendering work is spread out over multiple frames. This enhances UI responsiveness on slower devices. Time slice does a great job in handling all the difficult CPU scheduling tasks under the hood without developer considerations.

以下内容来自ppt：
* React doesn't block the thread while rendering 
* Feels synchronous if the device is fast
* Feels responsive if the device is slow
* Only the final rendered state is displayed
* Same declarative component model


## [suspense](https://reactjs.org/docs/react-api.html#suspense)
Suspense lets components "wait" for something before rendering. Today,suspense only supports one use case: [loading components dynamically with React.lazy](https://reactjs.org/docs/code-splitting.html#reactlazy).In the future, it will support other use cases like data fetching.

使用suspense 将React中的异步io提升到一个全新的水平。有了suspense之后，开发人员可以同时管理不同的状态，无论用户的网速如何都可以体验应用程序，可以显示应用程序的某些部分，同时加载其他部分，从而确保应用程序可以访问。在许多方面，suspense可以替代Redux.(在暂停期间，它继续处理其他高优先级更新.)

React 16开始，有些问题不需要使用redux 解决。

以下内容来自ppt：
* Pause any state update until the data is ready
* Add async data to any component without 'plumbing'
* On a fast network,render afteer the whole tree is ready
* On a slow network,precisely control the loading states
* There's both a high-level and a low-level API

### 参考
* [如何评价React的新功能Time Slice 和Suspense](https://www.zhihu.com/question/268028123/answer/332182059)
* [time-slice-suspense-api-react](https://blog.pusher.com/time-slice-suspense-api-react-17/)
  