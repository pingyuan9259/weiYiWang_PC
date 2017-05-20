/**
 * Created by Administrator on 2017/3/5.
 */
define(["jquery",'common','downSelector',"text!userListTemplate","ymd"],function ($,common,downSelector,text,ymd) {
   var userList={
        init:function () {
            this.template=text;
            this.templateUrl();
            this.userList();
        },
       templateUrl:function () {
           $("[data-template='tpl-userList']").append(this.template);
       },
       userList:function () {
           $("#sex-selector").downSelector({
               list: [{
                   titleName: "firstListTitle",
                   listName: "firstList"
               }]
           });

           $("#area-selector").downSelector({
               list: [{
                   titleName: "firstListTitle",
                   listName: "firstList"
               },
                   {
                       titleName: "secondListTitle",
                       listName: "secondList"
                   }]
           })

           $("#data-selector").downSelector({
               list: [{
                   titleName: "firstListTitle",
                   listName: "firstList"
               },
                   {
                       titleName: "secondListTitle",
                       listName: "secondList"
                   },
                   {
                       titleName: "thirdListTitle",
                       listName: "thirdList"
                   }]
           });
           ymd({
               year: $("#data-selector .firstList"),
               month: $("#data-selector .secondList"),
               day: $("#data-selector .thirdList"),
           })
       }

   };
    userList.init();
    return userList;
});