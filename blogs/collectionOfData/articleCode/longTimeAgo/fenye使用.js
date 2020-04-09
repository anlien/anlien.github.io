/*
*功能：生成页面中的分页代码
*
*js依赖文件：jQuery文件和Site.css中的分页样式
*
*使用方法：该js文件需要一个取数据的ajax方法，依赖的方法第一个变量要是 当前页码。
*          例如：外部定义一个 var funName=function(currPage){/……/}方法，在funName的回调函数中使用showItemCallBack方法（需要三个变量）。调用分页代码时只需要showYeMa(funName)即可。
*
*负责人：安李恩
*
*创建信息：2014-07-11
*/
/*==================================具体方法=====================================*/
/*
*使用方法： ready初始化时调用。
*参数： showItem:获得数据并显示的方法名称。
*/
function showYeMa(showItem) { 
    var strHtml = "<ul><li>共<strong><label id='rowsCount'></label></strong>条</li><li><a href='javascript:void(0)'>首页</a></li><li><a href='javascript:void(0)'>上一页</a></li><li><label ID='currentPage'  Text='label'>1</label>/<label  ID='pageCount'  Text='label'></label></li><li><a href='javascript:void(0)'>下一页</a></li><li><a href='javascript:void(0)'>尾页</a></li><li>转到第</li><li><input type='text' class='yema_numble' /></li><li>页</li><li><input type='button' value='' class='go' /></li></ul>";
    $(".yema.fright").html(strHtml);
    /* go控件绑定事件  由于Number将非数字的字符转换为NaN，所以不用进行数据捕获 */
    $(".go").bind("click", function () {       
        var yema_numble = new Number($(".yema_numble").val());
        if ("NaN" != yema_numble && 1 <= yema_numble && yema_numble <= (new Number($("#pageCount").text())) && !!yema_numble) {
            if (yema_numble == $("#currentPage").text()) {
                return;
            }
            else {
                showItem(yema_numble.toString());
            }
        }
        else {
            $(".yema_numble").val("");
            return;
        }
    })
    /*********************绑定分页方法*/
    $(".yema li>a").bind("click", function () {
        var $pageCount = $("#pageCount");
        var $currentPage = $("#currentPage");
        switch ($(this).text()) {
            case "上一页":
                if ($currentPage.text() == "1") {
                    return;
                }
                else {
                    var newCurrenPage = ((new Number($currentPage.text())) - 1).toString();
                    showItem(newCurrenPage);
                    $currentPage.text(newCurrenPage);
                }
                break;
            case "下一页":
                if ($currentPage.text() == $pageCount.text()) {
                    return;
                }
                else {
                    var newCurrenPage = ((new Number($currentPage.text())) + 1).toString();
                    showItem(newCurrenPage);
                    $currentPage.text(newCurrenPage);
                }
                break;
            case "尾页":
                if ($currentPage.text() == $pageCount.text()) {
                    return;
                }
                else {
                    showItem($pageCount.text());
                    $currentPage.text($pageCount.text());
                }
                break;
            case "首页":
                if ($currentPage.text() != 1) {
                    showItem("1");
                    $currentPage.text("1");
                }
                break;
            default:
                return;
        }
    })
}
/*
*变量解释：
*       curr:当前页码；
*       pageCount:分页的总页数
*       rowCount:分页的总条数*
*使用方法：作为传进来showItem方法的回调函数。
*/
function showItemCallBack(curr, pageCount, rowCount) {
    $("#currentPage").text(curr);
    $("#pageCount").text(pageCount);
    $("#rowsCount").text(rowCount);
}