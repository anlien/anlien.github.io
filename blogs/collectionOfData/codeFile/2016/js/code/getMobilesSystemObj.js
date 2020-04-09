/**
   * 获得是什么系统        
  */       
var mobilesSystemObj = null;
function getMobilesSystemObj(){
    if(null=== mobilesSystemObj){
        var u = navigator.userAgent, app = navigator.appVersion;
        var nativeVersionsObj = {
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1 //是否iPad
        };
        mobilesSystemObj = {
            isIos : nativeVersionsObj.ios || nativeVersionsObj.iPhone || nativeVersionsObj.iPad,
            isAndroid : nativeVersionsObj.android
        } 
    }

    return mobilesSystemObj
}