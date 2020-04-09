//开通会员
//4秒之内只允许点击一次
var openMemberLock = true;
function openingOfTheMemberFn(){ 
	if(openMemberLock){ 
		openMemberLock = false;

		setTimeout(function(){
			openMemberLock = true;
		},4000);

        if(true === getMobilesSystemObj().isIos){
            window.location.href = 'accord://?test=1'; 
        }
        if(true === getMobilesSystemObj().isAndroid){
            window.android.callNativePay();    
        }
	}
}

/**
 * 
 * 回调函数，无返回参数
 * 
 */
window.openingOfTheMemberSuccess = function(){     
 

}   