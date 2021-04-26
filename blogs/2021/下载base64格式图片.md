
```js
// 图片base64 转file
 function toBlob(data){  
    var arr = data.split(','), mime = arr[0].match(/:(.*?);/)[1], // 转成blob
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
       return new Blob([u8arr], { type: mime });
       //return new window.File([new Blob([u8arr], {type: mime})], 'test.jpeg', {type: 'image/jpeg'})
}

function downloadFile(url,name='图片名称'){
    var a = document.createElement("a")
    a.setAttribute("href",url)
    a.setAttribute("download",name)
    a.setAttribute("target","_blank")
    let clickEvent = document.createEvent("MouseEvents");
    clickEvent.initEvent("click", true, true);  
    a.dispatchEvent(clickEvent);
}


function downloadFileByBase64(base64,name){
    var myBlob = toBlob(base64)
    console.log(myBlob);
    var myUrl = URL.createObjectURL(myBlob)//此处生成文件地址
    downloadFile(myUrl,"ceshi")
}

downloadFileByBase64("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATYAAAE2CAIAAABk3in+AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAFdklEQVR4nO3cwW7bOgBFweeH/P8vp3uiCFiBYg6lmV0XdWQ7BwSKW36+v7//A6r+/+0HAH4iUUiTKKRJFNK+hj9/Pp9feY6Cnf9yNvM5zzzPm1/nqYbPxykKaRKFNIlCmkQhTaKQJlFIkyikSRTSJAppEoU0iULauNGdceL/Al+1+Vy1QV2ltnetvfeaC9+FUxTSJAppEoU0iUKaRCFNopAmUUiTKKRJFNIkCmkShbQrG90ZdqF7Xqe2GT7xeVa56X05RSFNopAmUUiTKKRJFNIkCmkShTSJQppEIU2ikCZRSLtro/tUJ24+V+1ma/vbl3CKQppEIU2ikCZRSJMopEkU0iQKaRKFNIlCmkQhTaKQZqP7b2pb1p073lWvY8f7T5yikCZRSJMopEkU0iQKaRKFNIlCmkQhTaKQJlFIkyik3bXRfeoOc+c9ujt/1iq17732PBc4RSFNopAmUUiTKKRJFNIkCmkShTSJQppEIU2ikCZRSLuy0T1xO7rTzrt2n/o6M17ye+gUhTSJQppEIU2ikCZRSJMopEkU0iQKaRKFNIlCmkQhbdzoPuDe0Vut2qnO2Ll3rXnq+7rAKQppEoU0iUKaRCFNopAmUUiTKKRJFNIkCmkShTSJQtpnGEOeeDfpzt3sKjuf+c2fz4mvM3CKQppEIU2ikCZRSJMopEkU0iQKaRKFNIlCmkQhTaKQduUe3Z33u878rNrz1HahM078fFaJ39nrFIU0iUKaRCFNopAmUUiTKKRJFNIkCmkShTSJQppEIW28R3fZ68buZZ2xc6v51C3ric8Tf19OUUiTKKRJFNIkCmkShTSJQppEIU2ikCZRSJMopEkU0saN7s47aWfUnqemdo/ujNpdxKvc9DxOUUiTKKRJFNIkCmkShTSJQppEIU2ikCZRSJMopEkU0u66R7dm55b1xJ/1VKt+vd2jC/ydRCFNopAmUUiTKKRJFNIkCmkShTSJQppEIU2ikHblHt0ZO7eRT50Z2/r+rHbX7k3fl1MU0iQKaRKFNIlCmkQhTaKQJlFIkyikSRTSJAppEoW0rwt/5yXbyFt/1owTP59VapvhX9yKO0UhTaKQJlFIkyikSRTSJAppEoU0iUKaRCFNopAmUUi7stFd5cS966qfNfPeT9wer9qy1nbgOz9D9+jCSSQKaRKFNIlCmkQhTaKQJlFIkyikSRTSJAppEoW0zzAIfPP9tye+rxmr3nvtbttVdv7+XHgdpyikSRTSJAppEoU0iUKaRCFNopAmUUiTKKRJFNIkCmnjRpefPfXu31V2bqFnPGAv7RSFNIlCmkQhTaKQJlFIkyikSRTSJAppEoU0iUKaRCHta/jzU+9KnbFqh7nqPtXa3b+1bW3teW7iFIU0iUKaRCFNopAmUUiTKKRJFNIkCmkShTSJQppEIW3c6M546v2uM1btb3fueE+083ds53d6gVMU0iQKaRKFNIlCmkQhTaKQJlFIkyikSRTSJAppEoW0KxvdGTu3o0+9T3XVdrSm9sy15xk4RSFNopAmUUiTKKRJFNIkCmkShTSJQppEIU2ikCZRSLtro/tmO+9lXbVPrt3ZG7/b9q9uuqvZKQppEoU0iUKaRCFNopAmUUiTKKRJFNIkCmkShTSJQpqN7no7t6O13exOtc/wpnuPnaKQJlFIkyikSRTSJAppEoU0iUKaRCFNopAmUUiTKKTdtdGt7TlPtGrr++bNcG1/e+FzdopCmkQhTaKQJlFIkyikSRTSJAppEoU0iUKaRCFNopD2GUaDOzeWNTt3mDt3s6vUnnnnd7HT8MxOUUiTKKRJFNIkCmkShTSJQppEIU2ikCZRSJMopEkU0saNLpDiFIU0iUKaRCFNopD2BxLDsmTwKaYTAAAAAElFTkSuQmCC");
```