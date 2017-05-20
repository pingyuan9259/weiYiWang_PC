
//confirm模态窗
common.gbw={};
common.gbw.confirmBox = function (options, role) {
    if ($('.confirmBox-tips').length === 0) {
        var template = '<section class="maskers confirmBox-tips">' +
            '<section class="confirmBox-inner">' +
            '<article class="confirmBox-content">' +
                '<article>' +
                (options.title ? '<h2>' + (options.title || '') + '</h2>' : '<h2></h2>') +
                '<p>' + (options.content || '') + '</p>' +
                '</article>' +
                '</article>' +
                '<footer class="confirmBox-btns">' +
                '<button class="confirmBox-cancelBtn">' + (options.cancel || '') + '</button>' +
                '<button class="confirmBox-ensureBtn">' + (options.ensure || '') + '</button>' +
                '</footer>' +
                '</section>' +
                '<section class="mask-close"></section>'+
            '</section>'+
            '<section class="mask-background"></section>';

        $("body").append(template);

        setTimeout(function (e) {
            $(".confirmBox-tips").addClass('show');
            $(".mask-background").addClass('show');

        }, 50);

        $(".confirmBox-cancelBtn").off('click').on("click",function () {
            options.cancelCallback ? options.cancelCallback():'';
            $(".confirmBox-tips").removeClass('show');
            $(".mask-background").removeClass('show');
            $(".confirmBox-tips").on("transitionend WebkitTransitionEnd", function () {
                $(".confirmBox-tips").remove();
            });
            return false;
        });

        $(".confirmBox-ensureBtn").off('click').on("click",function () {
            options.ensureCallback ? options.ensureCallback():'';
            $(".confirmBox-tips").removeClass('show');
            $(".mask-background").removeClass('show');

            $(".confirmBox-tips").on("transitionend WebkitTransitionEnd", function () {
                $(".confirmBox-tips").remove();
            });
            return false;
        });


        $(".mask-close").off('click').on("click",  function () {
            options.ensureCallback ? options.ensureCallback():'';
            $(".confirmBox-tips").removeClass('show');
            $(".mask-background").removeClass('show');
            $(".confirmBox-tips").on("transitionend WebkitTransitionEnd", function () {
                $(".confirmBox-tips").remove();
            });
            return false;
        });



    } else {
        $(".confirmBox-tips").addClass('show');
        $(".mask-background").addClass('show');
    }
};

common.gbw.infoBox = function (options) {


    if ($('.infoBox-tips').length === 0) {
        var template = options.html;
        $("body").append(template);


        setTimeout(function (e) {
            $(".infoBox-tips").addClass('show');
            $(".mask-background").addClass('show');

        }, 50);

        $(".infoBox-saveBtn").off('click').on("click",function () {
            options.ensureCallback ? options.ensureCallback():'';
            $(".infoBox-tips").removeClass('show');
            $(".mask-background").removeClass('show');

            $(".infoBox-tips").on("transitionend WebkitTransitionEnd", function () {
                $(".confirmBox-tips").remove();
            });
            return false;
        });

        $(".mask-close").off('click').on("click",  function () {
            options.ensureCallback ? options.ensureCallback():'';
            $(".infoBox-tips").removeClass('show');
            $(".mask-background").removeClass('show');
            $(".infoBox-tips").on("transitionend WebkitTransitionEnd", function () {
                $(".infoBox-tips").remove();
            });
            return false;
        });


    } else {
        $(".infoBox-tips").addClass('show');
        $(".mask-background").addClass('show');
    }
};
