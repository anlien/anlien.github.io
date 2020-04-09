
### route-props
```js

//接收的参数对象是route
function dynamicPropsFn (route) {
  const now = new Date()
  return {    
    //在route 和 props 之间 建立通道
    //校验route时，可以在此处做处理
    name: (now.getFullYear() + parseInt(route.params.years)) + '!'
  }

  //return { name: 2018 }
}

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
     // No props, no nothing
    { path: '/', component: Hello }, 

    // Pass route.params to props——————————此处以route作为参数
    // 在配置时使用props:true 
    { path: '/hello/:name', component: Hello, props: true }, 

    // static values
    // 
    { path: '/static', component: Hello, props: { name: 'world' }}, 

    // custom logic for mapping between route and props
    { path: '/dynamic/:years', component: Hello, props: dynamicPropsFn } 
  ]
})

new Vue({
  router,
  template: `
    <div id="app">
      <h1>Route props</h1>
      <ul>
        <li><router-link to="/">/</router-link></li>
        <li><router-link to="/hello/you">/hello/you</router-link></li>
        <li><router-link to="/static">/static</router-link></li>
        <li><router-link to="/dynamic/1">/dynamic/1</router-link></li>
      </ul>
      <router-view class="view"></router-view>
    </div>
  `
}).$mount('#app')


//在Hello.vue中使用
<template><div><h2 class="hello">Hello {{name}}</h2></div></template>
<script>
  // 使用时是props
  export default { props: { name: { type: String, default: 'Vue!' } } }
</script>

```

### 对比示例nested-routes 
//传送参数到组件中的方式：$route.params.zapId

```js 
const Zap = { template: '<div><h3>zap</h3><pre>{{ $route.params.zapId }}</pre></div>' }


const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', redirect: '/parent' },
    { path: '/parent', component: Parent,
      children: [       
        { name: 'zap', path: 'zap/:zapId?', component: Zap }
      ]
    }
  ]
})

new Vue({
  router,
  template: `
    <div id="app">
      <h1>Nested Routes</h1>
      <ul>
        <li><router-link :to="{name: 'zap'}">/parent/zap</router-link></li>
        <li><router-link :to="{name: 'zap', params: {zapId: 1}}">/parent/zap/1</router-link></li>               
      </ul>
      <router-view class="view"></router-view>
    </div>
  `
}).$mount('#app')
```
