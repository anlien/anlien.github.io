CSS 实现类似原生效果的 1px 边框
=====
## 一.使用border-image实现类似iOS7的1px底边
iOS7已经发布有一段时间，扁平化设计风格有很多值得称赞的地方，其中有很多设计细节都是值得研究的。

首先，来看下面iOS设置的截图中的border：

<img width="320" src="http://maxzhang.github.com/articles/images/ios7_settings.png" />

从上面的截图可以看到iOS7的设计是非常精细的，border是一根非常细的线。这篇文章将说明如何使用border-image实现iOS7的border效果。

在看下面的内容之前，需要先了解devicePixelRatio和border-image，不熟悉的同学请自行脑补：

* [设备像素比devicePixelRatio简单介绍](http://www.zhangxinxu.com/wordpress/2012/08/window-devicepixelratio/)
* [CSS3 border-image详解、应用及jQuery插件](http://www.zhangxinxu.com/wordpress/?p=518)


### `border`属性实现效果

我们在实现border时通常都是使用`border`属性，如下：
```
.border-1px {
    border-width: 1px 0;
    border-style: solid;
    border-color: #333;
}
```

显示效果对比：

![border对比效果](http://maxzhang.github.com/articles/images/border_compare.png)

上面这张图片可以看到，在手机上`border`无法达到我们想要的效果。这是因为devicePixelRatio特性导致，iPhone的devicePixelRatio==2，而`border-width: 1px`描述的是设备独立像素，所以，border被放大到物理像素2px显示，在iPhone上就显得较粗。

### 使用`border-image`属性实现物理1px

通常手机端的页面设计稿都是放大一倍的，如：为适应iphone retina，设计稿会设计成640*960的分辨率，图片按照2倍大小切出来，在手机端看着就不会虚化，非常清晰。

同样，在使用`border-image`时，将border设计为物理1px，如下：

![border image 放大](https://raw.github.com/maxzhang/maxzhang.github.com/master/articles/images/border_zoom.png)

样式设置：

```
.border-image-1px {
    border-width: 1px 0px;
    -webkit-border-image: url("border.png") 2 0 stretch;
    border-image: url("border.png") 2 0 stretch;
}
```

显示效果对比：

![border image 对比效果](http://maxzhang.github.com/articles/images/border_image_compare.png)

这里在手机上的效果和iOS7已经非常接近了。

样例：http://maxzhang.github.com/examples/border1px/index.html

**Note: border.png也可以直接使用的base64替代**
```
.border-image-1px {
    border-width: 1px 0px;
    -webkit-border-image: url("data:image/png;base64,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") 2 0 stretch;
}
```

## 使用 CSS3 transform 实现

```css
.border-1px {
    position: relative;
}
.border-1px:after {
    position: absolute;
    content: '';
    top: -50%;
    bottom: -50%;
    left: -50%;
    right: -50%;
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
    border-top: 1px solid #666;
    border-bottom: 1px solid #666;
}
```

### 使用box-shadow模拟边框
利用css对影音处理的方式实现0.5px的效果
样式设置：
```
.box-shadow-1px {
  box-shadow: inset 0px -1px 1px -1px #c8c7cc;
}
```
边框有阴影，颜色变浅。

### viewport + rem 实现
[参考](https://www.w3cplus.com/mobile/lib-flexible-for-html5-layout.html)
Flexible到今天也有几年的历史了，解救了很多同学针对于H5页面布局的适配问题。而这套方案也相对而言是一个较为成熟的方案。
为了能让页面更好的适配各种不同终端，通过Hack手段来根据设备的dpr值相应改变<meta>标签中的viewport的值：

```
<!-- dpr = 1--> 
<meta name="viewport" content="initial-scale=scale,maximum-scale=scale,minimum-scale=scale,user-scalable=no">

<!-- dpr = 2-->
<meta name="viewport" content="initial-scale=0.5,maximum-scale=0.5,minimum-scale=0.5,user-scalable=no"> 

<!-- dpr = 3-->
<meta name="viewport" content="initial-scale=0.3333333333,maximum-scale=0.3333333333,minimum-scale=0.3333333333,user-scalable=no">
```
从而让页面达么缩放的效果，也变相的实现页面的适配功能。而其主要的思想有三点：

* 根据dpr的值来修改viewport实现1px的线
* 根据dpr的值来修改html的font-size，从而使用rem实现等比缩放
* 使用Hack手段用rem模拟vw特性

这个方案目前只处理了ios的dpr为2的情况，其他的都没有处理，也就是说不支持Android和drp=3的情况。
Fleible的原理：让viewport放大为device-width的dpr倍数，然后缩小1/dpr倍显示。

viewport 的计算理论上是这样的：
> viewport 的width没设置的话，默认是980px，这方面的详细介绍可以阅读《[Configuring the viewport](https://developer.apple.com/library/content/documentation/AppleApplications/Reference/SafariWebContent/UsingtheViewport/UsingtheViewport.html#//apple_ref/doc/uid/TP40006509-SW27)》;但如果设置了initial-scale，viewport=device-width/scale；同时还设置了width和initial-scale，则会取min-width，即应用这两个较小的值。[详细](https://www.quirksmode.org/blog/archives/2013/10/preliminary_met.html)

[参考：再谈Retina下1px的解决方案——大漠](https://www.w3cplus.com/css/fix-1px-for-retina.html)
[flexible官网](https://github.com/amfe/lib-flexible)
[postcss-adaptive](https://www.npmjs.com/package/postcss-adaptive)
[Mobile Web: Logical Pixel vs Physical Pixel](https://ariya.io/2011/08/mobile-web-logical-pixel-vs-physical-pixel)


### 比Fleible 要好的方案
[大漠的文章-参考](https://www.w3cplus.com/css/fix-1px-for-retina.html)
[postcss-write-svg  github地址](https://github.com/jonathantneal/postcss-write-svg)
此方法为替换border-image的替换方案，可更改图片的背景色。


### 转换单位进行渲染
android中像素单位dp、px、pt、sp的比较
dp(dip)：device independent pixele(设备独立像素)。不同设备有不同的显示效果，这个和设备硬件有关，一般我们为了支持WVGA、HVGA和QVGA 推荐使用这个，不依赖像素。

[Units & measurements](https://material.io/guidelines/layout/units-measurements.html#)

设想方案：
使用node作为中转的访问器访问接口。在这个过程中，可以根据访问的机型、分辨率，然后动态加载需要的样式。根据机型的不同划分有限的集中适配方式，或者根据大的手机厂商进行适配，适配的家数有限。
前端的手机端在不停的发展，手机的屏幕也在发展。一劳永逸的方法可能不太可能(flexible有这个想法)，因为有旧机型、新机型、小屏、大屏，若将手机划分为多个种类，这样适配的种类有限多个，加载的文件也是根据机型进行适配的。
[参考 机型种类](https://material.io/devices/)

### 参考
* [1px-on-retina  百度](http://efe.baidu.com/blog/1px-on-retina/)
* [在retina屏中实现1px border效果](http://imweb.io/topic/55e3d402771670e207a16bd1)
* [7中方法总结](https://www.jianshu.com/p/7e63f5a32636)
* [CSS Pixels](http://www.alloyteam.com/2020/06/css-pixels/)




