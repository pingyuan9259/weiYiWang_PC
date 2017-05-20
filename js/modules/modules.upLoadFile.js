/**
 * 功能描述：文件上传
 * 使用方法:
 * 注意事件：
 * 引入来源：
 *     作用：
 *
 * Created by JuKun on 2017/3/1.
 */
modules.upLoadFiles=function(obj){
    var container={
        op:{

        },
        path:{

        },
        init:function(){
          var _t=this;
            $('.ev-upLoadBtn').on("click",function(){
                $(this).closest('.ev-fileUpHide').hide();
                if($('.main-inner.tc-upLoadFile').length>0){
                    $('.main-inner.tc-upLoadFile').show();
                }else{
                    _t.fileUpload();
                }
            });
        },
        //上传文件Dome
        fileUploadHtml:function(k){
            var t=this,
                _listHtml='',
                _html='';
            $.each(k,function(i,val){
                _listHtml+='<form class="tc-upFormBox" action=""><figure class="tc-upLoadTitle ev-upLoadList"><span class="tc-upLoadTitleName">X光片</span>' +
                    '<span class="tc-upLoadRightIcon"></span></figure><input class="tc-upLoadInput" type="file" multiple="multiple"></form>';
            });
            _html+='<section class="main-inner tc-upLoadFile">'+
                '<header class="main-header fileUpload">'+
                '<figure class="main-header-item ev-upLoadClose">'+
                '<a href="">'+
                '<img src="/image/arrow_back.png" alt="">'+
                '</a>'+
                '</figure>'+
                '<figure class="main-header-item doctor-name">'+
                '<h3>上传资料</h3>'+
                '</figure>'+
                '<figure class="main-header-item">'+
                '</figure>'+
                '</header>'+
                '<section class="tc-upLoadBox">'+_listHtml+'</section>'+
                '</section>';
            return _html;
        },

        //逻辑部分
        //perInfo:function(){
        //    var t=this,
        //        data='',
        //        _html='';
        //    t.rcoAjax({
        //        path: t.path,
        //        data:'',
        //        callBack:function(data){
        //
        //        }
        //    })
        //},
        fileUpload:function(ev){
            var t=this;
            var arr=[];
            arr.push({name:"jason",age:"12"});
            $('body').append(t.fileUploadHtml(arr));

            $('.ev-upLoadClose').on("click",function(){
                $(this).closest('.tc-upLoadFile').hide().siblings('.ev-fileUpHide').show();
            });
            $('.ev-upLoadList').on("click",function(){
                t.fileUpControl($(this));
            });
        },
        //点击项目加载图片方法
        fileUpControl:function(fv){
            var t=this;
            var a=$(fv).closest('.tc-upFormBox').find('.tc-upLoadInput');
            a.trigger("click");
            a.on("change",function(){
                var fileList=a[0].files,
                    previewSrc='',
                    _htmlList='',
                    _html='',
                    imgPreviewBox=$(fv).closest('.tc-upFormBox').find('.tc-upLoadItemBox'),  //图片容器
                    imgList=$(fv).closest('.tc-upFormBox').find('.tc-upLoadItemBox').children('.ev-imgList').length;  //已上传图片数量
                if(t.op.fileName!=undefined&&t.op.fileName.length>0){

                } else{
                    t.op.fileName=[];
                }
                var hasFile =  t.op.fileName.indexOf(fileList[0].name);
                if (hasFile == -1) {
                    t.op.fileName.push(fileList[0].name);
                    if(fileList.length+imgList<=9){
                        $.each(fileList,function(i,val){
                            if (!val.name.match(/.jpg|.gif|.png|.bmp/i)){
                                return alert("您上传的图片格式不正确，请重新选择！");
                            }else{
                                previewSrc =window.navigator.userAgent.indexOf("Safari") >= 1 ? window.webkitURL.createObjectURL(val) : window.URL.createObjectURL(val);
                                _htmlList+='<li class="tc-upLoadItemList ev-imgList" data-id="'+i+'" data-name="'+val.name+'"><img src="'+previewSrc+'" alt=""><span class="tc-upLoadCover"></span>' +
                                    '<span class="tc-upLoading"></span><span class="tc-upLoadDel"></span><span class="tc-upLoadAfreshText">等待上传</span></li>';
                            }
                        });
                        if(imgPreviewBox.length>0){
                            imgPreviewBox.find('.tc-upLoadAdd').before(_htmlList);
                        }else{
                            _htmlList+='<li class="tc-upLoadItemList tc-upLoadAdd"><a href="javascript:;"><span class="tc-upLoadAddMore"></span></a></li>';
                            _html='<ul class="tc-upLoadItemBox">'+_htmlList+'</ul>';
                            $(fv).closest('.tc-upFormBox').append(_html);
                        }
                        if(fileList.length+imgList==9){
                            imgPreviewBox.find('.tc-upLoadAdd').hide();
                        }else{
                            imgPreviewBox.find('.tc-upLoadAdd').show();
                        }
                        t.fileDel();
                        t.fileDell();
                    }else{
                        alert("文件不能大于9");
                    }
                }
                a.off("change");
            });
        },
        //点击加号加载图片方法
        fileUpController:function(fv){
            var t=this;
            var a=$(fv).closest('.tc-upFormBox').find('.tc-upLoadInput');
            a.trigger("click");
            a.on("change",function(){
                var fileList=a[0].files,
                    previewSrc='',
                    _htmlList='',
                    _html='',
                    imgPreviewBox=$(fv).closest('.tc-upFormBox').find('.tc-upLoadItemBox'),  //图片容器
                    imgList=$(fv).closest('.tc-upFormBox').find('.tc-upLoadItemBox').children('.ev-imgList').length;  //已上传图片数量
                var hasFile =  t.op.fileName.indexOf(fileList[0].name);
                if(hasFile == -1){
                    t.op.fileName.push(fileList[0].name);
                    if(fileList.length+imgList<=9){
                        $.each(fileList,function(i,val){
                            if (!val.name.match(/.jpg|.gif|.png|.bmp/i)){
                                return alert("您上传的图片格式不正确，请重新选择！");
                            }else{
                                previewSrc =window.navigator.userAgent.indexOf("Safari") >= 1 ? window.webkitURL.createObjectURL(val) : window.URL.createObjectURL(val);
                                _htmlList+='<li class="tc-upLoadItemList ev-imgList" data-id="'+i+'" data-name="'+val.name+'"><img src="'+previewSrc+'" alt=""><span class="tc-upLoadCover"></span>' +
                                    '<span class="tc-upLoading"></span><span class="tc-upLoadDel"></span><span class="tc-upLoadAfreshText">等待上传</span></li>';
                            }
                        });
                        if(imgPreviewBox.length>0){
                            imgPreviewBox.find('.tc-upLoadAdd').before(_htmlList);
                        }else{
                            _htmlList+='<li class="tc-upLoadItemList tc-upLoadAdd"><a href="javascript:;"><span class="tc-upLoadAddMore"></span></a></li>';
                            _html='<ul class="tc-upLoadItemBox">'+_htmlList+'</ul>';
                            $(fv).closest('.tc-upFormBox').append(_html);
                        }
                        if(fileList.length+imgList==9){
                            imgPreviewBox.find('.tc-upLoadAdd').hide();
                        }else{
                            imgPreviewBox.find('.tc-upLoadAdd').show();
                        }
                        t.fileDel();
                    }else{
                        common.popup({
                           text:"文件不能大于9张"
                        });
                        //alert("文件不能大于9");
                    }
                }
                a.off("change");
            });
        },
        //删除图片事件
        fileDel:function(){
            var t =this;
            $('.tc-upLoadDel').on("click",function(){
                var dataName = $(this).parent().data('name');
                t.op.fileName.splice(t.op.fileName.indexOf(dataName),1);

                if($(this).closest('.tc-upLoadItemBox').find('.ev-imgList').length==1){
                    $(this).closest('.tc-upLoadItemBox').remove();
                }
                $(this).parent().siblings('.tc-upLoadAdd').show();
                $(this).parent().remove();
            });
        },
        //点击加号加载图片
        fileDell:function(){
            var _t=this;
            $('.tc-upLoadAdd').on("click",function(){
                _t.fileUpController($(this));
            })
        },
        //公用Ajax数据请求
        rcoAjax:function(dv){
            var t=this,
                params={paramJson: $.toJSON(dv.data)};
            $.ajax({
                url : dv.path,
                type : "POST",
                data :  params,
                //time : 5000,
                success : function(data){
                    //comm.LightBox.hideloading();
                    dv.callBack(data);
                },
                error : function(){
                    // comm.LightBox.hideloading();
                }
            });
        }
    };
    container.init(obj);
};