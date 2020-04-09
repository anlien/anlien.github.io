参考：https://doc.webpack-china.org/concepts/manifest/

可能会问：webpack及插件似乎“知道”应该生成哪些文件。答案是通过manifest，webpack能够对 bundle保持追踪。
通过manifest,webpack 能够保持对打包生成bundle过程的追踪。

当编译器开始执行、解析和映射应用程序时，它会保留所有模块的详细要点———这个数据集合称为“Manifest”。
当完成打包并发送到浏览器时，会在运行时通过Manifest来解析和加载模块。
无论选择哪种模块语法，那些import或require语法现在都已转换为__webpack_require__方法，此方法指向模块标识符（module identifier）。
通过使用manifest中的数据，runtime将能够查询模块标识符，检索出背后对应的模块。

通过使用[webpackManifestPlugin](https://github.com/danethurber/webpack-manifest-plugin)，可以直接将数据提取到一个json文件，以供使用。


通过使用 bundle 计算出内容散列(content hash)作为文件名称，这样在内容或文件修改时，浏览器中将通过新的内容散列指向新的文件，从而使缓存无效。一旦你开始这样做，你会立即注意到一些有趣的行为。即使表面上某些内容没有修改，计算出的哈希还是会改变。这是因为，runtime 和 manifest 的注入在每次构建都会发生变化。

webpack中构建hash值变化的原因：module.id 会基于默认的解析顺序进行增量。也就是说，解析顺序发生了变化，id变化了。
[参考](https://doc.webpack-china.org/guides/caching)
推荐两个插件：
开发环境：[NameModulesPlugin](https://doc.webpack-china.org/plugins/named-modules-plugin)
线上环境：[HashedModuleIdsPlugin](https://doc.webpack-china.org/plugins/hashed-module-ids-plugin)

### 加载图片
css中背景和图标的处理：使用file-loader，可以将这些内容混合到css中。

在js中使用图片模块：
```js 
import MyImage from './my-image.png'
```
这张图片将被处理并添加到 output目录 ，引用的MyImage 变量将包含该图片在处理后的最终url。


loader会识别这是一个本地文件，并将‘./my-image.png’路径，替换为输出目录中图像的最终路径。
注：会使用loader处理加载的文件，对应依赖的图片模块会在 依赖图 中对应，（假设）依赖图中有最终的路径。

加载图片时，如果图片小于option中的限制，那么就可以base64，这样图片不会建立在依赖图中。


### 在css中使用css-loader：
css中使用
```js 
url(~Module/image.png) => require('module/image.png');
```


css-loader scope（作用域）问题：
默认情况下，css将所有的类名暴露到全局的选择器作用域中。

scope的语法：
:local(.className) 可以被用来在局部作用域中声明 className。局部的作用域标识符会以模块形式暴露出去。
使用:local(无括号) 可以将此选择器启用局部模式。

:global(.className) 可以用来声明一个明确的全局选择器。
使用:global(无括号) 可以将此选择器切换至全局模式。

loader 会用唯一的标识符(identifier)来替换局部选择器。所选择的唯一标识符以模块形式暴露出去。


<img src="./my-image.png"/> 中的src将使用html-loader来处理。


资源管理：
以这种方式加载资源，可以以更直观的方式将模块和资源组合在一起。无需依赖于含有全部资源的/assets目录，而是将资源与代码组合在一起。代码可移植性非常强。

注：
这种方式组织代码，基本上代码的编写，依赖的包跟文件存放的路径无关。
在文件中配置alias后，文件的移动只与此处有关。在其他的文件使用该模块时，引用别名即可，使用的模块跟路径无关，无论源文件迁移到什么位置，使用别名不受影响。


###资源管理
webpack  和 grunt、gulp处理资源的方式：
在webpack出现之前，前端开发人员使用grunt和gulp等工具只是从/src文件夹下移动到/dist或/build目录之中。

自己注：
1.使用webpack之前，文件存放在固定的文件夹下面，例如src/img、src/js、src/css等，有相对固定的目录。webpack则是从入口文件起建立依赖图，然后加工处理后，生成想要的代码。文件组织不依赖文件结构，只要代码中找的到，webpack会加载并经loader处理，进行输出，处理后的文件和原来的文件无关。依赖图中的各个资源都是模块，进行输出时，可以灵活的组织这些模块（例如，css-loader中css名称）,构建自己想要的组织方式和使用方式（例如避免打包未使用的模块等）。

2.传统的项目中，放在固定文件夹下的代码文件，可能会被gulp和grunt所打包。造成一些不必要的压缩和打包开销。webpack从一个文件进入，这样可以避免不必要的资源浪费。gulp和grunt会将文件夹下一些不必要的文件进行处理。


js模块化的到来，经js代码进行切割，增加代码的易读性、可复用、抽象性。从大的项目，例如npm中的包，这些包可以组织工程。从小的来说，之前参加过的项目，可以将代码抽离，积累，然后增加开发速度，降低开发难度。一些和逻辑无关的代码，完全可以独立出来，避免重复编码，降低成本！！


webpack 最出色的功能之一就是，除了 JavaScript，还可以通过 loader 引入任何其他类型的文件。
1.如果对本地文件进行处理，模块化可以避免多次处理？（不确定）
2.可以对其他文件类型进分割。例如，可以将一个大的css，切分成多个css，并提取公用的css样式。扩大可复用代码的种类。
3.对模块中不同的文件，进行特殊的处理，而不影响全局。因为只是一个模块，例如处理组件中的css。


如果将其他类型的文件抽出的模块化，想象成砖头，那么可以用这些模块进行自由的组合。


source map的作用：
当 webpack 打包源代码时，可能会很难追踪到错误和警告在源代码中的原始位置。例如，如果将三个源文件（a.js, b.js 和 c.js）打包到一个 bundle（bundle.js）中，而其中一个源文件包含一个错误，那么堆栈跟踪就会简单地指向到 bundle.js。这并通常没有太多帮助，因为你可能需要准确地知道错误来自于哪个源文件。

为了更容易地追踪错误和警告，JavaScript 提供了 source map 功能，将编译后的代码映射回原始源代码。


dome：https://github.com/dear-lizhihua/webpack.js.org-demos/tree/webpack.js.org/guides/caching

webpack 配置：https://github.com/blade254353074/multi-vue


