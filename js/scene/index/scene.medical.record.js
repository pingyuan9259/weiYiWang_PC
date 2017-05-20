/**
 * Created by Administrator on 2017/3/5.
 */
define(['jquery',"text!medicalRecordTemplate"],function ($,text) {
    var medicalRecord={
        init:function () {
            this.template=text;
            this.templateUrl();
                this.tabsChange();

        },
        templateUrl:function () {
            $("[data-template='tpl-medical-record']").append(this.template);
        },
        tabsChange:function () {
            new TabsViewChange({
                tabsInner: $(".tabsInner.medical-record-tabs"), //导航tabs容器（并非每个tabsItem，为其父容器
                views: $(".viewInner.medical-record-form"), //tabs对应view容器
                changeCallback: function () { //tabs切换时执行回调
                    console.log('喵')
                },
                role: "mr-record" //tabs与View对应的角色名，插件本身会按照索引号实现点击切换显示
            });
        }
    };
    medicalRecord.init();
    return medicalRecord;
});