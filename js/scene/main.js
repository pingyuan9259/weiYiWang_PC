/**
 * @name:
 * @desc:
 * @example:
 * @depend:
 * @date: 2017/2/13
 * @author: qiangkailiang
 */

requirejs.config({
    paths: {
        jquery: '/js/third-party/jquery/jquery-2.1.0.min',
        common: '/js/common',
        downSelector: '/js/plugins/plugins.downSelector',
        ymd:'/js/plugins/ymd',
        messageCommunication: "/js/scene/index/scene.message.communication",
        medicalRecord: "/js/scene/index/scene.medical.record",
        userList: "/js/scene/index/scene.user.list",
        mainHeader: "/js/scene/index/scene.main.header",
        bottomController: "/js/scene/index/scene.bottom.controller",
        checkSuggestion: "/js/scene/index/scene.check.suggestion",
        fastReply: "/js/scene/index/scene.fast.reply",
        usedReply: "/js/scene/index/scene.used.reply",
        examineCheck: "/js/scene/index/scene.examine.check",
        text: "/js/third-party/require/text",
        headerTemplate: "/design-html/index/main_header.html",
        bottomTemplate: "/design-html/index/bottom_controller.html",
        medicalRecordTemplate: "/design-html/index/medical_record.html",
        userListTemplate: "/design-html/index/user_list.html",
        fastReplyTemplate: "/design-html/index/fast_reply.html",
        fastReplyConfigTemplate: "/design-html/index/fast_reply_config.html",
        checkSuggestionTemplate: "/design-html/index/check_suggestion.html",
        usedReplyTemplate: "/design-html/index/used_reply.html",
        usedReplyConfigTemplate: "/design-html/index/used_reply_config.html",
        configSuggestionTemplate: "/design-html/index/config_suggestion.html",
        examineCheckTemplate: "/design-html/index/examine_check.html"

    },
    shim: {                                   //加载非规范的模块
        'jquery': {exports: 'jquery'},
        'common': {deps: ['jquery'], exports: 'common'},
        'ymd':{exports:'ymd'}
        //  'jquery.downSelector': ['jquery']
    }
});

requirejs(
    ['jquery',
        'common',
        //'downSelector',
        'messageCommunication',
        'medicalRecord',
        'userList',
        'mainHeader',
        'bottomController',
        'fastReply',
        'usedReply',
        'checkSuggestion',
        'examineCheck',
        'text'

    ], function ($, common, mComm, mr, userList, mainHeader, bottom, fastReply, usedReply, check, examine, ymd, text) {
        mComm.init();
        var main = {
            config: {},
            path: {},
            template: {},
            init: function () {
                var t = this;
                t.recordMask();
                t.textSubstr();
            },
            //病例编辑弹窗
            recordMask: function () {
                $('body').on('click', '.medical-record-img', function () {
                    var htmlText = '<section class="maskers infoBox-tips show">' +
                        '<section class="infoBox-inner">' +
                        '<article class="infoBox-content">' +
                        '<section>' +
                        '<h2>李铁根咨询历史</h2>' +
                        '</section>' +
                        '</article>' +
                        '<section class="check-history">' +
                        '<ul>' +
                        '<li>' +
                        '<section class=" check-history-info check-history-header">' +
                        '<span class="check-history-title">诊断结论</span><span class="check-history-text">患者提交病例时间</span>' +
                        '</section>' +
                        '</li>' +
                        '<li>' +
                        '<section class="check-history-info">' +
                        '<span class="check-history-title"><i class="icon-downArrow"></i>膝关节不适</span><span class="check-history-text">2017年12月15日</span>' +
                        '</section>' +
                        '<article class="check-history-show">' +
                        '<h3>咨询对话历史</h3>' +
                        '<section class="check-history-talk">' +
                        '<ul>' +
                        '<li>' +
                        '<article>' +
                        '<header>李铁根  9：30</header>' +
                        '<p>李铁根病例</p>' +
                        '</article>' +
                        '</li>' +
                        '<li>' +
                        '<article>' +
                        '<header>王医生  9：31</header>' +
                        '<p>什么时候开始疼的？</p>' +
                        '</article>' +
                        '</li>' +
                        '<li>' +
                        '<article>' +
                        '<header>李铁根  9：32</header>' +
                        '<p>疼了十几年了。</p>' +
                        '</article>' +
                        '</li>' +
                        '</ul>' +
                        '</section>' +
                        '</article>' +
                        '</li>' +
                        '<li>' +
                        '<section class="check-history-info">' +
                        '<span class="check-history-title"><i class="icon-downArrow"></i>腰间盘突出 3级</span><span class="check-history-text">2014年11月15日</span>' +
                        '</section>' +
                        '</li>' +
                        '<li>' +
                        '<section class="check-history-info">' +
                        '<span class="check-history-title"><i class="icon-downArrow"></i>腱鞘炎 1级</span><span class="check-history-text">2011年12月15日</span>' +
                        '</section>' +
                        '</li>' +
                        '</ul>' +
                        '</section>' +
                        '</section>' +
                        '<section class="mask-close"></section>' +
                        '</section>' +
                        '<section class="mask-background show"></section>';
                    common.gbw.infoBox({
                        html: htmlText
                    });
                });
            },
            //截断字符（最长输入50个，对多显示18个）
            textSubstr: function () {
                $('.base-input').on('blur', '', function () {
                    var text = $(this).val();
                    $(this).attr('data-val', text);
                    var text_substr = common.getStrByteLen(text, 18);
                    $(this).val(text_substr);
                });

                $('.base-input').on('focus', '', function () {
                    var text = $(this).attr("data-val");
                    $(this).val(text);
                });
            }
        };
        main.init();
    });
