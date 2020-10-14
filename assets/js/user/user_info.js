$(function () {
  var form = layui.form;
  var layer = layui.layer
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return '昵称的长度必须在1~6个字符之间!'
      }
    }
  })
  //初始化页面的基本信息
  initUserinfo()
  function initUserinfo() {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success: function (res) {
        // console.log(res);/
        // form.val('filter', object)
        form.val('formUserInfo', res.data)
      }
    })
  }
  //重置按钮
  $('#btnReset').on('click', function (e) {
    e.preventDefault();
    initUserinfo()
  })
  //监听表单提交事件
  $('.layui-form').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) {
        // console.log(res);
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('修改用户信息成功')
        window.parent.getUserInfo()
      }
    })
  })
})