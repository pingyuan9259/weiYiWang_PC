/**
 * @Desc：快速回复
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by qiangkailiang on 2017/3/7
 */

define(['jquery',"text!fastReplyTemplate","text!fastReplyConfigTemplate"],function ($,frText,frcText) {
    var container={
        init:function () {
            this.template=frText;
            this.configTemplate=frcText;
            this.templateUrl();
            this.tabsChange();
            this.showFastReply();
            this.showConfig();
            this.configTermToggle();
            this.deleteReplyItem();
            this.closeWindow();
        },
        templateUrl:function () {
            $("[data-template='tpl-fastReply']").append(this.template)
        },
        tabsChange:function () {
            new TabsViewChange({
                tabsInner: $(".fast-reply .jump-box-tabs.tabsInner"),
                views: $(".fast-reply .viewInner.jump-box-viewers"),
                changeCallback: function () {
                    console.log('喵');
                },
                role: "fr-tabs"
            });

        },
        showFastReply:function () {

        },
        showConfig:function () {
            var that=this;
            $(".jump-box-config-button").on("click",function () {
                $('[data-template="tpl-inner"]').append(that.configTemplate)
            })
        },
        configTermToggle:function(){
            $("body").on("click",".jump-box-term-title",function (e) {
                if ($(e.target).hasClass("jump-box-term-button")||$(e.target).parent().hasClass("jump-box-term-button")){
                    return;
                }
                $(this).parent().toggleClass("active");
            })
        },
        //删除一条回复...
        deleteReplyItem:function () {
            $("body").on("click",".jump-box-term-button .del",function () {
                common.confirmBox({
                    container:$(this),
                    textList: [{
                        text:"确定删除该问题吗？"
                    }],
                    ensure:"确定",
                    cancel:"取消"
                })
            })
        },
        closeWindow:function () {
            $("body").on("click",".jump-box-config .window-close",function () {
                $(".jump-box-config-box").remove();
            });

        }
    };
    container.init();
});