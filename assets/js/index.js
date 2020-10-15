$(function () {
  var layer = layui.layer;
  getUserInfo()
  $('.icon-tuichu').on('click', function () {
    layer.confirm('确认是否退出?', { icon: 3, title: '提示' }, function (index) {
      localStorage.removeItem('token');
      location.href = 'login.html'

      layer.close(index);
    });
  })
})

function getUserInfo() {
  $.ajax({
    type: 'GET',
    url: '/my/userinfo',
    success: function (res) {
      // console.log(res);
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      renderAvatar(res.data)
    }
  })
}
//渲染头像
function renderAvatar(user) {
  //渲染字体
  var uname = user.nickname || user.username;
  // console.log(uname);
  $('#welcome').html('欢迎&nbsp;&nbsp;' + uname)
  if (user.user_pic !== null) {
    //渲染图片头像
    $('.layui-nav-img').attr('src', user.user_pic).show();
    $('.text-avatar').hide()
  } else {
    //渲染默认头像
    $('.layui-nav-img').hide();
    $('.text-avatar').html(uname[0].toUpperCase()).show()
  }
}