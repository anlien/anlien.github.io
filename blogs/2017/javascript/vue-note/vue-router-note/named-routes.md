
### named-routes 

```html  
  <li><router-link to="/parent/quy/123">/parent/quy</router-link></li>
  <li><router-link :to="{name: 'zap', params: {zapId: 1}}">/parent/zap/1</router-link></li>
  // 使用name的话，to配置的参数改变
```
```js 
 //此处的quxid 如何传递
 //例如将参数传入到子组件中？
{
  path: 'qux/:quxId',
  component: Qux,
  children: [{ path: 'quux', name: 'quux', component: Quux }]
}


const Zap = { template: '<div><h3>zap</h3><pre>{{ $route.params.zapId }}</pre></div>' }

 routes: [
     { path: 'quy/:quyId', component: Quy },
     { name: 'zap', path: 'zap/:zapId?', component: Zap }
 ]

```

其他：
```js 
  <p>Current route name: {{ $route.name }}</p>
```

使用name：
```html 
//使用name
<li><router-link :to="{ name: 'bar', params: { id: 123 }}">bar</router-link></li>
//不再使用name
<li><router-link to="/bar/123">/bar/123</router-link></li>

两个等效

```
name使用的:to,普通的使用to='/bar'
