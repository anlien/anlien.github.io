### bug地址
[NCSERVER-14041](http://tlc.xin.com/browse/NCSERVER-14041)

### bug描述
预期结果是模块标题应该加粗，实际结果是在【OPPO R7】【360 && QQ && UC】本地模块中字体未加粗。
在chrome 与其他的机型中字体是加粗的。

### 问题的位置定位
若字体有问题，那在其他手机中应该是未加粗的，但实际其他手机中有加粗。说明是解析的问题，字体粗细解析不一致导致的。字体加粗的属性为font-weight，对font-weight的值解析不一导致的。

### 初期对原因资料查找
1.对于文本的给定范围，在渲染这些文本时使用css字体属性选择所使用的 字体家族 及 家族中的字体外观。
2.'font-weight' 属性执行字体中字形的重量，取决于黑度等级或笔划粗细。

100至900 这些有序排列中的每个值，表示至少与其起身拥有相同黑度的重量。其大致符合下列通用重量名称：
	* 100 - Thin
	* 200 - Extra Light (Ultra Light)
	* 300 - Light
	* 400 - Normal
	* 500 - Medium
	* 600 - Semi Bold (Demi Bold)
	* 700 - Bold
	* 800 - Extra Bold (Ultra Bold)
	* 900 - Black (Heavy)

通常一个特定的字体家族仅会包含少数的可用重量。若一个重量所指定的字形不存在，则应当使用相近重量的字形。通常，较重的重量会映射到更重的重量、较轻的重量会映射到更轻的重量（精确定义参见下面的字体匹配章节）。


IE 8 
Certain combinations of weights don't work together when linked into the same font-family name. Using variation-specific names is a workaround for this problem as well.[参考](https://helpx.adobe.com/typekit/using/css-selectors.html)

#### [参考w3c](https://www.w3.org/TR/CSS22/fonts.html#font-boldness)
Once the font family's weights are mapped onto the CSS scale, missing weights are selected as follows:

* If the desired weight is less than 400, weights below the desired weight are checked in descending order followed by weights above the desired weight in ascending order until a match is found.
* If the desired weight is greater than 500, weights above desired weight are checked in ascending order followed by weights below the desired weight in descending order until a match is found.
* If the desired weight is 400, 500 is checked first and then the rule for desired weights less than 400 is used.
* If the desired weight is 500, 400 is checked first and then the rule for desired weights less than 400 is used.

注意w3c css 2.2有一段如下描述：
There is no guarantee that there will be a darker face for each of the 'font-weight' values; for example, some fonts may have only a normal and a bold face, while others may have eight face weights. There is no guarantee on how a UA will map font faces within a family to weight values. The only guarantee is that a face of a given value will be no less dark than the faces of lighter values.
不能保证每个“字体重量”值都会有一个较暗的表情;例如，某些字体可能只有普通和粗体，而其他字体可能有八个面部权重。无法保证UA如何将家族内的字体映射到权重值。唯一的保证是给定值的面会比面值更小的面更暗。

#### css3字体描述 [css-fonts-3](https://drafts.csswg.org/css-fonts-3/#font-matching-algorithm)


### 实验测试

```html

<p class="p1">内容测试，测试300</p>
<p class="p2">内容测试，测试400</p>
<p class="p3">内容测试，测试normal</p>
<p class="p4">Englist test内容测试，测试500 Englist test</p>
<p class="p5">Englist test内容测试，测试600 Englist test</p>
<p class="p6">Englist test内容测试，测试700 Englist test</p>
<p class="p7">内容测试，测试 bold Englist test</p>

```

**** html设置lang="en" 时,没有设置其他样式，只是设置简单的font-weight。

小米手机浏览器、360浏览器
* 英文字符中400/500/600 相对于300都有加黑，且逐渐加粗。
* 中文字符600 没有颜色，700时有加粗。

App chrome浏览器、chrome浏览器、：英文字符300/400/500 没有加粗，600加黑，七百加黑。中文600百前无加黑，700开始加黑。
firefox 59.0.3 ：中英文粗细都有变化。

**** 设置lang="zh-cn" 进行测试：
小米手机浏览器、360浏览器、app chrome：
* 中英文300/400/500/600 都没有加黑，没有黑体。700正常加黑。
* pc Chrome浏览器 300/400/500没有加黑，600加黑。700正常加黑。

**** 分别设置 lang="zh-cn" 和 lang="en"，并添加字体测试
```css
font-family:"Hiragino Sans GB","Microsoft Yahei UI","Microsoft Yahei",微软雅黑,"Segoe UI",Tahoma,宋体b8b体,SimSun,sans-serif;
```

小米手机浏览器、360浏览器、App chrome浏览器、pc chrome浏览器、firefox 
* 英文字符：全部从300起相逐渐加粗
* 中文字符：小米手机浏览器、360浏览器、App chrome浏览器 700开始加粗。pc chrome 600开始加粗。

[css为英文和中文字体分别设置不同的字体](https://blog.csdn.net/roc1010/article/details/25190947)

对于所有正常的浏览器 [1]，CSS 的 font-family 属性 [2] 的基本能力之一就是依其列表内字体的排序（优先级）来显示文字。         如果设定为「font-family: "Western Font", "Chinese Font", generic-family;」，就用第一项 "Western Font" 显示西文（英文字母、英文标点、阿拉伯数字……），然后遇到汉字之类不受 "Western Font" 支持的字符就用下一项 "Chinese Font"。所以通常这样就可以分别为英文和中文设定字体了。这是极其常见的手法。[梁海](https://www.zhihu.com/question/19977292/answer/13537767)

参考[w3c css3 font-weight](https://drafts.csswg.org/css-fonts-3/#font-weight-prop)

Font formats that use a scale other than a nine-step scale should map their scale onto the CSS scale so that 400 roughly corresponds with a face that would be labeled as Regular, Book, Roman and 700 roughly matches a face that would be labeled as Bold. Or weights may be inferred from the style names, ones that correspond roughly with the scale above. The scale is relative, so a face with a larger weight value must never appear lighter. If style names are used to infer weights, care should be taken to handle variations in style names across locales.

Quite often there are only a few weights available for a particular font family. When a weight is specified for which no face exists, a face with a nearby weight is used. In general, bold weights map to faces with heavier weights and light weights map to faces with lighter weights (see the font matching section below for a precise definition).

参考
terms that apply to one font family may not be appropriate for others. 
适用于一个字体系列的术语可能不适合其他字体系列。

### 参考
* [cssreference font-weight](https://cssreference.io/property/font-weight/)
  The unavailable weights simply display the logically closest weight.
* [css3fontweight 主要参考](https://aotu.io/notes/2016/11/08/css3fontweight/index.html)
* [w3c font-boldness CSS21 英文](https://www.w3.org/TR/CSS21/fonts.html#font-boldness)
* [w3c font-boldness CSS22 英文](https://www.w3.org/TR/CSS22/fonts.html)
* [w3c 字体家族](https://www.w3.org/html/ig/zh/wiki/CSS3%E5%AD%97%E4%BD%93%E6%A8%A1%E5%9D%97#.E5.AD.97.E4.BD.93.E7.B2.97.E7.BB.86.EF.BC.9A.E2.80.98font-weight.E2.80.99.E5.B1.9E.E6.80.A7)
* [font-family](https://github.com/AlloyTeam/Mars/blob/master/solutions/font-family.md)
* [知乎关于字体的设置](https://www.zhihu.com/question/19977292)

### 其他评论
In Win7 with Chrome and Open Sans 300,400 and 600 included it just shows two variations(400 and 700). So, Louis’ recommendation to use a font-weight which shows up nice in all situations is the best practical solution.[参考](https://css-tricks.com/almanac/properties/f/font-weight/)


### 苹果6p:
设置成 <html lang="zh"> 从500 开始加粗。
未设置 lang，字体从600开始加粗。
body设置字体 则字体的样式分明。

### 总结

* 设置lang="zh" 

    > 小米手机浏览器、360浏览器：中英文300/400/500/600 都没有加粗。中英文在700时正常加粗。

    > 手机上的chrome浏览器 ：英文字符300/400/500/600 没有加粗，700加粗.

* 设置lang="en"

    > 米手机浏览器、360浏览器：font-weight为400/500/600英文字符颜色有加粗且逐渐加重，中文无加粗现象。

    > 手机上的chrome浏览器 ：font-weight为300/400/500 
    英文字符没有加粗，600时英文开始加粗，700时中文开始加粗.
    
 设置字体并使用使用700加粗。
