loader.define(function(require,exports,module) {
    
    var pageview = {},  // 页面模块
        uiSwipeApp,  //列表  
        uiListviewMessage,
        mainHeight = $(window).height() - $("#tabDynamicNav").height() - $(".bui-bar-side").height();

    // 页面初始化
    pageview.init = function () {
        //下拉进入使用过的小程序
        uiSwipeApp = bui.swipe({
            id: "#uiSwipe",
            handle: ".home-page",
            movingDistance: 225,
            height: mainHeight,
            zoom: true,
            direction: "y",
        });

        //初始化消息的侧滑菜单
        uiListviewMessage = bui.listview({
            id   : "#listview",
            data : [{text: "置顶",classname : "primary"},
                    {text: "删除",classname : "danger"}],
            position:"right",
            callback : function(e) {
                var $this = $(e.target)
                var text = $this.text().trim();
                if( text == '删除' ){
                    bui.confirm("确定要删除吗",function (e) {
                        var text2 = $(e.target).text();
                        if( text2 == "确定"){
                            $this.parents("li").fadeOut(300,function () {
                                $(this).remove();
                            });
                        }
                    })
                }
                $this.close();
            }
        });
        uiListviewMessage.open({
            index:1
        })
        setTimeout(function (argument) {
            uiListviewMessage.close()
        },5000)

    }


    // 初始化
    pageview.init();
    pageview.swipeApp = uiSwipeApp;


    // 输出模块
    return pageview;
})