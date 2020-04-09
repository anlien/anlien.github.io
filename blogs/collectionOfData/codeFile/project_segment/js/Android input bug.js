//Android 手机下输入框获取焦点时, 输入法挡住输入框的 bug
   if (browser.versions.android) {
       window.addEventListener('resize', function () {
           if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
               window.setTimeout(function () {
                   document.activeElement.scrollIntoViewIfNeeded();
               }, 0);
           }
       })
   }