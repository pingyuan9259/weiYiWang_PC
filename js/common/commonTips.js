/**
 * @name:
 * @desc: 提示框方法
 * @example:
 * @depend:
 * @date: 2017/1/22
 * @author: qiangkailiang
 */
//菊花图 读取中旋转
common.loading = {
    show: function () {
        if ($(".ev-loading").length == 0) {
            $("body").append('<section class="middle-tip-box ev-loading">' +
                '<section class="middle-tip-modal">' +
                '<figure class="middle-tip-box-text">' +
                '<img src="/image/img00/patientConsult/symptom_photo_loading@2x.png" alt="loading...">' +
                '</figure>' +
                '</section>' +
                '</section>');
        } else {
            $(".ev-loading").show();
        }
    },
    hide: function () {
        $(".ev-loading").hide();
    }
};
//confirm模态窗
common.confirmBox = function (options) {
    if ($('.modal-confirm').length === 0) {
        var template = '<section class="modal-confirm">'+
            '<article class="modal-confirm-content">'+
            (function (list) {
                var result="";
                $(list).each(function (index,element) {
                    result+='<p>'+element.text+'</p>';
                });
                return result;
            }(options.textList))+
            '    </article>'+
            '    <figure class="modal-confirm-button">'+
            '        <button class="btn-ensure modal-confirm-ensure">'+options.ensure+'</button>'+
            '        <button class="btn-primary modal-confirm-cancel">'+options.cancel+'</button>'+
            '    </figure>'+
            '</section>';
        options.container.append(template);

        setTimeout(function (e) {
            $(".modal-confirm").addClass('show');
        }, 50);
        options.container.off('click').on("click", ".modal-confirm-ensure", function () {
            options.ensureCallback && options.ensureCallback();
            $(".modal-confirm").removeClass('show');
            $(".modal-confirm").on("transitionend WebkitTransitionEnd", function () {
                $(".modal-confirm").remove();
            });
            return false;
        });
        options.container.off('click').on("click", ".modal-confirm-cancel", function () {
            options.cancelCallback && options.cancelCallback();
            $(".modal-confirm").removeClass('show')
            $(".modal-confirm").on("transitionend WebkitTransitionEnd", function () {
                $(".modal-confirm").remove();
            });
            return false;
        });
    } else {
        $(".modal-confirm").addClass('show');
    }
};

//alert模态窗
common.alertBox = function (options) {
    if ($('.alertBox-tips').length === 0) {
        var template = '<section class="maskers alertBox-tips">' +
            '<section class="alertBox-inner">' +
            '<article class="alertBox-content">' +
            '<article>' +
            (options.title ? '<h2>' + (options.title || '') + '</h2>' : '') +
            '<p>' + (options.content || '') + '</p>' +
            '</article>' +
            '</article>' +
            '<footer class="alertBox-btns">' +
            '<button class="alertBox-ensureBtn" style="width: 100%;">' + (options.ensure || '') + '</button>' +
            '</footer>' +
            '</section>' +
            '</section>';
        $("body").append(template);

        setTimeout(function (e) {
            $(".alertBox-tips").addClass('show');
        }, 50);

        $("body").on("click", ".alertBox-ensureBtn", function () {
            options.ensureCallback && options.ensureCallback();
            $(".alertBox-tips").removeClass('show')
            $(".alertBox-tips").on("transitionend", function () {
                $(".alertBox-tips").remove();
            });
            return false;
        });
    } else {
        $(".alertBox-tips").addClass('show');
    }
};
common.btnBox = function (options) {
    if ($('.btnBox-tips').length === 0) {
        var template = '<section class="btnBox-tips maskers " '+options.direction+'>' +
            '    <section class="'+options.direction+'-box">' +
            '<article>' +
            (options.title ? '<h2>' + (options.title || '') + '</h2>' : '') +
            '</article>' +
            (function (list) {
                var result = "";
                $(list).each(function (index, element) {
                    result += '<a class="btnBox-btn ' + element.className + '" id="' + (element.id?element.id:"") + '" href="'+element.href+'">' + element.content + '</a>';
                });

                return result;
            }(options.btn)) +
            '    </section>' +
            '</section>';

        $("body").append(template);

        setTimeout(function (e) {
            $(".btnBox-tips").addClass('show');
        }, 50);

        $(".btnBox-tips").on("click",function (e) {
            if ($(e.target).hasClass("btnBox-btn")){
                return;
            }
            e.stopPropagation();

            $(".btnBox-tips").removeClass('show');
            $(".btnBox-tips").on("transitionend WebkitTransitionEnd", function () {
                $(".btnBox-tips").remove();
            });
        })
    } else {
        $(".btnBox-tips").addClass('show');
    }
};
//黑底提示框
common.popup = function (obj) {
    if ($(".popup-tips").length == 0) {
        $("body").append( '<section class="middle-tip-modal popup-tips">' +
            '<figure class="middle-tip-box-text">' +
            // (obj.hasImg ? '<img src="/image/personal/loading_finish.png" alt="">' : '') +
            '<p class="tipText">' + obj.text + '</p> ' +
            '</figure>' +
            '</section>');

        setTimeout(function () {
            $(".popup-tips").addClass('show')
        }, 100);
    } else {
        $(".popup-tips").addClass('show');
        $(".tipText").text(obj.text);
        if (!obj.hasImg) {
            $(".middle-tip-box-text img").hide();
        } else {
            $(".middle-tip-box-text img").show();
        }
    }
    setTimeout(function () {
        $(".popup-tips").removeClass('show');
    }, 3000)
};

//顶部条状提示层
common.topTips ={
    show:function (obj) {
        this.class=obj.class;
        var template = '<figure class="top-tips ' + obj.class + '">' +
            '    <span>' + obj.content + '</span>' +
            '</figure>';
        $("body").append(template);
        setTimeout(function () {
            $("." + obj.class).addClass('show');
        },100);
    },
    hide:function () {
        $("."+this.class).removeClass("show");
        $("."+this.class).on("transitionend WebkitTransitionEnd",function () {
            $(this).remove();
        })
    }
};