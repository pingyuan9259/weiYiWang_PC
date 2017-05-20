/**
 * @Desc：
 * @Usage:
 * {
 *      type:"city/hospital/disease/illness
 * }
 *
 * @Notify：
 * @Depend：
 *
 * Created by qiangkailiang on 2017/3/5
 */

modules.searchInput = function (obj) {
    var container = {
        init: function () {
            this.searchContent();
        },
        template: {
            searchList: function (data) {
                return '<a class="searchResultItem" data-id="' + data.id + '" data-address="' + data.hospitalAddress + '">' + data.propertyName + '</a>';
            }
        },
        XHRList: {
            cityList: "/mcall/comm/data/baseinfo/v1/getRegionList/",
            diseaseList: "/mcall/cms/illness/property/v1/getMapList/",
            hospitalList: "/mcall/comm/data/baseinfo/v1/getHospitalList/",
            illnessList: "/mcall/cms/illness/property/v1/getMapList/"
        },
        searchContent: function () {
            var that = this;
            $("body").on("focus", ".tc-searchCommInput", function (e) {
                $(".ev-initList").hide();
                $(".ev-searchList").show();
            });
            $("body").on("blur", ".tc-searchCommInput", function (e) {
                $(".ev-initList").show();
                $(".ev-searchList").hide();
            });
            $("body").on("input propertychange", ".tc-searchCommInput", function (e) {
                var t = this;
                clearTimeout(i);
                var i = setTimeout(function () {
                    that.getSearchResult({
                        resourceNum: 2,
                        propertyName: $(t).val(),
                        title: "匹配标签",
                        container: $(".ev-searchList")
                    });
                }, 100);
            });
        },
        getSearchResult: function () {
            var obj = data, that = this;
            $.ajax({
                    url: obj.data,
                    type: 'POST',
                    dataType: "json",
                    timeout: 10000,
                    async: false,
                    data: {
                        paramJson: $.toJSON(obj.data)
                    },
                    beforeSend: function () {
                        common.loading.show();
                    }
                })
                .done(function (data) {
                    var list = [];
                    if (data.responseData) {
                        var dataList = data.responseData.dataList[0].children;
                        if (dataList.length !== 0) {
                            obj.container.children().remove();
                            $(dataList).each(function (index, element) {
                                obj.container.append(that.template.searchList(element));
                            });
                            that.searchResultHighLight();
                        }
                    }
                    common.loading.hide();
                })
                .fail(function () {

                });
        },
        searchResultHighLight: function () {
            $(".ev-searchList .searchResultItem").each(function (index, ele) {
                var input = $('.tc-searchCommInput').val(),
                    place1 = $(ele).text().toLowerCase().indexOf(input.toLowerCase());
                if (place1 != "-1") {
                    var replace1 = $(ele).text().splice(place1, 0, '<em>'),
                        result = replace1.splice(place1 + 4 + input.length, 0, '</em>');
                    $(ele).html(result);
                }
            });
        },
    };
    container.init();
}