

# 刷新页面时 event log

* Event: beforeunload
* navigationStart
* fetchStart
* responseEnd
* Event: pagehide
* Event: visibilitychange
* Event: webkitvisibilitychange
* unloadEventStart
* Event: unload
* unloadEventEnd
* Send Request [Resource   3_Full.html]
* Receive Response[ Resource  3_Full.html]
* domLoading
* Receive Data [Resource  3_Full.html]
* Finish Loading [Resource 3_Full.html]
* Parse HTML[Range  3_Full.html:0 [0…-1]]
  * domInteractive
  * Event: readystatechange
  * domContentLoadedEventStart
  * Event: DOMContentLoaded
  * domContentLoadedEventEnd
  * Recalculate Style
* Layout
* Update Layer Tree
* Paint
* Composite Layers
* Evaluate Script[Scriptchrome-state-manager.js:1]
  * Compile Script
* Update Layer Tree
* Composite Layers ---------//常见的
* domComplete
* Event: readystatechange
* loadEventStart
* Event: load
* loadEventEnd
* Event: pageshow
* Send Request [Resource  favicon.ico]
* Finish Loading
* Update Layer Tree
* Composite Layers
* Update Layer Tree
* Composite Layers
  * Hit Test
  * Hit Test
* Major GC
* Major GC [Collected 2.0 MB]
* Major GC
* Major GC
* Major GC [Major GC]

# 异步加载

同事写了一个 "门诊预约" 预约项目，在测试环境渲染时会闪烁一下。
* 一开始看性能分析时，以为是 解析 HTML 时机的问题，解析到底部js时，会将之前的 html 渲染到页面。尝试不同的方式，发现有不同的效果。

## 解析html之前加载完js和css——不闪烁
```html
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>rem闪烁问题</title>
    <link href="http://test.www.miaoshoucdn.com/mcenter/greenservice/css/common.css" rel="stylesheet" type="text/css">
    <link href="http://test.www.miaoshoucdn.com/mcenter/greenservice/css/seekdoc.css" rel="stylesheet" type="text/css">
    <link href="http://test.www.miaoshoucdn.com/mcenter/greenservice/css/mobileSelect.css" rel="stylesheet">
    <script>
        !(function (doc, win, designWidth, rem2px) {
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
                        docEl.style.fontSize = '625%';//此处使用的是百分比
                    }
                };
            if (!doc.addEventListener) return;
            win.addEventListener(resizeEvt, recalc, false);
            doc.addEventListener('DOMContentLoaded', recalc, false);
        })(document, window, 750, 100);
    </script>
    <script src="https://www.miaoshoucdn.com/static/js/jquery-1.11.1.min.js"></script><!--这个是变量-->
</head>

<body>
    <div class="seekInfo_main">
        <div class="item">
            <label><span class="vereist">*</span><span>姓名</span></label>
            <div class="detail_con"><input placeholder="请输入姓名" type="text" class="regName"></div>
        </div>
        <div class="item">
            <label><span class="vereist">*</span><span>手机号</span></label>
            <div class="detail_con"><input placeholder="请输入手机号" type="tel" maxlength="11" class="regPhone"></div>
        </div>
        <div class="item">
            <label><span class="vereist">*</span><span>身份证号</span></label>
            <div class="detail_con"><input placeholder="请输入身份证号" type="text" class="regId"></div>
        </div>
        <div class="item">
            <label><span>医保卡号</span></label>
            <div class="detail_con"><input placeholder="请输入医保卡号" type="number" maxlength="18"></div>
        </div>
        <div class="item">
            <label><span>就诊卡号</span></label>
            <div class="detail_con"><input placeholder="请输入就诊卡号" type="number" maxlength="18"></div>
        </div>
        <div class="item">
            <label><span class="vereist">*</span><span>关系</span></label>
            <div class="detail_con"><span id="edit_relation">请选择关系</span><i class="arrow_right"></i></div>
        </div>
        <div class="item">
            <label><span class="vereist">*</span><span>期望医院</span></label>
            <div class="detail_con"><input placeholder="请输入期望医院" type="text" class="regHospital"></div>
        </div>
        <div class="item">
            <label><span class="vereist">*</span><span>期望科室</span></label>
            <div class="detail_con"><input placeholder="请输入期望科室" type="text" class="regWork"></div>
        </div>
    </div>
</body>
```

