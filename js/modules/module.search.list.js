/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by qiangkailiang on 2017/3/2
 */
modules.searchList = function (obj) {
    var container = {
        init: function () {
            this.config = obj;
            this.element = obj.targetEle;
            this.switchSearchList();
        },
        template: {
            mainInner: function (data) {
                return '<section class="search-box tc-mainInner">' +
                    '<section class="tc-searchCommFixedTop">' +
                    '<div class="tc-searchCommTop">' +
                    '<i class="tc-searchBtnPic"></i><input class="tc-searchCommInput" type="text" placeholder="请填写医院的名称">' +
                    '</div>' +
                    '</section>' +
                    '<section class="tc-searchMain">' +
                    '<section class="tc-searchContentInner ev-initList">' +
                    '<header class="tc-searchDocArea">' +
                    '<i class="tc-searchDocAreaLeft" style="display: none;"></i><span class="tc-searchAreaName">' + data.header + '</span>' +
                    ' </header>' +
                    //    Lists...
                    '</section>' +
                    '<section class="tc-searchContentInner ev-searchList">' +
                    '</section>' +
                    '</section>' +
                    '</section>';
            },
            diseaseList: function (data) {
                return '<section class="searchResult">' +
                    '<header class="searchResultTitle" id="' + data.propertyId + '">' + data.propertyName + '</header>' +
                    (function (sData) {
                        var result = "";
                        $(sData).each(function (index, element) {
                            result += '<a class="searchResultItem" data-id="' + element.propertyId + '">' + element.propertyName + '</a>';
                        });
                        return result;
                    }(data.children)) +
                    '</section>';
            },
            hospitalList: function (data) {
                return '<a class="searchResultItem" data-id="' + data.id + '" data-address="' + data.hospitalAddress + '">' + data.hospitalName + '</a>';
            }
        },
        XHRList: {
            cityList: "/mcall/comm/data/baseinfo/v1/getRegionList/",
            diseaseList: "/mcall/cms/illness/property/v1/getMapList/",
            hospitalList: "/mcall/comm/data/baseinfo/v1/getHospitalList/",
            illnessList: "/mcall/cms/illness/property/v1/getMapList/"
        },
        switchSearchList: function () {

            switch (this.config.type) {
                case "city":
                    //参数Level:外部传入决定第一级为省/市
                    this.searchCity({
                        id: "",
                        level: this.config.level,
                        header: "选择城市"
                    });
                    this.selectCity();
                    break;
                case "hospital":
                    this.searchCity({
                        id: "",
                        level: "3",
                        header: "选择医院所在城市"
                    });
                    this.selectCity();
                    break;
                case "disease":
                    this.searchDiseaseList();
                    break;
                case "illness":
                    this.searchDiseaseList();
            }
        },
        //搜索省市区...
        searchCity: function (data) {
            $("body").append(this.template.mainInner({
                header: data.header
            }));
            setTimeout(function () {
                $(".search-box").addClass("show");
            }, 100);
            $.ajax({
                    url: "http://rap.taobao.org/mockjsdata/14424/getCityMap",
                    type: 'POST',
                    dataType: "json",
                    timeout: 10000,
                    // async: false,
                    data: {
                        paramJson: $.toJSON({
                            parentId: data.id,
                            isValid: "1",
                            firstResult: "0",
                            maxResult: "20",
                            treeLevel: data.level //1国2省3市4区
                        })
                    },
                    beforeSend: function () {
                        common.loading.show();
                    }
                })
                .done(function (data) {
                    var list = [];
                    if (data.responseData) {
                        var dataList = data.responseData.dataList;
                        if (dataList.length !== 0) {
                            $(".he-main").hide();
                            $(".tc-mainInner").css("position", "static")
                            $(dataList).each(function (index, element) {
                                var item = {
                                    name: element.regionName,
                                    id: element.regionId,
                                    level: element.treeLevel
                                };
                                list.push(item);
                            });
                            new firstLetterPosition(list);
                        }
                    }
                    common.loading.hide();
                })
                .fail(function () {

                });
        },
        //搜索医院...
        searchHospitalList: function (data) {
            var that = this;
            $("body").append(this.template.mainInner({
                header: data.header
            }));
            setTimeout(function () {
                $(".search-box").addClass("show");
            }, 100);
            $.ajax({
                    url: "http://rap.taobao.org/mockjsdata/14424/getCityMap",
                    type: 'POST',
                    dataType: "json",
                    timeout: 10000,
                    async: false,
                    data: {
                        paramJson: $.toJSON({
                            parentId: data.id,
                            isValid: "1",
                            firstResult: "0",
                            maxResult: "20",
                            treeLevel: data.level //1国2省3市4区
                        })
                    },
                    beforeSend: function () {
                        common.loading.show();
                    }
                })
                .done(function (data) {
                    var list = [];
                    if (data.responseData) {
                        var dataList = data.responseData.dataList;

                        if (dataList.length !== 0) {
                            $(".he-main").hide();
                            $(".tc-mainInner").css("position", "static")
                            $(dataList).each(function (index, element) {
                                $(".ev-initList").append(that.template.hospitalList(element));
                            });
                            that.selectHospital()
                        }
                    }
                    common.loading.hide();
                })
                .fail(function () {

                });
        },
        //搜索疾病
        searchDiseaseList: function () {
            $("body").append(this.template.mainInner({
                header: "选择所患疾病"
            }));
            setTimeout(function () {
                $(".search-box").addClass("show");
            }, 100);
            var that = this;
            $.ajax({
                    url: "http://rap.taobao.org/mockjsdata/14424/getDisMap",
                    type: 'POST',
                    dataType: "json",
                    timeout: 10000,
                    data: {
                        paramJson: $.toJSON({
                            isValid: "1",
                            firstResult: "0",
                            maxResult: "20",
                        })
                    },
                    beforeSend: function () {
                        common.loading.show();
                    }
                })
                .done(function (data) {
                    var list = [];
                    if (data.responseData) {
                        var dataList = data.responseData.dataList;
                        if (dataList.length !== 0) {
                            $(dataList).each(function (index, element) {
                                $(".ev-initList").append(that.template.diseaseList(element));
                            });
                            that.selectDisease();
                        }
                    }
                    common.loading.hide();
                })
                .fail(function () {

                });
        },
        //搜索手术...
        searchIllenssList: function () {
            var that = this;
            $.ajax({
                    url: "http://rap.taobao.org/mockjsdata/14424/getDisMap",
                    type: 'POST',
                    dataType: "json",
                    timeout: 10000,
                    data: {
                        paramJson: $.toJSON({
                            isValid: "1",
                            firstResult: "0",
                            maxResult: "20"
                        })
                    },
                    beforeSend: function () {
                        common.loading.show();
                    }
                })
                .done(function (data) {
                    var list = [];
                    if (data.responseData) {
                        var dataList = data.responseData.dataList;
                        if (dataList.length !== 0) {
                            $(dataList).each(function (index, element) {
                                $(".ev-initList").append(that.template.diseaseList(element));
                            });
                            that.selectIllness();
                        }
                    }
                    common.loading.hide();
                })
                .fail(function () {

                });
        },
        //选择省市区...
        selectCity: function () {
            var that = this;
            //若为选择到指定的最后一级则继续搜索...
            $("body").off("click").on("click", ".searchResultItem", function () {
                //已到目标层级,目标元素获取信息...
                if (that.config.type === "city") {
                    if (parseInt($(this).attr("data-level")) === parseInt(that.config.finalLevel)) {
                        that.targetGetMessage({
                            name: $(this).text(),
                            id: $(this).attr("data-id")
                        });
                        that.hideSearchList();
                        $(".he-main").show();
                        Q.go('index');
                    } else {
                        $(".tc-mainInner").remove();
                        $(".searchTypeSelect").children().remove();
                        that.searchCity({
                            id: $(this).attr("data-id"),
                            level: parseInt($(this).attr("data-level")) + 1,
                            header: $(this).text()
                        })
                    }
                } else if (that.config.type === "hospital") {
                    $(".tc-mainInner").remove();
                    $(".searchTypeSelect").children().remove();
                    that.searchHospitalList({
                        header: $(this).text(),
                        id: $(this).attr("data-id"),
                    })

                }
            })
        },
        //选择医院...
        selectHospital: function () {
            var that = this;
            $("body").off("click").on("click", ".searchResultItem", function () {
                that.targetGetMessage({
                    name: $(this).text(),
                    id: $(this).attr("data-id"),
                    address: $(this).attr("data-address")
                });
                that.hideSearchList();
                $(".he-main").show();
                Q.go('index');
            })
        },
        //选择疾病...
        selectDisease: function () {
            var that = this;

            $("body").off("click").on("click", ".searchResultItem", function () {
                //当前场景为搜索疾病...
                if (that.config.type === "disease") {
                    that.targetGetMessage({
                        name: $(this).text(),
                        id: $(this).attr("data-id"),
                    });
                    that.hideSearchList();
                    Q.go('index');
                } else if (that.config.type === "illness") {
                    //当前场景为搜索手术——疾病为先决条件...
                    that.searchIllenssList({});

                }
            });

        },
        //选择手术...
        selectIllness: function () {
            $("body").off("click").on("click", ".searchResultItem", function () {
                that.targetGetMessage({
                    name: $(this).text(),
                    id: $(this).attr("data-id"),
                });
                that.hideSearchList();
                Q.go('index');
            })
        },
        //目标获取信息...
        targetGetMessage: function (data) {
            for (var i in data) {
                console.log(data[i])
                this.element.attr("data-" + i, data[i]);
            }
            this.element.text(data.name)
        },
        //隐藏搜索页...
        hideSearchList: function () {
            $(".search-box").removeClass("show");
            $(".search-box").on("transitionend WebkitTransitionEnd", function () {
                $(this).remove();
            })
        },
    }

    container.init();
};