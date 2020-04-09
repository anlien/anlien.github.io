/**
 * 公用代码
 */	
function requestGet(url,data,callback){
	$.ajax({
		url: url,
		type: 'GET',
		dataType: 'json',
		data: data,
	})
	.done(function(data) {			
		if('000' === data.code){
			callback(data.data);
		}else{
			console.log(data["msg"]);
		}
	})
	.fail(function() {
		console.log("error");
	})	
}	

/**
 * post请求
 */
function requestPost(url,data,callback) {
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'json',
		data: data,
	})
	.done(function(data) {
		if('000' === data.code){
			callback(data.data)
		}
	})
	.fail(function() {
		console.log("error");
	})
}