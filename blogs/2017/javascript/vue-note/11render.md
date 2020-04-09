###　slot的对应关系

```js 
<script type="text/x-template" id="anchored-heading-template">
  <h1 v-if="level === 1">
    <slot></slot>
  </h1>
  <h2 v-else-if="level === 2">
    <slot></slot>
  </h2>
  <h3 v-else-if="level === 3">
    <slot></slot>
  </h3>
</script>

Vue.component('anchored-heading', {
  template: '#anchored-heading-template',
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})

```

``` js 

Vue.component('anchored-heading', {
  render: function (createElement) {
    return createElement(
      'h' + this.level,   // tag name 标签名称
      this.$slots.default // 子组件中的阵列——————————此处是对应slot，创造的slot元素
    )
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})

```

####data object
由它们的属性可知，props、domProps、on、nativeOn等，vue是将事件区别对待的。

如果创建一个div，绑定click时，使用on。domProps类似。
如果创建componentDiv时，绑定click时，使用nativeOn。此处使用props。

例如，绑定一个dom元素：
```js
render: function (createElement) {
  var self = this
  return createElement('input', {
    domProps: {  //此处属性使用的是domProps
      value: self.value
    },
    on: {	// 此处使用的是on
      input: function (event) {
        self.value = event.target.value
        self.$emit('input', event.target.value)
      }
    }
  })
}

```

组件走props，调用当前数据。


### 使用javascript代替模板功能

```html 
<ul v-if="items.length">
  <li v-for="item in items">{{ item.name }}</li>
</ul>
<p v-else>No items found.</p>
```

```js 
render: function (createElement) {
  if (this.items.length) {
    return createElement('ul', this.items.map(function (item) {
      return createElement('li', item.name)
    }))
  } else {
    return createElement('p', 'No items found.')
  }
}
```

模板编译：
Vue 的模板实际是编译成了 render 函数。

示例：
```html 
<div>
  <header>
    <h1>I'm a template!</h1>
  </header>
  <p v-if="message">
    {{ message }}
  </p>
  <p v-else>
    No message.
  </p>
</div>    
```

```js 
// render 函数中渲染的内容———————————————含有判断条件的
function anonymous() {
  with(this){return _c('div',[_m(0),(message)?_c('p',[_v(_s(message))]):_c('p',[_v("No message.")])])}
}

// staticRenderFns 中渲染的内容——————————初步看是没有指令的dom
_m(0): function anonymous() {
  with(this){return _c('header',[_c('h1',[_v("I'm a template!")])])}
}
```

