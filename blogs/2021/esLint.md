### 需求
 前端项目组协作时，有些文件使用"引号，有些使用'引号，为了推动项目组中的代码一致，采用eslint对js规范校验。

### 现状
公司之前有较多的项目积累，有些项目没有入git仓库，没有使用node_module。如何进行eslint校验同时不影响之前的项目、现在开发项目及对接未来开发模式？

### 方法
* 通过使用 vscdoe  eslint插件进行校验，在维护之前项目时，可以看eslint校验结果，使得符合代码规范的代码逐渐累加。

#### 修改配置文件
ctrl + shift + p 然后输入setting ,修改配置如下：
```js
{
    "files.eol": "\n",
    
    "eslint.enable": true,// v2.1.20 中会报弃用 功能贡献中有设置之
    "eslint.nodePath": "C:\\Users\\anlien\\AppData\\Roaming\\nvm\\v14.16.0\\node.exe",
    "eslint.validate": [
        "javascript",
        "html"
    ],
    "eslint.options": {
        //依赖于npm 安装依赖的位置，在 node_modules 下面添加 ---使用npm config ls查看npm安装目录
        "configFile": "C:\\Users\\anlien\\AppData\\Roaming\\nvm\\v14.16.0\\.eslintrc.js"
    },

    "terminal.integrated.shell.windows": "C:\\Windows\\System32\\cmd.exe" 
}
```
#### 全局安装依赖
```js
"devDependencies": {
    "eslint": "^7.24.0",
    "eslint-plugin-html": "^6.1.2"//校验html中的js代码
}
```

#### 配置文件存放的位置
使用 eslint生成配置文件，然后添加配置，将配置好的文件存放在全局node_modules文件夹下方，与node_modules是同级关系。

### 填坑

  - nvm的地址问题。在本地环境中装了nvm对nodejs进行了管理，使用cmd命令查询的nodejs安装目录 where node是不正确的。
    - 找到nodejs目录，若nodejs是快捷键方式，查看属性找到nodejs真实目录
  - PowerShell 权限问题。在vscode中输入eslint --init 无法初始化配置
    - 更换终端，不使用powerShell，使用cmd。在setting.json中增加更换命令终端的配置。"terminal.integrated.shell.windows": "C:\\Windows\\System32\\cmd.exe" 	
  - eslint.options 配置的问题
    - 默认configFile中的.eslintrc.js文件地址中，需要有node_modules。可以新建文件目录，然后安装eslint的插件。建议：配置文件放在全局 node_modules 同级中。
  - windows 配置地址的问题。正确是使用“\\\\” 表示目录，不能使用// 、/、\。
  - eslint 执行的相关信息查看
    - 点击进入.js文件，在vscode 右下角 有一个 ESLint执行状态，有一个√号表示正常执行。在终端第一栏（问题）中可以看到执行eslint校验结果
  - npm 安装包的问题
    - npm config ls 查看 npm 安装node_modules 的具体路径。nodejs下的node_modules 有些电脑上只是nodejs 依赖的npm





    