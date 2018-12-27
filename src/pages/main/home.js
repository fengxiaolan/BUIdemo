loader.define(function(require,exports,module) {
    
    var pageview = {},  // 页面模块
        uiList,         // 列表控件
        uiSwipeApp,  //列表  
        uiListviewMessage,      //消息侧滑菜单
        mainHeight = $(window).height() - $("#tabDynamicNav").height() - $(".bui-bar-side").height();

    // 页面初始化
    pageview.init = function () {
        
        // 初始化列表刷新加载
        // uiList = bui.list({
        //     id: "#uiTabScroll",
        //     url: "http://www.easybui.com/demo/json/chuangyi/article-list.json",
        //     data: {},
        //     pageSize:10,
        //     field: {
        //         page: "page",        // 分页字段
        //         size: "pageSize",    // 页数字段
        //         data: ""         // 数据
        //     },
        //     template: template,
        //     onLoad: function (scroll) {
        //         // 自定义渲染
        //     },
        //     callback: function (e) {
        //         // 点击单行回调 console.log($(this).text())
        //     }
        // });

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
            data : [
                    {text: "置顶",classname : "primary"},
                    {text: "删除",classname : "danger"}
                    ],
            width : 200,
            callback : function(e,ui) {

                var text = $(this).text().trim();

                    if( text == '删除' ){
                        // 给父层增加一个样式,便于控制删除
                        $(this).parents(".list-item").fadeOut(300,function () {
                            $(this).remove();
                        });
                    }
                    
                // 关闭侧滑
                ui.close();
            }
        });

    }

    //生成列表的模板
    function template (data) {
    
        var html = "";
            $.each(data,function(index, el) {
                html +='<li class="bui-btn bui-box-align-top">';
                html +='    <div class="thumbnail"><img src="applogo.png" alt=""></div>';
                html +='    <div class="span1">';
                html +='        <h3 class="item-title">'+el.Name+'</h3>';
                html +='        <div class="item-text bui-box">';
                html +='            <div class="span1">'+el.ExInforSources+'</div>';
                html +='            <span class="time"><i class="icon-">&#xe643;</i>23</span>';
                html +='            <span class="time"><i class="icon-">&#xe680;</i>495</span>';
                html +='            <span class="time"><i class="icon-">&#xe641;</i>28</span>';
                html +='        </div>';
                html +='    </div>            ';
                html +='</li>';
            });
    
        return html;
    };


    // 初始化
    pageview.init();
    pageview.swipeApp = uiSwipeApp;


    // 输出模块
    return pageview;
})