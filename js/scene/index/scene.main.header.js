/**
 * Created by Administrator on 2017/3/5.
 */
define(['jquery','text!headerTemplate'],function ($,text) {
    var mainHeader={
        init:function () {
            this.template=text;
            this.templateUrl();
            this.mainHeader();
        },
        templateUrl:function () {
            $("[data-template='tpl-header']").append(this.template);
        },
        mainHeader:function () {

        }
    };
    mainHeader.init();
    return mainHeader;
});