###  element.insertAdjacentHTML 
[参考](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/insertAdjacentHTML)

#### 概述
insertAdjacentHTML() 将指定的文本解析为HTML或XML，并将生成的节点插入到指定位置的DOM树中。它不会重新解析它正在使用的元素，因此它不会破坏元素内的现有元素。这避免了额外的序列化步骤，使其比直接innerHTML操作更快。

```js
	element.insertAdjacentHTML(position, text);
	//'beforebegin':元素自身的前面。
	//'afterend':元素自身的后面。
	//'afterbegin':插入元素内部的第一个子节点之前。
	//'beforeend':插入元素内部的最后一个子节点之后。
```
#### 位置名称的可视化

<!-- beforebegin --> 
<p> 
<!-- afterbegin --> 
foo 
<!-- beforeend --> 
</p> 
<!-- afterend -->
注意： beforebegin 和 afterend 位置,仅在节点在树中且节点具有一个parent元素时工作.


### element.insertAdjacentText
[参考](https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentText)
