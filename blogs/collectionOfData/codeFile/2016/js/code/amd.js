/**
 * amd 模式的开发，require异步请求
 */
require({
	paths:{
		'jquery':'libs/jQuery.2.1.3.min',		
		'kxbdmarquee':'libs/jquery.kxbdmarquee',		
		"flexible":"libs/flexible"
	},
	shim :{
		flexible:{deps:['jquery']},
		kxbdmarquee:{deps:['jquery']},
		rotate:{deps:['jquery']}
	}
},['flexible','jquery','kxbdmarquee'],function(flexible,$){

})