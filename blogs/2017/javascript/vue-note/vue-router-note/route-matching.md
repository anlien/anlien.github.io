### route-matching 
可选和局部是两个概念

// make part of the path optional by wrapping with parens and add "?"
//局部
{ path: '/optional-group/(foo/)?bar' }


// a param can be made optional by adding "?"
// 可选
{ path: '/optional-params/:foo?' },

四个值：
optional、repeat、partial、asterisk、pattern

