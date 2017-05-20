/**
 * @Desc：常用回复
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by qiangkailiang on 2017/3/8
 */

define(['jquery',"text!usedReplyTemplate","text!usedReplyConfigTemplate"],function ($,urText,urcText) {
    var container={
        init:function () {
            this.template=urText;
            this.configTemplate=urcText;
            this.templateUrl();
            this.showFastReply();
            this.showConfig();
            this.configTermToggle();
            this.deleteReplyItem();
            this.closeWindow();
        },
        templateUrl:function () {
            $("[data-template='tpl-fastReply']").append(this.template)
        },

        showFastReply:function () {

        },
        showConfig:function () {
            var that=this;
            $(".used_reply_config_show").on("click",function () {
                $('[data-template="tpl-inner"]').append(that.configTemplate);

            })
        },
        configTermToggle:function(){
            $("body").on("click",".fast-reply-term-title",function (e) {
                if ($(e.target).hasClass("fast-reply-term-button")||$(e.target).parent().hasClass("fast-reply-term-button")){
                    return;
                }
                $(this).parent().toggleClass("active");
            })
        },
        //删除一条回复...
        deleteReplyItem:function () {
            $("body").on("click",".fast-reply-term-button .del",function () {
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
            $("body").on("click",".fast-reply-config .window-close",function () {
                $(".fast-reply-config-box").remove();
            });

        }
    };
    container.init();
});