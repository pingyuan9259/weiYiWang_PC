/**
 * @name:下拉选择
 * @desc:
 * @example:
 * @depend:
 * @date: 2017/2/15
 * @author: qiangkailiang
 */

define(["jquery"], function ($) {
    var DownSelector = function (element, config) {
        this.element = $(element);
        this.config = $.extend(true, $.fn.downSelector.defaultConfig, config);

        this.init();
    };

    DownSelector.prototype = {
        init: function () {
            var that = this;
            this.clickEvent();
        },
        clickEvent: function () {
            var that = this;
            this.element.on("click", function (e) {
                if ($(e.target).hasClass("custom-selector-title")) {
                    that.selectorToggle(that, $(e.target));
                }
                if ($(e.target).parent().hasClass("result-item")) {
                    that.selectItem(that, $(e.target).parent())
                    that.config.resultCallback && that.config.resultCallback();
                } else if ($(e.target).parent().hasClass("secondListTitle") || $(e.target).parent().hasClass("thirdListTitle")) {
                    that.secondListToggle(that, $(e.target).parent());
                }
            })
        },
        selectorToggle: function (t, e) {
            $(t.config.list).each(function (index, element) {

                if (index === 0) {
                    if (e.hasClass(element.titleName)) {
                        if (t.element.find("." + element.listName).is(":visible")) {
                            t.element.find("." + element.listName).css("display", "none");
                        } else {
                            t.element.find("." + element.listName).css("display", "inline-block");
                        }
                    }
                } else {
                    t.element.find("." + element.listName).css("display", "none");
                }
            })
        },
        selectItem: function (t, e) {
            $(t.config.list).each(function (index, element) {
                e.addClass('active').siblings().removeClass("active");

                if (index === 0) {
                    t.element.find("." + element.titleName).attr("data-select-result", e.text()).text(e.text());
                } else {
                    e.parent().siblings("." + element.listName).children().removeClass("active")
                }
                if (t.element.find("." + element.listName).is(":visible")) {
                    t.element.find("." + element.listName).css("display", "none");
                } else {
                    t.element.find("." + element.listName).css("display", "inline-block");
                }
            })
        },
        secondListToggle: function (t, e) {
            var role = e.attr("data-role");
            e.addClass('active').siblings().removeClass("active");
            $(t.config.list).each(function (index, element) {
                if (index !== 0) {
                    e.parent().siblings("." + element.listName).css("display", "none");
                    t.element.find("." + element.listName + "[data-role='" + role + "']").css("display", "inline-block");
                }
            });
        }
    };


    $.fn.downSelector = function (config) {
        return $(this).each(function (index, element) {
            var d = new DownSelector(element, config);
            return d;
        })
    };


    $.fn.downSelector.defaultConfig = {}
});