### render
参考：https://cn.vuejs.org/v2/guide/render-function.html#完整示例。

render 函数，它比template更接近编译器。

通过修改props是否修改state，如果模板传入，那么vue的模板会编写为一个方法，这个方法可以控制数据的输入。更改props只是更改了数据输入，这时就变为更改数据了，接着使用差异化对比，进行渲染。 

在底层的实现上， Vue 将模板编译成虚拟 DOM 渲染函数。结合响应系统，在应用状态改变时， Vue 能够智能地计算出重新渲染组件的最小代价并应用到 DOM 操作上。


```js 
Vue.component('anchored-heading', {
  render: function (createElement) {
    return createElement(
      'h' + this.level,   // tag name 标签名称
      this.$slots.default // 子组件中的阵列
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
### createElement-参数

### 深入 data-object 参数
```js 
{
  // 和`v-bind:class`一样的 API
  'class': {
    foo: true,
    bar: false
  },
  // 和`v-bind:style`一样的 API
  style: {
    color: 'red',
    fontSize: '14px'
  },
  // 正常的 HTML 特性
  attrs: {
    id: 'foo'
  },
  // 组件 props
  props: {
    myProp: 'bar'
  },
  // DOM 属性
  domProps: {
    innerHTML: 'baz'
  },
  // 事件监听器基于 `on`
  // 所以不再支持如 `v-on:keyup.enter` 修饰器
  // 需要手动匹配 keyCode。
  on: {
    //支持在组件上的
    click: this.clickHandler
  },
  // 仅对于组件，用于监听原生事件，而不是组件内部使用 `vm.$emit` 触发的事件。
  nativeOn: {
    click: this.nativeClickHandler
  },
  // 自定义指令. 注意事项：不能对绑定的旧值设值
  // Vue 会为您持续追踪
  directives: [
    {
      name: 'my-custom-directive',
      value: '2',
      expression: '1 + 1',
      arg: 'foo',
      modifiers: {
        bar: true
      }
    }
  ],
  // Scoped slots in the form of
  // { name: props => VNode | Array<VNode> }
  scopedSlots: {
    default: props => createElement('span', props.text)
  },
  // 如果组件是其他组件的子组件，需为 slot 指定名称
  slot: 'name-of-slot',
  // 其他特殊顶层属性
  key: 'myKey',
  ref: 'myRef'
}
```


注释：在传入的data Object 参数可知，vue实例是可以操作dom的。
注释：由Render函数可知，vue实例是可以操作dom的。

在正常的html中，也是通过事件、元素属性、元素样式等在操作dom，而这些在data-object中都是存在的。例如
```js 
// DOM 属性
domProps: {
  innerHTML: 'baz'
}

// 正常的 HTML 特性
attrs: {
  id: 'foo'
}

// 仅对于组件，用于监听原生事件，而不是组件内部使用 `vm.$emit` 触发的事件。
nativeOn: {
  click: this.nativeClickHandler
}

```
注释：组件之间的相互组合，也属于正常。不论如何变，都只是嵌套。只是包含几层。都是从createElement 开始。
注释：创建的可以是组件，可以是一个普通的元素。组件也只是普通dom的包装，非特殊元素。

问题：那他们如何做替换呢？使用模板如何和使用render等效呢？dom模板可以绑定原生的的事件吗？


注释：得有一个概念，就是不停的向模板中传入数据，数据变了，渲染的结果就变了。监听的事件，只是更改数据的方法。
看这方法，模板只是让数据更好的流通，监听数据的更改和变换，包装事件，触发渲染。


v-model等效事件：
```js 
render: function (createElement) {
  var self = this
  //html5 带的
  return createElement('input', {
    domProps: {
      value: self.value
    },
    on: {
      input: function (event) {
        self.value = event.target.value
        self.$emit('input', event.target.value)
      }
    }
  })
}
```

slots 可以从this.$slots获取VNodes列表中的静态内容。



### 在html中使用v-if 和 v-for
注：render 函数，它比template更接近编译器。
注：在底层实现上，Vue将模板编译成 虚拟DOM渲染函数。

```html 
<ul v-if="items.length">
  <li v-for="item in items">{{ item.name }}</li>
</ul>
<p v-else>No items found.</p>
```

在render中被重写：

```js 
render: function(createElement){
  if(this.items.length){
    return createElement('ul',this.items.map(function(items){
      return createElement('li',items.name)
    }))
  }else{
    return createElement('p','No items found')
  }
}

```

和模板js类似？拿到模板进行渲染:
注：拿到模板进行填充数据


### 事件 & 按键修饰符

event.target !== event.currentTarget


### slots 
定义一个app-layout组件

```js 
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

#### this.$slots 
```js 

//render函数渲染组件模板——————————————接近渲染函数
render: function (createElement) {
  // `<div><slot></slot></div>`
  return createElement('div', this.$slots.default)
}

//渲染具名函数
render: function (createElement) {
  // `<div><slot name="header"></slot></div>`
  return createElement('div', this.$slots.header)
}

```
#### this.$scopedSlots    //这个没试出来。。应用场景暂时

```js 
render: function (createElement) {
  // `<div><slot :text="msg"></slot></div>`
  return createElement('div', [
    this.$scopedSlots.default({
      text: this.msg
    })
  ])
}
```

