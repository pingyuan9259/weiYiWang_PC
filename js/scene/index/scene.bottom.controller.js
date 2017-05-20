/**
 * Created by Administrator on 2017/3/5.
 */
define(["text!bottomTemplate", "jquery"], function (text, $) {
    var bottomController = {
        init: function () {
            this.template = text;
            this.templateUrl();
            this.controller();
        },
        templateUrl: function () {
            $("[data-template='tpl-bottom-controller']").append(this.template);
        },
        controller: function () {
            $(".user-controller-fastReply").on("click", function (e) {
                e.stopPropagation();
                if ($(".jump-box").hasClass("show")){
                    if(!$(".jump-box.show").hasClass("fast-reply")){
                        $(".jump-box").removeClass("show");
                        $(".jump-box.fast-reply").addClass("show");
                        $(".user-controller-fastReply").removeClass("reply-on");
                        $(".user-controller-result").removeClass("result-on");
                    }else{
                        $(".jump-box").removeClass("show");
                        $(".user-controller-fastReply").removeClass("reply-on");
                        $(".user-controller-result").removeClass("result-on");
                    }
                }else{
                    $(".jump-box.fast-reply").addClass("show");
                }
                $(this).toggleClass("reply-on");
            });

            $(".user-controller-result").on("click", function (e) {
                e.stopPropagation();
                if ($(".jump-box").hasClass("show")){
                    if(!$(".jump-box.show").hasClass("used_reply")){
                        $(".jump-box").removeClass("show");
                        $(".jump-box.used_reply").addClass("show");

                        $(".user-controller-fastReply").removeClass("reply-on");
                        $(".user-controller-result").removeClass("result-on");
                    }else{
                        $(".jump-box").removeClass("show");
                        $(".user-controller-fastReply").removeClass("reply-on");
                        $(".user-controller-result").removeClass("result-on");
                    }
                }else{
                    $(".jump-box.used_reply").addClass("show");
                }
                $(this).toggleClass("result-on");
            });

            $(".user-controller-check").on("click", function (e) {
                e.stopPropagation();
                if ($(".jump-box").hasClass("show")){
                    $(".jump-box").removeClass("show");
                }else{
                    $(".examine-check").show();
                }
                $(this).toggleClass("fastReply-on");
            });

            $(".user-controller-report").on("click", function (e) {
                e.stopPropagation();
                if ($(".jump-box").hasClass("show")){
                    $(".jump-box").removeClass("show");
                }else{
                    $(".check-suggestion").addClass('show');
                }
                $(this).toggleClass("fastReply-on");
            });
            $("body").on("click", function (e) {
                if ($(e.target).parents(".jump-box").size() === 0 && !$(e.target).hasClass("jump-box")) {
                    $(".jump-box").removeClass("show");
                    $(".user-controller-fastReply").removeClass("reply-on");
                    $(".user-controller-result").removeClass("result-on");
                }
            })
        }
    };
    bottomController.init();
    return bottomController;
});