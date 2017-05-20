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
            this.showSearchList();
            switch (parseInt(obj.type)) {
                case 1:
                    //省市区联动:
                    this.countryMessage();
                    break;
                case 2:
                    //疾病名称
                    this.diseaseMessage();
                    break;
                case 3:
                    //手术名称
                    this.diseaseMessage(true);
                    break;
                case 4:
                    //医院名称
                    this.countryMessage();
                    break;
            }
        },
        template: {
            mainInner: function () {
                return '<section class="search-box tc-mainInner">' +
                    '<section class="tc-searchCommFixedTop">' +
                    '<div class="tc-searchCommTop">' +
                    '<i class="tc-searchBtnPic"></i><input class="tc-searchCommInput" type="text" placeholder="请填写医院的名称">' +
                    '</div>' +
                    '</section>' +
                    '<section class="tc-searchMain">' +
                    '<section class="tc-searchContentInner ev-initList">' +
                    (function (type) {
                        switch (parseInt(type)) {
                            case 1:
                            case 4:
                                return '<header class="tc-searchDocArea">' +
                                    '<i class="tc-searchDocAreaLeft" style="display: none;"></i><span class="tc-searchAreaName">选择医院所在城市</span>' +
                                    ' </header>';
                                break;
                            case 2:
                            case 3:
                                return '<header class="tc-searchDocArea">' +
                                    '<span class="tc-searchAreaName">选择所患疾病</span>' +
                                    ' </header>';
                                break;

                        }
                    }(obj.type)) +
                    //    Lists...
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
        //加入搜索页面...
        showSearchList: function () {
            var that = this;
            $("body").append(this.template.mainInner());
            setTimeout(function () {
                $(".search-box").addClass("show")
            }, 100);
            switch (parseInt(this.config.type)) {
                case 1:
                case 4:
                    $(".search-box").on("transitionend WebkitTransitionEnd", function () {
                        if ($(".search-box").hasClass("show")) {
                            that.getCountryList({
                                id: "",
                                level: "2"
                            });
                            $(".he-main").hide();
                            $(this).css("position", "static");
                        } else {
                            $(".searchTypeSelect").children().remove();
                            $(".he-main").show();
                        }
                    });
                    break;
                case 2:
                case 3:
                    $(".searchTypeSelect").children().remove();
                    $(".search-box").on("transitionend WebkitTransitionEnd", function () {
                        if ($(".search-box").hasClass("show")) {
                            that.getDiseaseList()
                        }
                    });
                    break;
            }
        },
        //城市列表
        getCountryList: function (data) {
            var that = this;
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
                    console.log(data)
                    if (data.responseData) {
                        var dataList = data.responseData.dataList;

                        if (dataList.length !== 0) {
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
        //疾病列表
        getDiseaseList: function () {
            var that = this;
            $.ajax({
                url: this.XHRList.diseaseList,
                type: 'POST',
                dataType: "json",
                timeout: 10000,
                async: false,
                data: {
                    paramJson: $.toJSON({
                        isValid: "1",
                        firstResult: "0",
                        maxResult: "20",
                        illnessType: "1"
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
                                $(".tc-searchContentInner").append(that.template.diseaseList(element));
                            });
                        }
                    }
                    common.loading.hide();
                })
                .fail(function () {

                });
        },
        //基于疾病列表搜索手术...
        //获取手术列表
        getIllenssList: function (data) {
            var that = this;
            $.ajax({
                url: this.XHRList.illnessList,
                type: 'POST',
                dataType: "json",
                timeout: 10000,
                async: false,
                data: {
                    paramJson: $.toJSON(data)
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
                                $(".tc-searchContentInner").append(that.template.diseaseList(element));
                            });
                        }
                        that.getIllenssMessage()
                    }
                    common.loading.hide();
                })
                .fail(function () {

                });
        },
        //获取医院列表...
        hospitalList: function (data) {
            var that = this;
            $.ajax({
                url: this.XHRList.hospitalList,
                type: 'POST',
                dataType: "json",
                timeout: 10000,
                async: false,
                data: {
                    paramJson: $.toJSON(data)
                },
                beforeSend: function () {
                    common.loading.show();
                }
            })
                .done(function (data) {
                    var list = [];
                    if (data.responseObject.responseData) {
                        var dataList = data.responseObject.responseData.dataList;
                        if (dataList.length !== 0) {
                            $(".searchTypeSelect").children().remove();
                            $(dataList).each(function (index, element) {
                                $(".tc-searchContentInner").append(that.template.hospitalList(element));
                            });
                        }
                        that.getIllenssMessage();
                    }
                    common.loading.hide();
                })
                .fail(function () {

                });
        },
        //城市信息获取完毕...
        countryMessage: function () {
            var that = this;
            $(".search-box").on("click", ".searchResultItem", function () {
                if (parseInt($(this).attr("data-level")) === 4) {
                    that.targetMessage({
                        name: $(this).text(),
                        id: $(this).attr("data-parentId")
                    });
                    Q.go('index');
                    that.hideSearchList();
                } else {
                    if (parseInt(that.config.type) === 4) {
                        $('.tc-searchContentInner').children().remove();
                        $(".searchTypeSelect").children().remove();
                        that.hospitalList({
                            hospitalName: $(this).attr("data-parentId"),
                            isValid: "1",
                            firstResult: "0",
                            maxResult: "20",
                            provinceId: "",
                            cityId: ""
                        });
                        that.targetMessage({
                            name: $(this).text(),
                            id: $(this).attr("data-id"),
                            address: $(this).attr("data-address")
                        });
                    } else {
                        $('.tc-searchContentInner').children().remove();
                        $(".searchTypeSelect").children().remove();
                        that.getCountryList({
                            id: $(this).attr("data-id"),
                            level: parseInt($(this).attr("data-level"))
                        });
                    }
                }
            })
        },
        //疾病信息获取完毕...
        diseaseMessage: function (after) {
            var that = this;
            $(".search-box").on("click", ".searchResultItem", function () {
                if (after) {
                    that.getIllenssList({
                        parentId: $(this).attr("data-parentId"),
                        isValid: "1",
                        firstResult: "0",
                        maxResult: "20",
                        illnessType: "2"
                    })
                } else {
                    that.targetMessage({
                        name: $(this).text(),
                        id: $(this).attr("data-id")
                    });
                    Q.go('index');
                    that.hideSearchList();
                }
            })
        },
        //手术信息获取完毕...
        getIllenssMessage: function () {
            var that = this;
            $(".search-box").on("click", ".searchResultItem", function () {
                that.targetMessage({
                    name: $(this).text(),
                    id: $(this).attr("data-id")
                });
                Q.go('index');
                that.hideSearchList();
            })
        },

        //信息暴露至目标元素
        targetMessage: function (obj) {
            for (var i in obj) {
                this.element.attr("data-" + i, obj[i]);
            }
            this.element.text(obj.name)
        },
        //销毁搜索viewer
        hideSearchList: function () {
            $(".search-box").removeClass("show");
            $(".search-box").on("transitionend WebkitTransitionEnd", function () {
                $(this).remove();
            })
        },
        //内容搜索
        searchContent: function () {
            $(".tc-searchCommInput").on("input propertychange", function (e) {
                var t = this;
                clearTimeout(i);
                i = setTimeout(function () {
                    that.getTagResult({
                        resourceNum: 2,
                        propertyName: $(t).val(),
                        title: "匹配标签",
                        container: $(".ev-searchList")
                    });
                }, 100);
            });
        }
    };
    container.init();
};


