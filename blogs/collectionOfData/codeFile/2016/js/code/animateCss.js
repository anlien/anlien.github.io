	/**
	 * 使用css3的动画效果
	 * 参考：https://github.com/daneden/animate.css	  
	 * 使用方式：$('#yourElement').animateCss('bounce'); 
	 */
	$.fn.extend({
	    animateCss: function (animationName,callback) {
	        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
	        this.addClass('animated ' + animationName).one(animationEnd, function() {	                       
	            if(callback){
	            	callback(animationName);
	            }	
	        });
	    }
	});