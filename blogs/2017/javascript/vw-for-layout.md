### 再看移动端适配
[vw-for-layout](https://www.w3cplus.com/css/vw-for-layout.html)
使用vw来替代以前Flexible中的rem缩放方案。
[工具：postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport)
目前采用PostCSS插件只是一个过渡阶段，在将来我们可以直接在CSS中使用aspect-ratio属性来实现长宽比。

现状：到目前2017-08为止，T30的机型中还有几款机型是不支持vw的适配方案。

css Polyfill:
* [Modernizr](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-Browser-Polyfills)
* [viewport-units-buggyfill](https://github.com/rodneyrehm/viewport-units-buggyfill)
* [vminpoly](https://github.com/saabi/vminpoly)

vw 的缺点：
* 比如当容器使用vw单位，margin采用px单位时，很容易造成整体宽度超过100vw，从而影响布局效果。对于类似这样的现象，我们可以采用相关的技术进行规避。比如将margin换成padding，并且配合box-sizing。只不过这不是最佳方案，随着将来浏览器或者应用自身的Webview对calc()函数的支持之后，碰到vw和px混合使用的时候，可以结合calc()函数一起使用，这样就可以完美的解决。
* 另外一点，px转换成vw单位，多少还会存在一定的像素差，毕竟很多时候无法完全整除。

### 测试网址
[查看支持情况](http://css3test.com/)
[机型的现状](https://material.io/devices/)

### 参考
[lib-flexible-for-html5-layout](https://www.w3cplus.com/mobile/lib-flexible-for-html5-layout.html)
[viewport 单位](https://tutorialzine.com/2015/05/simplify-your-stylesheets-with-the-magical-css-viewport-units)
[viewport](https://www.quirksmode.org/mobile/viewports.html)
[viewport 中文](https://www.w3cplus.com/css/viewports.html)
[css3-values](https://www.w3.org/TR/css3-values/)
[关于PostCSS相关的文章](https://www.w3cplus.com/blog/tags/516.html)

### 屏幕宽度的理解
<img src="./assets/vw-layout-4.png" alt="大漠的图">




