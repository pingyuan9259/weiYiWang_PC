/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by qiangkailiang on 2017/2/20
 */

modules.symptom_select = {
    init: function () {

    },
    config: {},
    template: {
        man: {
            front:'<img class="body-picture-img" src="/image/img00/patientConsult/body_man_front@2x.png" alt="" data-dir="front">',
            back:'<img class="body-picture-img" src="/image/img00/patientConsult/body_man_back@2x.png" alt="" data-dir="back">'
        },
        woman:{
            front:'<img class="body-picture-img" src="/image/img00/patientConsult/body_woman_front@2x.png" alt="" data-dir="front">',
            back:'<img class="body-picture-img" src="/image/img00/patientConsult/body_woman_back@2x.png" alt="" data-dir="back">'
        },
        kid:{
            front:'<img class="body-picture-img" src="/image/img00/patientConsult/body_kid_front@2x.png" alt="" data-dir="front">',
            back:'<img class="body-picture-img" src="/image/img00/patientConsult/body_kid_back@2x.png" alt="" data-dir="back">'
        }
    },
    render: function (type) {
        this.direction=$(".body-picture-overturn").data("dir");
        $(".body-picture").addClass(type+"-"+this.direction);
        for (var i in this.template[type]){
            $(".body-picture-content").prepend(this.template[type][i]);
        }

        this.changeDirection(type);

    },
    changeDirection:function (type) {
        var that=this;
        $(".body-picture-img[data-dir='"+this.direction+"']").show();

        $(".body-picture-overturn").on("click",function () {
            if (that.direction==="front"){
                $(".body-picture").removeClass(type+"-"+that.direction);
                that.direction="back";
                $(this).attr("data-dir","back");
                $(".body-picture").addClass(type+"-back");
                $(".body-picture-img").hide();
                $(".body-picture-img[data-dir='"+that.direction+"']").show();
            }else{
                $(".body-picture").removeClass(type+"-"+that.direction);
                that.direction="front";
                $(this).attr("data-dir","front");
                $(".body-picture").addClass(type+"-front");
                $(".body-picture-img").hide();
                $(".body-picture-img[data-dir='"+that.direction+"']").show();
            }
            $(".pain-point").removeClass("on")
        })
    }
};