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