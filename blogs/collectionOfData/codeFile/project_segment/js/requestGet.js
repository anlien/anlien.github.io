/**
 * get请求
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