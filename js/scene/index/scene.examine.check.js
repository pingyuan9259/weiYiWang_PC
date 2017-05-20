define(["text!examineCheckTemplate","jquery"],function (ecText,$) {
    var container={
        init:function () {
            this.configTemplate=ecText;
            this.templateUrl();
            this.configTabsChange();
            this.closeWindow();
        },
        templateUrl:function () {
            $("[data-template='tpl-inner']").append(this.configTemplate);

        },
        configTabsChange:function () {
            new TabsViewChange({
                tabsInner: $(".ec-tabs.tabsInner"),
                views: $(".ec-views.viewInner"),
                changeCallback: function () {
                    console.log('喵');
                },
                role: "ec-tabs"
            });
        },
        closeWindow:function () {
            $(".examine-check .window-close").on("click",function () {

                $(".examine-check").hide();
            })
        }
        
    };
    container.init();
});