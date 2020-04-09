/**
 * 获得参数
 * @return {[type]} [description]
 */
function getUrlParame(){
	var string = window.location.search; 
	if(string.indexOf('=') < 0) {
		return {};
	}			
	string = string.substr(string.indexOf('?') + 1, string.length);
	if(string.indexOf('#') > 0){
		string = string.substr(0, string.indexOf("#"));			
	}
	var obj = {},
		pairs = string.split('&'),
		d = decodeURIComponent,
		name,
		value;
	$.each(pairs, function(i, pair) {
		pair = pair.split('=');
		name = d(pair[0]);
		value = d(pair[1]);
		obj[name] = value;
	});
	return obj;
}