[import](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import)

import 语句用于导入从外部模块，另一个脚本等导出的函数，对象或原语。

```js
import defaultMember from "module-name"; 
import * as name from "module-name"; 
import { member } from "module-name"; 

import { member as alias } from "module-name"; 
import { member1 , member2 } from "module-name"; 

import { member1 , member2 as alias2 , [...] } from "module-name"; 
import defaultMember, { member [ , [...] ] } from "module-name"; 

import defaultMember, * as name from "module-name"; 

import "module-name";

```