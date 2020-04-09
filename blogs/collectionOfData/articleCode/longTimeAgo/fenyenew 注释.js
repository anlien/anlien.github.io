function fenye(CurPage, TotalPage, Pages, TagFlag) {
    var strpager = "";//用于拼接脚本
    var strFirst="";//首页
    var intCurPage = new Number(CurPage);//当前页
    var intTotalPages = new Number(TotalPage);//总页数
    if (intTotalPages == 0) {
        strpager = "<li class=\"current\" onclick=\"ShowItems(" + CurPage + ",'" + TagFlag + "')\"><span>" + 1 + "<\/span><\/li>";
    }
    if (intCurPage >= 4 && intCurPage <= intTotalPages - 2) {//
        strpager = "<li class=\"current\" onclick=\"ShowItems(" + CurPage + ",'" + TagFlag + "')\"><span>" + CurPage + "<\/span><\/li>";
    }
    // if判断 按点击页码的三种现象划分   
    //第一种：页码小于5  且当前页面小于4      
    if (intCurPage < 4) {    //点击的当前页码小于4   4为中+…为7个数   4为中    判断的是当前页码，总页码没考虑
        var intNumber;
        if (intTotalPages <= 5) {    //如果总页数小于等于5的情况
            intNumber = intTotalPages + 1;  //加1用于条件判断   为什么要加1？ 额，for（）循环中条件j<intNumber    比原来的页码少了1   所以在这控制加1
        }
        else {
            intNumber = 6;   
        }
        for (var j = 1; j < intNumber; j++) {
            if (intCurPage == j) {  //当前点击页码的样式
                strpager += "<li class=\"current\" onclick=\"ShowItems(" + j.toString() + ",'" + TagFlag + "')\"><span>" + j.toString() + "<\/span><\/a><\/li>";
            }
            else {      //如果总的页码小于等于5 intNumber会是1、2、3、4、5          最后的...+最后的页码没有加
                strpager += "<li><a href=\"javascript:void(0)\" onclick=\"ShowItems(" + j.toString() + ",'" + TagFlag + "')\">" + j.toString() + "<\/a><\/li>";
            }
        }
    }
    //第二种：当前页码大于4且当前页码离总页码距离超过2
    else if (intCurPage > intTotalPages - 2) {   //当前页面大于4  当前的页码大于大于总页码-2    
        var intNumber;
        if (intTotalPages > 5) {    
            intNumber = intTotalPages - 4;  
        }
        else {
            intNumber = 1;
        }
        for (var j = intNumber; j <= intTotalPages; j++) {
            if (intCurPage == j) {
                strpager += "<li class=\"current\" onclick=\"ShowItems(" + j.toString() + ",'" + TagFlag + "')\"><span>" + j.toString() + "<\/span><\/li>";
            }
            else {
                strpager += "<li><a href=\"javascript:void(0)\" onclick=\"ShowItems(" + j.toString() + ",'" + TagFlag + "')\">" + j.toString() + "<\/a><\/li>";
            }
        }
    }
    //第三种 当前页码小于总页码-2
    else {
        for (var i = 1; i < 3; i++) {
            if (intCurPage - i > 0) {
                strpager = "<li><a href=\"javascript:void(0)\" onclick=\"ShowItems(" + (intCurPage - i).toString() + ",'" + TagFlag + "')\">" + (intCurPage - i).toString() + "<\/a><\/li>" + strpager;
            }
            if (intCurPage + i < intTotalPages + 1) {
                strpager += "<li><a href=\"javascript:void(0)\" onclick=\"ShowItems(" + (intCurPage + i).toString() + ",'" + TagFlag + "')\">" + (intCurPage + i).toString() + "<\/a><\/li>";
            }
        }
    }
    //end if判断
    
    
    if (intCurPage - 1 > 2 && intTotalPages > 5) {    //    如果当前总页码大于5   当前页码大于等于4      + 第1页和...
        strpager = "<li><a href=\"javascript:void(0)\" onclick=\"ShowItems(1,'" + TagFlag + "')\">1<\/a><a style=\"border:none;\" class=\"shenlue\">...<\/a><\/li>" + strpager;
    }

    if (intCurPage + 1 < intTotalPages - 1 && intTotalPages > 5) {   //  如果当前页码小于 总页码-2 且总页码大于5   加...和尾页  
        strpager += "<li><a style=\"border:none;\" class=\"shenlue\">...<\/a><a href=\"javascript:void(0)\" onclick=\"ShowItems(" + TotalPage + ",'" + TagFlag + "')\">" + TotalPage + "<\/a><\/li>";
    }
    
   //加上一页
    if (intCurPage > 1) {    //页码不等于一时，页码能用

        strFirst += "<li class=\"first\"><a href=\"javascript:void(0)\" class=\"first\" onclick=\"ShowItems(" + (intCurPage - 1).toString() + ",'" + TagFlag + "')\" id=\"PrePage\">上一页<\/a><\/li>";

    }
    else {//页码等于1时
        strFirst += "<li class=\"first\"><a id=\"PrePage\" class=\"first gray\">上一页</a><\/li>";
        
    }
    strpager = strFirst + strpager; //单独加"上一页"加的
    
    //加下一页按钮
    if (intCurPage < intTotalPages) {  //当前页码小于总页码时
        strpager += "<li class=\"last\"><a href=\"javascript:void(0)\" class=\"next\" onclick=\"ShowItems(" + (intCurPage + 1).toString() + ",'" + TagFlag + "')\" id=\"NextPage\">下一页</a><\/li>";
    }
    else {  //等于总页码时
        strpager += "<li class=\"last\"><a id=\"NextPage\" class=\"next grays\">下一页</a><\/li>";

    }
    
    
    $(Pages).html(strpager);  //生成

}