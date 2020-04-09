通过组合组件来组成应用程序。
把vue-router添加进来，需要做的是：
将组件（components）映射到路由（routes），然后告诉vue-router在哪里渲染它们。

[参考](http://router.vuejs.org/zh-cn/essentials/getting-started.html)
```html 
  <p>
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
  </p>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
```

```js 
1.如果使用模块化机制编程，導入vue和VueRouter，要调用Vue.use(VueRouter)。
2.定义（路由）组件。
3.定义路由。每个路由应该映射一个组件。其中"component" 可以是通过 Vue.extend() 创建的组件构造器，
4.创建 router 实例，然后传 `routes` 配置
5.创建和挂载根实例

``` 

动态路由匹配：
[参考](http://router.vuejs.org/zh-cn/essentials/dynamic-matching.html)
一个『路径参数』使用冒号 : 标记。当匹配到一个路由时，参数值会被设置到 this.$route.params，可以在每个组件内使用.


路由信息对象：
一个 route object（路由信息对象） 表示当前 激活的路由的状态信息 ，包含了当前 URL 解析得到的信息，还有 URL 匹配到的 route records（路由记录）。


响应路由参数的变化：
vue会复用组件，这也意味着组件的 生命周期钩子 不会再被调用。

相对路由参数的变化作出响应的话，可以简单地watch(监测变化) $route对象：
```js 
const User = {
  template:'...',
  watch:{
    //  是个方法？'$route'(to,from)
    '$route'(to,from){
      //响应
    }
  }
}
```

vue-router 使用 path-to-regexp 作为路径匹配引擎，[path-regexp](https://github.com/pillarjs/path-to-regexp#parameters)。例如：可选的动态路径参数、匹配零个或多个、一个或多个，甚至是自定义正则匹配。


匹配优先级：
同一个路径可以匹配多个路由，此时，匹配的优先级就按照路由的定义顺序：谁先定义的，谁的优先级就最高。


router-view是最顶层的出口，渲染最高级路由匹配到组件。样地，一个被渲染组件同样可以包含自己的嵌套 <router-view>。


## HTML History 模式


### api 

<router-link to="home">Home</router-link>

<a href="home">Home</a>


<!-- 使用 v-bind 的 JS 表达式 -->
<router-link v-bind:to="'home'">Home</router-link>

<!-- 使用path绑定home -->
<router-link to="{ path:'home'}">Home</router-link>


####　集中应对 router
一个reoute Object  表示当前 激活的 路由的状态信息，包含了当前url解析得到的信息，
还有url匹配到的route records(路由记录)。
每次成功的导航后都会产生一个新的对象。

route object 出现在多个地方:
 组件内的this.$route  和 $route watcher 回调（检测变化处理）；
 router.match(location) 的返回值；
 导航钩子的参数：router.beforeEach((to,from,next) => { // to 和 from 都是 路由信息对象 });
 scrollBehavior 方法的参数：
  const router = new VueRouter({
      scrollBehavior(to,from,savedPosition){ // to 和 from 都是 路由信息对象 }
  });


### Router 构造配置
RouteConfig = {
  path:string,
  component:Component,
  name?:string,//for 
}


### 基于路由的动态过渡
还可以基于当前路由与目标路由的变化关系，动态设置过渡效果：

```js 
<!-- 使用动态的 transition name -->
<transition :name="transitionName">
  <router-view></router-view>
</transition>


// 接着在父组件内
// watch $route 决定使用哪种过渡
watch: {
  '$route' (to, from) {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
  }
}
```

routes 路由配置：
declare type RouteConfig = {
  path:string,
  component?:Component,
  name?:string,
  components?: { [name:string]:Component },
  redirect?: string | Location | Function;
  alias?: string | [Array<string>];
  children?: Array<RouteConfig>; //for nested routes

  beforeEnter?: (to:Route,from:Route,next:Function) => void;
  
  meta?:any;
}

