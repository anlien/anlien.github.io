# 介绍
明确他们的意思：CR(回车)，LF(换行)。CR和LF是缩写，其实他们的全称分别是："Carriage-Return"和"Line-Feed"。追本溯源的说，CR(Carriage-Return)和LF(Line-Feed)这两个词来源于打字机的发明和使用。在文本处理中, CR, LF, CR/LF是不同操作系统上使用的换行符。

Dos和windows采用回车+换行CR/LF表示下一行, 而UNIX/Linux采用换行符LF表示下一行，苹果机(MAC OS系统)也采用换行符LF表示下一行。**CR用符号’\r’表示, LF使用’\n’符号表示**。

一般操作系统上的运行库会自动决定文本文件的换行格式。 如一个程序在windows上运行就生成CRLF换行格式的文本文件，而在Linux上运行就生成LF格式换行的文本文件。在一个平台上使用另一种换行符的文件文件可能会带来意想不到的问题, 特别是在编辑程序代码时. 有时候代码在编辑器中显示正常, 但在编辑时却会因为换行符问题而出错。

# vscode 编辑器设置
在 crt+shif+p ==> 首选项设置 ===> setting中设置： "files.eol": "\n"。将文件的默认保存末尾为\n。

# git 下载时设置
在Windows中 使用 git clone库时，默认设置中会对文件的末尾进行转换，需要设置下：
> git config --global core.autocrlf input 
或者设置为：
> git config --global core.autocrlf false(建议设置为false，转换交给prettier来完成)

* 设置为true，**添加文件到git仓库**（即提交代码）时，git将其视为文本文件。他将把crlf变成lf。autocrlf=true会在有人Check代码（即从git仓库迁出代码）时把代码line-endings转换为CRLF。
* 设置为false时，line-endings将不做转换操作。文本文件保持原来的样子。
* 设置为input时，添加文件git仓库（即提交代码）时，git把crlf编成lf。当有人Check代码（即从git仓库迁出代码）时，按照input的方式，即不做修改，完全照搬git仓库里的。

为何要设置成 input 或 false？产生 crlf问题的原因在于从库中下载代码时会将LF为CRLF。如果大家提交的是使用RF结束，下载的代码再使用RF就不会有CRLF问题。设置vscode新建文件为LF结尾，加上prettier对文件进行转换，就基本上能保证代码是使用LF换行。

默认情况 core.autocrlf 为true也不会出现文件换行问题，在git提交阶段会进行CRLF转换LF。
# prettier
```js
  // 换行符使用 lf
  endOfLine: 'lf'
```


