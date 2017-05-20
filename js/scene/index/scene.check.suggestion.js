define(['jquery',"text!checkSuggestionTemplate"],function ($,text) {
   var container={
       init:function () {
           this.template=text;
           this.templateUrl();
           this.closeWindow();
           this.showWindow();
       },
       templateUrl:function () {
           $("[data-template='tpl-inner']").append(this.template);
       },
       closeWindow:function () {
            $(".check-suggestion .window-close").on("click",function () {
                $(".check-suggestion").removeClass('show');
            })
       },
       showWindow:function () {
           $(".user-controller-report").on("click",function () {
               $(".check-suggestion").addClass('show');
           })
       }
   };
    container.init();
});