数据绑定一个常见需求是操作元素的 class 列表和它的内联样式。因为它们都是属性 ，我们可以用v-bind 处理它们：只需要计算出表达式最终的字符串。

，在 v-bind 用于 class 和 style 时， Vue.js 专门增强了它。表达式的结果类型除了字符串之外，还可以是对象或数组。

## 绑定class

### 对象语法

```html 
<div class="static"
     v-bind:class="{ active: isActive, 'text-danger': hasError }">
</div>
```

### 数组语法
```js 
<div v-bind:class="[activeClass, errorClass]">

data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}

```

如果你也想根据条件切换列表中的 class ，可以用三元表达式：
<div v-bind:class="[isActive ? activeClass : '', errorClass]">

当有多个条件 class 时这样写有些繁琐。可以在数组语法中使用对象语法：(注释：与上面有些是等效的)
<div v-bind:class="[{ active: isActive }, errorClass]">

### 绑定style

### 对象语法
v-bind:style 的对象语法十分直观——看着非常像 CSS ，其实它是一个 JavaScript 对象。 CSS 属性名可以用驼峰式 (camelCase) 或 (配合引号的) 短横分隔命名 (kebab-case)。

### 数组语法
v-bind:style 的数组语法可以将多个样式对象应用到一个元素上。
<div v-bind:style="[baseStyles, overridingStyles]">

### 自动添加前缀 
### 多重值
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }">


