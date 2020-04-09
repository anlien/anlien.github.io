返回值：Vue$3

### Vue$3
```js 

/**
import { initProxy } from './proxy'
import { initState } from './state'
import { initRender } from './render'
import { initEvents } from './events'
 * 
 *
 //执行构造函数时执行
 this._init   → 调用中再次调用
	 initLifecycle
        _update
            'beforeUpdate'      
        $forceUpdate  
             vm._watcher.update()         
        $destroy
            'beforeDestroy'
            'destroyed'
        /**
         * callHook → const handlers = vm.$options[hook]
         */         
	 initEvents
        /**
         * 
         * { updateListeners } from '../vdom/helpers/index'
         */
        // 事件与vdom挂钩
        updateComponentListeners  → updateListeners   


	 initRender
        /*** 
         * vm._vnode
         * vm._staticTrees
         * vm.$slots
         * vm.$scopedSlots
         *        
         */
	 callHook(vm, 'beforeCreate')

   /** 
   * Observe Data 
   * Init Events 
   * initInjections : 使用动态属性，Watcher挂载
   */
	 initInjections  //resolve injections before data/props

   /**
    * // 初始化state在propsData
    * initProps
    * initMethods 
    * initData 
    * initComputed    //使用的是watcher
    * initWatch
    */
	 initState
	 initProvide     //resolve provide after data/props
	 callHook(vm, 'created')   // created 之前是没有挂载任何东西



 */

initMixin(Vue$3);

/**
 * 挂载数据   和observer 的set和del挂钩
 * 
 * 挂载  $watch = 
 * 
 	* 在$watch  中
 	* //Watcher from '../observer/watcher'
 	* // 挂载watcher 
 	* const watcher = new Watcher(vm, expOrFn, cb, options)
 * 
 *
 *  $data
 *  $props
 *  $set 
 *  $delete 
 *  $watch
 *

 * $watch 中最后返回一个unwatchFn
 */

stateMixin(Vue$3);
	

/**
 *  挂载事件方法：
 *  $on  
 *  $once 
 *  $off
 *  $emit 
 *  
 */
eventsMixin(Vue$3);


/**
 * _update
 //// 更新虚拟dom，如果有路径就记录dom树
 ////  
 ////
 * $forceUpdate
 //// vm._watcher.update() 
 ////
 * $destroy
 * 
 */
lifecycleMixin(Vue$3);


/**
 * 
 * 
   Vue.prototype.$nextTick 
   Vue.prototype._render

 *   // internal render helpers.
  // these are exposed on the instance prototype to reduce generated render
  // code size.
  Vue.prototype._o = markOnce
  Vue.prototype._n = toNumber
  Vue.prototype._s = toString
  Vue.prototype._l = renderList
  Vue.prototype._t = renderSlot
  Vue.prototype._q = looseEqual
  Vue.prototype._i = looseIndexOf
  Vue.prototype._m = renderStatic
  Vue.prototype._f = resolveFilter
  Vue.prototype._k = checkKeyCodes
  Vue.prototype._b = bindObjectProps
  Vue.prototype._v = createTextVNode
  Vue.prototype._e = createEmptyVNode
  Vue.prototype._u = resolveScopedSlots
 * 
 * 
 * 
 * 
 * 
 * 
 */
renderMixin(Vue$3);


/**
 * 配置参数：config 
 * Vue.util  
 * 
 * set 
 * delete 
 * nextTick
 *
 * defineReactive  设置属性
 *
 */
4410:initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue$3.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode.ssrContext
  }
});


//7544 install platform specific utils
// src platforms\web\runtime

Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.isReservedAttr = isReservedAttr;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue$3.options.directives, platformDirectives);
extend(Vue$3.options.components, platformComponents);

// 9602
Vue$3.prototype.$mount



```


```js 
使用示例，查看代码执行

第一个入口
Vue$3 

initMixin:

1537:mark

```





###　Vue$3 流程———— initMixin  line:3953
instance : 实例

属于：
core → instance → index.js 

在init 中进行:
initProxy
initState
initRender
initEvents


// 目录：vue\src\core\instance\lifecycle.js 
// mountComponent
//
// vm.$options.render = createEmptyVNode
// callHook(vm, 'beforeMount')
//  

### Vue的调用栈  call Stack

Vue$3 → Vue._init → 
Vue$3.$mount → compileToFunctions  → 
compile → baseCompile


optimize：优化


注解：
字符当对象处理，适不适用由javascript确定。解析时，将数据进行记录，在运行时，根据标记进行计算。
计算后，修改哪里的值，由js确定。
挂载的时机，由计算的过程确定，到哪个阶段，计算哪些值。

疑惑：
编译后是个AST Tree，但如何连接dom的？感觉只是缓存了渲染方法，并没有根据数据的变化，动态的更新部分dom。

generate 里有的方法：

error在全局中声明，然后进行依次进行调用，存储错误方法。

在compiled将template


functionCompileCache  中以模板为key，方法体为模板编译后的方法。


Vue 经编译后成为一个渲染函数，用模板做为key值，与之前的模板不再有关系。



