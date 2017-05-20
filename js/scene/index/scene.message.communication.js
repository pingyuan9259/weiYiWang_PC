/**
 * @name:
 * @desc:
 * @example:
 * @depend:
 * @date: 2017/2/13
 * @author: qiangkailiang
 */
define(['jquery'], function ($) {
    //通讯类
    var MessageCommunication = function () {

    };

    MessageCommunication.prototype = {
        //通讯类加载...
        init: function () {
            var that = this;
            this.nim = NIM.getInstance({
                // debug: true,
                appKey: '5f4c2f653abb8c46b09cddb625b728fa',
                account: controller.userData.account,
                token: controller.userData.token,
                onconnect: function (data) {
                    console.log('连接成功');
                },
                onmyinfo: function (userData) {
                    console.log(userData)
                    controller.getUserInfo(userData);
                    that.sendMessage();
                    // that.getFriends();
                    $(".userlist-mainList").on("click", ".userlist-mainList-item", function () {
                        var account = $(this).attr("data-account"),
                            img = $(this).attr("data-img");
                        controller.targetData = {
                            account: account,
                            avatar: img
                        };
                        that.getMessageList();
                    })
                },
                onwillreconnect: this.onWillReconnect,
                ondisconnect: this.onDisconnect,
                onerror: this.onError,
                onroamingmsgs: this.onRoamingMsgs,
                onofflinemsgs: this.onOfflineMsgs,
                onmsg: function (msg) {
                    console.log(msg)
                    controller.receiveMessage(msg);
                    controller.renderSessionsMsg();
                },
                onsessions: function (sessions) {
                    // 会话列表……Account获取>>>>对应聊天云端记录获取
                    console.log(sessions);
                    var list = controller.getAccountLists(sessions);
                    // >>>对应用户名片获取
                    that.getTargetAvatar(list);
                },
                onupdatesession: function (session) {
                    console.log('会话更新了', session);
                }
            });

        },
        sendMessage: function () {
            var that = this;
            //单条消息发送
            $(".user-controller-send-btn").on("click", function () {
                that.nim.sendText({
                    scene: 'p2p',
                    to: controller.targetData.account,
                    text: $(".user-controller-input").val(),
                    done: function (error, obj) {
                        controller.sendSingleMessage(error, obj)
                    },
                });
            });
            //智能报告发送
            $('.user-controller-report').on("click", function () {
                that.nim.sendCustomMsg({
                    scene: 'p2p',
                    to: controller.targetData.account,
                    content: JSON.stringify(controller.triageReportData()),
                    done: function (error, msg) {
                        controller.sendTriageReport(error, msg)
                    }
                });
            })
        },
        //获取历史消息……
        getMessageList: function () {
            this.nim.getHistoryMsgs({
                scene: 'p2p',
                to: controller.targetData.account,
                done: function (error, obj) {

                    controller.renderHistoryMessage(error, obj);
                },
                limit: 10
            });
        },
        //修改用户名片...
        //尚不确定如何修改
        configUserInfo: function () {
            this.nim.updateMyInfo(controller.configUserInfo());
        },
        //获取对方名片
        getTargetAvatar: function (list) {
            var that = this;
            that.nim.getUsers({
                accounts: list,
                done: controller.getTragetInfo
            });
        },
        getFriends: function () {
            var that = this;
            this.nim.getFriends({
                done: getFriendsDone
            });
            function getFriendsDone(error, friends) {
                console.log('获取好友列表' + (!error ? '成功' : '失败'), error, friends);
                if (!error) {
                    onFriends(friends);
                }
            }

            function onFriends(friends) {
                console.log('收到好友列表', friends);
            }
        }
    };

    //操作类
    var Controller = function () {
        this.messageBox = $(".messageList-box");
    };
    Controller.prototype = {
        //基础用户数据...
        userData: {
            account: 'qkl',
            token: 'ce820b8dcc463ab59d5d51a1380f7ab2',
        },
        //对话目标数据:
        targetData: [],
        targetAvatar: [],
        //发送单条数据...
        sendSingleMessage: function (error, msg) {
            var that = this;

            console.log('发送' + msg.scene + ' ' + msg.type + '消息' + (!error ? '成功' : '失败') + ', id=' + msg.idClient);
            if (!error) {
                $(".user-controller-input").val("");
                that.messageBox.append(template.mine(msg));
            }
        },
        //智能报告发送数据
        triageReportData: function () {
            return {
                type: 2,
                data: {
                    recordImg: ['http://img.jfdown.com/jfdown/201409/rw4fi0eoppn.jpg'],
                    userData: controller.targetData
                }
            };
        },
        //发送智能报告
        sendTriageReport: function (error, msg) {
            console.log('发送' + msg.scene + ' ' + msg.type + '消息' + (!error ? '成功' : '失败') + ', id=' + msg.idClient);
            if (!error) {
                this.messageBox.append(template.triageResult({
                    userData: {nick: controller.targetData.nick},
                    recordImg: ["http://img.jfdown.com/jfdown/201409/rw4fi0eoppn.jpg"]
                }))
            }
        },
        //发送自定义消息 集中分配...
        sendCustomMessage: function () {

        },
        //接受消息...
        receiveMessage: function (element) {
            var account = $(".messageList-box").attr("data-account");
            switch (element.type) {
                case 'custom':
                    //情况区分：病例？手术？康复报告？
                    this.receiveCustomMessage(JSON.parse(element.content));
                    break;
                case 'notification':
                    // 处理群通知消息
                    break;
                case "text":
                    //单聊消息
                    this.receiveSingleMessage(element)
                    break;
                case "file":
                    // 发送文件...
                    this.receiveFileMessage(element);
                default:
                    break;
            }
        },
        //接受单条消息...
        receiveSingleMessage: function (msg) {
            this.messageBox.append(msg.from === this.userData.account ? template.mine(msg) : template.others(msg));
        },
        //接受文件消息...
        receiveFileMessage: function (msg) {
            this.messageBox.append(template.others(msg));
        },
        //接受自定义消息 集中分配
        receiveCustomMessage: function (msg) {

            switch (msg.type) {
                case 1: //病例
                    this.messageBox.append(template.medicalRecord(msg.data));
                    break;
                case 2://分诊报告
                    this.messageBox.append(template.triageResult(msg.data));
                    break;
                case 3: //手术预约
                    console.log(msg.data)
                    this.messageBox.append(template.operation(msg.data));
                    break;
            }
        },
        //接收用户信息...
        getUserInfo: function (data) {
            controller.userData = data;
            $(".main-header-tips span").text(data.nick)
        },
        //获得用户名片数组..
        getTragetInfo: function (error, users) {
            controller.targetAvatar = users;
            $(users).each(function (index, element) {
                $(".userlist-mainList").append(template.sessionListItem(element));
            })
        },
        //修改用户信息...
        //实际数据通过用户填写改变……并不在该页面
        configUserInfo: function () {
            return {
                nick: '超级强三皮',
                avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1487237955376&di=1e503c951bce4233984028c82a9b3059&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fitem%2F201402%2F24%2F20140224012947_s8BeJ.jpeg',
                sign: '超级强三皮测试中',
                gender: 'male',
                email: 'superpi@163.com',
                birth: '1991-01-15',
                tel: '15201669519',
                done: function (error, user) {
                    console.log('更新我的名片' + (!error ? '成功' : '失败'));
                    console.log(error);
                    console.log(user);
                }
            }
        },
        //输出历史消息...
        renderHistoryMessage: function (error, obj) {
            var that = this;
            console.log(obj)
            if (!error) {
                $(".messageList-box").attr("data-account", obj.to);
                $(".messageList-box").children().remove();
                $(obj.msgs.reverse()).each(function (index, element) {
                    that.receiveMessage(element)
                });
            }
        },
        //获取用户名列表...
        getAccountLists: function (list) {
            var arr = [];
            $(list).each(function (index, element) {
                arr.push(element.to);
            });
            return arr;
        },
        renderSessionsMsg: function () {

        }
    };
    //策略类
    var Template = function () {
        var that = this;
    };
    Template.prototype = {
        medicalRecord: function (data) {
            return '<article class="messageList-item others-message">' +
                '<article class="messageList-item-content">' +
                '<figure class="messageList-item-img">' +
                '<img src="' + controller.targetData.avatar + '" alt="">' +
                '</figure>' +
                '<figcaption class="messageList-item-text">' +
                '<section class="medical-record-result">' +
                '<header class="medical-record-result-title">' + data.userData.userName + '病例单</header>' +
                '<article class="medical-record-result-basemsg">' +
                '<span>性别:' + data.userData.sex + '</span>' +
                '<span>年龄:' + data.userData.age + '</span>' +
                '<span>电话:' + data.userData.phone + '</span>' +
                '<span>地区:' + data.userData.country + '</span>' +
                '</article>' +
                '<section class="medical-record-result-imgBox">' +
                (function (sData) {
                    var result = "";
                    $(sData).each(function (index, element) {
                        result += '<figure class="medical-record-result-img"><img src="' + element + '" alt=""></figure>';
                    });
                    return result;
                })(data.recordImg) +
                '</section>' +
                '<article class="medical-record-result-content">' +
                (function (sData) {
                    var result = "";
                    if (sData) {
                        $(sData.content).each(function (index, element) {
                            result += '<p>' + element + '</p>';
                        });
                        return result;
                    }
                })(data.disease) +
                '</article>' +
                '</section>' +
                '</figcaption>' +
                '</article>' +
                '</article>';
        },
        triageResult: function (data) {
            return '<article class="messageList-item my-message">' +
                '<article class="messageList-item-content">' +
                '<figcaption class="messageList-item-text">' +
                '<section class="messageList-item-triage-report">' +
                '<h3>亲爱的' + data.userData.nick + '，感谢您对唯医会诊的信任！根据您的情况，我为您定制了一份康复报告，其中包含权威医生推荐，关节疾病科普知识与日常护理建议。请您查看详情。祝您早日康复！</h3>' +
                '<figure class="messageList-item-triage-report-img">' +
                '<img src="' + data.recordImg[0] + '" alt="">' +
                '</figure>' +
                '</section>' +
                '</figcaption>' +
                '<figure class="messageList-item-img">' +
                '<img src="' + controller.userData.avatar + '" alt="">' +
                '</figure>' +
                '</article>' +
                '</article>';
        },
        others: function (data) {
            return '<article class="messageList-item others-message">' +
                '<article class="messageList-item-content">' +
                '<figure class="messageList-item-img">' +
                '<img src="' + controller.targetData.avatar + '" alt="">' +
                '</figure>' +
                '<figcaption class="messageList-item-text">' +
                (function (file) {
                    if (file) {
                        switch (file.ext) {
                            case "jpg":
                            case "png":
                            case "gif":
                                return '<img src="' + file.url + '" alt="Image" style="width: 300px;" />';
                                break;
                            case "mp4":
                                return '<video src="' + file.url + '" alt="Image" style="width: 300px;"/>';
                        }

                    } else {
                        return data.text;
                    }
                }(data.file)) +

                '</figcaption>' +
                '</article>' +
                '</article>';
        },
        mine: function (data) {
            return '<article class="messageList-item my-message">' +
                '<article class="messageList-item-content">' +
                '<figcaption class="messageList-item-text">' +
                data.text +
                '</figcaption>' +
                '<figure class="messageList-item-img">' +
                '<img src="' + controller.userData.avatar + '" alt="">' +
                '</figure>' +
                '</article>' +
                '</article>';
        },
        operation: function (data) {
            var img = $(".userlist-mainList-item[data-account='" + data.target + "']").attr("data-img");
            return '<article class="messageList-item others-message">' +
                '<article class="messageList-item-content">' +
                '<figure class="messageList-item-img">' +
                '<img src="' + controller.targetData.avatar + '" alt="">' +
                '</figure>' +
                '<figcaption class="messageList-item-text">' +
                '<section class="medical-record-result">' +
                '<header class="medical-record-result-title">' + data.userData.userName + '病例单</header>' +
                '<article class="medical-record-result-basemsg">' +
                '<span>性别:' + data.userData.sex + '</span>' +
                '<span>年龄:' + data.userData.age + '</span>' +
                '<span>电话:' + data.userData.phone + '</span>' +
                '<span>地区:' + data.userData.country + '</span>' +
                '</article>' +
                '<section class="medical-record-result-imgBox">' +
                (function (sData) {
                    var result = "";
                    $(sData).each(function (index, element) {
                        result += '<figure class="medical-record-result-img"><img src="' + element + '" alt=""></figure>';
                    });
                    return result;
                })(data.recordImg) +
                '</section>' +
                '<article class="medical-record-result-content">' +
                '<p>期望手术名称：' + data.operation.name + '</p>' +
                '<p>期望手术时间：' + data.operation.time + '</p>' +
                '<p>期望手术地区：' + data.operation.country + '</p>' +
                '<p>社保类型：' + data.operation.insurer + '</p>' +
                '</article>' +
                '</section>' +
                '</figcaption>' +
                '</article>' +
                '</article>' +
                '<article class="messageList-item others-message">' +
                '<article class="messageList-item-content">' +
                '<figure class="messageList-item-img">' +
                '<img src="' + controller.targetData.avatar + '" alt="">' +
                '</figure>' +
                '<figcaption class="messageList-item-text">' +
                data.likeDoctor.content +
                '</figcaption>' +
                '</article>' +
                '</article>';
        },
        sessionListItem: function (ele) {
            return '<section class="userlist-mainList-item" data-account="' + ele.account + '" data-img="' + ele.avatar + '">' +
                '<figure class="userlist-item-img">' +
                '<img src="' + ele.avatar + '" alt="">' +
                '</figure>' +
                '<figcaption class="userlist-item-msg">' +
                '<article class="userlist-item-base-msg">' +
                '<h3>' + ele.account + '</h3>' +
                '<article class="userlist-item-msg-category">' +
                '<span>新患者</span>' +
                '<span>咨询</span>' +
                '</article>' +
                '<p class="time">上午9:30</p>' +
                '</article>' +
                '<article class="userlist-item-msg-item">' +
                '<span class="sex">男</span>' +
                '<span class="age">55岁</span>' +
                '<span class="media">5级</span>' +
                '</article>' +
                '</figcaption>' +
                '</section>';
        }
    };
    //HTML模板 策略类启动...
    var template = new Template();
    //全局控制方法启动...
    var controller = new Controller();

    //集中控制 网易云信核心通讯SDK启动...
    var messageCommunication = new MessageCommunication();

    // 全页面业务流启动...
    return messageCommunication;
});