从性能分析上可以看到FP之前已经解析完了js与css。

* Parse HTML[**Range**	3_Full.html:0 [0…56] ]
  * Send Request [common.css, GET,Highest]
  * Send Request [seekdoc.css, GET,Highest]
  * Send Request [mobileSelect.css, GET,Highest]
  * Send Request [jquery-1.11.1.min.js GET,Highest]
  * Send Request [mzyy_banner.png, GET, low]
* requestStart
* requestStart
* requestStart
* requestStart
* Receive Response [Resource  jquery-1.11.1.min.js]
* Receive Data[Resource jquery-1.11.1.min.js]
* Finish Loading[Resource jquery-1.11.1.min.js] //-------收到后无解析与执行，与js代码事件有关
* Receive Response[Resource common.css]
* Receive Data[Resource common.css]
* Parse Stylesheet [Stylesheet URL  common.css]
* Finish Loading[Resource  common.css]
* Event: load
* Receive Response [Resource seekdoc.css]
* Receive Data[Resource  seekdoc.css]
* Parse Stylesheet [Stylesheet URL  seekdoc.css]
* Finish Loading[Resource seekdoc.css]
* Event: load
* Receive Response [Resource mobileSelect.css]
* Receive Data[Resource  mobileSelect.css]
* Parse Stylesheet [Stylesheet URL  mobileSelect.css]
* Finish Loading[Resource mobileSelect.css]
* Evaluate Script
* Compile Script [Script  3_Full.html:36]------rem脚本

* Parse HTML [Range  3_Full.html:57 [57…-1]]

  * Evaluate Script[Script  jquery-1.11.1.min.js:1]//-------------解析？
    * Compile Script [Script  jquery-1.11.1.min.js:1]
    * Parse HTML[Range  3_Full.html:0 [0…-1]]
      * Call Stacks
    * Parse HTML[Range  3_Full.html:0 [0…-1]]
      * Call Stacks
    * Parse HTML[Range  3_Full.html:0 [0…-1]]
      * Call Stacks
    * Parse HTML[Range  3_Full.html:0 [0…-1]]
      * Call Stacks
  * Event: load

  * domInteractive
  * Event: readystatechange
  * domContentLoadedEventStart
  * Event:DomContentLoaded
    * Function Call  [Function  recalc @ 3_Full.html:40]
      * Recalculate Style
        * recalc
        * recalc
      * recalc
      * Layout
        * recalc
      * recalc
        * Schedule Style Recalculation
    * Function Call [Function  J @ jquery-1.11.1.min.js:2 ]
  * domContentLoadedEventEnd

* Layout

* Update Layer Tree

