$(function () {
    var layer = layui.layer
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)
    //点击上传按钮
    $('#btnChooseImage').on('click', function () {
        $('#file').click()
    })
    $('#file').change(function (e) {
        var fileList = e.target.files;
        // console.log(fileList);
        if (fileList.length === 0) {
            return layer.msg('请选择图片!')
        }
        var file = fileList[0];
        var imgURL = URL.createObjectURL(file);
        // 3. 重新初始化裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })
    //点击确定按钮
    $('#btnUpload').on('click', function () {
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png');
        $.ajax({
            method: 'POST',
            url: "/my/update/avatar",
            data: {
                avatar: dataURL,
            },
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('获取用户基本信息成功！')
                window.parent.getUserInfo()
            }
        })

    })

})