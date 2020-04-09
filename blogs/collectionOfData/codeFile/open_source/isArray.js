//MDN:https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
if(!Array.isArray){
	Array.isArray = function(arg){
		return Object.prototype.toString.call(arg) === '[object Array]';
	}
}