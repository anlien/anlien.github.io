
/** * 
 * 返回值：
 * VerSion : 返回app的版本.
 * appType : P 家长端 *  M 园长端 * T 教师端 			
 */

var bbtreeAppInfoObj;
function getBbtreeAppInfo(){
	var userAgentStr = window.navigator.userAgent;
	if( userAgentStr.toLowerCase().indexOf('bbtree') < 0){			
		return false;
	}
	if(typeof bbtreeAppInfoObj === 'undefined'){		
		var bbtreeAppInfo = /bbtree_[MPT](\/\d\.\d\.\d|\/\d\.\d|\/\d)/.exec(userAgentStr)[0],
			bbtreeAppArr = bbtreeAppInfo.split('/');

		bbtreeAppInfoObj = {
			"VerSion" : (bbtreeAppArr[1] || '0.0.0'),
			"appType" : (bbtreeAppArr[0].split('_')[1] || false)
		}		
	}

	return bbtreeAppInfoObj;
}
