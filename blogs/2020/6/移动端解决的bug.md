### vivo手机点击img标签会放大图片的问题
描述：在vivo手机的浏览器或app的webview中，点击页面上的某些图片，图片会放大到全屏展示，需要点返回按钮才能回到之前的页面。

解决方法：
```css
/* 移动端禁止图片长按和vivo手机点击img标签放大图片,禁止长按识别二维码或保存图片 */
img{ pointer-events: none;vertical-align: sub;}
```

### 手机上元素字体垂直居中的问题
描述：想要达到的效果是元素在android和ios系统中，都能保持垂直居中，尤其是字号小于12px时。
可以查看现在移动端首页车辆列表中的“一成购”标签。

现象： 在Android下'一成购'标签中的字体没有垂直居中。在ios下'一成购'标签中的字体垂直居中。

原因：这个不是bug，也不是样式问题。在span标签下的中文是靠近顶部对齐的,仔细看"一成购ggyy"几个字，在android下元素留出的空间是英文字符'gy'等的下半截空间。

兼容问题：经过在小米5s和iphone 6s上测试，发现小米5s的line-height为1.2，iphone 6s的line-height为1.5。

解决方法：
* 标签建议使用图片做。使用img或background时，请将图片转换为base64。
* 顶部添加 2px 的空间

### jquery事件委托在safari失效的问题
在html中，写一个查看车辆详情，使用jquery的事件委托给span标签绑定一个事件，在ios系统的浏览器中均点击无效,自测浏览器包括：app中的webview、uc浏览器、safari浏览器；代码如下：
```js
$('body').on('click','.detail',function(){ //TODO:事件方法 });
```

解决方法：
1. 将span换成a标签
2. 给sapn添加样式 cursor:pointer;
3. 给span标签绑定一个空事件onclick="" 或 给span标签绑定事件
4. 在span外层添加div，在div上监听事件