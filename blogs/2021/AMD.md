# require.js
```html

<link href="http://test.www.miaoshoucdn.com/mcenter/greenservice/css/common.css" rel="stylesheet" type="text/css">
<link href="http://test.www.miaoshoucdn.com/mcenter/greenservice/css/seekdoc.css" rel="stylesheet" type="text/css">
<link href="http://test.www.miaoshoucdn.com/mcenter/greenservice/css/mobileSelect.css" rel="stylesheet"
    type="text/css">

<script> !(function (doc, win, designWidth, rem2px) {
        var docEl = doc.documentElement,
            defaultFontSize = /*adapt(designWidth, rem2px),*/16,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {
                var clientWidth = win.innerWidth
                    || doc.documentElement.clientWidth
                    || doc.body.clientWidth;

                if (!clientWidth) return;
                if (clientWidth < 750) {
                    docEl.style.fontSize = clientWidth / designWidth * rem2px / defaultFontSize * 100 + '%';

                } else {
                    docEl.style.fontSize = '625%';
                }
            };
        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window, 750, 100);
</script>
<script src="https://requirejs.org/docs/release/2.3.6/minified/require.js" data-main="./src/index" async></script>
```

```js
// ./src/index
require.config({
    paths: {
        "jquery": ["https://www.miaoshoucdn.com/static/js/jquery-1.11.1.min"],
        "mobileSelect": ["http://test.www.miaoshoucdn.com/mcenter/greenservice/js/mobileSelect.min"],
        "layui": ["http://test.www.miaoshoucdn.com/mcenter/greenservice/static/layui/layui"],
        "seekdoc": ["http://test.www.miaoshoucdn.com/mcenter/greenservice/js/seekdoc"]
    }
})
require(["jquery", "mobileSelect", "layui", "seekdoc"], function ($, MobileSelect) {
    $(function () {
        //依赖安装完成  执行相关代码
    })
})
```

效果：使用 async 标签加载依赖的第三方js包，之前测过速度快了很多。

# webpack AMD模式
