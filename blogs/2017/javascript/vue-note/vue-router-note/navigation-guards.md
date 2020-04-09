
### navigation-guards
```js 
{

  //异步加载的雏形
  path:'/qux-async',component: resolve => {
    setTimeout(() => {
      resolve(Qux)
    },0)
  }

},
{
  path:'/foo', component: Foo, beforeEnter: guardRoute
},
{
  path:'/baz', component: Baz, meta:{ needGuard: true }
}

router.beforeEach((to,from,next) => {
  if( to.matched.some(m => m.meta.needGuard )){
    guardRoute(to,from,next)
  } else{
    next()
  }
})

```
//next 几种跳转方式
```js 
 function guardRoute(to,from,next){
  if(){
    next()
  }else if(){
    next('/baz')
  }

  next(false)

  //修改值
  beforeRouteEnter(to,from,next){
    setTimeout(() => {
      next(vm => {
        vm.msg = 'Qux'
      })
    },1000)
  }
 }

 next({ path:'/login', query:{ redirect:to.fullPath } })

```