// 接收重slot中传递进来的数据
#### scopedSlots
render (createElement) {
  return createElement('div', [
    createElement('child', {
      // pass `scopedSlots` in the data object
      // in the form of { name: props => VNode | Array<VNode> }
      scopedSlots: {
        default: function (props) {
          return createElement('span', props.text)
        }
      }
    })
  ])
}

下面是scopedSlots的实例：


在2.1.0新增的：

在子组件中，只需将数据传递到插槽，就像你将 props 传递给组件一样：

注释：反向传递的一种方式
```js 
<div class="child">
  <slot text="hello from child"></slot>
</div>
```

在父级中，必须存在具有特殊属性 scope 的 <template> 元素，表示它是作用域插槽的模板。scope 的值对应一个临时变量名，此变量接收从子组件中传递的 props 对象：

```js 
<div class="parent">
  <child>
    <template scope="props">
      <span>hello from parent</span>
      <span>{{ props.text }}</span>
    </template>
  </child>
</div>
```

如果我们渲染以上结果，得到的输出会是：
```js 
<div class="parent">
  <div class="child">
    <span>hello from parent</span>
    <span>hello from child</span>
  </div>
</div>
```


###　插槽的其它
示例——作用域插槽更具代表性的用例是列表组件，允许组件自定义应该如何渲染列表每一项：

```js 
  <my-awesome-list :items="items">
    <!-- 作用域插槽也可以是具名的 -->
    <template slot="item" scope="props">
      <li class="my-fancy-item">{{ props.text }}</li>
    </template>
  </my-awesome-list>
```

列表组件的模板：
```js 
  <ul>
    <slot name="item"
      v-for="item in items"
      :text="item.text">
      <!-- 这里是备用内容 -->
    </slot>
  </ul>
```

注释：从这演示可以看出，这个有点像tmodjs,子组件可以访问父组件。待验证。————如果是简单模板的话，可能会这样传递数据。


在添加 functional: true 之后，anchored-heading组件的 render 函数之间简单更新增加 context 参数，this.$slots.default 更新为 context.children，之后this.level 更新为 context.props.level。


## Functional-Components

### anchored-heading-示例
```js 
var getChildrenTextContent = function (children) {
  return children.map(function (node) {
    return node.children
      ? getChildrenTextContent(node.children)
      : node.text
  }).join('')
}
Vue.component('anchored-heading', {
  render: function (createElement) {
    // create kebabCase id
    var headingId = getChildrenTextContent(this.$slots.default)
      .toLowerCase()
      .replace(/\W+/g, '-')
      .replace(/(^\-|\-$)/g, '')
    return createElement(
      'h' + this.level,
      [
        createElement('a', {
          attrs: {
            name: headingId,
            href: '#' + headingId
          }
        }, this.$slots.default)
      ]
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

上面的组件比较简单，没有管理或者监听任何传递给他的状态，也没有生命周期方法。实际上，它只是一个接收参数的函数。

在这种情况下，我们可以使用Functional-Components （函数化组件），函数化组件只是一个函数，所以渲染开销也低很多。
但函数化也有一个弊端，那就是函数化组件不会出现在Vue-devtools的组件树里。

如何将组件改写为函数化组，只需要添加functional标记即可。
在这种情况下，我们可以将组件标记为functional，标记后将意味着没有状态、没有this。


在添加 functional: true 之后，anchored-heading组件的 render 函数之间简单更新增加 context 参数。
在anchored-heading组件中要修改的有，this.$slots.default 更新为 context.children，之后this.level 更新为 context.props.level。

context中的参数：
props: An object of the provided props
children: An array of the VNode children
slots: A function returning a slots object
data: The entire data object passed to the component
parent: A reference to the parent component
listeners: (2.3.0+) An object containing parent-registered event listeners. This is simply an alias to data.on
injections: (2.3.0+) if using the inject option, this will contain resolved injections.

当需要以下功能时，可以考虑将组件函数化：
1.在将children,props,data 传递给子组件之前操作它们。
2.程序化地在多个组件中选择一个。

```js 

var EmptyList = { /* ... */ }
var TableList = { /* ... */ }
var OrderedList = { /* ... */ }
var UnorderedList = { /* ... */ }

Vue.component('smart-list', {
  functional: true,
  render: function (createElement, context) {
    function appropriateListComponent () {
      var items = context.props.items
      if (items.length === 0)           return EmptyList
      if (typeof items[0] === 'object') return TableList
      if (context.props.isOrdered)      return OrderedList
      return UnorderedList
    }
    return createElement(
      appropriateListComponent(),
      context.data,
      context.children
    )
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    isOrdered: Boolean
  }
})

```

#### slots() 和 children 对比

```js 
<my-functional-component>
  <p slot="foo">
    first
  </p>
  <p>second</p>
</my-functional-component>
```
对于这个组件，children 会给你两个段落标签，而 slots().default 只会传递第二个匿名段落标签，slots().foo 会传递第一个具名段落标签。同时拥有 children 和 slots() ，因此你可以选择让组件通过 slot() 系统分发或者简单的通过 children 接收，让其他组件去处理。


有两个渲染函数：
render 和 staticRenderFns