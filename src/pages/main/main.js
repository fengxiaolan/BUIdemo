/**
 * 底部导航TAB模板
 * 默认模块名: main
 * @return {[object]}  [ 返回一个对象 ]
 */
loader.define(function(require,exports,module) {

    var pageview = {},
        uiDropdownMore,     // 下拉菜单更多
        uiMask;  //公共遮罩
    
    // 模块初始化定义
    pageview.init = function () {
        navTab();
        // 初始化下拉更多操作
        uiDropdownMore = bui.dropdown({
            id: "#more",
            showArrow: true,
            width: 160
        });
        // 下拉菜单有遮罩的情况
        uiMask = bui.mask({
            appendTo:"#main",
            opacity: 0.03,
            zIndex:9,
            callback: function (argument) {
            // 隐藏下拉菜单
            uiDropdownMore.hide();
            }
        });
        // 通过监听事件绑定
        uiDropdownMore.on("show",function () {
          uiMask.show();
        })
        uiDropdownMore.on("hide",function () {
         uiMask.hide();
        });
    }

    // 底部导航
    function navTab() {
        
        //menu在tab外层,menu需要传id
        var tab = bui.tab({
            id:"#tabDynamic",
            menu:"#tabDynamicNav",
            animate: false,
            swipe: false,
            // 1: 声明是动态加载的tab
            autoload: true,
        })
        // 2: 监听加载后的事件
        tab.on("to",function (index) {
            uiMask.hide();
            uiDropdownMore.hide();
            switch(index){
                case 0:
                loader.require(["pages/main/home"],function (mod) {
                    // 有回调的话是每次切换都会触发
                    mod.init();
                })
                break;
                case 1:
                    // 这里是加载脚本第一次的时候触发
                loader.require(["pages/main/book"])
                break;
                case 2:
                loader.require(["pages/main/friends"])
                break;
                case 3:
                loader.require(["pages/main/user"])
                break;
            }
        }).to(0);
    }

    // 初始化
    pageview.init();
    
    // 输出模块
    return pageview;
    
})