* Paint[Layer Root #document ]

* Paint[layer Root #document]

* Paint[layer Root #div.seeknav_footer]

* Composite Layers

* Event:load

* Major GC

* Evaluate Script ----chrome-state-manager.js:1

* Update Layer Tree

* Composite Layers

## 解析html之前加载完js和css——页面出现闪烁
```html
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>rem闪烁问题</title>
    <link href="http://test.www.miaoshoucdn.com/mcenter/greenservice/css/common.css" rel="stylesheet" type="text/css">
    <link href="http://test.www.miaoshoucdn.com/mcenter/greenservice/css/seekdoc.css" rel="stylesheet" type="text/css">
    <link href="http://test.www.miaoshoucdn.com/mcenter/greenservice/css/mobileSelect.css" rel="stylesheet">
    <script>
        !(function (doc, win, designWidth, rem2px) {
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
                        docEl.style.fontSize = '625%';//此处使用的是百分比
                    }
                };
            if (!doc.addEventListener) return;
            win.addEventListener(resizeEvt, recalc, false);
            doc.addEventListener('DOMContentLoaded', recalc, false);
        })(document, window, 750, 100);
    </script>
    <script src="https://www.miaoshoucdn.com/static/js/jquery-1.11.1.min.js"></script><!--这个是变量-->
</head>

<body>
    <div class="seekInfo_main">
        <div class="item">
            <label><span class="vereist">*</span><span>姓名</span></label>
            <div class="detail_con"><input placeholder="请输入姓名" type="text" class="regName"></div>
        </div>
        <div class="item">
            <label><span class="vereist">*</span><span>手机号</span></label>
            <div class="detail_con"><input placeholder="请输入手机号" type="tel" maxlength="11" class="regPhone"></div>
        </div>
        <div class="item">
            <label><span class="vereist">*</span><span>身份证号</span></label>
            <div class="detail_con"><input placeholder="请输入身份证号" type="text" class="regId"></div>
        </div>
        <div class="item">
            <label><span>医保卡号</span></label>
            <div class="detail_con"><input placeholder="请输入医保卡号" type="number" maxlength="18"></div>
        </div>
        <div class="item">
            <label><span>就诊卡号</span></label>
            <div class="detail_con"><input placeholder="请输入就诊卡号" type="number" maxlength="18"></div>
        </div>
        <div class="item">
            <label><span class="vereist">*</span><span>关系</span></label>
            <div class="detail_con"><span id="edit_relation">请选择关系</span><i class="arrow_right"></i></div>
        </div>
        <div class="item">
            <label><span class="vereist">*</span><span>期望医院</span></label>
            <div class="detail_con"><input placeholder="请输入期望医院" type="text" class="regHospital"></div>
        </div>
        <div class="item">
            <label><span class="vereist">*</span><span>期望科室</span></label>
            <div class="detail_con"><input placeholder="请输入期望科室" type="text" class="regWork"></div>
        </div>
    </div>
    <script>cosnole.log("页面出现闪烁")</script><!--主要差别-->
</body>
```
Event Log

* Parse HTML[**Range**	3_Full.html:0 [0…56] ]
  * Send Request [common.css, GET,Highest]
  * Send Request [seekdoc.css, GET,Highest]
  * Send Request [mobileSelect.css, GET,Highest]
  * Send Request [jquery-1.11.1.min.js GET,Highest]
  * Send Request [mzyy_banner.png, GET, low]
* requestStart
* requestStart
* requestStart
* requestStart
* Receive Response [Resource  jquery-1.11.1.min.js]
* Receive Data[Resource jquery-1.11.1.min.js]
* Finish Loading[Resource jquery-1.11.1.min.js] //-------收到后无解析与执行，与js代码事件有关
* Receive Response[Resource common.css]
* Receive Data[Resource common.css]
* Parse Stylesheet [Stylesheet URL  common.css]
* Finish Loading[Resource  common.css]
* Event: load
* Receive Response [Resource seekdoc.css]
* Receive Data[Resource  seekdoc.css]
* Parse Stylesheet [Stylesheet URL  seekdoc.css]
* Finish Loading[Resource seekdoc.css]
* Event: load
* Receive Response [Resource mobileSelect.css]
* Receive Data[Resource  mobileSelect.css]
* Parse Stylesheet [Stylesheet URL  mobileSelect.css]
* Finish Loading[Resource mobileSelect.css]
* Evaluate Script
  * Compile Script [Script  3_Full.html:36]------rem脚本
* Parse HTML[**Range**  3_Full.html:57 [57…196]]//------------------------------留一行script
  * Evaluate Script[Script  jquery-1.11.1.min.js:1]
    * Compile Script [Script  jquery-1.11.1.min.js:1]
    * Parse HTML[Range  3_Full.html:0 [0…-1]]
      * Call Stacks
    * Parse HTML[Range  3_Full.html:0 [0…-1]]
      * Call Stacks
    * Parse HTML[Range  3_Full.html:0 [0…-1]]
      * Call Stacks
    * Parse HTML[Range  3_Full.html:0 [0…-1]]
      * Call Stacks
  * Event: load
* Recalculate Style [Elements Affected  102]
* Layout
* Update Layer Tree
* **Paint**---------------------------第一次绘画
* Composite Layers
* Event: load
* Parse HTML [Range  3_Full.html:197 [197…-1]
  * Schedule Style Recalculation
  * Evaluate Script
    * Compile Script[Script  3_Full.html:198]
  * domInteractive
  * Event: readystatechange
  * domContentLoadedEventStart
  * Event: DOMContentLoaded-------------------//闪烁是与此事件有关
    * Function Call  [Function  recalc @ 3_Full.html:40]
      * recalc
        * Recalculate Style——————//在此重新计算样式
        * Schedule Style Recalculation
    * Function Call [Function  J @ jquery-1.11.1.min.js:2 ]
  * domContentLoadedEventEnd
* **Layout**
* Update Layer Tree
* **Paint** [Layer Root  #document]
* **Paint** [Layer Root  #document]
* **Paint** [Layer Root  div.seeknav_footer]
* Composite Layers
* Evaluate Script [Script  chrome-**state**-manager.js:1 ]
  * Compile Script
* Major GC
* Update Layer Tree
* Composite Layers

## 减少HTML代码量——可以控制闪烁 

```html
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>rem闪烁问题</title>
    <link href="http://test.www.miaoshoucdn.com/mcenter/greenservice/css/common.css" rel="stylesheet" type="text/css">
    <link href="http://test.www.miaoshoucdn.com/mcenter/greenservice/css/seekdoc.css" rel="stylesheet" type="text/css">
    <link href="http://test.www.miaoshoucdn.com/mcenter/greenservice/css/mobileSelect.css" rel="stylesheet">
    <script>
        !(function (doc, win, designWidth, rem2px) {
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
                        docEl.style.fontSize = '625%';//此处使用的是百分比
                    }
                };
            if (!doc.addEventListener) return;
            win.addEventListener(resizeEvt, recalc, false);
            doc.addEventListener('DOMContentLoaded', recalc, false);
        })(document, window, 750, 100);
    </script>
    <script src="https://www.miaoshoucdn.com/static/js/jquery-1.11.1.min.js"></script><!--这个是变量-->
</head>

<body>
    <div class="seekInfo_main">
        <div class="item">
            <label><span class="vereist">*</span><span>姓名</span></label>
            <div class="detail_con"><input placeholder="请输入姓名" type="text" class="regName"></div>
        </div>
        <div class="item">
            <label><span class="vereist">*</span><span>手机号</span></label>
            <div class="detail_con"><input placeholder="请输入手机号" type="tel" maxlength="11" class="regPhone"></div>
        </div>
        <div class="item">
            <label><span class="vereist">*</span><span>身份证号</span></label>
            <div class="detail_con"><input placeholder="请输入身份证号" type="text" class="regId"></div>
        </div>
        <div class="item">
            <label><span>医保卡号</span></label>
            <div class="detail_con"><input placeholder="请输入医保卡号" type="number" maxlength="18"></div>
        </div>
        <div class="item"><!--此时的变量: 没有此div就不会闪烁-->
            <label><span>就诊卡号</span></label>
            <div class="detail_con"><input placeholder="请输入就诊卡号" type="number" maxlength="18"></div>
        </div>
    </div>
    <script>cosnole.log("页面出现闪烁")</script><!--上一版的变量-->
</body>
```

没有就诊卡 dom元素时，不会闪烁。html的量不同，解析方式也不相同

## 总结

* 与浏览器的解析方式有关
* DOMContentLoaded 事件触发的时机不同

# 同步加载

## 与加载资源表现一致：闪烁

此处没有加载jQuery

```html
<style>*{padding:0px;margin:0px;word-break:break-all;word-wrap:break-word;-webkit-tap-highlight-color:transparent;outline:0;}html,body{background:#fff;color:#333;font-size:12px;}fieldset,img,input,textarea{border:0;outline:none;}::-webkit-input-placeholder{color:#999;}input[type="text"],input[type="submit"],input[type="button"],input[type="number"],input[type="tel"],textarea,button{-webkit-border-radius:0;border-radius:0;-webkit-appearance:none;}::-webkit-scrollbar{display:none;}.arrow_right{display:inline-block;width:.12rem;height:.12rem;border:solid #ccc;border-width:1px 1px 0 0;transform:rotate(45deg);-webkit-transform:rotate(45deg);margin:0 .04rem 0 .1rem;}.seekInfo_main .item{display:flex;align-items:center;border-bottom:1px solid #eee;font-size:.32rem;color:#555555;height:1rem;padding:0 .2rem;}.seekInfo_main .item .vereist{color:#FF1F1F;}.seekInfo_main .item .detail_con{display:flex;flex:1;align-items:center;justify-content:flex-end;height:1rem;line-height:1rem;}.seekInfo_main .item input,.change_select{display:inline-block;text-align:right;cursor:pointer;width:100%;height:.4rem;font-size:.3rem;margin-top:.05rem;}.seekInfo_main .item .detail_con span{cursor:pointer;color:#999;}</style>
    <script>
        !(function (doc, win, designWidth, rem2px) {
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
                        docEl.style.fontSize = '625%';//此处使用的是百分比
                    }
                };
            if (!doc.addEventListener) return;
            win.addEventListener(resizeEvt, recalc, false);
            doc.addEventListener('DOMContentLoaded', recalc, false);// ---------------问题的根源在此
        })(document, window, 750, 100);
    </script>
<div class="seekInfo_main">
    <div class="item">
        <label><span class="vereist">*</span><span>姓名</span></label>
        <div class="detail_con"><input placeholder="请输入姓名" type="text" class="regName"></div>
    </div>
    <div class="item">
        <label><span class="vereist">*</span><span>手机号</span></label>
        <div class="detail_con"><input placeholder="请输入手机号" type="tel" maxlength="11" class="regPhone"></div>
    </div>
    <div class="item">
        <label><span class="vereist">*</span><span>身份证号</span></label>
        <div class="detail_con"><input placeholder="请输入身份证号" type="text" class="regId"></div>
    </div>
    <div class="item">
        <label><span>医保卡号</span></label>
        <div class="detail_con"><input placeholder="请输入医保卡号" type="number" maxlength="18"></div>
    </div>
    <div class="item">
        <label><span>就诊卡号</span></label>
        <div class="detail_con"><input placeholder="请输入就诊卡号" type="number" maxlength="18"></div>
    </div>
    <div class="item">
        <label><span class="vereist">*</span><span>关系</span></label>
        <div class="detail_con"><span id="edit_relation">请选择关系</span><i class="arrow_right"></i></div>
    </div>
    <div class="item">
        <label><span class="vereist">*</span><span>期望医院</span></label>
        <div class="detail_con"><input placeholder="请输入期望医院" type="text" class="regHospital"></div>
    </div>
    <div class="item">
        <label><span class="vereist">*</span><span>期望科室</span></label>
        <div class="detail_con"><input placeholder="请输入期望科室" type="text" class="regWork"></div>
    </div>
</div>
<script>console.log("闪烁问题")</script>
```

* Event: beforeunload
* navigationStart
* fetchStart
* responseEnd
* Event: pagehide
* Event: visibilitychange
* Event: webkitvisibilitychange
* unloadEventStart
* Event: unload
* unloadEventEnd
* Send Request [Resource   3_Full.html]
* Receive Response[ Resource  3_Full.html]
* domLoading
* Receive Data [Resource  3_Full.html]
* Finish Loading [Resource 3_Full.html]
* Parse HTML[Range  3_Full.html:0 [0…57]--------------------//直接到末尾
  * Evaluate Script
    * Compile Script [Script  2_local.html:7]  --------------//rem代码
* Recalculate Style
* Layout
* Update Layer Tree
* Paint
* Composite Layers
* Parse HTML [Range 2_local.html:58 [58…-1]]
  * Schedule Style Recalculation
  * Evaluate Script
    * Compile Script [Script  2_local.html:59]
  * domInteractive
  * Event: readystatechange
  * domContentLoadedEventStart
  * Event: DOMContentLoaded--------------------//此处
    * Function Call
      * recalc
        * Recalculate Style
        * Schedule Style Recalculation
    * recalc
  * domContentLoadedEventEnd
  * Recalculate Style

* Layout
* Update Layer Tree
* Paint
* Composite Layers
* Evaluate Script[Scriptchrome-state-manager.js:1]
  * Compile Script
* domComplete
* Event: readystatechange
* loadEventStart
* Event: load
* loadEventEnd
* Event: pageshow
* Update Layer Tree
* Composite Layers
* Update Layer Tree
* Composite Layers
  * Hit Test
  * Hit Test

与加载资源渲染基本一致。